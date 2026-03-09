import sympy as sp
import math
import csv
import io

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
    
def parse_matrix_csv(file):

    try:

        content = file.read().decode("utf-8")
        reader = csv.reader(io.StringIO(content))

        matrix = []
        first_row = True

        for row in reader:

            if not row:
                continue

            # limpiar espacios
            row = [value.strip() for value in row]

            # detectar encabezado
            if first_row:
                first_row = False
                try:
                    [float(value) for value in row]
                except ValueError:
                    # es encabezado → ignorarlo
                    continue

            try:
                numeric_row = [float(value) for value in row]
            except ValueError:
                return None, "El archivo contiene valores no numéricos"

            matrix.append(numeric_row)

        if len(matrix) == 0:
            return None, "El archivo está vacío"

        cols = len(matrix[0])
        
        if cols < 2:
            return None, "La matriz debe contener al menos dos columnas numéricas"
        for row in matrix:
            if len(row) != cols:
                return None, "Las filas del CSV tienen diferente número de columnas"
            

        return matrix, None

    except Exception as e:
        return None, f"No se pudo procesar el archivo: {str(e)}"
# Además agregamos un función de validación de tamaño para la matriz considerando que debe ser cuadrada, es decir, N x N

def validate_augmented_matrix(matrix):
    rows = len(matrix)
    cols = len(matrix[0])
    
    if cols != rows+1:
        return False, "La matriz debe tener n ecuaciones y n+1 columnas (matriz aumentada)"
    
    return True, None