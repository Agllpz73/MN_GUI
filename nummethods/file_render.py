import csv
import io

"""
Lee un archivo CSV subido por el usuario y devuelve su contenido como un diccionario 
para poder ser procesado por los métodos numéricos. 
Se encarga de validar el formato del archivo y manejar errores comunes.
"""


def is_number(value):
    
    try:
        float(value)
        return True
    except ValueError:
        return False


def read_csv_file(file_storage):

    if not file_storage or file_storage.filename == "":
        raise ValueError("Entradas no correctas")

    if not file_storage.filename.endswith(".csv"):
        raise ValueError("Entradas no correctas")

    try:
        stream = io.StringIO(file_storage.stream.read().decode("utf-8"))
        reader = csv.reader(stream)

        data = []

        # Saltar encabezados
        headers = next(reader, None)

        for row in reader:
            cleaned_row = []

            for value in row:
                value = value.strip()

                if not is_number(value):
                    raise ValueError("Entradas no correctas")

                cleaned_row.append(float(value))

            data.append(cleaned_row)

        if not data:
            raise ValueError("Entradas no correctas")

        return data

    except Exception:
        raise ValueError("Entradas no correctas")
