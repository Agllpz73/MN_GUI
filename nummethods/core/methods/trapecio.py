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
    function_str = function_str.replace("^", "**")
    return eval(function_str, {"__builtins__": {}}, local_dict)


def solve_trapecio(function_str, a, b, n):
    try:
        a = float(a)
        b = float(b)
        n = int(n)

        if n < 1:
            return {
                "success": False,
                "category": "integracion",
                "method": "trapecio",
                "message": "El número de subintervalos n debe ser mayor o igual a 1."
            }

        if a == b:
            return {
                "success": False,
                "category": "integracion",
                "method": "trapecio",
                "message": "Los límites a y b no pueden ser iguales."
            }

        h = (b - a) / n

        nodes = []
        node_values = []
        rows = []
        weighted_sum = 0.0
        segments = []

        for i in range(n + 1):
            xi = a + i * h
            fi = evaluate_function(function_str, xi)

            weight = 1 if i == 0 or i == n else 2
            contribution = weight * fi
            weighted_sum += contribution

            nodes.append(xi)
            node_values.append(fi)
            rows.append([i, xi, fi, weight, contribution])

        integral = (h / 2) * weighted_sum

        for i in range(n):
            segments.append({
                "type": "line",
                "x0": nodes[i],
                "y0": node_values[i],
                "x1": nodes[i + 1],
                "y1": node_values[i + 1]
            })

        # -------------------------
        # NUEVO: compatibilidad con drawNewtonGraph
        # -------------------------
        normalized_function = function_str.replace("**", "^")

        iterations = []
        for xi, fi in zip(nodes, node_values):
            iterations.append({
                "x": xi,
                "fx": fi,
                "type": "node"
            })

        return {
            "success": True,
            "category": "integracion",
            "method": "trapecio",
            "message": "Cálculo completado correctamente.",

            # compatibilidad con drawNewtonGraph
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
                "formula": "I ≈ (h/2)[f(x0) + 2Σf(xi) + f(xn)]",
                "steps": [
                    f"Se calculó el tamaño de paso h = ({b} - {a}) / {n} = {h}.",
                    "Se generaron los nodos del intervalo.",
                    "Se evaluó la función en cada nodo.",
                    "Se aplicó la fórmula compuesta del trapecio."
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
                    "type": "trapecios"
                }
            }
        }

    except Exception as e:
        return {
            "success": False,
            "category": "integracion",
            "method": "trapecio",
            "message": f"Error al calcular el método del trapecio: {str(e)}"
        }