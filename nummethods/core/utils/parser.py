import sympy as sp
import math
import csv
import io

import random
import math
import numpy as np
from sympy import symbols, sympify, simplify, lambdify, Matrix

def validate_fixed_point_mapping(functions, g_functions, n, samples=8, tol=1e-6):
    """
    Valida que cada g_i corresponda a la ecuación f_i bajo el esquema:
        f1 <-> x = g1
        f2 <-> y = g2
        f3 <-> z = g3

    Estrategia:
    1. Parseo simbólico de f_i y g_i
    2. Construcción de phi_i = var_i - g_i
    3. Validación simbólica:
         - simplify(f_i - phi_i) == 0
         - o simplify(phi_i) == 0 si f_i ya viene como x - g_i
         - o equivalencia hasta factor constante:
              f_i / phi_i = constante
    4. Si no se puede confirmar, validación numérica con puntos aleatorios
       buscando proporcionalidad escalar aproximada:
              f_i ≈ c * phi_i
    """

    x, y, z = symbols("x y z")
    vars_all = (x, y, z)
    vars_used = vars_all[:n]

    result = {
        "is_valid": True,
        "messages": [],
        "details": [],
        "phi_expressions": []
    }

    if len(functions) != n or len(g_functions) != n:
        return {
            "is_valid": False,
            "messages": [
                f"Se esperaban {n} funciones originales y {n} funciones despejadas."
            ],
            "details": [],
            "phi_expressions": []
        }

    try:
        F_sym = [sympify(f) for f in functions]
        G_sym = [sympify(g) for g in g_functions]
    except Exception as e:
        return {
            "is_valid": False,
            "messages": [f"Error al interpretar las expresiones: {str(e)}"],
            "details": [],
            "phi_expressions": []
        }

    allowed_symbols = set(vars_used)

    for i in range(n):
        fi = F_sym[i]
        gi = G_sym[i]
        expected_var = vars_used[i]
        phi_i = expected_var - gi

        result["phi_expressions"].append(str(phi_i))

        # 1) Validar variables no permitidas
        fi_symbols = fi.free_symbols
        gi_symbols = gi.free_symbols

        invalid_f = fi_symbols - allowed_symbols
        invalid_g = gi_symbols - allowed_symbols

        if invalid_f:
            result["is_valid"] = False
            result["messages"].append(
                f"Ecuación f{i+1}: contiene símbolos no permitidos: "
                f"{', '.join(str(s) for s in sorted(invalid_f, key=str))}."
            )
            result["details"].append({
                "index": i,
                "status": "invalid_symbols_f",
                "f": str(fi),
                "g": str(gi),
                "phi": str(phi_i)
            })
            continue

        if invalid_g:
            result["is_valid"] = False
            result["messages"].append(
                f"Despeje g{i+1}: contiene símbolos no permitidos: "
                f"{', '.join(str(s) for s in sorted(invalid_g, key=str))}."
            )
            result["details"].append({
                "index": i,
                "status": "invalid_symbols_g",
                "f": str(fi),
                "g": str(gi),
                "phi": str(phi_i)
            })
            continue

        # 2) Validación simbólica directa
        try:
            diff_direct = simplify(fi - phi_i)

            if diff_direct == 0:
                result["messages"].append(
                    f"f{i+1} y g{i+1} son equivalentes simbólicamente."
                )
                result["details"].append({
                    "index": i,
                    "status": "symbolic_exact",
                    "f": str(fi),
                    "g": str(gi),
                    "phi": str(phi_i)
                })
                continue
        except Exception:
            pass

        # 3) Caso especial: si f_i ya viene como x - g_i = 0
        try:
            if simplify(fi) == 0 or simplify(phi_i) == 0:
                result["messages"].append(
                    f"f{i+1} o la forma transformada asociada a g{i+1} se reducen a cero simbólicamente."
                )
                result["details"].append({
                    "index": i,
                    "status": "symbolic_zero",
                    "f": str(fi),
                    "g": str(gi),
                    "phi": str(phi_i)
                })
                continue
        except Exception:
            pass

        # 4) Equivalencia hasta factor constante: fi = c * phi_i
        try:
            ratio = simplify(fi / phi_i)
            if ratio.is_number and ratio != 0:
                result["messages"].append(
                    f"f{i+1} y g{i+1} son equivalentes simbólicamente hasta un factor constante ({ratio})."
                )
                result["details"].append({
                    "index": i,
                    "status": "symbolic_constant_factor",
                    "factor": str(ratio),
                    "f": str(fi),
                    "g": str(gi),
                    "phi": str(phi_i)
                })
                continue
        except Exception:
            pass

        # 5) Validación numérica
        try:
            f_num = lambdify(vars_used, fi, "numpy")
            phi_num = lambdify(vars_used, phi_i, "numpy")
        except Exception as e:
            result["is_valid"] = False
            result["messages"].append(
                f"No se pudieron evaluar numéricamente f{i+1} y g{i+1}: {str(e)}"
            )
            result["details"].append({
                "index": i,
                "status": "numeric_lambdify_error",
                "f": str(fi),
                "g": str(gi),
                "phi": str(phi_i)
            })
            continue

        ratios = []
        valid_points = 0

        for _ in range(samples * 4):  # damos margen por si algunos puntos no sirven
            point = []
            for _j in range(n):
                point.append(random.uniform(-3.0, 3.0))

            try:
                fv = f_num(*point)
                pv = phi_num(*point)

                if isinstance(fv, np.ndarray):
                    fv = float(np.array(fv).squeeze())
                if isinstance(pv, np.ndarray):
                    pv = float(np.array(pv).squeeze())

                if not np.isfinite(fv) or not np.isfinite(pv):
                    continue

                # evitar puntos degenerados
                if abs(pv) < 1e-10 and abs(fv) < 1e-10:
                    continue
                if abs(pv) < 1e-10:
                    continue

                ratios.append(fv / pv)
                valid_points += 1

                if valid_points >= samples:
                    break

            except Exception:
                continue

        if valid_points < max(3, samples // 2):
            result["is_valid"] = False
            result["messages"].append(
                f"No fue posible validar numéricamente la correspondencia entre f{i+1} y g{i+1} "
                f"por restricciones de dominio o evaluación insuficiente."
            )
            result["details"].append({
                "index": i,
                "status": "numeric_insufficient_points",
                "f": str(fi),
                "g": str(gi),
                "phi": str(phi_i)
            })
            continue

        ratios = np.array(ratios, dtype=float)
        ratio_mean = np.mean(ratios)
        ratio_std = np.std(ratios)

        # Si el cociente es casi constante, aceptamos equivalencia hasta factor escalar
        if abs(ratio_mean) > 1e-12 and ratio_std <= max(tol, 1e-4):
            result["messages"].append(
                f"f{i+1} y g{i+1} parecen equivalentes numéricamente hasta un factor constante aproximado "
                f"({ratio_mean:.6f})."
            )
            result["details"].append({
                "index": i,
                "status": "numeric_constant_factor",
                "factor_approx": float(ratio_mean),
                "std": float(ratio_std),
                "f": str(fi),
                "g": str(gi),
                "phi": str(phi_i)
            })
        else:
            result["is_valid"] = False
            result["messages"].append(
                f"f{i+1} no corresponde claramente con g{i+1}. "
                f"Revisa que g{i+1} sea el despeje correcto de la variable {expected_var}."
            )
            result["details"].append({
                "index": i,
                "status": "not_equivalent",
                "factor_approx": float(ratio_mean),
                "std": float(ratio_std),
                "f": str(fi),
                "g": str(gi),
                "phi": str(phi_i)
            })

    return result

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


"""
Función que nos ayuda a validar si tiene una diagonal dominante para garantizar convergencia en Gauss-Seidel y Jacobi
"""

def is_diagonally_dominant(matrix):

    n = len(matrix)

    for i in range(n):

        diag = abs(matrix[i][i])

        row_sum = 0
        for j in range(n):
            if i != j:
                row_sum += abs(matrix[i][j])

        if diag <= row_sum:
            return False

    return True


def format_term(value):
    if value < 0:
        return f"(x+{abs(value)})"
    else:
        return f"(x-{value})"