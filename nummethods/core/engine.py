from .methods.newton import solve_newton
from .methods.biseccion import solve_biseccion

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

    raise ValueError("Método no soportado")