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


def solve_simpson_13(function_str, a, b, n):
    try:
        a = float(a)
        b = float(b)
        n = int(n)

        if n < 2:
            return {
                "success": False,
                "category": "integracion",
                "method": "simpson_13",
                "message": "Simpson 1/3 requiere al menos 2 subintervalos."
            }

        if n % 2 != 0:
            return {
                "success": False,
                "category": "integracion",
                "method": "simpson_13",
                "message": "Simpson 1/3 requiere un número par de subintervalos."
            }

        if a == b:
            return {
                "success": False,
                "category": "integracion",
                "method": "simpson_13",
                "message": "Los límites a y b no pueden ser iguales."
            }
        
        if b < a:
            return {
                "success": False,
                "category" : "integracion",
                "method" : "simpson_13",
                "message" : "El límite inferior debe ser menor que el superior. (a < b)"
            }
        
        h = (b - a) / n

        nodes = []
        node_values = []
        rows = []
        weighted_sum = 0.0
        segments = []
        iterations = []

        for i in range(n + 1):
            xi = a + i * h
            fi = evaluate_function(function_str, xi)

            if i == 0 or i == n:
                weight = 1
            elif i % 2 != 0:
                weight = 4
            else:
                weight = 2

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

        integral = (h / 3) * weighted_sum

        
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
            "method": "simpson_13",
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
                "formula": "I ≈ (h/3)[f(x0) + 4Σf(x_impares) + 2Σf(x_pares) + f(xn)]",
                "steps": [
                    f"Se verificó que n = {n} es par.",
                    f"Se calculó el tamaño de paso h = ({b} - {a}) / {n} = {h}.",
                    "Se generaron los nodos del intervalo.",
                    "Se evaluó la función en cada nodo.",
                    "Se asignaron los pesos 1, 4, 2, 4, ..., 2, 4, 1.",
                    "Se aplicó la fórmula compuesta de Simpson 1/3."
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
                    "type": "simpson_13"
                }
            }
        }

    except Exception as e:
        return {
            "success": False,
            "category": "integracion",
            "method": "simpson_13",
            "message": f"Error al calcular el método de Simpson 1/3: {str(e)}"
        }