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

  /*
  function drawFunction(plotData) {
    functionLayer.destroyChildren();

    const points = [];

    for (let i = 0; i < plotData.x.length; i++) {
      const x = plotData.x[i];
      const y = plotData.y[i];

      if (y === null || isNaN(y)) continue;

      points.push(toScreenX(x));
      points.push(toScreenY(y));
    }

    const line = new Konva.Line({
      points: points,
      stroke: "blue",
      strokeWidth: 2,
    });

    functionLayer.add(line);
    functionLayer.draw();
  }

  function drawIterations(iterations) {
    pointsLayer.destroyChildren();

    iterations.forEach((step) => {
      const circle = new Konva.Circle({
        x: toScreenX(step.x),
        y: toScreenY(step["f(x)"]),
        radius: 5,
        fill: "red",
      });

      pointsLayer.add(circle);
    });

    pointsLayer.draw();
  }

  */
  // Función para renderizar la tabla de iteraciones y resultados modificando el epacio visual en la pantalla
  function drawFunction() {
    functionLayer.destroyChildren();

    if (!window.currentFunction) return;

    const points = [];

    // ✅ Rango visible correcto
    const left = (-width / 2 - offsetX) / scale;
    const right = (width / 2 - offsetX) / scale;

    const step = (right - left) / width;

    for (let x = left; x <= right; x += step) {
      let y;

      try {
        y = window.currentFunction.evaluate({ x: x });
      } catch {
        continue;
      }

      if (!isFinite(y)) continue;

      points.push(toScreenX(x));
      points.push(toScreenY(y));
    }

    if (points.length < 4) return;

    const line = new Konva.Line({
      points: points,
      stroke: "blue",
      strokeWidth: 2,
      lineCap: "round",
      lineJoin: "round",
    });

    functionLayer.add(line);
    functionLayer.draw();
  }
  /* =====================================================
     UTILIDADES MATEMÁTICAS (GeoGebra-style)
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

    iterations.forEach((step) => {
      const circle = new Konva.Circle({
        x: toScreenX(step.x),
        y: toScreenY(step["f(x)"]),
        radius: 5,
        fill: "red",
      });

      pointsLayer.add(circle);
    });

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
      drawFunction(window.currentPlotData.plot_data);
      drawIterations(window.currentPlotData.iterations);
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
      drawFunction(window.currentPlotData.plot_data);
      drawIterations(window.currentPlotData.iterations);
    }
  });

  // Exponer para debug
  window.konvaStage = stage;



  window.drawNewtonGraph = function (data) {
    window.currentPlotData = data;

    // 🔥 COMPILAR FUNCIÓN
    if (data.function_str) {
      window.currentFunction = math.compile(data.function_str);
    } else {
      window.currentFunction = null;
    }

    drawFunction();
    drawIterations(data.iterations);
  };
})();
