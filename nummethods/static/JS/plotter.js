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

    if(operation){
      html += `<div class="row-operation">${operation}</div>`;
    }

    html += `<table class="matrix-table">`;

    matrix.forEach(row => {

      html += `<tr>`;

      row.forEach((value, colIndex) => {

        if(colIndex === row.length - 1){
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

  const vars = ["x","y","z"];

  data.solution.forEach((value,i)=>{
    html += `<p>${vars[i]} = <strong>${value.toFixed(6)}</strong></p>`;
  });

  html += `</div>`;

  container.innerHTML = html;

  openGaussModal();
}