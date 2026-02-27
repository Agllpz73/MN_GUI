// Función que se ejecuta cuando el usuario presiona "Calcular" para método de Newton-Raphson
async function solveNewton(event) {

    console.log("Newton ejecutado");
    event.preventDefault(); // evita recargar la página
    const form = document.getElementById("method-form");
    const formData = new FormData(form);


    const payload = {
        function: formData.get("fx"),
        x0: parseFloat(formData.get("x0")),
        tol: parseFloat(formData.get("tol")),
        max_iter: parseInt(formData.get("max_iter"))
    };

    try {

        const response = await fetch("/api/solve/newton", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        console .log("Respuesta recibida del servidor:", response.status);
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