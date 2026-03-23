import pandas as pd
import numpy as np
from ..utils.parser import format_term


def solve_newton_diferencias_divididas(file, interpolation_value):
    try:
        df = pd.read_csv(file)

        if df.shape[1] < 2:
            return {
                "status": "error",
                "method": "newton_diferencias_divididas",
                "message": "El archivo debe contener al menos dos columnas (x, y).",
                "iterations": []
            }

        x = df.iloc[:, 0].astype(float).to_numpy()
        y = df.iloc[:, 1].astype(float).to_numpy()

        if len(x) == 0:
            return {
                "status": "error",
                "method": "newton_diferencias_divididas",
                "message": "El archivo no contiene datos para interpolar.",
                "iterations": []
            }

        if len(np.unique(x)) != len(x):
            return {
                "status": "error",
                "method": "newton_diferencias_divididas",
                "message": "Los valores de x no deben repetirse para interpolación de Newton.",
                "iterations": []
            }

        x_eval = float(interpolation_value)
        n = len(x)

        # -----------------------------
        # Sección de datos
        # -----------------------------
        data_section = {
            "headers": ["x", "y"],
            "rows": [[float(x[i]), float(y[i])] for i in range(n)]
        }

        # -----------------------------
        # Modelo matemático
        # -----------------------------
        model_section = {
            "title": "Modelo matemático",
            "equation": "P(x) = f[x0] + f[x0,x1](x-x0) + f[x0,x1,x2](x-x0)(x-x1) + ..."
        }

        # -----------------------------
        # Tabla de diferencias divididas
        # -----------------------------
        dd = np.zeros((n, n), dtype=float)
        dd[:, 0] = y

        for j in range(1, n):
            for i in range(n - j):
                denominator = x[i + j] - x[i]

                if abs(denominator) < 1e-12:
                    return {
                        "status": "error",
                        "method": "newton_diferencias_divididas",
                        "message": "Se encontró una división entre cero al construir la tabla de diferencias divididas.",
                        "iterations": []
                    }

                dd[i, j] = (dd[i + 1, j - 1] - dd[i, j - 1]) / denominator

        # -----------------------------
        # Construcción de pasos
        # -----------------------------
        steps = []
        table_headers = ["x", "f[x]"] + [f"Orden {i}" for i in range(1, n)]
        table_rows = []

        for i in range(n):
            row = [float(x[i]), float(dd[i, 0])]
            for j in range(1, n):
                if i < n - j:
                    row.append(float(dd[i, j]))
                else:
                    row.append("")
            table_rows.append(row)

        for j in range(1, n):
            for i in range(n - j):
                numerator = f"({dd[i + 1, j - 1]} - {dd[i, j - 1]})"
                denominator = f"({x[i + j]} - {x[i]})"
                steps.append({
                    "Li": f"f[x{i},...,x{i+j}]",
                    "expression": f"f[x{i},...,x{i+j}] = {numerator} / {denominator}"
                })

        development_section = {
            "title": "Tabla de diferencias divididas",
            "tables": [
                {
                    "title": "Diferencias divididas",
                    "headers": table_headers,
                    "rows": table_rows
                }
            ],
            "steps": steps
        }

        # -----------------------------
        # Polinomio de Newton
        # -----------------------------
        coefficients = [dd[0, j] for j in range(n)]
        polynomial_terms = []
        result = coefficients[0]

        polynomial_terms.append(f"{coefficients[0]}")

        for i in range(1, n):
            product_value = 1.0
            factors = []

            for j in range(i):
                factor_str = format_term(float(x[j]))
                factor_str = factor_str.replace("--", "+")
                factors.append(factor_str)

                product_value *= (x_eval - x[j])

            coeff = coefficients[i]
            result += coeff * product_value

            product_expr = "*".join(factors)
            polynomial_terms.append(f"{coeff}*{product_expr}")

        polynomial_expression = " + ".join(polynomial_terms).replace("+ -", "- ")

        function_section = {
            "title": "Polinomio interpolante",
            "expression": f"P(x) = {polynomial_expression}"
        }

        # -----------------------------
        # Evaluación
        # -----------------------------
        evaluation_section = {
            "x": x_eval,
            "result": float(result)
        }

        # -----------------------------
        # Iterations para el plotter
        # -----------------------------
        iterations = []

        for i in range(len(x)):
            iterations.append({
                "iteration": i + 1,
                "x": float(x[i]),
                "fx": float(y[i]),
                "error": 0,
                "type": "data"
            })

        iterations.append({
            "iteration": len(iterations) + 1,
            "x": float(x_eval),
            "fx": float(result),
            "error": 0,
            "type": "interpolated"
        })

        return {
            "status": "success",
            "method": "newton_diferencias_divididas",
            "data": data_section,
            "model": model_section,
            "development": development_section,
            "function": function_section,
            "evaluation": evaluation_section,
            "dimension": 1,
            "function_str": polynomial_expression.replace("**", "^"),
            "iterations": iterations,
            "message": "Interpolación realizada correctamente."
        }

    except ValueError:
        return {
            "status": "error",
            "method": "newton_diferencias_divididas",
            "message": "Verifica que el archivo CSV contenga únicamente valores numéricos válidos en las columnas x e y.",
            "iterations": []
        }
    except Exception as e:
        return {
            "status": "error",
            "method": "newton_diferencias_divididas",
            "message": f"Ocurrió un error al aplicar el método de Newton por diferencias divididas: {str(e)}",
            "iterations": []
        }