import math

def solve_falsa_posicion(function_str, a, b, tol, max_iter):
    def f(x):
        return eval(function_str.replace("^", "**"))

    fa = f(a)
    fb = f(b)

    if fa * fb > 0:
        raise ValueError("El intervalo inicial no es válido.")

    iterations = []

    for i in range(1, max_iter + 1):
        xr = b - (fb * (b - a)) / (fb - fa)
        fxr = f(xr)

        error = abs(fxr)

        iterations.append({
            "iteration": i,
            "x": xr,
            "fx": fxr,
            "error": error
        })

        if error < tol:
            return {
                "converged": True,
                "root": xr,
                "iterations": iterations,
                "function_str": function_str.replace("**", "^"),
                "method": "falsa_posicion",
                "dimension" : 1
            }

        if fa * fxr < 0:
            b = xr
            fb = fxr
        else:
            a = xr
            fa = fxr

    return {
        "converged": False,
        "root": xr,
        "iterations": iterations,
        "function_str": function_str,
        "method": "falsa_posicion",
        "message": "Máximo de iteraciones alcanzado.",
        "dimension" : 1
    }