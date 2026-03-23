import pandas as pd
import numpy as np
import math
from ..utils.parser import format_term


def solve_newton_diferencias_finitas(file, interpolation_value):
    try:
        df = pd.read_csv(file)

        if df.shape[1] < 2:
            return {
                "status": "error",
                "method": "newton_diferencias_finitas",
                "message": "El archivo debe contener al menos dos columnas (x, y).",
                "iterations": []
            }

        x = df.iloc[:, 0].astype(float).to_numpy()
        y = df.iloc[:, 1].astype(float).to_numpy()

        if len(x) < 2:
            return {
                "status": "error",
                "method": "newton_diferencias_finitas",
                "message": "Se requieren al menos dos puntos para interpolar.",
                "iterations": []
            }

        if len(np.unique(x)) != len(x):
            return {
                "status": "error",
                "method": "newton_diferencias_finitas",
                "message": "Los valores de x no deben repetirse.",
                "iterations": []
            }

        x_eval = float(interpolation_value)
        n = len(x)

        # -----------------------------------------
        # Validar espaciado uniforme
        # -----------------------------------------
        h = x[1] - x[0]
        tol = 1e-8

        for i in range(1, n - 1):
            if abs((x[i + 1] - x[i]) - h) > tol:
                return {
                    "status": "error",
                    "method": "newton_diferencias_finitas",
                    "message": "Para Newton DF los valores de x deben estar uniformemente espaciados.",
                    "iterations": []
                }

        # evitar h = 0
        if abs(h) < 1e-12:
            return {
                "status": "error",
                "method": "newton_diferencias_finitas",
                "message": "No se puede aplicar el método porque el paso h es cero.",
                "iterations": []
            }

        # -----------------------------------------
        # Sección de datos
        # -----------------------------------------
        data_section = {
            "headers": ["x", "y"],
            "rows": [[float(x[i]), float(y[i])] for i in range(n)]
        }

        # -----------------------------------------
        # Modelo matemático
        # -----------------------------------------
        model_section = {
            "title": "Modelo matemático",
            "equation": "P(x) = y0 + (Δy0 / 1!h)(x-x0) + (Δ²y0 / 2!h²)(x-x0)(x-x1) + ..."
        }

        # -----------------------------------------
        # Tabla de diferencias finitas hacia adelante
        # -----------------------------------------
        delta = np.zeros((n, n), dtype=float)
        delta[:, 0] = y

        for j in range(1, n):
            for i in range(n - j):
                delta[i, j] = delta[i + 1, j - 1] - delta[i, j - 1]

        table_headers = ["x", "f[x]"] + [f"Orden {i}" for i in range(1, n)]
        table_rows = []

        for i in range(n):
            row = [float(x[i]), float(delta[i, 0])]
            for j in range(1, n):
                if i < n - j:
                    row.append(float(delta[i, j]))
                else:
                    row.append("")
            table_rows.append(row)

        steps = []
        for j in range(1, n):
            for i in range(n - j):
                if j == 1:
                    expression = f"Δf(x{i}) = {delta[i + 1, 0]} - {delta[i, 0]}"
                else:
                    expression = f"Δ^{j}f(x{i}) = {delta[i + 1, j - 1]} - {delta[i, j - 1]}"

                steps.append({
                    "Li": f"Δ^{j}f(x{i})",
                    "expression": expression
                })

        development_section = {
            "title": "Tabla de diferencias finitas hacia adelante",
            "tables": [
                {
                    "title": "Diferencias finitas hacia adelante",
                    "headers": table_headers,
                    "rows": table_rows
                }
            ],
            "steps": steps
        }

        # -----------------------------------------
        # Construcción del polinomio en términos de x
        # -----------------------------------------
        polynomial_terms = []
        result = 0.0

        for k in range(n):
            coeff = delta[0, k] / (math.factorial(k) * (h ** k))

            if k == 0:
                polynomial_terms.append(f"{coeff}")
                result += coeff
            else:
                factors = []
                product_value = 1.0

                for j in range(k):
                    factor_str = format_term(float(x[j]))
                    factors.append(factor_str)
                    product_value *= (x_eval - x[j])

                product_expr = "*".join(factors)
                polynomial_terms.append(f"({coeff})*{product_expr}")
                result += coeff * product_value

        polynomial_expression = " + ".join(polynomial_terms).replace("+ -", "- ")

        function_section = {
            "title": "Polinomio interpolante",
            "expression": f"P(x) = {polynomial_expression}"
        }

        # -----------------------------------------
        # Evaluación
        # -----------------------------------------
        evaluation_section = {
            "x": x_eval,
            "result": float(result)
        }

        # -----------------------------------------
        # Iterations para el plotter
        # -----------------------------------------
        iterations = []

        for i in range(n):
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
            "method": "newton_diferencias_finitas",
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
            "method": "newton_diferencias_finitas",
            "message": "Verifica que el archivo CSV contenga únicamente valores numéricos válidos en las columnas x e y.",
            "iterations": []
        }
    except Exception as e:
        return {
            "status": "error",
            "method": "newton_diferencias_finitas",
            "message": f"Ocurrió un error al aplicar el método de Newton por diferencias finitas: {str(e)}",
            "iterations": []
        }