def gauss_jordan(matrix):
    EPS = 1e-12

    try:
        n = len(matrix)

        if n == 0:
            return {
                "status": "error",
                "message": "La matriz está vacía.",
                "iterations": []
            }

        # validar matriz aumentada
        for row in matrix:
            if len(row) != n + 1:
                return {
                    "status": "error",
                    "message": "La matriz aumentada no tiene dimensiones válidas.",
                    "iterations": []
                }

        A = [row[:] for row in matrix]
        steps = []

        for i in range(n):
            # =========================
            # PIVOTEO PARCIAL
            # =========================
            max_row = i
            max_value = abs(A[i][i])

            for r in range(i + 1, n):
                if abs(A[r][i]) > max_value:
                    max_value = abs(A[r][i])
                    max_row = r

            if max_value < EPS:
                continue

            if max_row != i:
                A[i], A[max_row] = A[max_row], A[i]
                steps.append({
                    "operations": f"F{i+1} ↔️ F{max_row+1}",
                    "matrix": [row[:] for row in A]
                })

            pivot = A[i][i]

            # =========================
            # NORMALIZAR FILA PIVOTE
            # =========================
            if abs(pivot) >= EPS and abs(pivot - 1.0) > EPS:
                for j in range(i, n + 1):
                    A[i][j] = A[i][j] / pivot

                steps.append({
                    "operations": f"F{i+1} = F{i+1} / {pivot:.4f}",
                    "matrix": [row[:] for row in A]
                })

            # =========================
            # HACER CEROS EN LA COLUMNA
            # =========================
            for k in range(n):
                if k == i:
                    continue

                factor = A[k][i]

                if abs(factor) < EPS:
                    continue

                for j in range(i, n + 1):
                    A[k][j] = A[k][j] - factor * A[i][j]

                steps.append({
                    "operations": f"F{k+1} = F{k+1} - ({factor:.4f})F{i+1}",
                    "matrix": [row[:] for row in A]
                })

        # =========================
        # CLASIFICAR EL SISTEMA
        # =========================
        inconsistent = False
        rank = 0

        for row in A:
            coef_zero = all(abs(v) < EPS for v in row[:-1])
            indep_nonzero = abs(row[-1]) >= EPS

            if coef_zero and indep_nonzero:
                inconsistent = True
                break

            if not coef_zero:
                rank += 1

        if inconsistent:
            return {
                "status": "error",
                "message": "El sistema es inconsistente (no tiene solución).",
                "iterations": steps
            }

        if rank < n:
            return {
                "status": "error",
                "message": "El sistema tiene infinitas soluciones.",
                "iterations": steps
            }

        solution = [A[i][n] for i in range(n)]

        return {
            "status": "success",
            "solution": solution,
            "iterations": steps
        }

    except Exception as e:
        return {
            "status": "error",
            "message": f"Ocurrió un error al resolver el sistema: {str(e)}",
            "iterations": []
        }