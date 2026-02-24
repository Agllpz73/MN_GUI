import sympy as sp
import math

"""Este módulo contiene funciones para convertir strings en funciones evaluables y sus derivadas.
Se utiliza sympy para el manejo simbólico de las funciones y sus derivadas, y math"""

def build_function_and_derivative(function_str):
    

    try:
        x = sp.symbols('x')

        # Convertir string en expresión simbólica
        expr = sp.sympify(function_str)

        # Crear función evaluable
        f = sp.lambdify(x, expr, modules=["math"])

        # Calcular derivada simbólica
        df_expr = sp.diff(expr, x)

        # Crear función derivada evaluable
        df = sp.lambdify(x, df_expr, modules=["math"])

        return f, df

    except Exception as e:
        raise ValueError(f"Error al procesar la función: {str(e)}")