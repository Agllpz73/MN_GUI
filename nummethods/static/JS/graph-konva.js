(() => {
  const container = document.getElementById("graph-container");
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Estado del plano
  let scale = 40; // px por unidad
  let offsetX = 0;
  let offsetY = 0;

  const stage = new Konva.Stage({
    container: "graph-container",
    width,
    height,
  });

  // Capas
  const layer = new Konva.Layer(); // rejilla y ejes
  const functionLayer = new Konva.Layer(); // curva real
  const integrationLayer = new Konva.Layer(); // trapecios / áreas
  const pointsLayer = new Konva.Layer(); // puntos / iteraciones

  stage.add(layer);
  stage.add(functionLayer);
  stage.add(integrationLayer);
  stage.add(pointsLayer);

  function toScreenX(x) {
    return width / 2 + offsetX + x * scale;
  }

  function toScreenY(y) {
    return height / 2 + offsetY - y * scale;
  }

  /* =====================================================
     UTILIDADES MATEMÁTICAS
  ===================================================== */

  function getNiceStep(scale) {
    const targetPx = 80;
    const rawStep = targetPx / scale;

    const exponent = Math.floor(Math.log10(rawStep));
    const base = Math.pow(10, exponent);
    const fraction = rawStep / base;

    let niceFraction;
    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;

    return niceFraction * base;
  }

  function getDecimalPlaces(step) {
    if (step >= 1) return 0;
    return Math.max(0, -Math.floor(Math.log10(step)));
  }

  function formatLabel(value, step) {
    if (Number.isInteger(value)) return value.toString();
    const decimals = getDecimalPlaces(step);
    return value.toFixed(decimals);
  }

  function normalizeMathExpression(expr) {
    if (!expr) return expr;

    let normalized = expr;

    // Python style -> math.js style
    normalized = normalized.replace(/\*\*/g, "^");

    // casos tipo e^(...) -> exp(...)
    normalized = normalized.replace(/\be\^\(([^)]+)\)/g, "exp($1)");
    normalized = normalized.replace(/\be\^([a-zA-Z0-9_.]+)/g, "exp($1)");

    return normalized;
  }

  function isIntegrationData(data) {
    return data && (data.category === "integracion" || data.method === "trapecio");
  }

  function fitIntegrationView(data) {
    if (!data || !data.plot_data) return;

    const plot = data.plot_data;
    const nodes = plot.nodes || [];
    const values = plot.node_values || [];

    if (nodes.length === 0 || values.length === 0) return;

    const minX = Math.min(...nodes);
    const maxX = Math.max(...nodes);

    const allY = [...values, 0];
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);

    const dx = Math.max(maxX - minX, 1e-6);
    const dy = Math.max(maxY - minY, 1e-6);

    const margin = 0.15;
    const usableWidth = width * (1 - 2 * margin);
    const usableHeight = height * (1 - 2 * margin);

    const scaleX = usableWidth / dx;
    const scaleY = usableHeight / dy;

    scale = Math.max(20, Math.min(scaleX, scaleY));

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    offsetX = -centerX * scale;
    offsetY = centerY * scale;
  }

  /* =====================================================
     DIBUJO DEL PLANO
  ===================================================== */

  function drawGrid() {
    layer.destroyChildren();

    const step = getNiceStep(scale);
    const gridPx = step * scale;

    const originX = width / 2 + offsetX;
    const originY = height / 2 + offsetY;

    // Líneas verticales + etiquetas
    for (let x = originX % gridPx; x < width; x += gridPx) {
      const rawValue = (x - originX) / scale;

      layer.add(
        new Konva.Line({
          points: [x, 0, x, height],
          stroke: "#e5e7eb",
          strokeWidth: 1,
          listening: false,
        }),
      );

      if (Math.abs(rawValue) > 1e-9) {
        layer.add(
          new Konva.Text({
            x: x + 2,
            y: originY + 4,
            text: formatLabel(rawValue, step),
            fontSize: 12,
            fill: "#6b7280",
            listening: false,
          }),
        );
      }
    }

    // Líneas horizontales + etiquetas
    for (let y = originY % gridPx; y < height; y += gridPx) {
      const rawValue = -(y - originY) / scale;

      layer.add(
        new Konva.Line({
          points: [0, y, width, y],
          stroke: "#e5e7eb",
          strokeWidth: 1,
          listening: false,
        }),
      );

      if (Math.abs(rawValue) > 1e-9) {
        layer.add(
          new Konva.Text({
            x: originX + 6,
            y: y - 10,
            text: formatLabel(rawValue, step),
            fontSize: 12,
            fill: "#6b7280",
            listening: false,
          }),
        );
      }
    }

    // Eje X
    layer.add(
      new Konva.Line({
        points: [0, originY, width, originY],
        stroke: "#374151",
        strokeWidth: 2,
        listening: false,
      }),
    );

    // Eje Y
    layer.add(
      new Konva.Line({
        points: [originX, 0, originX, height],
        stroke: "#374151",
        strokeWidth: 2,
        listening: false,
      }),
    );

    layer.draw();
  }

  /* =====================================================
     FUNCION 1D
  ===================================================== */

  function drawFunction() {
    functionLayer.destroyChildren();

    if (!window.currentFunction) {
      functionLayer.draw();
      return;
    }

    const left = (-width / 2 - offsetX) / scale;
    const right = (width / 2 - offsetX) / scale;
    const step = (right - left) / width;

    let segment = [];
    let lastY = null;

    for (let x = left; x <= right; x += step) {
      let y;

      try {
        y = window.currentFunction.evaluate({ x: x });
      } catch {
        lastY = null;
        if (segment.length >= 4) {
          functionLayer.add(
            new Konva.Line({
              points: segment,
              stroke: "blue",
              strokeWidth: 2,
              lineCap: "round",
              lineJoin: "round",
            }),
          );
        }
        segment = [];
        continue;
      }

      if (!isFinite(y)) {
        lastY = null;
        if (segment.length >= 4) {
          functionLayer.add(
            new Konva.Line({
              points: segment,
              stroke: "blue",
              strokeWidth: 2,
              lineCap: "round",
              lineJoin: "round",
            }),
          );
        }
        segment = [];
        continue;
      }

      if (lastY !== null && Math.abs(y - lastY) > 50) {
        if (segment.length >= 4) {
          functionLayer.add(
            new Konva.Line({
              points: segment,
              stroke: "blue",
              strokeWidth: 2,
              lineCap: "round",
              lineJoin: "round",
            }),
          );
        }
        segment = [];
      }

      segment.push(toScreenX(x));
      segment.push(toScreenY(y));
      lastY = y;
    }

    if (segment.length >= 4) {
      functionLayer.add(
        new Konva.Line({
          points: segment,
          stroke: "blue",
          strokeWidth: 2,
          lineCap: "round",
          lineJoin: "round",
        }),
      );
    }

    functionLayer.draw();
  }

  /* =====================================================
     ITERACIONES / PUNTOS 1D
  ===================================================== */

  function drawIterations(iterations) {
    pointsLayer.destroyChildren();

    if (!iterations || iterations.length === 0) {
      pointsLayer.draw();
      return;
    }

    let linePoints = [];

    iterations.forEach((step) => {
      const x = Number(step.x);
      const y = Number(step.fx);

      if (!isFinite(x) || !isFinite(y)) return;

      const screenX = toScreenX(x);
      const screenY = toScreenY(y);

      if (step.type === "interpolated") {
        pointsLayer.add(
          new Konva.Circle({
            x: screenX,
            y: screenY,
            radius: 6,
            fill: "green",
            stroke: "black",
            strokeWidth: 1,
          }),
        );
      } else {
        linePoints.push(screenX, screenY);
      }
    });

    if (linePoints.length >= 4) {
      pointsLayer.add(
        new Konva.Line({
          points: linePoints,
          stroke: "red",
          strokeWidth: 2,
          lineCap: "round",
          lineJoin: "round",
        }),
      );
    }

    iterations.forEach((step) => {
      const x = Number(step.x);
      const y = Number(step.fx);

      if (!isFinite(x) || !isFinite(y)) return;

      const screenX = toScreenX(x);
      const screenY = toScreenY(y);

      let color = "red";
      let radius = 5;

      if (step.type === "interpolated") {
        color = "green";
        radius = 6;
      } else if (step.type === "node") {
        color = "#2563eb";
        radius = 5;
      }

      pointsLayer.add(
        new Konva.Circle({
          x: screenX,
          y: screenY,
          radius: radius,
          fill: color,
          stroke: "black",
          strokeWidth: 1,
        }),
      );
    });

    pointsLayer.moveToTop();
    pointsLayer.draw();
  }

  /* =====================================================
     FUNCIÓN IMPLÍCITA 2D
  ===================================================== */

  function drawImplicitFunction(eq) {
    const f = math.compile(eq);

    const xmin = (-width / 2 - offsetX) / scale;
    const xmax = (width / 2 - offsetX) / scale;
    const ymin = (-height / 2 + offsetY) / scale;
    const ymax = (height / 2 + offsetY) / scale;

    const step = Math.max(0.01, 4 / scale);

    function interp(p1, p2, v1, v2) {
      const t = v1 / (v1 - v2);
      return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
    }

    for (let x = xmin; x < xmax; x += step) {
      for (let y = ymin; y < ymax; y += step) {
        let f00, f10, f01, f11;

        try {
          f00 = f.evaluate({ x: x, y: y });
          f10 = f.evaluate({ x: x + step, y: y });
          f01 = f.evaluate({ x: x, y: y + step });
          f11 = f.evaluate({ x: x + step, y: y + step });
        } catch {
          continue;
        }

        if (
          !isFinite(f00) ||
          !isFinite(f10) ||
          !isFinite(f01) ||
          !isFinite(f11)
        ) {
          continue;
        }

        if (
          Math.abs(f00) > 1e6 ||
          Math.abs(f10) > 1e6 ||
          Math.abs(f01) > 1e6 ||
          Math.abs(f11) > 1e6
        ) {
          continue;
        }

        const p00 = [x, y];
        const p10 = [x + step, y];
        const p01 = [x, y + step];
        const p11 = [x + step, y + step];

        let pts = [];

        if (f00 * f10 < 0) pts.push(interp(p00, p10, f00, f10));
        if (f10 * f11 < 0) pts.push(interp(p10, p11, f10, f11));
        if (f11 * f01 < 0) pts.push(interp(p11, p01, f11, f01));
        if (f01 * f00 < 0) pts.push(interp(p01, p00, f01, f00));

        if (pts.length === 2) {
          if (
            Math.abs(pts[0][0]) > 1e6 ||
            Math.abs(pts[0][1]) > 1e6 ||
            Math.abs(pts[1][0]) > 1e6 ||
            Math.abs(pts[1][1]) > 1e6
          ) {
            continue;
          }

          const s1 = [toScreenX(pts[0][0]), toScreenY(pts[0][1])];
          const s2 = [toScreenX(pts[1][0]), toScreenY(pts[1][1])];

          functionLayer.add(
            new Konva.Line({
              points: [s1[0], s1[1], s2[0], s2[1]],
              stroke: "blue",
              strokeWidth: 2,
              lineCap: "round",
              listening: false,
            }),
          );
        }
      }
    }

    functionLayer.draw();
  }

  function drawNewtonPath2D(iterations) {
    pointsLayer.destroyChildren();

    if (!iterations || iterations.length === 0) {
      pointsLayer.draw();
      return;
    }

    let linePoints = [];

    iterations.forEach((step) => {
      const x = step.x[0];
      const y = step.x[1];

      const screenX = toScreenX(x);
      const screenY = toScreenY(y);

      linePoints.push(screenX, screenY);

      pointsLayer.add(
        new Konva.Circle({
          x: screenX,
          y: screenY,
          radius: 5,
          fill: "red",
        }),
      );
    });

    if (linePoints.length >= 4) {
      pointsLayer.add(
        new Konva.Line({
          points: linePoints,
          stroke: "red",
          strokeWidth: 2,
        }),
      );
    }

    pointsLayer.moveToTop();
    pointsLayer.draw();
  }

  /* =====================================================
     3D (Evolución por variable)
  ===================================================== */

  function drawIterations3D(iterations) {
    pointsLayer.destroyChildren();

    if (!iterations || iterations.length === 0) {
      pointsLayer.draw();
      return;
    }

    let colors = ["red", "blue", "green"];

    for (let v = 0; v < iterations[0].x.length; v++) {
      let linePoints = [];

      iterations.forEach((step, i) => {
        const iter = i;
        const val = step.x[v];

        const screenX = toScreenX(iter);
        const screenY = toScreenY(val);

        linePoints.push(screenX, screenY);

        pointsLayer.add(
          new Konva.Circle({
            x: screenX,
            y: screenY,
            radius: 4,
            fill: colors[v],
          }),
        );
      });

      if (linePoints.length >= 4) {
        pointsLayer.add(
          new Konva.Line({
            points: linePoints,
            stroke: colors[v],
            strokeWidth: 2,
          }),
        );
      }
    }

    pointsLayer.draw();
  }

  /* =====================================================
     INTEGRACIÓN (TRAPECIOS)
  ===================================================== */

  function drawIntegrationSegments(segments) {
    integrationLayer.destroyChildren();

    if (!segments || segments.length === 0) {
      integrationLayer.draw();
      return;
    }

    segments.forEach((seg) => {
      if (seg.type === "line") {
        // relleno
        integrationLayer.add(
          new Konva.Line({
            points: [
              toScreenX(seg.x0), toScreenY(0),
              toScreenX(seg.x0), toScreenY(seg.y0),
              toScreenX(seg.x1), toScreenY(seg.y1),
              toScreenX(seg.x1), toScreenY(0),
            ],
            closed: true,
            fill: "rgba(59,130,246,0.25)",
            stroke: "#93c5fd",
            strokeWidth: 1,
            listening: false,
          }),
        );

        // línea superior
        integrationLayer.add(
          new Konva.Line({
            points: [
              toScreenX(seg.x0), toScreenY(seg.y0),
              toScreenX(seg.x1), toScreenY(seg.y1),
            ],
            stroke: "#dc2626",
            strokeWidth: 2,
            lineCap: "round",
            lineJoin: "round",
            listening: false,
          }),
        );

        // lados
        integrationLayer.add(
          new Konva.Line({
            points: [
              toScreenX(seg.x0), toScreenY(0),
              toScreenX(seg.x0), toScreenY(seg.y0),
            ],
            stroke: "#93c5fd",
            strokeWidth: 1,
            listening: false,
          }),
        );

        integrationLayer.add(
          new Konva.Line({
            points: [
              toScreenX(seg.x1), toScreenY(0),
              toScreenX(seg.x1), toScreenY(seg.y1),
            ],
            stroke: "#93c5fd",
            strokeWidth: 1,
            listening: false,
          }),
        );
      }
    });

    integrationLayer.draw();
  }

  /* =====================================================
     REDIBUJADO GENERAL
  ===================================================== */

  function redrawCurrentPlot() {
    drawGrid();

    if (!window.currentPlotData) return;

    const data = window.currentPlotData;

    if (isIntegrationData(data)) {
      drawFunction();
      drawIntegrationSegments(data.plot_data?.segments || []);
      drawIterations(data.iterations || []);
      return;
    }

    if (data.dimension === 1) {
      drawFunction();
      drawIterations(data.iterations || []);
    } else if (data.dimension === 2) {
      functionLayer.destroyChildren();
      integrationLayer.destroyChildren();

      if (data.functions) {
        data.functions.forEach((eq) => drawImplicitFunction(eq));
      }
      functionLayer.draw();

      drawNewtonPath2D(data.history || data.iterations || []);
    } else if (data.dimension === 3) {
      functionLayer.destroyChildren();
      integrationLayer.destroyChildren();
      functionLayer.draw();

      drawIterations3D(data.history || data.iterations || []);
    }
  }

  /* =====================================================
     PAN
  ===================================================== */

  let lastPos = null;

  stage.on("mousedown touchstart", () => {
    lastPos = stage.getPointerPosition();
  });

  stage.on("mousemove touchmove", () => {
    if (!lastPos) return;

    const pos = stage.getPointerPosition();
    offsetX += pos.x - lastPos.x;
    offsetY += pos.y - lastPos.y;

    lastPos = pos;
    redrawCurrentPlot();
  });

  stage.on("mouseup touchend mouseleave", () => {
    lastPos = null;
  });

  /* =====================================================
     ZOOM
  ===================================================== */

  stage.on("wheel", (e) => {
    e.evt.preventDefault();

    const pointer = stage.getPointerPosition();
    const oldScale = scale;

    const zoomFactor = e.evt.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.max(0.001, Math.min(scale * zoomFactor, 1e6));

    const factor = scale / oldScale;

    offsetX =
      (offsetX - pointer.x + width / 2) * factor + pointer.x - width / 2;
    offsetY =
      (offsetY - pointer.y + height / 2) * factor + pointer.y - height / 2;

    redrawCurrentPlot();
  });

  /* =====================================================
     API GLOBAL
  ===================================================== */

  window.konvaStage = stage;

  window.drawNewtonGraph = function (data) {
    window.currentPlotData = data;

    const dimension = data.dimension || 1;

    if (isIntegrationData(data)) {
      try {
        if (data.function_str) {
          const expr = normalizeMathExpression(data.function_str);
          window.currentFunction = math.compile(expr);
        } else {
          window.currentFunction = null;
        }
      } catch (e) {
        console.error("Error al compilar función de integración:", e);
        window.currentFunction = null;
      }

      fitIntegrationView(data);
      redrawCurrentPlot();
      return;
    }

    if (dimension === 1) {
      try {
        if (data.function_str) {
          const expr = normalizeMathExpression(data.function_str);
          window.currentFunction = math.compile(expr);
        } else {
          window.currentFunction = null;
        }
      } catch (e) {
        console.error("Error al compilar función 1D:", e);
        window.currentFunction = null;
      }

      integrationLayer.destroyChildren();
      redrawCurrentPlot();
    } else if (dimension === 2) {
      window.currentFunction = null;
      redrawCurrentPlot();
    } else if (dimension === 3) {
      window.currentFunction = null;
      redrawCurrentPlot();
    }
  };

  drawGrid();
})();