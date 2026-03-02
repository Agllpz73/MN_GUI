from nummethods.core.methods.biseccion import error_response

from ..utils.parser import build_function_and_derivative

def solve_secante(function_str, x0, x1, tol, max_iter):

    try:
        f, _ = build_function_and_derivative(function_str)
    except Exception as e:
        return error_response("Error al procesar la función.", str(e))

    x_prev = float(x0)
    x_curr = float(x1)
    iterations = []

    for i in range(1, max_iter + 1):

        try:
            f_prev = f(x_prev)
            f_curr = f(x_curr)
        except Exception:
            return error_response(
                "Error de evaluación.",
                "La función no está definida en el punto actual."
            )

        denominator = f_curr - f_prev

        if denominator == 0:
            return error_response(
                "División por cero.",
                "El denominador se volvió cero."
            )

        x_next = x_curr - f_curr * (x_curr - x_prev) / denominator
        error = abs(x_next - x_curr)
        
        try:
            f_next = f(x_next)
        except Exception:
            return error_response(
                "Error de evaluación.",
                "La función no está definida en el punto siguiente."
            )

        iterations.append({
            "iteration": i,
            "x": x_next,
            "fx": f_next,
            "error": error
        })

        if error < tol:
            return {
                "method": "secante",
                "root": x_next,
                "iterations": iterations,
                "converged": True,
                "message": "Convergencia alcanzada.",
                "function_str": function_str.replace("**", "^")
            }

        x_prev = x_curr
        x_curr = x_next

    return {
        "method": "secante",
        "root": x_curr,
        "iterations": iterations,
        "converged": False,
        "message": "Máximo de iteraciones alcanzado.",
        "function_str": function_str.replace("**", "^")
    }    