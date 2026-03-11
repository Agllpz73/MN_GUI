import numpy as np
from ..utils.parser import is_diagonally_dominant
"""
Nota importante para este método, mantenemos el mismo return que la cateogria de Sis. Ec. no lineales para reutilizar el plotter y el graph de esa categoría
"""


def gauss_seidel_system(matrix, x0, tol, max_iter):
    
    print("matrix:", matrix)
    print("shape:", np.array(matrix).shape)
    print("x0:", x0)
    print("tol: ", tol)
    print("max_iter", max_iter)
    matrix = np.array(matrix, dtype=float)

    n = len(matrix)

    # separar A y b de la matriz aumentada
    A = matrix[:, :-1]
    b = matrix[:, -1]

    xk = np.array(x0, dtype=float)

    history = []
    function_plot = None

    # verificar dominancia diagonal
    diagonal_dominant = is_diagonally_dominant(A)

    reason = None
    if not diagonal_dominant:
        reason = "La matriz no es diagonal dominante, el método puede no converger."

    for iteration in range(max_iter):

        x_next = xk.copy()

        for i in range(n):

            if abs(A[i][i]) < 1e-12:
                raise ValueError(f"Zero pivot detected at row {i}")

            sum1 = np.dot(A[i, :i], x_next[:i])
            sum2 = np.dot(A[i, i+1:], xk[i+1:])

            x_next[i] = (b[i] - sum1 - sum2) / A[i][i]

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