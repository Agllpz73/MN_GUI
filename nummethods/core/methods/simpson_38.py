import math

ALLOWED_NAMES = {
    "x": 0,
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


def evaluate_function(function_str, x_value):
    local_dict = ALLOWED_NAMES.copy()
    local_dict["x"] = x_value
    function_eval = function_str.replace("^", "**")
    return eval(function_eval, {"__builtins__": {}}, local_dict)


def solve_simpson_38(function_str, a, b, n):

    try:

        a = float(a)
        b = float(b)
        n = int(n)

        if n < 3:
            return {
                "success": False,
                "category": "integracion",
                "method": "simpson_38",
                "message": "Simpson 3/8 requiere al menos 3 subintervalos."
            }

        if n % 3 != 0:
            return {
                "success": False,
                "category": "integracion",
                "method": "simpson_38",
                "message": "Simpson 3/8 requiere un número de subintervalos múltiplo de 3."
            }

        # manejar límites invertidos
        sign = 1
        if a > b:
            a, b = b, a
            sign = -1

        h = abs(b - a) / n

        nodes = []
        node_values = []
        rows = []
        iterations = []
        segments = []

        weighted_sum = 0.0

        for i in range(n + 1):

            xi = a + i * h
            fi = evaluate_function(function_str, xi)

            if i == 0 or i == n:
                weight = 1
            elif i % 3 == 0:
                weight = 2
            else:
                weight = 3

            contribution = weight * fi
            weighted_sum += contribution

            nodes.append(xi)
            node_values.append(fi)

            rows.append([i, xi, fi, weight, contribution])

            iterations.append({
                "x": xi,
                "fx": fi,
                "type": "node"
            })

        integral = sign * (3 * h / 8) * weighted_sum

        # segmentos para graficar (compatibilidad con graph-konva)
        for i in range(n):

            segments.append({
                "type": "line",
                "x0": nodes[i],
                "y0": node_values[i],
                "x1": nodes[i + 1],
                "y1": node_values[i + 1]
            })

        normalized_function = function_str.replace("**", "^")

        return {

            "success": True,
            "category": "integracion",
            "method": "simpson_38",
            "message": "Cálculo completado correctamente.",

            "function_str": normalized_function,
            "dimension": 1,
            "iterations": iterations,

            "input": {
                "function": function_str,
                "a": a,
                "b": b,
                "n": n
            },

            "result": {
                "integral": integral,
                "exact_value": None,
                "absolute_error": None,
                "relative_error": None
            },

            "procedure": {

                "formula": "I ≈ (3h/8)[f(x0) + 3f(x1) + 3f(x2) + 2f(x3) + ... + f(xn)]",

                "steps": [
                    f"Se verificó que n = {n} es múltiplo de 3.",
                    f"Se calculó el tamaño de paso h = ({b} - {a}) / {n} = {h}.",
                    "Se generaron los nodos del intervalo.",
                    "Se evaluó la función en cada nodo.",
                    "Se asignaron los pesos 1, 3, 3, 2, 3, 3, 2, ..., 3, 3, 1.",
                    "Se aplicó la fórmula compuesta de Simpson 3/8."
                ],

                "table_title": "Tabla de evaluación",

                "headers": ["i", "x_i", "f(x_i)", "peso", "aporte"],

                "rows": rows,

                "summary": {
                    "h": h,
                    "weighted_sum": weighted_sum,
                    "evaluations": n + 1
                }
            },

            "plot_data": {

                "function": normalized_function,
                "a": a,
                "b": b,

                "nodes": nodes,
                "node_values": node_values,

                "segments": segments,

                "area_fill": {
                    "enabled": True,
                    "type": "simpson_38"
                }
            }
        }

    except Exception as e:

        return {
            "success": False,
            "category": "integracion",
            "method": "simpson_38",
            "message": f"Error al calcular Simpson 3/8: {str(e)}"
        }