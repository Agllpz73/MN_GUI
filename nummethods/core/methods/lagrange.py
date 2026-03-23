import pandas as pd
import numpy as np
from ..utils.parser import format_term


def solve_lagrange(file, interpolation_value):
    try:
        df = pd.read_csv(file)

        if df.shape[1] < 2:
            return {
                "status": "error",
                "method": "lagrange",
                "message": "El archivo debe contener al menos dos columnas (x, y).",
                "iterations": []
            }

        x = df.iloc[:, 0].astype(float).to_numpy()
        y = df.iloc[:, 1].astype(float).to_numpy()

        if len(x) == 0:
            return {
                "status": "error",
                "method": "lagrange",
                "message": "El archivo no contiene datos para interpolar.",
                "iterations": []
            }

        if len(np.unique(x)) != len(x):
            return {
                "status": "error",
                "method": "lagrange",
                "message": "Los valores de x no deben repetirse para interpolación de Lagrange.",
                "iterations": []
            }

        x_eval = float(interpolation_value)
        n = len(x)

        data_section = {
            "headers": ["x", "y"],
            "rows": [[float(x[i]), float(y[i])] for i in range(n)]
        }

        model_section = {
            "title": "Modelo matemático",
            "equation": "P(x) = Σ y_i L_i(x)"
        }

        steps = []
        polynomial_terms = []
        result = 0.0

        for i in range(n):
            numerator_terms = []
            denominator_terms = []

            Li = 1.0

            for j in range(n):
                if i != j:
                    numerator_terms.append(format_term(x[j]))
                    denominator_terms.append(f"({x[i]}-{x[j]})".replace("--", "+"))
                    Li *= (x_eval - x[j]) / (x[i] - x[j])

            term = y[i] * Li
            result += term

            steps.append({
                "Li": i,
                "expression": f"L{i}(x) = {' * '.join(numerator_terms)} / {' * '.join(denominator_terms)}"
            })

            polynomial_terms.append(
                f"{y[i]}*({'*'.join(numerator_terms)})/({'*'.join(denominator_terms)})"
            )

        development_section = {
            "title": "Construcción de polinomios base",
            "tables": [],
            "steps": steps
        }

        polynomial_expression = " + ".join(polynomial_terms).replace("+ -", "- ")

        evaluation_section = {
            "x": x_eval,
            "result": float(result)
        }

        function_section = {
            "title": "Polinomio interpolante",
            "expression": f"P(x) = {polynomial_expression}"
        }

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
            "method": "lagrange",
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
            "method": "lagrange",
            "message": "Verifica que el archivo CSV contenga únicamente valores numéricos válidos en las columnas x e y.",
            "iterations": []
        }
    except Exception as e:
        return {
            "status": "error",
            "method": "lagrange",
            "message": f"Ocurrió un error al aplicar interpolación de Lagrange: {str(e)}",
            "iterations": []
        }