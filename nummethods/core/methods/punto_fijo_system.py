import numpy as np
from sympy import symbols, Matrix, sympify, lambdify

def punto_fijo_system(g_functions, x0, tol, max_iter, functions):

    x, y, z = symbols('x y z')
    vars_all = (x, y, z)

    n = len(g_functions)
    vars = vars_all[:n]

    G_sym = Matrix([sympify(g) for g in g_functions])
    G_func = lambdify(vars, G_sym, 'numpy')

    xk = np.array(x0, dtype=float)

    history = []
    function_plot = [f.replace("**", "^") for f in functions] if (functions and n == 2) else None

    for iteration in range(max_iter):

        x_next = np.array(G_func(*xk), dtype=float).flatten()

        # error tipo norma infinito entre iteraciones consecutivas
        error = np.linalg.norm(x_next - xk, ord=np.inf)

        history.append({
            "iter": iteration + 1,
            "x": x_next.tolist(),
            "error": error
        })

        if error <= tol:
            return {
                "dimension": n,
                "root": x_next.tolist(),
                "iterations": history,
                "iteration": iteration + 1,
                "history": history,
                "converged": True,
                "functions": function_plot
            }

        xk = x_next

    return {
        "dimension": n,
        "root": xk.tolist(),
        "iterations": history,
        "iteration": max_iter,
        "history": history,
        "converged": False,
        "functions": function_plot
    }