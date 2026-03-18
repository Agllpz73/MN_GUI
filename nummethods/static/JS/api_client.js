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

    console.log("Status secante:", response.status);

    const text = await response.text();
    console.log("Texto crudo secante:", text);

    const data = JSON.parse(text);
    console.log("JSON secante:", data);
    console.log("Iteraciones:", data.iterations);
    console.log("Function string:", data.function_str);
    console.log("Dimension:", data.dimension);
    console.log("Plot data:", data.plot_data);
    console.log("Nuevo elementos:", data.debug_secante);


    window.secanteData = data;

    if (data.error) {
      alert(data.error);
      return;
    }

    renderProcedure(data);

    console.log("Antes de drawNewtonGraph");
    window.drawNewtonGraph(data);
    console.log("Después de drawNewtonGraph");

  } catch (error) {
    console.error("Error en secante:", error);
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
  event.preventDefault();

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

// Inicia métodos para Sistemas de Ec. no lienales
async function solvePuntoFijoSystem(event) {
  event.preventDefault();

  const fromData = new FormData(event.target);

  const payload = {
    functions: fromData.getAll("functions"),
    variables: fromData.getAll("variables"),
    x0: fromData.getAll("x0").map((v) => parseFloat(v)),
    tol: parseFloat(fromData.get("tol")),
    max_iter: parseInt(fromData.get("max_iter")),
  };

  console.log("Payload enviado:", payload); // validación para el correcto funcionamiento para la fase de pruebas

  try {
    const response = await fetch("/api/solve/punto-fijo-sistema", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("Respuesta cruda: ", text);

    const data = JSON.parse(text);

    if (data.error) {
      alert(data.error);
      return;
    }

    renderProcedureSystem(data);
    window.drawNewtonGraph(data);
  } catch (error) {
    console.error("Error", error);
    alert("Error al ejecutar Punto Fijo Sistema de Ecuaciones no Lineales.");
  }
}

// Inicia método para Sistemas de Ec. Lineales

async function solveGauss(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/gauss", {
      method: "POST",
      //headers: { "Content-Type": "application/json" },
      body: formData,
    });

    /* const text = await response.text();

    console.log("Respuesta cruda: ", text);

    const data = JSON.parse(text);*/

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor: ", errorText);
      alert("Error del servidor.");
      return;
    }

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }
    renderProcedureGauss(data);
  } catch (error) {
    console.error("Error: ", error);
    alert("Error al ejecutar el método de Eliminación de Gauss");
  }
}

// Gaus Jordan

async function solveGaussJordan(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/gauss-jordan", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor: ", errorText);

      alert("Error del servidor");
      return;
    }

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    renderProcedureGaussJordan(data);
  } catch (error) {
    console.error("Error: ", error);
    alert("Error al ejecutar Gauss-Jordan.");
  }
}

//Matriz inversa

async function solveMatrizInversa(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/matriz-inversa", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor: ", errorText);

      alert("Error del servidor");
      return;
    }

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    renderProcedureMatrizInversa(data);
  } catch (error) {
    console.error("Error: ", error);
    alert("Error al ejecutar Matriz Inversa.");
  }
}

// Factorización LU
async function solveFactorizacionLU(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/lu", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor: ", errorText);

      alert("Error del servidor");
      return;
    }

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    const container = document.getElementById("gauss-procedure-container");

    container.innerHTML = renderFactorization(data);

    openGaussModal();
  } catch (error) {
    4;
    console.error("Error: ", error);
    alert("Error al ejecutar factorización LU.");
  }
}

async function solveFactorizacionCholesky(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/cholesky", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor: ", errorText);

      alert("Error del servidor");
      return;
    }

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    const container = document.getElementById("gauss-procedure-container");

    container.innerHTML = renderFactorization(data);

    openGaussModal();
  } catch (error) {
    console.error("Error: ", error);
    alert("Error al ejecutar factorización Cholesky.");
  }
}

// Categoría Iterativas

async function solveGaussSeidel(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/gauss-seidel", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    renderProcedureSystem(data);
    window.drawNewtonGraph(data);
  } catch (error) {
    console.error(error);
    alert("Error al ejecutar Gauss-Seidel");
  }
}

async function solveJacobi(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/jacobi", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    renderProcedureSystem(data);
    window.drawNewtonGraph(data);
  } catch (error) {
    console.error(error);
    alert("Error al ejecutar Jacobi.");
  }
}
/*
  Categoríuas para Interpolación
*/

//Lagrange
async function solveLagrange(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/lagrange", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    renderInterpolation(data);

    window.drawNewtonGraph(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Error al ejecutar Lagrange.");
  }
}

// Newton Diferencias Divididas
async function solveNewtonDD(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/newton-dd", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    renderInterpolation(data);

    window.drawNewtonGraph(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Error al ejecutar Newton Diferencias Divididas");
  }
}

// Newton Diferencias Finitas

async function solveNewtonDF(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/newton-df", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    renderInterpolation(data);

    window.drawNewtonGraph(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Error al ejecutar Newton Diferencias Finitas");
  }
}

// Minimos Cuadrados

async function solveMinimosCuadrados(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/minimos-cuadrados", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    renderInterpolation(data);

    window.drawNewtonGraph(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Error al ejecutar Minimos Cuadrados");
  }
}

//Minimos cuadrados con transformaciones

async function solveMinimosCuadradosTransformaciones(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/solve/mc-transf", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.error || data.status === "error") {
      alert(data.message || data.error);
      return;
    }

    renderInterpolation(data);

    window.drawNewtonGraph(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Error al ejecutar Minimos Cuadrados con Transformaciones");
  }
}

/*-----------------Categoría Integración -------------------*/

// Trapecio
async function solveTrapecio(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);
  const payload = {
    function: formData.get("fx"),
    a: parseFloat(formData.get("a")),
    b: parseFloat(formData.get("b")),
    n: parseFloat(formData.get("n")),
  };

  try {
    const response = await fetch("/api/solve/trapecio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", errorText);
      alert("Error del servidor.");
      return;
    }

    const data = await response.json();
    console.log("Datos Trapecio:", data);

    if (data.error || data.status === "error" || data.success === false) {
      alert(
        data.message || data.error || "Ocurrió un error al ejecutar Trapecio.",
      );
      return;
    }

    renderIntegration(data);

    if (window.drawNewtonGraph) {
      window.drawNewtonGraph(data);
    } else {
      console.error("La función drawIntegrationGraph no está definida.");
    }
  } catch (error) {
    console.error("Error en solveTrapecio:", error);
    alert("Error al ejecutar el método de Trapecio.");
  }
}
// Simpson 1/3
async function solveSimpson13(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);
  const payload = {
    function: formData.get("fx"),
    a: parseFloat(formData.get("a")),
    b: parseFloat(formData.get("b")),
    n: parseFloat(formData.get("n")),
  };

  try {
    const response = await fetch("/api/solve/simpson-1-3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", errorText);
      alert("Error del servidor.");
      return;
    }

    const data = await response.json();
    console.log("Datos Simpson 1/3:", data);

    if (data.error || data.status === "error" || data.success === false) {
      alert(
        data.message || data.error || "Ocurrió un error al ejecutar Simpson 1/3.",
      );
      return;
    }

    renderIntegration(data);

    if (window.drawNewtonGraph) {
      window.drawNewtonGraph(data);
    } else {
      console.error("La función drawIntegrationGraph no está definida.");
    }
  } catch (error) {
    console.error("Error en solveSimpson13:", error);
    alert("Error al ejecutar el método de Simpson 1/3.");
  }
}

// Simpson 3/8
async function solveSimpson38(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);
  const payload = {
    function: formData.get("fx"),
    a: parseFloat(formData.get("a")),
    b: parseFloat(formData.get("b")),
    n: parseFloat(formData.get("n")),
  };

  try {
    const response = await fetch("/api/solve/simpson-3-8", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", errorText);
      alert("Error del servidor.");
      return;
    }

    const data = await response.json();
    console.log("Datos Simpson 3/8:", data);

    if (data.error || data.status === "error" || data.success === false) {
      alert(
        data.message || data.error || "Ocurrió un error al ejecutar Simpson 3/8.",
      );
      return;
    }

    renderIntegration(data);

    if (window.drawNewtonGraph) {
      window.drawNewtonGraph(data);
    } else {
      console.error("La función drawIntegrationGraph no está definida.");
    }
  } catch (error) {
    console.error("Error en solveSimpson38:", error);
    alert("Error al ejecutar el método de Simpson 3/8.");
  }
}
// Cuadratura de Gauss 
async function solveCuadraturaGauss(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);
  const payload = {
    function: formData.get("fx"),
    a: parseFloat(formData.get("a")),
    b: parseFloat(formData.get("b")),
    n: parseFloat(formData.get("n")),
  };

  try {
    const response = await fetch("/api/solve/cuadratura-gauss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", errorText);
      alert("Error del servidor.");
      return;
    }

    const data = await response.json();
    console.log("Datos Cuadratura de Gauss:", data);

    if (data.error || data.status === "error" || data.success === false) {
      alert(
        data.message || data.error || "Ocurrió un error al ejecutar Cuadratura de Gauss.",
      );
      return;
    }

    renderIntegration(data);

    if (window.drawNewtonGraph) {
      window.drawNewtonGraph(data);
    } else {
      console.error("La función drawIntegrationGraph no está definida.");
    }
  } catch (error) {
    console.error("Error en solveCuadraturaGauss:", error);
    alert("Error al ejecutar el método de Cuadratura de Gauss.");
  }
}
// Categoría EDO

// Euler
async function solveEuler(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);
  const payload = {
    function: formData.get("fxy"),
    x0: parseFloat(formData.get("x0")),
    y0: parseFloat(formData.get("y0")),
    xf: parseFloat(formData.get("xf")),
    h: parseFloat(formData.get("h")),
  };

  try {
    const response = await fetch("/api/solve/euler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", errorText);
      alert("Error del servidor.");
      return;
    }

    const data = await response.json();
    console.log("Datos Euler:", data);

    if (data.error || data.status === "error" || data.success === false) {
      alert(
        data.message || data.error || "Ocurrió un error al ejecutar Euler.",
      );
      return;
    }

    renderEDO(data);

     if (window.drawNewtonGraph) {
      window.drawNewtonGraph({
        category: "edo",
        method: data.method,
        points: data.plot_data?.points || [],
        iterations: data.iterations || []
      });
    } else {
      console.error("La función drawIntegrationGraph no está definida.");
    }
  } catch (error) {
    console.error("Error en solveEuler:", error);
    alert("Error al ejecutar el método de Euler.");
  }
}

// Euler mejorado

async function solveEulerMejorado(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);
  const payload = {
    function: formData.get("fxy"),
    x0: parseFloat(formData.get("x0")),
    y0: parseFloat(formData.get("y0")),
    xf: parseFloat(formData.get("xf")),
    h: parseFloat(formData.get("h")),
  };

  try {
    const response = await fetch("/api/solve/euler-mejorado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", errorText);
      alert("Error del servidor.");
      return;
    }

    const data = await response.json();
    console.log("Datos Euler Mejorado:", data);

    if (data.error || data.status === "error" || data.success === false) {
      alert(
        data.message || data.error || "Ocurrió un error al ejecutar Euler Mejorado.",
      );
      return;
    }

    renderEDO(data);

     if (window.drawNewtonGraph) {
      window.drawNewtonGraph({
        category: "edo",
        method: data.method,
        points: data.plot_data?.points || [],
        iterations: data.iterations || []
      });
    } else {
      console.error("La función drawNewtonGraph no está definida.");
    }
  } catch (error) {
    console.error("Error en solveEulerMejorado:", error);
    alert("Error al ejecutar el método de Euler Mejorado.");
  }
}


// Runge - Kutta

async function solveRungeKutta(event) {
  event.preventDefault();

  const form = document.getElementById("method-form");
  const formData = new FormData(form);
  const payload = {
    function: formData.get("fxy"),
    x0: parseFloat(formData.get("x0")),
    y0: parseFloat(formData.get("y0")),
    xf: parseFloat(formData.get("xf")),
    h: parseFloat(formData.get("h")),
  };

  try {
    const response = await fetch("/api/solve/runge-kutta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error del servidor:", errorText);
      alert("Error del servidor.");
      return;
    }

    const data = await response.json();
    console.log("Datos Runge-Kutta:", data);

    if (data.error || data.status === "error" || data.success === false) {
      alert(
        data.message || data.error || "Ocurrió un error al ejecutar Runge-Kutta.",
      );
      return;
    }

    renderEDO(data);

     if (window.drawNewtonGraph) {
      window.drawNewtonGraph({
        category: "edo",
        method: data.method,
        points: data.plot_data?.points || [],
        iterations: data.iterations || []
      });
    } else {
      console.error("La función drawNewtonGraph no está definida.");
    }
  } catch (error) {
    console.error("Error en solveRungeKutta:", error);
    alert("Error al ejecutar el método de Runge-Kutta.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("method-form");

  if (!form) return;

  form.addEventListener("submit", function (event) {
    const formData = new FormData(form);
    const method = formData.get("method");

    if (method === "newton") {
      solveNewton(event);
    } else if (method === "biseccion") {
      solveBiseccion(event);
    } else if (method === "secante") {
      solveSecante(event);
    } else if (method === "falsa-posicion") {
      solveFalsaPosicion(event);
    } else if (method === "punto-fijo") {
      solvePuntoFijo(event);
    } else if (method === "newton-raphson-sistema") {
      solveNewtonSistema(event);
    } else if (method === "punto-fijo-sistema") {
      solvePuntoFijoSystem(event);
    } else if (method === "gauss") {
      solveGauss(event);
    } else if (method === "gauss-jordan") {
      solveGaussJordan(event);
    } else if (method === "matriz-inversa") {
      solveMatrizInversa(event);
    } else if (method === "lu") {
      solveFactorizacionLU(event);
    } else if (method === "cholesky") {
      solveFactorizacionCholesky(event);
    } else if (method === "gauss-seidel") {
      solveGaussSeidel(event);
    } else if (method === "jacobi") {
      solveJacobi(event);
    } else if (method === "lagrange") {
      solveLagrange(event);
    } else if (method === "newton-dd") {
      solveNewtonDD(event);
    } else if (method === "newton-df") {
      solveNewtonDF(event);
    } else if (method === "minimos-cuadrados") {
      solveMinimosCuadrados(event);
    } else if (method === "mc-transf") {
      solveMinimosCuadradosTransformaciones(event);
    } else if (method === "trapecio") {
      solveTrapecio(event);
    }else if (method === "simpson-1-3") {
      solveSimpson13(event);
    }else if (method === "simpson-3-8"){
      solveSimpson38(event);
    }else if (method === "cuadratura-gauss"){
      solveCuadraturaGauss(event);
    }else if (method === "euler") {
      solveEuler(event);
    }else if (method === "euler-mejorado") {
      solveEulerMejorado(event);
    }else if (method === "runge-kutta") {
      solveRungeKutta(event);
    }
  });
});
