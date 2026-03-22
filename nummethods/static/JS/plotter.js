function renderProcedure(data) {
  const container = document.getElementById("procedure-output");
  container.innerHTML = "";

  if (!data.iterations || data.iterations.length === 0 ) {
    container.innerHTML = `<p style="color:red;">${data.message}</p>`;
    return;
  }

  let table = `
        <table border="1" cellpadding="5">
            <thead>
                <tr>
                    <th>Iteración</th>
                    <th>Xn</th>
                    <th>f(Xn)</th>
                    <th>Error</th>
                </tr>
            </thead>
            <tbody>
    `;

  data.iterations.forEach((step) => {
    table += `
            <tr>
                <td>${step.iteration}</td>
                <td>${Number(step.x).toFixed(6)}</td>
                <td>${Number(step.fx).toFixed(6)}</td>
                <td>${Number(step.error).toExponential(3)}</td>
            </tr>
        `;
  });

  table += `
            </tbody>
        </table>
        <br>
        <p><strong>Raíz aproximada:</strong> ${data.root}</p>
        <p><strong>Convergió:</strong> ${data.converged}</p>
        <p><strong>Mensaje:</strong> ${data.message}</p>
    `;

  container.innerHTML = table;
}
// Por simplicidad, se creara un nuevo render para soportar los métodos de sistemas de ecuaciones, pero se puede refactorizar para soportar ambos casos con un solo renderizado
function renderProcedureSystem(data) {
  const container = document.getElementById("procedure-output");
  container.innerHTML = "";

  if (!data.iterations || data.iterations.length === 0) {
    container.innerHTML = `<p style="color:red;">${data.message}</p>`;
    return;
  }

  let table = `
    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>Iteración</th>
          <th>Aproximaciones (x,y)</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.iterations.forEach((step) => {
    table += `
      <tr>
        <td>${step.iter}</td>
        <td>[ ${step.x.map((v) => v.toFixed(6)).join(", ")} ]</td>
        <td>${Number(step.error).toExponential(3)}</td>
      </tr>
    `;
  });

  table += `
      </tbody>
    </table>
    <br>
    <p><strong>Raíz aproximada:</strong> [ ${data.root.map((v) => v.toFixed(6)).join(", ")} ]</p>
    <p><strong>Convergió:</strong> ${data.converged}</p>
    
  `;

  container.innerHTML = table;
}


function openGaussModal() {
  const modal = document.getElementById("gauss-modal");
  const closeBtn = document.querySelector(".close-gauss");

  modal.style.display = "block";

  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

function renderProcedureGauss(data) {
  const container = document.getElementById("gauss-procedure-container");
  container.innerHTML = "";

  let html = `<div class="gauss-steps">`;

  data.iterations.forEach((matrix, step) => {
    html += `<div class="gauss-step">`;
    html += `<h3>Iteración ${step + 1}</h3>`;
    html += `<table class="matrix-table">`;

    matrix.forEach((row) => {
      html += `<tr>`;

      row.forEach((value, index) => {
        if (index === row.length - 1) {
          html += `<td class="matrix-b">${value.toFixed(4)}</td>`;
        } else {
          html += `<td>${value.toFixed(4)}</td>`;
        }
      });

      html += `</tr>`;
    });

    html += `</table>`;
    html += `</div>`;
  });

  html += `</div>`;

  html += `<div class="solution-box">`;
  html += `<h3>Solución</h3>`;

  const vars = ["x", "y", "z"];

  data.solution.forEach((value, i) => {
    html += `<p>${vars[i]} = <strong>${value.toFixed(6)}</strong></p>`;
  });

  html += `</div>`;

  container.innerHTML = html;

  openGaussModal();
}

// Experimento para GAUSS - JORDAN

function renderProcedureGaussJordan(data) {
  const container = document.getElementById("gauss-procedure-container");
  container.innerHTML = "";

  let html = `<div class="gauss-steps">`;

  data.iterations.forEach((step, index) => {
    const matrix = step.matrix;
    const operation = step.operations;

    html += `<div class="gauss-step">`;

    html += `<h3>Paso ${index + 1}</h3>`;

    if (operation) {
      html += `<div class="row-operation">${operation}</div>`;
    }

    html += `<table class="matrix-table">`;

    matrix.forEach((row) => {
      html += `<tr>`;

      row.forEach((value, colIndex) => {
        if (colIndex === row.length - 1) {
          html += `<td class="matrix-b">${value.toFixed(4)}</td>`;
        } else {
          html += `<td>${value.toFixed(4)}</td>`;
        }
      });

      html += `</tr>`;
    });

    html += `</table>`;
    html += `</div>`;
  });

  html += `</div>`;

  html += `<div class="solution-box">`;
  html += `<h3>Solución</h3>`;

  const vars = ["x", "y", "z"];

  data.solution.forEach((value, i) => {
    html += `<p>${vars[i]} = <strong>${value.toFixed(6)}</strong></p>`;
  });

  html += `</div>`;

  container.innerHTML = html;

  openGaussModal();
}

// Render para matriz inversa

function renderProcedureMatrizInversa(data) {
  const container = document.getElementById("gauss-procedure-container");
  container.innerHTML = "";

  let html = `<div class="gauss-steps">`;

  data.iterations.forEach((step, index) => {
    const matrix = step.matrix;
    const operation = step.operations;

    html += `<div class="gauss-step">`;

    html += `<h3>Paso ${index + 1}</h3>`;

    if (operation) {
      html += `<div class="row-operation">${operation}</div>`;
    }

    html += `<table class="matrix-table">`;

    matrix.forEach((row) => {
      html += `<tr>`;

      row.forEach((value, colIndex) => {
        if (colIndex === row.length - 1) {
          html += `<td class="matrix-b">${value.toFixed(4)}</td>`;
        } else {
          html += `<td>${value.toFixed(4)}</td>`;
        }
      });

      html += `</tr>`;
    });

    html += `</table>`;
    html += `</div>`;
  });

  html += `</div>`;

  /* -------- PRODUCTO X = A⁻¹ B -------- */

  html += `<div class="solution-box">`;
  html += `<h3>Producto X = A⁻¹ B</h3>`;

  html += `<div class="matrix-product">`;

  /* MATRIZ INVERSA */
  html += `<table class="matrix-product-table">`;

  data.inverse.forEach((row) => {
    html += `<tr>`;
    row.forEach((value) => {
      html += `<td>${value.toFixed(4)}</td>`;
    });
    html += `</tr>`;
  });

  html += `</table>`;

  /* símbolo multiplicación */
  html += `<span class="matrix-multiply">×</span>`;

  /* VECTOR B */
  html += `<table class="matrix-product-table vector-b">`;

  data.vector_b.forEach((value) => {
    html += `<tr>`;
    html += `<td>${value.toFixed(4)}</td>`;
    html += `</tr>`;
  });

  html += `</table>`;
  html += `<span class="matrix-multiply">=</span>`;
  const vars = ["x", "y", "z"];

  html += `<table class="matrix-product-table vector-b">`;

  data.solution.forEach((value, i) => {
    html += `<tr>`;
    html += `<td>${vars[i]} = <strong>${value.toFixed(6)}</strong></td>`;
    html += `</tr>`;
  });

  html += `</table>`;
  /*data.solution.forEach((value, i) => {
    html += `<p>${vars[i]} = <strong>${value.toFixed(6)}</strong></p>`;
  }); */

  html += `</div>`;
  html += `</div>`;

  container.innerHTML = html;

  openGaussModal();
}

// Render para LU y Cholesky factorización

// funciones para optimizar el render
function renderSystem(A, b) {
  const vars = ["x", "y", "z", "w", "v", "u"];

  let html = `<div class="system-equations">`;

  for (let i = 0; i < A.length; i++) {
    let eq = "";

    for (let j = 0; j < A[i].length; j++) {
      let coef = A[i][j];

      if (j > 0 && coef >= 0) eq += "+ ";

      eq += `${coef}${vars[j]} `;
    }

    eq += `= ${b[i]}`;

    html += `<div class="equation-line">${eq}</div>`;
  }

  html += `</div>`;

  return html;
}
function renderSolution(x) {
  const vars = ["x", "y", "z", "w", "v", "u"];

  let html = `<div class="solution-vector">`;

  for (let i = 0; i < x.length; i++) {
    html += `<div class="solution-item">
                    ${vars[i]} = ${Number(x[i]).toFixed(6)}
                 </div>`;
  }

  html += `</div>`;

  return html;
}

function renderMatrix(matrix) {
  let html = `<div class="matrix-wrapper">`;
  html += `<table class="matrix-table">`;

  for (let i = 0; i < matrix.length; i++) {
    html += `<tr>`;

    for (let j = 0; j < matrix[i].length; j++) {
      let value = Number(matrix[i][j]).toFixed(6);

      html += `<td>${value}</td>`;
    }

    html += `</tr>`;
  }

  html += `</table>`;
  html += `</div>`;

  return html;
}

function renderVector(vector) {
  let html = `<div class="matrix-wrapper">`;
  html += `<table class="matrix-table">`;

  for (let i = 0; i < vector.length; i++) {
    let value = Number(vector[i]).toFixed(6);

    html += `<tr><td>${value}</td></tr>`;
  }

  html += `</table>`;
  html += `</div>`;

  return html;
}

function renderFactorization(data) {
  const {
    method,
    A,
    factor1,
    factor2,
    factor1_name,
    factor2_name,
    b,
    y,
    x,
    forward_equation,
    backward_equation,
  } = data;

  let html = "";

  html += `<div class="solution-box">`;
  html += `<h3>Método de ${method}</h3>`;

  /* PASO 1 */
  html += `<div class="step-box">`;
  html += `<h4>Paso 1: Sistema original</h4>`;
  html += renderSystem(A, b);
  html += `</div>`;

  /* PASO 2 */
  html += `<div class="step-box">`;
  html += `<h4>Paso 2: Separación de matrices</h4>`;

  html += `<div class="matrix-group">`;

  html += `<div>`;
  html += `<p>Matriz A</p>`;
  html += renderMatrix(A);
  html += `</div>`;

  html += `<div>`;
  html += `<p>Vector b</p>`;
  html += renderVector(b);
  html += `</div>`;

  html += `</div>`;
  html += `</div>`;

  /* PASO 3 */
  html += `<div class="step-box">`;
  html += `<h4>Paso 3: Factorización</h4>`;

  html += `<div class="matrix-product">`;

  html += `<div>`;
  html += `<p>A</p>`;
  html += renderMatrix(A);
  html += `</div>`;

  html += `<span class="matrix-equals">=</span>`;

  html += `<div>`;
  html += `<p>${factor1_name}</p>`;
  html += renderMatrix(factor1);
  html += `</div>`;

  html += `<span class="matrix-mult">×</span>`;

  html += `<div>`;
  html += `<p>${factor2_name}</p>`;
  html += renderMatrix(factor2);
  html += `</div>`;

  html += `</div>`;
  html += `</div>`;

  /* PASO 4 */
  html += `<div class="step-box">`;
  html += `<h4>Paso 4: Sustitución hacia adelante</h4>`;
  html += `<p class="equation">${forward_equation}</p>`;

  html += `<div class="matrix-group">`;

  html += `<div>`;
  html += `<p>${factor1_name}</p>`;
  html += renderMatrix(factor1);
  html += `</div>`;

  html += `<div>`;
  html += `<p>b</p>`;
  html += renderVector(b);
  html += `</div>`;

  html += `<div>`;
  html += `<p>y</p>`;
  html += renderVector(y);
  html += `</div>`;

  html += `</div>`;
  html += `</div>`;

  /* PASO 5 */
  html += `<div class="step-box">`;
  html += `<h4>Paso 5: Sustitución hacia atrás</h4>`;
  html += `<p class="equation">${backward_equation}</p>`;

  html += `<div class="matrix-group">`;

  html += `<div>`;
  html += `<p>${factor2_name}</p>`;
  html += renderMatrix(factor2);
  html += `</div>`;

  html += `<div>`;
  html += `<p>y</p>`;
  html += renderVector(y);
  html += `</div>`;

  html += `<div>`;
  html += `<p>x</p>`;
  html += renderVector(x);
  html += `</div>`;

  html += `</div>`;
  html += `</div>`;

  /* RESULTADO */
  html += `<div class="step-box result-box">`;
  html += `<h4>Solución del sistema</h4>`;
  html += renderSolution(x);
  html += `</div>`;

  html += `</div>`;

  return html;
}

// Plotter para la categoría de Interpolación

function renderInterpolation(data) {
  const container = document.getElementById("procedure-output");
  container.innerHTML = "";

  let html = "";

  /* ---------------- DATOS ---------------- */

  html += `<h3>Datos</h3>`;
  html += `<table class="matrix-table">`;

  html += `<tr>`;
  data.data.headers.forEach((h) => {
    html += `<th>${h}</th>`;
  });
  html += `</tr>`;

  data.data.rows.forEach((row) => {
    html += `<tr>`;
    row.forEach((val) => {
      html += `<td>${Number(val).toFixed(6)}</td>`;
    });
    html += `</tr>`;
  });

  html += `</table>`;

  /* ---------------- MODELO ---------------- */

  html += `<h3>${data.model.title}</h3>`;
  html += `<div class="math-box">${data.model.equation}</div>`;

  /* ---------------- DESARROLLO ---------------- */

  html += `<h3>${data.development.title}</h3>`;

  if (data.development.steps) {
    data.development.steps.forEach((step) => {
      html += `<div class="method-step">`;
      html += `<p>${step.expression}</p>`;
      html += `</div>`;
    });
  }

  if (data.development.tables) {
    data.development.tables.forEach((table) => {
      html += `<h4>${table.title}</h4>`;
      html += `<table class="matrix-table">`;

      html += `<tr>`;
      table.headers.forEach((h) => {
        html += `<th>${h}</th>`;
      });
      html += `</tr>`;

      table.rows.forEach((row) => {
        html += `<tr>`;
        row.forEach((v) => {
          html += `<td>${v}</td>`;
        });
        html += `</tr>`;
      });

      html += `</table>`;
    });
  }

  /* ---------------- FUNCIÓN RESULTANTE ---------------- */

  html += `<h3>${data.function.title}</h3>`;
  html += `<div class="solution-box">${data.function.expression}</div>`;

  /* ---------------- EVALUACIÓN ---------------- */

  if (data.evaluation) {
    html += `<h3>Evaluación</h3>`;
    html += `<p><strong>P(${data.evaluation.x}) = ${Number(data.evaluation.result).toFixed(6)}</strong></p>`;
  }

  container.innerHTML = html;
}

// Diseño de plotter para Integración, Será parecido al que tenemos de interpolación

function renderIntegration(data) {
  const container = document.getElementById("procedure-output");
  container.innerHTML = "";

  if (!data.success) {
    container.innerHTML = `<p style="color:red;">${data.message || "Ocurrió un error al calcular el método."}</p>`;
    return;
  }

  let html = "";

  /* ---------------- TÍTULO DEL MÉTODO ---------------- */
  html += `<h3>Método de ${formatIntegrationMethod(data.method)}</h3>`;

  /* ---------------- PARÁMETROS DE ENTRADA ---------------- */
  html += `<div class="solution-box">`;
  html += `<h3>Parámetros de entrada</h3>`;
  html += `<p><strong>Función:</strong> ${data.input.function}</p>`;
  html += `<p><strong>Límite inferior a:</strong> ${formatNumber(data.input.a)}</p>`;
  html += `<p><strong>Límite superior b:</strong> ${formatNumber(data.input.b)}</p>`;

  if (data.input.n !== undefined && data.input.n !== null) {
    html += `<p><strong>Número de subintervalos n:</strong> ${data.input.n}</p>`;
  }

  if (
    data.input.extra &&
    data.input.extra.gauss_points !== undefined &&
    data.input.extra.gauss_points !== null
  ) {
    html += `<p><strong>Puntos de Gauss:</strong> ${data.input.extra.gauss_points}</p>`;
  }

  html += `</div>`;

  /* ---------------- RESULTADO ---------------- */
  html += `<div class="solution-box">`;
  html += `<h3>Resultado</h3>`;
  html += `<p><strong>Integral aproximada:</strong> ${formatNumber(data.result.integral)}</p>`;

  if (
    data.result.exact_value !== null &&
    data.result.exact_value !== undefined
  ) {
    html += `<p><strong>Valor exacto:</strong> ${formatNumber(data.result.exact_value)}</p>`;
  }

  if (
    data.result.absolute_error !== null &&
    data.result.absolute_error !== undefined
  ) {
    html += `<p><strong>Error absoluto:</strong> ${formatScientific(data.result.absolute_error)}</p>`;
  }

  if (
    data.result.relative_error !== null &&
    data.result.relative_error !== undefined
  ) {
    html += `<p><strong>Error relativo:</strong> ${formatScientific(data.result.relative_error)}</p>`;
  }

  html += `<p><strong>Mensaje:</strong> ${data.message}</p>`;
  html += `</div>`;

  /* ---------------- FÓRMULA ---------------- */
  if (data.procedure && data.procedure.formula) {
    html += `<h3>Fórmula aplicada</h3>`;
    html += `<div class="math-box">${data.procedure.formula}</div>`;
  }

  /* ---------------- PROCEDIMIENTO ---------------- */
  if (
    data.procedure &&
    data.procedure.steps &&
    data.procedure.steps.length > 0
  ) {
    html += `<h3>Procedimiento</h3>`;

    data.procedure.steps.forEach((step, index) => {
      html += `<div class="method-step">`;
      html += `<p><strong>Paso ${index + 1}:</strong> ${step}</p>`;
      html += `</div>`;
    });
  }

  /* ---------------- TABLA DE EVALUACIÓN ---------------- */
  if (
    data.procedure &&
    data.procedure.headers &&
    data.procedure.rows &&
    data.procedure.rows.length > 0
  ) {
    html += `<h3>${data.procedure.table_title || "Tabla de evaluación"}</h3>`;
    html += `<table class="matrix-table">`;

    html += `<tr>`;
    data.procedure.headers.forEach((header) => {
      html += `<th>${header}</th>`;
    });
    html += `</tr>`;

    data.procedure.rows.forEach((row) => {
      html += `<tr>`;
      row.forEach((value, colIndex) => {
        if (typeof value === "number") {
          if (colIndex === 0 && Number.isInteger(value)) {
            html += `<td>${value}</td>`;
          } else {
            html += `<td>${formatNumber(value)}</td>`;
          }
        } else {
          html += `<td>${value}</td>`;
        }
      });
      html += `</tr>`;
    });

    html += `</table>`;
  }

  /* ---------------- RESUMEN ---------------- */
  if (data.procedure && data.procedure.summary) {
    html += `<div class="solution-box">`;
    html += `<h3>Resumen del cálculo</h3>`;

    Object.entries(data.procedure.summary).forEach(([key, value]) => {
      html += `<p><strong>${formatSummaryKey(key)}:</strong> ${
        typeof value === "number" ? formatNumber(value) : value
      }</p>`;
    });

    html += `</div>`;
  }

  /* ---------------- INTERPRETACIÓN ---------------- */
  html += `<div class="solution-box">`;
  html += `<h3>Interpretación</h3>`;
  html += `<p>${getIntegrationInterpretation(data.method)}</p>`;
  html += `</div>`;

  container.innerHTML = html;
}

// funciones aux para integración

function formatNumber(value) {
  const num = Number(value);

  if (!isFinite(num)) return value;

  if (Math.abs(num) >= 100000 || (Math.abs(num) > 0 && Math.abs(num) < 0.0001)) {
    return num.toExponential(6);
  }

  return num.toFixed(6);
}

function formatScientific(value) {
  const num = Number(value);
  if (!isFinite(num)) return value;
  return num.toExponential(6);
}

function formatIntegrationMethod(method) {
  const methods = {
    trapecio: "Trapecio",
    simpson_13: "Simpson 1/3",
    simpson_38: "Simpson 3/8",
    cuadratura_gauss: "Cuadratura de Gauss"
  };

  return methods[method] || method;
}

function formatSummaryKey(key) {
  const labels = {
    h: "Tamaño de paso h",
    weighted_sum: "Suma ponderada",
    evaluations: "Evaluaciones de la función",
    transformation: "Transformación",
    interval_length: "Longitud del intervalo"
  };

  return labels[key] || key;
}

function getIntegrationInterpretation(method) {
  const interpretations = {
    trapecio:
      "La integral se aproxima como la suma de áreas trapezoidales construidas entre nodos consecutivos del intervalo.",
    simpson_13:
      "La integral se aproxima mediante parábolas ajustadas en bloques de tres nodos, lo que suele mejorar la precisión respecto al trapecio.",
    simpson_38:
      "La aproximación se realiza por bloques de cuatro nodos, asignando pesos específicos para mejorar el ajuste del área bajo la curva.",
    cuadratura_gauss:
      "La integral se aproxima evaluando la función en puntos estratégicos del intervalo con pesos óptimos, sin necesidad de una partición uniforme."
  };

  return interpretations[method] || "Se obtuvo una aproximación numérica del área bajo la curva.";
}

// Render para mostrar pasos para métodos de EDO

/* =========================================================
   UTILIDADES GENERALES PARA TABLA DINÁMICA
========================================================= */

function formatDynamicValue(value) {
  if (value === null || value === undefined) return "";

  if (typeof value === "number") {
    if (!isFinite(value)) return String(value);

    if (value === 0) return "0.000000";

    if (Math.abs(value) < 1e-6 || Math.abs(value) >= 1e6) {
      return value.toExponential(6);
    }

    return value.toFixed(6);
  }

  if (Array.isArray(value)) {
    return `[ ${value
      .map((v) =>
        typeof v === "number"
          ? (isFinite(v) ? v.toFixed(6) : String(v))
          : String(v)
      )
      .join(", ")} ]`;
  }

  if (typeof value === "boolean") {
    return value ? "Sí" : "No";
  }

  return String(value);
}

function formatColumnName(column) {
  const labels = {
    iteration: "Iteración",
    iter: "Iteración",
    x: "x",
    y: "y",
    fx: "f(x)",
    error: "Error",
    predictor: "Predictor",
    corrector: "Corrector",
    k1: "k1",
    k2: "k2",
    k3: "k3",
    k4: "k4"
  };

  return labels[column] || column;
}

function renderDynamicTable(dataArray, title = "Tabla de resultados") {
  if (!dataArray || dataArray.length === 0) {
    return `
      <div class="solution-box">
        <h3>${title}</h3>
        <p>No hay datos para mostrar.</p>
      </div>
    `;
  }

  const columns = Object.keys(dataArray[0]);

  let html = `
    <div class="solution-box">
      <h3>${title}</h3>
      <table class="matrix-table">
        <thead>
          <tr>
  `;

  columns.forEach((col) => {
    html += `<th>${formatColumnName(col)}</th>`;
  });

  html += `
          </tr>
        </thead>
        <tbody>
  `;

  dataArray.forEach((row) => {
    html += `<tr>`;
    columns.forEach((col) => {
      html += `<td>${formatDynamicValue(row[col])}</td>`;
    });
    html += `</tr>`;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  return html;
}

/* =========================================================
   RENDER GENERAL PARA EDO
========================================================= */

function renderEDO(data) {
  const container = document.getElementById("procedure-output");
  container.innerHTML = "";

  if (!data || data.success === false) {
    container.innerHTML = `<p style="color:red;">${data?.message || "No se pudo resolver el método."}</p>`;
    return;
  }

  let html = "";

  html += renderEDOSummary(data);
  html += renderDynamicTable(data.iterations, "Tabla de iteraciones");
  html += renderEDOFinalResult(data);

  if (data.message) {
    html += `
      <div class="solution-box">
        <h3>Mensaje</h3>
        <p>${data.message}</p>
      </div>
    `;
  }

  container.innerHTML = html;
}

/* =========================================================
   BLOQUES AUXILIARES DE EDO
========================================================= */

function renderEDOSummary(data) {
  const input = data.input || {};
  const summary = data.summary || {};

  return `
    <div class="solution-box">
      <h3>Resumen del método</h3>
      <p><strong>Método:</strong> ${data.method || "N/A"}</p>
      <p><strong>Ecuación diferencial:</strong> y' = ${input.function ?? "N/A"}</p>
      <p><strong>x₀:</strong> ${formatDynamicValue(input.x0)}</p>
      <p><strong>y₀:</strong> ${formatDynamicValue(input.y0)}</p>
      <p><strong>x<sub>f</sub>:</strong> ${formatDynamicValue(input.xf)}</p>
      <p><strong>h:</strong> ${formatDynamicValue(input.h)}</p>
      <p><strong>Número de pasos:</strong> ${summary.steps ?? "N/A"}</p>
    </div>
  `;
}

function renderEDOFinalResult(data) {
  const summary = data.summary || {};

  return `
    <div class="solution-box">
      <h3>Resultado final</h3>
      <p><strong>x final:</strong> ${formatDynamicValue(summary.final_x)}</p>
      <p><strong>y(x<sub>f</sub>) aproximada:</strong> ${formatDynamicValue(summary.final_y)}</p>
      <p><strong>Último paso ajustado:</strong> ${formatDynamicValue(summary.adjusted_last_step)}</p>
    </div>
  `;
}