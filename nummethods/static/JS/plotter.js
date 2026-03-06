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
          <th>Vector X</th>
          <th>Error</th>
        </tr>
      </thead>
      <tbody>
  `;

  data.iterations.forEach((step) => {
    table += `
      <tr>
        <td>${step.iteration}</td>
        <td>[ ${step.x.map(v => v.toFixed(6)).join(", ")} ]</td>
        <td>${Number(step.error).toExponential(3)}</td>
      </tr>
    `;
  });

  table += `
      </tbody>
    </table>
    <br>
    <p><strong>Raíz aproximada:</strong> [ ${data.root.map(v => v.toFixed(6)).join(", ")} ]</p>
    <p><strong>Convergió:</strong> ${data.converged}</p>
    
  `;

  container.innerHTML = table;
}