function renderProcedure(data) {
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

// Diseño de un plotter para Sistema de Ecuaciones Lineales (al menos para Gauss y Gauss - Jordan)

/*
function renderProcedureGauss(data) {

    const container = document.getElementById("procedure-output");
    container.innerHTML = "";

    if (data.status === "error") {
        container.innerHTML = `<p style="color:red;">${data.message}</p>`;
        return;
    }

    const iterations = data.iterations;
    const solution = data.solution;

    // ---------- PROCEDIMIENTO ----------
    let html = `<h3>Procedimiento (Eliminación de Gauss)</h3>`;

    iterations.forEach((matrix, step) => {

        html += `<h4>Iteración ${step + 1}</h4>`;

        html += `<table class="matrix-table">`;

        matrix.forEach(row => {

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
    });

    // ---------- SOLUCIÓN ----------
    html += `<h3>Solución</h3>`;
    html += `<div class="solution-box">`;

    const variables = ["x", "y", "z"];

    solution.forEach((value, i) => {
        html += `<p>${variables[i]} = <strong>${value.toFixed(6)}</strong></p>`;
    });

    html += `</div>`;

    container.innerHTML = html;
}

*/
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
function renderSystem(A,b){

    const vars = ["x","y","z","w","v","u"];

    let html = `<div class="system-equations">`;

    for(let i=0;i<A.length;i++){

        let eq = "";

        for(let j=0;j<A[i].length;j++){

            let coef = A[i][j];

            if(j>0 && coef>=0) eq += "+ ";

            eq += `${coef}${vars[j]} `;
        }

        eq += `= ${b[i]}`;

        html += `<div class="equation-line">${eq}</div>`;
    }

    html += `</div>`;

    return html;
}
function renderSolution(x){

    const vars = ["x","y","z","w","v","u"];

    let html = `<div class="solution-vector">`;

    for(let i=0;i<x.length;i++){

        html += `<div class="solution-item">
                    ${vars[i]} = ${Number(x[i]).toFixed(6)}
                 </div>`;
    }

    html += `</div>`;

    return html;
}

function renderMatrix(matrix){

    let html = `<div class="matrix-wrapper">`;
    html += `<table class="matrix-table">`;

    for(let i = 0; i < matrix.length; i++){

        html += `<tr>`;

        for(let j = 0; j < matrix[i].length; j++){

            let value = Number(matrix[i][j]).toFixed(6);

            html += `<td>${value}</td>`;
        }

        html += `</tr>`;
    }

    html += `</table>`;
    html += `</div>`;

    return html;
}

function renderVector(vector){

    let html = `<div class="matrix-wrapper">`;
    html += `<table class="matrix-table">`;

    for(let i = 0; i < vector.length; i++){

        let value = Number(vector[i]).toFixed(6);

        html += `<tr><td>${value}</td></tr>`;
    }

    html += `</table>`;
    html += `</div>`;

    return html;
}

function renderFactorization(data){

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
        backward_equation
    } = data;

    let html = "";

    html += `<div class="solution-box">`;
    html += `<h3>Método de ${method}</h3>`;


    /* PASO 1 */
    html += `<div class="step-box">`;
    html += `<h4>Paso 1: Sistema original</h4>`;
    html += renderSystem(A,b);
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

