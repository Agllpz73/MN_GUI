import pandas as pd
import numpy as np

def solve_lagrange(file, interpolation_value):

    df = pd.read_csv(file)

    if df.shape[1] < 2:
        raise ValueError("El archivo debe contener dos columnas (x,y)")

    x = df.iloc[:,0].astype(float).to_numpy()
    y = df.iloc[:,1].astype(float).to_numpy()

    x_eval = float(interpolation_value)
    n = len(x)

    # ----------------------------
    # 1 DATA
    # ----------------------------

    data_section = {
        "headers": ["x","y"],
        "rows": [[float(x[i]), float(y[i])] for i in range(n)]
    }

    # ----------------------------
    # 2 MODEL
    # ----------------------------

    model_section = {
        "title": "Modelo matemático",
        "equation": "P(x) = Σ y_i L_i(x)"
    }

    # ----------------------------
    # 3 DEVELOPMENT
    # ----------------------------

    steps = []
    polynomial_terms = []
    result = 0

    for i in range(n):

        numerator_terms = []
        denominator_terms = []

        Li = 1

        for j in range(n):

            if i != j:

                numerator_terms.append(f"(x - {x[j]})")
                denominator_terms.append(f"({x[i]} - {x[j]})")

                Li *= (x_eval - x[j]) / (x[i] - x[j])

        term = y[i] * Li
        result += term

        steps.append({
            "Li": i,
            "expression": f"L{i}(x) = {' '.join(numerator_terms)} / {' '.join(denominator_terms)}"
        })

        polynomial_terms.append(
            f"{y[i]}*({' '.join(numerator_terms)})/({' '.join(denominator_terms)})"
        )

    development_section = {
        "title": "Construcción de polinomios base",
        "tables": [],
        "steps": steps
    }

    # ----------------------------
    # 4 FUNCTION RESULT
    # ----------------------------

    polynomial_expression = " + ".join(polynomial_terms)

    function_section = {
        "title": "Polinomio interpolante",
        "expression": f"P(x) = {polynomial_expression}"
    }

    # ----------------------------
    # 5 EVALUATION
    # ----------------------------

    evaluation_section = {
        "x": x_eval,
        "result": float(result)
    }

    # ----------------------------
    # 6 PLOT
    # ----------------------------

    x_curve = np.linspace(min(x)-1, max(x)+1, 100)

    def lagrange_eval(x_val):
        total = 0
        for i in range(n):
            Li = 1
            for j in range(n):
                if i != j:
                    Li *= (x_val - x[j])/(x[i]-x[j])
            total += y[i]*Li
        return total

    y_curve = [lagrange_eval(val) for val in x_curve]

    plot_section = {
        "points": [[float(x[i]), float(y[i])] for i in range(n)],
        "curve": {
            "x": list(x_curve),
            "y": list(y_curve)
        }
    }

    # ----------------------------
    # RETURN UNIVERSAL
    # ----------------------------

    return {
        "method": "Lagrange",

        "data": data_section,

        "model": model_section,

        "development": development_section,

        "function": function_section,

        "evaluation": evaluation_section,

        "plot": plot_section
    }