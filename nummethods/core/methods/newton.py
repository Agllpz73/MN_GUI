from ..utils.parser import build_function_and_derivative


def solve_newton(function_str, a, b, tol=1e-6, max_iter=100):

    try:
        f, df = build_function_and_derivative(function_str)
    except Exception as e:
        return error_response("Error al procesar la función.", str(e))

    # Validación 1: intervalo válido
    if a >= b:
        return error_response(
            "Intervalo inválido.",
            "El límite inferior debe ser menor que el superior."
        )

    # Validación 2: evaluar extremos
    try:
        fa = f(a)
        fb = f(b)
    except Exception:
        return error_response(
            "Error en evaluación.",
            "La función no está definida en el intervalo."
        )

    # Validación 3 (opcional pero académico):
    intervalo_garantiza_raiz = (fa * fb < 0)

    # Valor inicial
    current_x = float(a)

    # Validación 4: derivada no cero en punto inicial
    try:
        if df(current_x) == 0:
            return error_response(
                "Derivada nula.",
                "La derivada es cero en el punto inicial. La convergencia no está garantizada."
            )
    except Exception:
        return error_response(
            "Error derivada.",
            "No se pudo evaluar la derivada."
        )

    iterations = []

    for i in range(1, max_iter + 1):

        fx = f(current_x)
        dfx = df(current_x)

        if dfx == 0:
            return error_response(
                "Derivada cero durante iteración.",
                "El método se detuvo."
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
            root = next_x
            return {
                "method": "newton",
                "root": root,
                "iterations": iterations,
                "converged": True,
                "interval_valid": a <= root <= b,
                "sign_change_condition": intervalo_garantiza_raiz,
                "interval": [a, b],
                "message": "Convergencia alcanzada."
            }

        current_x = next_x

    return {
        "method": "newton",
        "root": current_x,
        "iterations": iterations,
        "converged": False,
        "interval_valid": a <= current_x <= b,
        "sign_change_condition": intervalo_garantiza_raiz,
        "interval": [a, b],
        "message": "Máximo de iteraciones alcanzado."
    }


def error_response(title, detail):
    return {
        "method": "newton",
        "root": None,
        "iterations": [],
        "converged": False,
        "interval_valid": False,
        "message": f"{title} {detail}"
    }