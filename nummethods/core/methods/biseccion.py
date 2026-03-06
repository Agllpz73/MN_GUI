from ..utils.parser import build_function_and_derivative

def solve_biseccion(function_str, a, b, tol, max_iter):

    try:
        f, _ = build_function_and_derivative(function_str)
    except Exception as e:
        return error_response("Error al procesar la función.", str(e))

    try:
        a = float(a)
        b = float(b)
    except ValueError:
        return error_response("Intervalo inválido.", "Los valores deben ser numéricos.")

    try:
        fa = f(a)
        fb = f(b)
    except Exception:
        return error_response(
            "Error de evaluación.",
            "La función no está definida en los extremos del intervalo."
        )

    if fa * fb > 0:
        return error_response(
            "Intervalo inválido.",
            "f(a) y f(b) deben tener signos opuestos."
        )

    iterations = []
    converged = False

    for i in range(1, max_iter + 1):

        c = (a + b) / 2
        fc = f(c)
        error = abs(b - a) / 2

        iterations.append({
            "iteration": i,
            "a": a,
            "b": b,
            "c": c,
            "x": c,
            "fx": fc,
            "error": error
        })

        if abs(fc) < tol or error < tol:
            converged = True
            break

        if fa * fc < 0:
            b = c
            fb = fc
        else:
            a = c
            fa = fc

    x_values_iter = [step["c"] for step in iterations]

    if x_values_iter:
        start = min(x_values_iter) - 1
        end = max(x_values_iter) + 1
    else:
        start = a - 5
        end = b + 5

    num_points = 300
    step_size = (end - start) / num_points

    x_plot = []
    y_plot = []

    current = start
    for _ in range(num_points):
        try:
            x_plot.append(current)
            y_plot.append(f(current))
        except Exception:
            x_plot.append(current)
            y_plot.append(None)
        current += step_size

    return {
        "method": "biseccion",
        "root": c,
        "iterations": iterations,
        "converged": converged,
        "message": "Convergencia alcanzada." if converged else "Máximo de iteraciones alcanzado.",
        "plot_data": {
            "x": x_plot,
            "y": y_plot
        },
        "function_str": function_str.replace("**", "^"),
        "dimension" : 1
    }


def error_response(title, detail):
    return {
        "method": "biseccion",
        "root": None,
        "iterations": [],
        "converged": False,
        "message": f"{title} {detail}",
        "dimension" : 1
    }
