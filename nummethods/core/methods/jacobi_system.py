import numpy as np
from ..utils.parser import is_diagonally_dominant


def jacobi_system(matrix, x0, tol, max_iter):

    matrix = np.array(matrix, dtype=float)

    n = len(matrix)

    # separar matriz aumentada
    A = matrix[:, :-1]
    b = matrix[:, -1]

    xk = np.array(x0, dtype=float)

    history = []

    # construir funciones para graficar en 2D dentrreo del sistema
    function_plot = None
    if n == 2:

        function_plot = []
        variables = ["x", "y"]

        for i in range(n):

            terms = []

            for j in range(n):

                coef = A[i][j]

                if coef == 0:
                    continue

                if coef == 1:
                    terms.append(f"{variables[j]}")
                elif coef == -1:
                    terms.append(f"-{variables[j]}")
                else:
                    terms.append(f"{coef}*{variables[j]}")

            lhs = " + ".join(terms).replace("+ -", "- ")
            function_plot.append(f"{lhs} - ({b[i]})")

    # verificar diagonal dominante en el sistean 
    diagonal_dominant = is_diagonally_dominant(A)

    reason = None
    if not diagonal_dominant:
        reason = "La matriz no es diagonal dominante, el método puede no converger."

    for iteration in range(max_iter):

        x_next = np.zeros_like(xk)

        for i in range(n):

            if abs(A[i][i]) < 1e-12:
                raise ValueError(f"Zero pivot detected at row {i}")

            sum_ax = 0

            for j in range(n):

                if j != i:
                    sum_ax += A[i][j] * xk[j]

            x_next[i] = (b[i] - sum_ax) / A[i][i]

        error = np.linalg.norm(x_next - xk, ord=np.inf)

        history.append({
            "iter": iteration + 1,
            "x": x_next.tolist(),
            "error": error
        })

        if error < tol:
            return {
                "dimension": n,
                "root": x_next.tolist(),
                "iterations": history,
                "iteration": iteration,
                "history": history,
                "converged": True,
                "functions": function_plot,
                "diagonal_dominant": diagonal_dominant
            }

        xk = x_next

    return {
        "dimension": n,
        "root": xk.tolist(),
        "iterations": history,
        "history": history,
        "converged": False,
        "functions": function_plot,
        "diagonal_dominant": diagonal_dominant,
        "reason": reason if reason else "Se alcanzó el máximo de iteraciones sin converger."
    }