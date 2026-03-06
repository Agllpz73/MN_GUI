// Función que se ejecuta cuando el usuario presiona "Calcular" para método de Newton-Raphson
async function solveNewton(event) {
  event.preventDefault(); // evita recargar la página
  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  const payload = {
    function: formData.get("fx"),
    x0: parseFloat(formData.get("x0")),
    tol: parseFloat(formData.get("tol")),
    max_iter: parseInt(formData.get("max_iter")),
  };

  try {
    const response = await fetch("/api/solve/newton", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("Respuesta recibida del servidor:", response.status);
    const text = await response.text();
    console.log("Texto de respuesta:", text);

    const data = JSON.parse(text);
    console.log("Datos parseados:", data);

    renderProcedure(data); // Mostrar tabla
    window.drawNewtonGraph(data); // Mostrar gráfico
  } catch (error) {
    console.error("Error:", error);
    alert("Ocurrió un error al ejecutar el método.");
  }
}

// Agregamos solve_biseccion

async function solveBiseccion(event) {
  event.preventDefault();
  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  const payload = {
    function: formData.get("fx"),
    a: parseFloat(formData.get("a")),
    b: parseFloat(formData.get("b")),
    tol: parseFloat(formData.get("tol")),
    max_iter: parseInt(formData.get("max_iter")),
  };

  try {
    const response = await fetch("/api/solve/biseccion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    renderProcedure(data);
    window.drawNewtonGraph(data);
  } catch (error) {
    console.error(error);
    alert("Error de conexión con el servidor.");
  }
}

// Método de la secatne

async function solveSecante(event) {
  event.preventDefault();
  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  const functionStr = formData.get("fx");
  const x0 = parseFloat(formData.get("x0"));
  const x1 = parseFloat(formData.get("x1"));
  const tol = parseFloat(formData.get("tol"));
  const maxIter = parseInt(formData.get("max_iter"));

  const payload = {
    function: functionStr,
    x0: x0,
    x1: x1,
    tol: tol,
    max_iter: maxIter,
  };

  try {
    const response = await fetch("/api/solve/secante", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    renderProcedure(data);
    window.drawNewtonGraph(data);
  } catch (error) {
    console.error(error);
    alert("Error de conexión con el servidor.");
  }
}

async function solveFalsaPosicion(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  const payload = {
    function: formData.get("fx"),
    a: parseFloat(formData.get("a")),
    b: parseFloat(formData.get("b")),
    tol: parseFloat(formData.get("tol")),
    max_iter: parseInt(formData.get("max_iter")),
  };

  try {
    const response = await fetch("/api/solve/falsa-posicion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    renderProcedure(data);
    window.drawNewtonGraph(data);
  } catch (error) {
    console.error("Error en solveFalsaPosicion:", error);
    alert("Error al ejecutar el método de falsa posición.");
  }
}

async function solvePuntoFijo(event) {
  event.preventDefault();
  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  const payload = {
    function: formData.get("fx"),
    x0: parseFloat(formData.get("x0")),
    tol: parseFloat(formData.get("tol")),
    max_iter: parseInt(formData.get("max_iter")),
  };

  try {
    const response = await fetch("/api/solve/punto-fijo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    renderProcedure(data);
    window.drawNewtonGraph(data);
  } catch (error) {
    console.error("Error en solvePuntoFijo:", error);
    alert("Error al ejecutar el método de punto fijo.");
  }
}

async function solveNewtonSistema(event) {
  event.preventDefault(); // 🔥 MUY IMPORTANTE

  const formData = new FormData(event.target);

  const payload = {
    functions: formData.getAll("functions"),
    x0: formData.getAll("x0").map((v) => parseFloat(v)),
    tol: parseFloat(formData.get("tol")),
    max_iter: parseInt(formData.get("max_iter")),
  };

  console.log("Payload enviado:", payload);

  try {
    const response = await fetch("/api/solve/newton-raphson-sistema", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("Respuesta cruda:", text);
    const data = JSON.parse(text);

    if (data.error) {
      alert(data.error);
      return;
    }

    renderProcedureSystem(data);
    window.drawNewtonGraph(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Error al ejecutar Newton Sistema.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("method-form");

  console.log("Formulario encontrado:", form);

  if (form) {
    form.addEventListener("submit", function (event) {
      console.log("Submit capturado");
      solveNewtonSistema(event);
    });
  }
});
