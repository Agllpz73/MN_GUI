import numpy as np
from sympy import symbols, Matrix, sympify, lambdify

def newton_system(functions, x0, tol, max_iter):

    x, y, z = symbols('x y z')
    vars_all = (x, y, z)

    n = len(functions)
    vars = vars_all[:n]

    F_sym = Matrix([sympify(f) for f in functions])
    J_sym = F_sym.jacobian(vars)

    F_func = lambdify(vars, F_sym, 'numpy')
    J_func = lambdify(vars, J_sym, 'numpy')

    xk = np.array(x0, dtype=float)

    history = []
    function_plot = [f.replace("**", "^") for f in functions] if n == 2 else None

    for iteration in range(max_iter):

        F_eval = np.array(F_func(*xk), dtype=float).flatten()
        J_eval = np.array(J_func(*xk), dtype=float)

        if abs(np.linalg.det(J_eval)) < 1e-12:
            raise ValueError(f"Jacobian is singular at iteration {iteration + 1}")

        delta = np.linalg.solve(J_eval, -F_eval)
        x_next = xk + delta

        error = np.linalg.norm(x_next - xk, ord=np.inf)

        # evaluar residual en el nuevo punto
        F_next = np.array(F_func(*x_next), dtype=float).flatten()
        residual = np.linalg.norm(F_next, ord=np.inf)

        history.append({
            "iter": iteration + 1,
            "x": x_next.tolist(),
            "error": error,
            "residual": residual
        })

        if error <= tol and residual <= tol:
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