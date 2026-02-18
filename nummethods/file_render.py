import csv
import io

"""
Lee un archivo CSV subido por el usuario y devuelve su contenido como un diccionario 
para poder ser procesado por los métodos numéricos. 
Se encarga de validar el formato del archivo y manejar errores comunes.
"""
def read_csv_file(file_storage):

    if not file_storage or file_storage.filename == "":
        raise ValueError("No se seleccionó archivo")

    if not file_storage.filename.endswith(".csv"):
        raise ValueError("El archivo debe ser .csv")

    stream = io.StringIO(file_storage.stream.read().decode("utf-8"))
    reader = csv.reader(stream)

    data = []
    for row in reader:
        cleaned = [value.strip() for value in row]
        data.append(cleaned)

    if not data:
        raise ValueError("El archivo está vacío")

    return data
