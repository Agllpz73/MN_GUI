def validate_minimos_cuadrados(data):
    if not data:
        raise ValueError("Archivo vacío")

    if any(len(row) != 2 for row in data):
        raise ValueError("Se requieren exactamente 2 columnas (x,y)")

    if len(data) < 2:
        raise ValueError("Se requieren al menos 2 puntos")


def validate_lagrange(data):
    if any(len(row) != 2 for row in data):
        raise ValueError("Lagrange requiere exactamente 2 columnas")

    if len(data) < 2:
        raise ValueError("Se requieren al menos 2 puntos para interpolar")


def validate_sistema_lineal(data):

    columnas = len(data[0])

    if columnas < 2:
        raise ValueError("Sistema inválido")

    for row in data:
        if len(row) != columnas:
            raise ValueError("Filas con diferente número de columnas")

    if columnas - 1 != len(data):
        raise ValueError("La matriz debe ser cuadrada")
