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


def runge_kutta_method(function_str, x0, y0, xf, h):
    """
    Método de Runge-Kutta de 4to orden para resolver:
        y' = f(x, y),  y(x0) = y0

    Mantiene el mismo return que Euler y Euler mejorado.
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
                "method": "Runge-Kutta",
                "message": "El tamaño de paso h debe ser mayor que 0."
            }

        if xf <= x0:
            return {
                "success": False,
                "category": "edo",
                "method": "Runge-Kutta",
                "message": "El valor final xf debe ser mayor que x0."
            }

        iterations = []

        x = x0
        y = y0
        step = 0

        iterations.append({
            "iteration": step,
            "x": round(x, 10),
            "y": round(y, 10),
            "k1": "",
            "k2": "",
            "k3": "",
            "k4": ""
        })

        epsilon = 1e-12

        while x + h <= xf + epsilon:
            k1 = h * evaluate_edo_function(function_str, x, y)
            k2 = h * evaluate_edo_function(function_str, x + h / 2.0, y + k1 / 2.0)
            k3 = h * evaluate_edo_function(function_str, x + h / 2.0, y + k2 / 2.0)
            k4 = h * evaluate_edo_function(function_str, x + h, y + k3)

            y_next = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6.0
            x_next = x + h

            step += 1

            iterations.append({
                "iteration": step,
                "x": round(x_next, 10),
                "y": round(y_next, 10),
                "k1": round(k1, 10),
                "k2": round(k2, 10),
                "k3": round(k3, 10),
                "k4": round(k4, 10)
            })

            x = x_next
            y = y_next

        adjusted_last_step = False

        if x < xf - epsilon:
            h_last = xf - x
            adjusted_last_step = True

            k1 = h_last * evaluate_edo_function(function_str, x, y)
            k2 = h_last * evaluate_edo_function(function_str, x + h_last / 2.0, y + k1 / 2.0)
            k3 = h_last * evaluate_edo_function(function_str, x + h_last / 2.0, y + k2 / 2.0)
            k4 = h_last * evaluate_edo_function(function_str, x + h_last, y + k3)

            y_next = y + (k1 + 2 * k2 + 2 * k3 + k4) / 6.0
            x_next = xf

            step += 1

            iterations.append({
                "iteration": step,
                "x": round(x_next, 10),
                "y": round(y_next, 10),
                "k1": round(k1, 10),
                "k2": round(k2, 10),
                "k3": round(k3, 10),
                "k4": round(k4, 10)
            })

            x = x_next
            y = y_next

        return {
            "success": True,
            "category": "edo",
            "method": "Runge-Kutta",
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
            "method": "Runge-Kutta",
            "message": f"Error al calcular el método de Runge-Kutta: {str(e)}"
        }