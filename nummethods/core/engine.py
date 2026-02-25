from .methods.newton import solve_newton


def solve(method_name, data):

    if method_name == "newton":
        return solve_newton(
            function_str=data["function"],
            x0=data["x0"],
            tol=data.get("tol", 1e-6),
            max_iter=data.get("max_iter", 100)
        )

    raise ValueError("Método no soportado")