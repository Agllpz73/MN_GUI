from .methods.newton import solve_newton
from .methods.biseccion import solve_biseccion
from .methods.secante import solve_secante
from .methods.falsa_posicion import solve_falsa_posicion
from .methods.newton_sistemas import newton_system
from .methods.punto_fijo_system import punto_fijo_system
from .methods.gauss import gauss_elimination
from .methods.gauss_jordan import gauss_jordan
from .methods.matriz_inversa import matriz_inversa_gauss_jordan
from .methods.LU import metodo_lu
from .methods.cholesky import metodo_cholesky
from .methods.gauss_seidel_system import gauss_seidel_system
from .methods.jacobi_system import jacobi_system
from .methods.lagrange import solve_lagrange
from .methods.newton_DD import solve_newton_diferencias_divididas
from .methods.newton_DF import solve_newton_diferencias_finitas
from .methods.minimos_cuadrados import solve_minimos_cuadrados
from .methods.mc_tranformaciones import solve_minimos_cuadrados_transformacion
from .methods.trapecio import solve_trapecio
from .methods.simpson_13 import solve_simpson_13
from .utils.parser import parse_matrix_csv, validate_augmented_matrix

def solve(method_name, data):

    if method_name == "newton":
        return solve_newton(
            function_str=data["function"],
            x0=data["x0"],
            tol=data.get("tol", 1e-6),
            max_iter=data.get("max_iter", 100)
        )
    elif method_name == "biseccion":
        return solve_biseccion(
            function_str=data["function"],
            a=data["a"],
            b=data["b"],
            tol=data.get("tol", 1e-6),
            max_iter=data.get("max_iter", 100)
        )
    elif method_name == "secante":
        return solve_secante(
            function_str=data["function"],
            x0=data["x0"],
            x1=data["x1"],
            tol=data.get("tol", 1e-6),
            max_iter=data.get("max_iter", 100)
        )
    elif method_name == "falsa-posicion":
        
        return solve_falsa_posicion(
            function_str=data["function"],
            a=data["a"],
            b=data["b"],
            tol=data.get("tol", 1e-6),
            max_iter=data.get("max_iter", 100)
        )
    elif method_name == "punto-fijo":
        from .methods.punto_fijo import solve_punto_fijo
        return solve_punto_fijo(
            function_str=data["function"],
            x0=data["x0"],
            tol=data.get("tol", 1e-6),
            max_iter=data.get("max_iter", 100)
        )
    elif method_name == "newton-raphson-sistema":
        return newton_system(
            functions=data["functions"],
            x0=data["x0"],
            tol=data.get("tol", 1e-6),
            max_iter=data.get("max_iter", 100)
        )
    elif method_name == "punto-fijo-sistema":
        return punto_fijo_system(
            g_functions = data["variables"],
            x0=data["x0"],
            tol = data.get("tol", 1e-6),
            max_iter = data.get("max_iter", 100),
            functions = data.get("functions")
        )
    elif method_name == "gauss":
        file = data["file"]
        
        matrix, error = parse_matrix_csv(file)
        
        if error:
            return{
                "status" : "error",
                "message" : error
            }
        valid, message = validate_augmented_matrix(matrix)
        
        if not valid:
            return{
                "status" : "error",
                "message" : message
            }
        return gauss_elimination(matrix)
    elif method_name == "gauss-jordan":
        file = data["file"]
        
        matrix, error = parse_matrix_csv(file)
        
        if error:
            return{
                "status" : "error",
                "message" : error
            }
        valid, message = validate_augmented_matrix(matrix)
        
        if not valid:
            return{
                "status" : "error",
                "message" : message
            }
        return gauss_jordan(matrix)
    elif method_name == "matriz-inversa":
        file = data["file"]
        
        matrix, error = parse_matrix_csv(file)
        
        if error:
            return {
                "status" : "error",
                "message" : error
            }
        
        valid, message = validate_augmented_matrix(matrix)
        
        if not valid:
            return{
                "status" : "error",
                "message" : message
            }
        
        return matriz_inversa_gauss_jordan(matrix)
    elif method_name == "lu":
        file = data["file"]
        
        matrix, error = parse_matrix_csv(file)
        
        if error:
            return {
                "status" : "error",
                "message" : error
            }
        
        valid, message = validate_augmented_matrix(matrix)
        
        if not valid:
            return{
                "status" : "error",
                "message" : message
            }
        
        return metodo_lu(matrix)
    elif method_name == "cholesky":
        file = data["file"]
        
        matrix, error = parse_matrix_csv(file)
        
        if error:
            return {
                "status" : "error",
                "message" : error
            }
        
        valid, message = validate_augmented_matrix(matrix)
        
        if not valid:
            return{
                "status" : "error",
                "message" : message
            }
        
        
        return metodo_cholesky(matrix) 
    elif method_name == "gauss-seidel":
        file = data["file"]
        
        matrix, error = parse_matrix_csv(file)
        
        if error:
            return {
                "status" : "error",
                "message" : error
            }
        
        valid, message = validate_augmented_matrix(matrix)
        
        if not valid:
            return{
                "status" : "error",
                "message" : message
            }
        
        
        return gauss_seidel_system(
            matrix,
            x0=data.get("x0"),
            tol=data.get("tol"),
            max_iter=data.get("max_iter")
        )
    elif method_name == "jacobi":
        file = data["file"]
        
        matrix, error = parse_matrix_csv(file)
        
        if error:
            return {
                "status" : "error",
                "message" : error
            }
        
        valid, message = validate_augmented_matrix(matrix)
        
        if not valid:
            return{
                "status" : "error",
                "message" : message
            }
        
        
        return jacobi_system(
            matrix,
            x0=data.get("x0"),
            tol=data.get("tol"),
            max_iter=data.get("max_iter")
        )
    elif method_name == "lagrange":
        return solve_lagrange(
            file= data['file'],
            interpolation_value= data['interpolation_value'] 
        )
    elif method_name == "newton-dd":
        return solve_newton_diferencias_divididas(
            file=data['file'],
            interpolation_value=data['interpolation_value']
        )
    elif method_name == "newton-df":
        return solve_newton_diferencias_finitas(
            file=data['file'],
            interpolation_value=data['interpolation_value']
        )
    elif method_name == "minimos-cuadrados":
        return solve_minimos_cuadrados(
            file=data['file'],
            interpolation_value=data['interpolation_value']
        )
    elif method_name == "mc-transf":
        return solve_minimos_cuadrados_transformacion(
            file=data['file'],
            interpolation_value=data['interpolation_value']
        )
    elif method_name == "trapecio":
        return solve_trapecio(
            function_str=data["function"],
            a=data["a"],
            b=data["b"],
            n=data["n"]
        )
    elif method_name == "simpson-1-3":
        return solve_simpson_13(
            function_str=data["function"],
            a=data["a"],
            b=data["b"],
            n=data["n"]
        )

    raise ValueError("Método no soportado")