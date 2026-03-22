def gauss_elimination(matrix):
    n = len(matrix)

    A = [row[:] for row in matrix]
    steps = []

    for i in range(n):
        max_row = i
        for k in range(i + 1, n):
            if abs(A[k][i]) > abs(A[max_row][i]):
                max_row = k

        A[i], A[max_row] = A[max_row], A[i]

        if abs(A[i][i]) < 1e-12:
            return {
                "status": "error",
                "message": "El sistema no tiene solución única",
                "iterations": steps
            }

        for j in range(i + 1, n):
            factor = A[j][i] / A[i][i]
            for k in range(i, n + 1):
                A[j][k] -= factor * A[i][k]

        steps.append([row[:] for row in A])

    x = [0] * n

    for i in range(n - 1, -1, -1):
        x[i] = A[i][n]

        for j in range(i + 1, n):
            x[i] -= A[i][j] * x[j]

        if abs(A[i][i]) < 1e-12:
            return {
                "status": "error",
                "message": "El sistema no tiene solución única",
                "iterations": steps
            }

        x[i] /= A[i][i]

    return {
        "status": "success",
        "solution": x,
        "iterations": steps
    }