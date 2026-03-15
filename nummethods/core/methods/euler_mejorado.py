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
    Ejemplo: 'x + y', 'y - x**2 + 1'
    """
    allowed = ALLOWED_NAMES.copy()
    allowed["x"] = x
    allowed["y"] = y
    return eval(function_str, {"__builtins__": {}}, allowed)


def euler_improved_method(function_str, x0, y0, xf, h):
    """
    Método de Euler mejorado (Heun) para resolver:
        y' = f(x, y),  y(x0) = y0

    Mantiene el mismo return que Euler.
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
                "method": "Euler mejorado",
                "message": "El tamaño de paso h debe ser mayor que 0."
            }

        if xf <= x0:
            return {
                "success": False,
                "category": "edo",
                "method": "Euler mejorado",
                "message": "El valor final xf debe ser mayor que x0."
            }

        iterations = []

        x = x0
        y = y0
        step = 0

        # Punto inicial
        iterations.append({
            "iteration": step,
            "x": round(x, 10),
            "y": round(y, 10),
            "f_xy": "",
            "predictor": "",
            "f_predictor": ""
        })

        epsilon = 1e-12

        while x + h <= xf + epsilon:
            f_xy = evaluate_edo_function(function_str, x, y)

            # Predictor de Euler
            y_predictor = y + h * f_xy
            x_next = x + h

            # Pendiente corregida
            f_predictor = evaluate_edo_function(function_str, x_next, y_predictor)

            # Corrector de Heun
            y_next = y + (h / 2.0) * (f_xy + f_predictor)

            step += 1

            iterations.append({
                "iteration": step,
                "x": round(x_next, 10),
                "y": round(y_next, 10),
                "f_xy": round(f_xy, 10),
                "predictor": round(y_predictor, 10),
                "f_predictor": round(f_predictor, 10)
            })

            x = x_next
            y = y_next

        adjusted_last_step = False

        # Ajuste final si xf no cae exacto con h
        if x < xf - epsilon:
            h_last = xf - x
            adjusted_last_step = True

            f_xy = evaluate_edo_function(function_str, x, y)

            y_predictor = y + h_last * f_xy
            x_next = xf

            f_predictor = evaluate_edo_function(function_str, x_next, y_predictor)

            y_next = y + (h_last / 2.0) * (f_xy + f_predictor)

            step += 1

            iterations.append({
                "iteration": step,
                "x": round(x_next, 10),
                "y": round(y_next, 10),
                "f_xy": round(f_xy, 10),
                "predictor": round(y_predictor, 10),
                "f_predictor": round(f_predictor, 10)
            })

            x = x_next
            y = y_next

        return {
            "success": True,
            "category": "edo",
            "method": "Euler mejorado",
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
            "method": "Euler mejorado",
            "message": f"Error al calcular el método de Euler mejorado: {str(e)}"
        }