import math

def solve_punto_fijo(function_str, x0, tol, max_iter):
    def g(x):
        return eval(function_str.replace("^", "**"))
    iterations = []
    
    xn = x0
    for i in range(1, max_iter + 1):
        x_next = g(xn)
        error = abs(x_next - xn)
        
        fx = g(xn) - xn
        
        iterations.append({
            "iteration": i,
            "x": xn,
            "fx": fx,
            "error": error
        })
        
        if error < tol:
            return {
                "converged": True,
                "root": x_next,
                "iterations": iterations,
                "function_str": function_str.replace("**", "^"),
                "method": "punto_fijo"
            }
        xn = x_next
        
    return {
        "converged": False,
        "root": xn,
        "iterations": iterations,
        "function_str": function_str.replace("**", "^"),
        "method": "punto_fijo",
        "message": "Máximo de iteraciones alcanzado."
    }
        