import pandas as pd
import numpy as np


def solve_minimos_cuadrados(file, interpolation_value):
    df = pd.read_csv(file)

    if df.shape[1] < 2:
        raise ValueError("El archivo debe contener dos columnas (x,y)")

    x = df.iloc[:, 0].astype(float).to_numpy()
    y = df.iloc[:, 1].astype(float).to_numpy()

    if len(x) < 2:
        raise ValueError("Se requieren al menos dos puntos para aplicar mínimos cuadrados")

    x_eval = float(interpolation_value)
    n = len(x)

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
        "equation": "y = a0 + a1*x"
    }

    # -----------------------------------------
    # Sumas necesarias
    # -----------------------------------------
    sum_x = float(np.sum(x))
    sum_y = float(np.sum(y))
    sum_x2 = float(np.sum(x ** 2))
    sum_xy = float(np.sum(x * y))

    denominator = n * sum_x2 - (sum_x ** 2)

    if abs(denominator) < 1e-12:
        raise ValueError("No es posible calcular la recta de ajuste porque el denominador es cero")

    # -----------------------------------------
    # Coeficientes
    # -----------------------------------------
    a1 = (n * sum_xy - sum_x * sum_y) / denominator
    a0 = (sum_y - a1 * sum_x) / n

    # -----------------------------------------
    # Desarrollo
    # -----------------------------------------
    table_headers = ["x", "y", "x²", "x·y"]
    table_rows = []

    for i in range(n):
        table_rows.append([
            float(x[i]),
            float(y[i]),
            float(x[i] ** 2),
            float(x[i] * y[i])
        ])

    steps = [
        {
            "Li": "Σx",
            "expression": f"Σx = {sum_x}"
        },
        {
            "Li": "Σy",
            "expression": f"Σy = {sum_y}"
        },
        {
            "Li": "Σx²",
            "expression": f"Σx² = {sum_x2}"
        },
        {
            "Li": "Σxy",
            "expression": f"Σxy = {sum_xy}"
        },
        {
            "Li": "a1",
            "expression": f"a1 = (n·Σxy - Σx·Σy) / (n·Σx² - (Σx)²) = ({n}·{sum_xy} - {sum_x}·{sum_y}) / ({n}·{sum_x2} - ({sum_x})²)"
        },
        {
            "Li": "a0",
            "expression": f"a0 = (Σy - a1·Σx) / n = ({sum_y} - {a1}·{sum_x}) / {n}"
        }
    ]

    development_section = {
        "title": "Cálculo de coeficientes",
        "tables": [
            {
                "title": "Tabla auxiliar",
                "headers": table_headers,
                "rows": table_rows
            }
        ],
        "steps": steps
    }

    # -----------------------------------------
    # Función ajustada
    # -----------------------------------------
    polynomial_expression = f"{a0} + {a1}*x"
    polynomial_expression = polynomial_expression.replace("+ -", "- ")

    function_section = {
        "title": "Recta de ajuste",
        "expression": f"y = {polynomial_expression}"
    }

    # -----------------------------------------
    # Evaluación
    # -----------------------------------------
    result = a0 + a1 * x_eval

    evaluation_section = {
        "x": x_eval,
        "result": float(result)
    }

    # -----------------------------------------
    # Iterations para el plotter
    # -----------------------------------------
    iterations = []

    # puntos originales
    for i in range(n):
        iterations.append({
            "iteration": i + 1,
            "x": float(x[i]),
            "fx": float(y[i]),
            "error": 0,
            "type": "data"
        })

    # punto evaluado sobre la recta de ajuste
    iterations.append({
        "iteration": len(iterations) + 1,
        "x": float(x_eval),
        "fx": float(result),
        "error": 0,
        "type": "interpolated"
    })

    

    return {
        "method": "minimos_cuadrados",
        "data": data_section,
        "model": model_section,
        "development": development_section,
        "function": function_section,
        "evaluation": evaluation_section,
        "dimension": 1,
        "function_str": polynomial_expression.replace("**", "^"),
        "iterations": iterations
    }