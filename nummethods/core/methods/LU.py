import numpy as np

def metodo_lu(matrix):
    try:
        matrix = np.array(matrix, dtype=float)

        n = matrix.shape[0]
        tol = 1e-12

        # validar matriz aumentada
        if matrix.ndim != 2 or matrix.shape[1] != n + 1:
            return {
                "status": "error",
                "message": "La matriz aumentada no tiene dimensiones válidas para el método LU.",
                "method": "Factorización LU"
            }

        # Separar A y b
        A = matrix[:, :-1]
        b = matrix[:, -1]

        # validar matriz cuadrada
        if A.shape[0] != A.shape[1]:
            return {
                "status": "error",
                "message": "La matriz de coeficientes debe ser cuadrada para aplicar el método LU.",
                "method": "Factorización LU"
            }

        # Inicializar matrices
        L = np.zeros((n, n))
        U = np.zeros((n, n))

        # LU por método de Doolittle
        for i in range(n):

            # Construir U
            for k in range(i, n):
                suma = sum(L[i][j] * U[j][k] for j in range(i))
                U[i][k] = A[i][k] - suma

            # Verificar pivote cero
            if abs(U[i][i]) < tol:
                return {
                    "status": "error",
                    "message": (
                        "El método LU no puede aplicarse porque se encontró un pivote cero. "
                        "La matriz es singular o requiere pivoteo."
                    ),
                    "method": "Factorización LU"
                }

            # Construir L
            L[i][i] = 1.0

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
                return {
                    "status": "error",
                    "message": (
                        "No se puede realizar la sustitución hacia atrás porque U tiene un pivote cero."
                    ),
                    "method": "Factorización LU"
                }

            suma = sum(U[i][j] * x[j] for j in range(i + 1, n))
            x[i] = (y[i] - suma) / U[i][i]

        return {
            "status": "success",
            "A": A.tolist(),
            "factor1": L.tolist(),
            "factor2": U.tolist(),
            "b": b.tolist(),
            "y": y.tolist(),
            "x": x.tolist(),
            "method": "Factorización LU",
            "factor1_name": "L",
            "factor2_name": "U",
            "forward_equation": "Ly = b",
            "backward_equation": "Ux = y"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": f"Ocurrió un error al aplicar el método LU: {str(e)}",
            "method": "Factorización LU"
        }