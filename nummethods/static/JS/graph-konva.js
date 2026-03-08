(() => {
  const container = document.getElementById("graph-container");
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Estado del plano
  let scale = 40; // px por unidad
  let offsetX = 0; // desplazamiento matemático
  let offsetY = 0;

  const stage = new Konva.Stage({
    container: "graph-container",
    width,
    height,
  });

  const layer = new Konva.Layer();
  stage.add(layer);

  const functionLayer = new Konva.Layer();
  const pointsLayer = new Konva.Layer();

  stage.add(functionLayer);
  stage.add(pointsLayer);

  function toScreenX(x) {
    return width / 2 + offsetX + x * scale;
  }

  function toScreenY(y) {
    return height / 2 + offsetY - y * scale;
  }

  // Función para renderizar la tabla de iteraciones y resultados modificando el epacio visual en la pantalla
  function drawFunction() {
    functionLayer.destroyChildren();

    if (!window.currentFunction) return;

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
        continue;
      }

      if (!isFinite(y)) {
        lastY = null;
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
    if (Number.isInteger(value)) {
      return value.toString();
    }
    const decimals = getDecimalPlaces(step);
    return value.toFixed(decimals);
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

  //drawGrid();
  function drawIterations(iterations) {
    pointsLayer.destroyChildren();

    if (!iterations || iterations.length === 0) return;

    let linePoints = [];

    iterations.forEach((step) => {
      const x = Number(step.x);
      const y = Number(step.fx);

      if (!isFinite(x) || !isFinite(y)) return;

      const screenX = toScreenX(x);
      const screenY = toScreenY(y);

      const circle = new Konva.Circle({
        x: screenX,
        y: screenY,
        radius: 5,
        fill: "red",
      });

      pointsLayer.add(circle);

      linePoints.push(screenX);
      linePoints.push(screenY);
    });

    if (linePoints.length >= 4) {
      const line = new Konva.Line({
        points: linePoints,
        stroke: "red",
        strokeWidth: 2,
        lineCap: "round",
        lineJoin: "round",
      });

      pointsLayer.add(line);
    }

    // 🔥 FORZAR QUE LOS PUNTOS ESTÉN ENCIMA
    pointsLayer.moveToTop();

    pointsLayer.draw();
  }
  // Funcion para dibujar la función en dos dimensiones, por ahora solo se implementa para 1D pero se deja la estructura para futuras mejoras

  function drawImplicitFunction(eq) {
    const f = math.compile(eq);

    // rango visible del plano
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

        // evitar valores infinitos o extremadamente grandes
        if (
          !isFinite(f00) ||
          !isFinite(f10) ||
          !isFinite(f01) ||
          !isFinite(f11)
        )
          continue;

        if (
          Math.abs(f00) > 1e6 ||
          Math.abs(f10) > 1e6 ||
          Math.abs(f01) > 1e6 ||
          Math.abs(f11) > 1e6
        )
          continue;

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
          // evitar dibujar infinito cerca de asíntotas
          if (
            Math.abs(pts[0][0]) > 1e6 ||
            Math.abs(pts[0][1]) > 1e6 ||
            Math.abs(pts[1][0]) > 1e6 ||
            Math.abs(pts[1][1]) > 1e6
          )
            continue;

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

    let linePoints = [];

    iterations.forEach((step) => {
      const x = step.x[0];
      const y = step.x[1];

      const screenX = toScreenX(x);
      const screenY = toScreenY(y);

      linePoints.push(screenX);
      linePoints.push(screenY);

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

  /*
  Creación de función para poder graficar la aproximación para cada variable x,y.z
  */
  function drawIterations3D(iterations) {
    pointsLayer.destroyChildren();

    if (!iterations || iterations.length === 0) return;

    let colors = ["red", "blue", "green"];

    for (let v = 0; v < iterations[0].x.length; v++) {
      let linePoints = [];

      iterations.forEach((step, i) => {
        const iter = i;
        const val = step.x[v];

        const screenX = toScreenX(iter);
        const screenY = toScreenY(val);

        linePoints.push(screenX);
        linePoints.push(screenY);

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
     PAN (ARRASTRE MATEMÁTICO)
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
    drawGrid();
    if (window.currentPlotData) {
      const data = window.currentPlotData;

      if (data.dimension === 1) {
        drawFunction();
        drawIterations(data.iterations);
      } else if (data.dimension === 2) {
        functionLayer.destroyChildren();
        if (data.functions) {
          data.functions.forEach((eq) => drawImplicitFunction(eq));
        }
        functionLayer.draw();

        drawNewtonPath2D(data.history || data.iterations);
      }else if(data.dimension === 3){
        functionLayer.destroyChildren();
        functionLayer.draw();

        drawIterations3D(data.history || data.iterations);
      }
    }
  });

  stage.on("mouseup touchend mouseleave", () => {
    lastPos = null;
  });

  /* =====================================================
     ZOOM CENTRADO EN EL CURSOR
  ===================================================== */

  stage.on("wheel", (e) => {
    e.evt.preventDefault();

    const pointer = stage.getPointerPosition();
    const oldScale = scale;

    const zoomFactor = e.evt.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.max(
      0.001,
      Math.min(scale * zoomFactor, 5000000000000000000000000000000000000000),
    );

    const factor = scale / oldScale;

    offsetX =
      (offsetX - pointer.x + width / 2) * factor + pointer.x - width / 2;
    offsetY =
      (offsetY - pointer.y + height / 2) * factor + pointer.y - height / 2;

    drawGrid();
    if (window.currentPlotData) {
      const data = window.currentPlotData;

      if (data.dimension === 1) {
        drawFunction();
        drawIterations(data.iterations);
      } else if (data.dimension === 2) {
        functionLayer.destroyChildren();
        if (data.functions) {
          data.functions.forEach((eq) => drawImplicitFunction(eq));
        }
        functionLayer.draw();

        drawNewtonPath2D(data.history || data.iterations);
      }else if(data.dimension === 3){
        functionLayer.destroyChildren();
        functionLayer.draw();
        drawIterations3D(data.history || data.iterations);
      }
    }
  });

  // Exponer para debug
  window.konvaStage = stage;

  window.drawNewtonGraph = function (data) {
    window.currentPlotData = data;

    const dimension = data.dimension || 1;

    if (dimension === 1) {
      if (data.function_str) {
        window.currentFunction = math.compile(data.function_str);
        drawFunction();
      }
      drawIterations(data.iterations);
    } else if (dimension === 2) {
      // Para 2D, podríamos implementar un renderizado de superficie o contornos

      window.currentFunction = null;
      if (data.functions) {
        // Implementar gráfico 2D si es necesario
        functionLayer.destroyChildren();
        data.functions.forEach((eq) => {
          drawImplicitFunction(eq);
        });
        functionLayer.draw();
      }
      drawNewtonPath2D(data.history || data.iterations);
    } else if (dimension === 3) {
      // Para 3D, se necesitaría una librería diferente o un renderizado personalizado, sin embargo, solamente graficamos la evolución
      // para cada variable (x,y,z)
      window.currentFunction = null;
      functionLayer.destroyChildren();
      functionLayer.draw();

      drawIterations3D(data.history || data.iterations);
    }
  };
})();
