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
                <td>${Number(step["f(x)"]).toFixed(6)}</td>
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

/*

// agregamos el espacio para el gráfico
function renderGraph(data) {
    const graphContainer = document.getElementById("graph-container");
    graphContainer.innerHTML = "<canvas id='function-chart'></canvas>"; // Limpiar contenido previo

    const ctx = document.getElementById("function-chart").getContext("2d");

    const functionPoints = data.plot_data.x.map((x, i) => ({ x: x, y: data.plot_data.y[i] }));

    const iterationPoints = data.iterations.map(step => ({ x: step.x, y: step["f(x)"] }));

    new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: "f(x)",
                    data: functionPoints,
                    borderColor: "blue",
                    borderWidth: 2,
                    tension: 0.2,
                    fill: false
                },
                {
                    label: "Iteraciones",
                    data: iterationPoints,
                    borderColor: "red",
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                    pointStyle: 'circle',
                    pointRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                },
                y: {
                    beginAtZero: false
                }
            },          
                }
    });
}
*/
