import pandas as pd
import numpy as np
import math


def solve_minimos_cuadrados_transformacion(file, interpolation_value):

    df = pd.read_csv(file)

    if df.shape[1] < 2:
        raise ValueError("El archivo debe contener dos columnas (x,y)")

    x = df.iloc[:, 0].astype(float).to_numpy()
    y = df.iloc[:, 1].astype(float).to_numpy()

    if np.any(y <= 0):
        raise ValueError("Para este modelo exponencial los valores de y deben ser positivos")

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
    # Transformación
    # -----------------------------------------

    Y = np.log(y)

    sum_x = float(np.sum(x))
    sum_Y = float(np.sum(Y))
    sum_x2 = float(np.sum(x**2))
    sum_xY = float(np.sum(x * Y))

    denominator = n * sum_x2 - sum_x**2

    if abs(denominator) < 1e-12:
        raise ValueError("No se puede calcular el modelo")

    b = (n * sum_xY - sum_x * sum_Y) / denominator
    A = (sum_Y - b * sum_x) / n

    a = math.exp(A)

    # -----------------------------------------
    # Modelo matemático
    # -----------------------------------------

    model_section = {
        "title": "Modelo matemático",
        "equation": "y = a e^(bx)"
    }

    # -----------------------------------------
    # Tabla auxiliar
    # -----------------------------------------

    table_headers = ["x", "y", "ln(y)", "x·ln(y)"]
    table_rows = []

    for i in range(n):
        table_rows.append([
            float(x[i]),
            float(y[i]),
            float(Y[i]),
            float(x[i] * Y[i])
        ])

    steps = [
        {
            "Li": "Transformación",
            "expression": "ln(y) = ln(a) + bx"
        },
        {
            "Li": "Coeficientes",
            "expression": f"a = e^{A} ,  b = {b}"
        }
    ]

    development_section = {
        "title": "Cálculo mediante transformación logarítmica",
        "tables": [
            {
                "title": "Tabla transformada",
                "headers": table_headers,
                "rows": table_rows
            }
        ],
        "steps": steps
    }

    # -----------------------------------------
    # Función resultante
    # -----------------------------------------

    polynomial_expression = f"{a}*exp({b}*x)"

    function_section = {
        "title": "Modelo ajustado",
        "expression": f"y = {a} e^({b}x)"
    }

    # -----------------------------------------
    # Evaluación
    # -----------------------------------------

    result = a * math.exp(b * x_eval)

    evaluation_section = {
        "x": x_eval,
        "result": float(result)
    }

    # -----------------------------------------
    # Iterations para graficar
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

    print(polynomial_expression)

    return {
        "method": "minimos_cuadrados_transformacion",
        "data": data_section,
        "model": model_section,
        "development": development_section,
        "function": function_section,
        "evaluation": evaluation_section,
        "dimension": 1,
        "function_str": polynomial_expression,
        "iterations": iterations
    }