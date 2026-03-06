from ..utils.parser import build_function_and_derivative


def solve_newton(function_str, x0, tol, max_iter):

    try:
        f, df = build_function_and_derivative(function_str)
    except Exception as e:
        return error_response("Error al procesar la función.", str(e))

    current_x = float(x0)
    iterations = []
    converged = False

    for i in range(1, max_iter + 1):

        try:
            fx = f(current_x)
            dfx = df(current_x)
        except Exception:
            return error_response(
                "Error de evaluación.",
                "La función o su derivada no están definidas en el punto actual."
            )

        if dfx == 0:
            return error_response(
                "Derivada nula.",
                "La derivada es cero. El método no puede continuar."
            )

        next_x = current_x - fx / dfx
        error = abs(next_x - current_x)

        iterations.append({
            "iteration": i,
            "x": next_x,
            "fx": fx,
            "error": error
        })

        if error < tol:
            converged = True
            current_x = next_x
            break

        current_x = next_x

    if len(iterations) > 0:
        x_values_iter = [step["x"] for step in iterations]
        start = min(x_values_iter) - 1
        end = max(x_values_iter) + 1
    else:
        start = current_x - 5
        end = current_x + 5

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
        "method": "newton",
        "root": current_x,
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
        "method": "newton",
        "root": None,
        "iterations": [],
        "converged": False,
        "message": f"{title} {detail}",
        "dimension" : 1
    }