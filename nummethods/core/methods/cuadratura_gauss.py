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


def get_gauss_legendre_data(n):
    """
    Retorna nodos y pesos de Gauss-Legendre en [-1, 1]
    para n = 2, 3, 4.
    """
    if n == 2:
        nodes = [
            -1 / math.sqrt(3),
            1 / math.sqrt(3)
        ]
        weights = [1.0, 1.0]

    elif n == 3:
        nodes = [
            -math.sqrt(3 / 5),
            0.0,
            math.sqrt(3 / 5)
        ]
        weights = [
            5 / 9,
            8 / 9,
            5 / 9
        ]

    elif n == 4:
        nodes = [
            -0.8611363115940526,
            -0.3399810435848563,
             0.3399810435848563,
             0.8611363115940526
        ]
        weights = [
            0.3478548451374538,
            0.6521451548625461,
            0.6521451548625461,
            0.3478548451374538
        ]

    else:
        raise ValueError("Solo se soportan 2, 3 o 4 puntos de cuadratura de Gauss.")

    return nodes, weights


def solve_cuadratura_gauss(function_str, a, b, n):
    try:
        a = float(a)
        b = float(b)
        n = int(n)

        if n not in [2, 3, 4]:
            return {
                "success": False,
                "category": "integracion",
                "method": "cuadratura_gauss",
                "message": "La cuadratura de Gauss soporta 2, 3 o 4 puntos."
            }

        if a == b:
            return {
                "success": False,
                "category": "integracion",
                "method": "cuadratura_gauss",
                "message": "Los límites a y b no pueden ser iguales."
            }

        sign = 1
        if a > b:
            a, b = b, a
            sign = -1

        gauss_nodes, gauss_weights = get_gauss_legendre_data(n)

        transformed_nodes = []
        node_values = []
        rows = []
        iterations = []
        segments = []
        weighted_sum = 0.0

        midpoint = (a + b) / 2
        half_length = (b - a) / 2

        for i in range(n):
            ti = gauss_nodes[i]
            wi = gauss_weights[i]

            # Transformación de [-1,1] -> [a,b]
            xi = midpoint + half_length * ti
            fi = evaluate_function(function_str, xi)
            contribution = wi * fi
            weighted_sum += contribution

            transformed_nodes.append(xi)
            node_values.append(fi)

            rows.append([
                i,
                ti,
                wi,
                xi,
                fi,
                contribution
            ])

            iterations.append({
                "x": xi,
                "fx": fi,
                "type": "node"
            })

        integral = sign * half_length * weighted_sum

        # Para que no se rompa el graficador, enviamos segmentos vacíos.
        # En Gauss no hay trapecios ni subintervalos uniformes.
        normalized_function = function_str.replace("**", "^")

        return {
            "success": True,
            "category": "integracion",
            "method": "cuadratura_gauss",
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
                "formula": "I ≈ ((b-a)/2) Σ[w_i · f(((b-a)/2)t_i + (a+b)/2)]",
                "steps": [
                    f"Se seleccionaron {n} puntos de cuadratura de Gauss-Legendre.",
                    "Se tomaron los nodos t_i y pesos w_i en el intervalo estándar [-1,1].",
                    "Se transformaron los nodos al intervalo [a,b].",
                    "Se evaluó la función en cada nodo transformado.",
                    "Se calculó la suma ponderada Σ(w_i · f(x_i)).",
                    "Se multiplicó por (b-a)/2 para obtener la aproximación final."
                ],
                "table_title": "Tabla de evaluación",
                "headers": ["i", "t_i", "w_i", "x_i", "f(x_i)", "aporte"],
                "rows": rows,
                "summary": {
                    "midpoint": midpoint,
                    "half_length": half_length,
                    "weighted_sum": weighted_sum,
                    "evaluations": n
                }
            },
            "plot_data": {
                "function": normalized_function,
                "a": a,
                "b": b,
                "nodes": transformed_nodes,
                "node_values": node_values,
                "segments": segments,
                "area_fill": {
                    "enabled": False,
                    "type": "cuadratura_gauss"
                }
            }
        }

    except Exception as e:
        return {
            "success": False,
            "category": "integracion",
            "method": "cuadratura_gauss",
            "message": f"Error al calcular la cuadratura de Gauss: {str(e)}"
        }