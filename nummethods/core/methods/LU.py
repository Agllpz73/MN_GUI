import numpy as np

def metodo_lu(matrix):
    matrix = np.array(matrix, dtype=float)

    n = matrix.shape[0]

    # Separar A y b
    A = matrix[:, :-1]
    b = matrix[:, -1]

    # Inicializar matrices
    L = np.zeros((n, n))
    U = np.zeros((n, n))

    tol = 1e-12  # tolerancia numérica para evitar divisiones por valores muy pequeños

    # LU por método de Doolittle
    for i in range(n):

        # Construir U
        for k in range(i, n):
            suma = sum(L[i][j] * U[j][k] for j in range(i))
            U[i][k] = A[i][k] - suma

        # Verificar pivote cero
        if abs(U[i][i]) < tol:
            raise ValueError(
                "El método LU no puede aplicarse porque se encontró un pivote cero. "
                "La matriz es singular o requiere pivoteo."
            )

        # Construir L
        L[i][i] = 1

        for k in range(i + 1, n):
            suma = sum(L[k][j] * U[j][i] for j in range(i))
            L[k][i] = (A[k][i] - suma) / U[i][i]

    # Sustitución hacia adelante (Ly = b)
    y = np.zeros(n)

    for i in range(n):
        suma = sum(L[i][j] * y[j] for j in range(i))
        y[i] = b[i] - suma

    # Sustitución hacia atrás (Ux = y)
    x = np.zeros(n)

    for i in range(n - 1, -1, -1):

        if abs(U[i][i]) < tol:
            raise ValueError(
                "No se puede realizar la sustitución hacia atrás porque U tiene un pivote cero."
            )

        suma = sum(U[i][j] * x[j] for j in range(i + 1, n))
        x[i] = (y[i] - suma) / U[i][i]

    return {
        "A": A.tolist(),
        "factor1": L.tolist(),
        "factor2": U.tolist(),
        "b": b.tolist(),
        "y": y.tolist(),
        "x": x.tolist(),
        "method" : "Factorización LU",
        "factor1_name" : "L",
        "factor2_name" : "U",
        "forward_equation": "Ly = b",
        "backward_equation": "Ux = y"
    }