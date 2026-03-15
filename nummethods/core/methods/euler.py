import math

ALLOWED_NAMES = {
    "x": 0,
    "y": 0,
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "asin": math.asin,
    "acos": math.acos,
    "atan": math.atan,
    "sinh": math.sinh,
    "cosh": math.cosh,
    "tanh": math.tanh,
    "exp": math.exp,
    "log": math.log,
    "log10": math.log10,
    "sqrt": math.sqrt,
    "pi": math.pi,
    "e": math.e,
    "abs": abs
}


def evaluate_edo_function(function_str, x, y):
    """
    Evalúa una función f(x,y) de forma segura.
    Ejemplo de function_str: 'x + y', 'y - x**2 + 1'
    """
    allowed = ALLOWED_NAMES.copy()
    allowed["x"] = x
    allowed["y"] = y
    return eval(function_str, {"__builtins__": {}}, allowed)


def euler_method(function_str, x0, y0, xf, h):
    """
    Método de Euler para resolver:
        y' = f(x, y),  y(x0) = y0

    Return estándar para categoría EDO.
    """

    try:
        x0 = float(x0)
        y0 = float(y0)
        xf = float(xf)
        h = float(h)

        if h <= 0:
            return {
                "success": False,
                "category": "edo",
                "method": "Euler",
                "message": "El tamaño de paso h debe ser mayor que 0."
            }

        if xf <= x0:
            return {
                "success": False,
                "category": "edo",
                "method": "Euler",
                "message": "El valor final xf debe ser mayor que x0."
            }

        iterations = []

        x = x0
        y = y0
        step = 0

        # Guardamos el punto inicial
        iterations.append({
            "iteration": step,
            "x": round(x, 10),
            "y": round(y, 10)
        })

        # Para evitar problemas de precisión flotante
        epsilon = 1e-12

        while x + h <= xf + epsilon:
            fxy = evaluate_edo_function(function_str, x, y)

            y_next = y + h * fxy
            x_next = x + h

            step += 1

            iterations.append({
                "iteration": step,
                "x": round(x_next, 10),
                "y": round(y_next, 10)
            })

            x = x_next
            y = y_next

        # Si xf no cae exactamente en múltiplos de h, ajustamos último paso
        adjusted_last_step = False
        if x < xf - epsilon:
            h_last = xf - x
            fxy = evaluate_edo_function(function_str, x, y)

            y_next = y + h_last * fxy
            x_next = xf

            step += 1
            adjusted_last_step = True

            iterations.append({
                "iteration": step,
                "x": round(x_next, 10),
                "y": round(y_next, 10)
            })

            x = x_next
            y = y_next

        return {
            "success": True,
            "category": "edo",
            "method": "Euler",
            "input": {
                "function": function_str,
                "x0": x0,
                "y0": y0,
                "xf": xf,
                "h": h
            },
            "summary": {
                "steps": step,
                "final_x": round(x, 10),
                "final_y": round(y, 10),
                "adjusted_last_step": adjusted_last_step
            },
            "iterations": iterations,
            "plot_data": {
                "points": [
                    {"x": row["x"], "y": row["y"]}
                    for row in iterations
                ]
            },
            "message": "Cálculo completado correctamente."
        }

    except Exception as e:
        return {
            "success": False,
            "category": "edo",
            "method": "Euler",
            "message": f"Error al calcular el método de Euler: {str(e)}"
        }