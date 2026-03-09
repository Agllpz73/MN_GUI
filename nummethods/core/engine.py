from .methods.newton import solve_newton
from .methods.biseccion import solve_biseccion
from .methods.secante import solve_secante
from .methods.falsa_posicion import solve_falsa_posicion
from .methods.newton_sistemas import newton_system
from .methods.punto_fijo_system import punto_fijo_system
from .methods.gauss import gauss_elimination
from .methods.gauss_jordan import gauss_jordan
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
        

    raise ValueError("Método no soportado")