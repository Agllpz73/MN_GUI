import numpy as np

def metodo_cholesky(matrix):
    try:
        matrix = np.array(matrix, dtype=float)

        n = matrix.shape[0]
        tol = 1e-12

        # validar matriz aumentada
        if matrix.ndim != 2 or matrix.shape[1] != n + 1:
            return {
                "status": "error",
                "message": "La matriz aumentada no tiene dimensiones válidas para el método de Cholesky.",
                "method": "Factorización Cholesky"
            }

        # separar A y b
        A = matrix[:, :-1]
        b = matrix[:, -1]

        # validar matriz cuadrada
        if A.shape[0] != A.shape[1]:
            return {
                "status": "error",
                "message": "La matriz de coeficientes debe ser cuadrada para aplicar Cholesky.",
                "method": "Factorización Cholesky"
            }

        # verificar que A sea simétrica
        if not np.allclose(A, A.T):
            return {
                "status": "error",
                "message": "La matriz A debe ser simétrica para aplicar Cholesky.",
                "method": "Factorización Cholesky"
            }

        L = np.zeros((n, n))

        # descomposición de Cholesky
        for i in range(n):
            for j in range(i + 1):

                suma = sum(L[i][k] * L[j][k] for k in range(j))

                if i == j:
                    value = A[i][i] - suma

                    if value <= tol:
                        return {
                            "status": "error",
                            "message": (
                                "La matriz no es definida positiva. "
                                "El método de Cholesky no puede aplicarse."
                            ),
                            "method": "Factorización Cholesky"
                        }

                    L[i][j] = np.sqrt(value)

                else:
                    if abs(L[j][j]) < tol:
                        return {
                            "status": "error",
                            "message": (
                                "No se puede continuar con la factorización porque se encontró un pivote cero."
                            ),
                            "method": "Factorización Cholesky"
                        }

                    L[i][j] = (A[i][j] - suma) / L[j][j]

        LT = L.T

        # Sustitución hacia adelante: Ly = b
        y = np.zeros(n)

        for i in range(n):
            if abs(L[i][i]) < tol:
                return {
                    "status": "error",
                    "message": (
                        "No se puede realizar la sustitución hacia adelante porque L tiene un pivote cero."
                    ),
                    "method": "Factorización Cholesky"
                }

            suma = sum(L[i][j] * y[j] for j in range(i))
            y[i] = (b[i] - suma) / L[i][i]

        # Sustitución hacia atrás: Lᵀx = y
        x = np.zeros(n)

        for i in range(n - 1, -1, -1):
            if abs(LT[i][i]) < tol:
                return {
                    "status": "error",
                    "message": (
                        "No se puede realizar la sustitución hacia atrás porque Lᵀ tiene un pivote cero."
                    ),
                    "method": "Factorización Cholesky"
                }

            suma = sum(LT[i][j] * x[j] for j in range(i + 1, n))
            x[i] = (y[i] - suma) / LT[i][i]

        return {
            "status": "success",
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

    except Exception as e:
        return {
            "status": "error",
            "message": f"Ocurrió un error al aplicar el método de Cholesky: {str(e)}",
            "method": "Factorización Cholesky"
        }