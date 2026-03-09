import numpy as np

def matriz_inversa_gauss_jordan(matrix):

    n = len(matrix)

    # separar A y b
    A = [row[:-1] for row in matrix]
    b = [row[-1] for row in matrix]

    A = np.array(A, dtype=float)
    b = np.array(b, dtype=float)

    # verificar matriz cuadrada
    if A.shape[0] != A.shape[1]:
        return {
            "status": "error",
            "message": "La matriz debe ser cuadrada para calcular la inversa."
        }

    # verificar determinante
    if abs(np.linalg.det(A)) < 1e-12:
        return {
            "status": "error",
            "message": "La matriz no tiene inversa (determinante = 0)."
        }

    I = np.identity(n)

    # matriz aumentada
    AI = np.hstack((A, I))

    steps = []

    for i in range(n):

        pivot = AI[i][i]

        if abs(pivot) < 1e-12:

            swap_row = None

            for r in range(i+1, n):
                if abs(AI[r][i]) > 1e-12:
                    swap_row = r
                    break

            if swap_row is None:
                return {
                    "status": "error",
                    "message": "No se encontró pivote válido."
                }

            AI[[i, swap_row]] = AI[[swap_row, i]]

            steps.append({
                "operations": f"F{i+1} ↔️ F{swap_row+1}",
                "matrix": AI.copy().tolist()
            })

            pivot = AI[i][i]

        # normalizar pivote
        if pivot != 1:

            AI[i] = AI[i] / pivot

            steps.append({
                "operations": f"F{i+1} = F{i+1} / {pivot:.4f}",
                "matrix": AI.copy().tolist()
            })

        # eliminar otras filas
        for k in range(n):

            if k == i:
                continue

            factor = AI[k][i]

            if abs(factor) < 1e-12:
                continue

            AI[k] = AI[k] - factor * AI[i]

            steps.append({
                "operations": f"F{k+1} = F{k+1} - ({factor:.4f})F{i+1}",
                "matrix": AI.copy().tolist()
            })

    # extraer inversa
    inverse = AI[:, n:]

    # calcular solución
    solution = inverse.dot(b)

    return {
        "status": "success",
        "inverse": inverse.tolist(),
        "solution": solution.tolist(),
        "iterations": steps,
        "vector_b" : b.tolist()
    }