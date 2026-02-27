from ..utils.parser import build_function_and_derivative


def solve_newton(function_str, x0, tol, max_iter):

    try:
        f, df = build_function_and_derivative(function_str)
    except Exception as e:
        return error_response("Error al procesar la función.", str(e))

    current_x = float(x0)
    iterations = []

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
            "f(x)": fx,
            "error": error
        })

        if error < tol:
            return {
                "method": "newton",
                "root": next_x,
                "iterations": iterations,
                "converged": True,
                "message": "Convergencia alcanzada."
            }

        current_x = next_x

    return {
        "method": "newton",
        "root": current_x,
        "iterations": iterations,
        "converged": False,
        "message": "Máximo de iteraciones alcanzado."
    }


def error_response(title, detail):
    return {
        "method": "newton",
        "root": None,
        "iterations": [],
        "converged": False,
        "message": f"{title} {detail}"
    }