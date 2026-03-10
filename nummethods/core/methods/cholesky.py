import numpy as np

def metodo_cholesky(matrix):

    matrix = np.array(matrix, dtype=float)

    n = matrix.shape[0]

    # separar A y b
    A = matrix[:, :-1]
    b = matrix[:, -1]

    # verificar que A sea simétrica
    if not np.allclose(A, A.T):
        raise ValueError("La matriz A debe ser simétrica para aplicar Cholesky.")

    L = np.zeros((n, n))
    tol = 1e-12

    # descomposición de Cholesky
    for i in range(n):
        for j in range(i + 1):

            suma = sum(L[i][k] * L[j][k] for k in range(j))

            if i == j:
                value = A[i][i] - suma

                if value <= tol:
                    raise ValueError(
                        "La matriz no es definida positiva. "
                        "El método de Cholesky no puede aplicarse."
                    )

                L[i][j] = np.sqrt(value)

            else:
                L[i][j] = (A[i][j] - suma) / L[j][j]

    LT = L.T

    # ---------------------------
    # Sustitución hacia adelante
    # Ly = b
    # ---------------------------

    y = np.zeros(n)

    for i in range(n):
        suma = sum(L[i][j] * y[j] for j in range(i))
        y[i] = (b[i] - suma) / L[i][i]

    # ---------------------------
    # Sustitución hacia atrás
    # Lᵀx = y
    # ---------------------------

    x = np.zeros(n)

    for i in range(n - 1, -1, -1):
        suma = sum(LT[i][j] * x[j] for j in range(i + 1, n))
        x[i] = (y[i] - suma) / LT[i][i]

    return {
        "A": A.tolist(),
        "factor1": L.tolist(),
        "factor2": LT.tolist(),
        "b": b.tolist(),
        "y": y.tolist(),
        "x": x.tolist(),
        "method": "Factorización Cholesky",
        "factor1_name": "L",
        "factor2_name": "Lᵀ",
        "forward_equation": "Ly = b",
        "backward_equation": "Lᵀx = y"
    }