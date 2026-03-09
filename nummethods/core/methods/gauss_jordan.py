# Se implementara con los pasos que se siguieron, esperando a que salga
def gauss_jordan(matrix):
    
    n = len(matrix)
    A = [row[:] for row in matrix]
    
    steps = []
    
    for i in range(n):
        if A[i][i] == 0:
            swap_row = None
            
            for r in range(i+1, n):
                if A[r][i] != 0:
                    swap_row = r
                    break
                
            if swap_row is None:
                return {
                    "status" : "error",
                    "message" : "La matriz no tiene pivote válido. El sistema puede tener infinitas soluciones."
                }
            A[i] , A[swap_row]= A[swap_row], A[i]
            steps.append({
                "operations": f"F{i+1} ↔️ F{swap_row+1}",
                "matrix" : [row[:] for row in A]
            })
        pivot = A[i][i]
        
        if pivot != 1:
            for j in range(i, n+1):
                A[i][j] = A[i][j] /pivot
            steps.append({
                "operations" : f"F{i+1} = F{i+1} / {pivot: .4f}",
                "matrix": [row[:] for row in A]
            })
        
        for k in range(n):
            
            if k==i:
                continue
            factor = A[k][i]
            
            if factor == 0:
                continue
            
            for j in range(i, n+1):
                A[k][j] = A[k][j] - factor*A[i][j]
            steps.append({
                "operations" : f"F{k+1} = F{k+1} - ({factor:.4f})F{i+1}",
                "matrix": [row[:] for row in A]
            })
    
    for row in A:
        if all(abs(v) < 1e-12 for v in row[:-1]) and abs(row[-1]) > 1e-12:
            return{
                "status": "error",
                "message": "El sistema es inconsistente (no tiene solución)"
            }
    rank = sum(any(abs(v) > 1e-12 for v in row[:-1]) for row in A)
    
    if rank < n:
        return {
            "status" : "error",
            "message" : "El sistema tiene infinitas soluciones."
        }
    
    solution = [A[i][n] for i in range(n)]
    
    
    return {
        "status" : "success",
        "solution" : solution,
        "iterations" : steps
    }