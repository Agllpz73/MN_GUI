import csv
import io

"""
Lee un archivo CSV subido por el usuario y devuelve su contenido como un diccionario 
para poder ser procesado por los métodos numéricos. 
Se encarga de validar el formato del archivo y manejar errores comunes.
"""
class CSVReaderError(Exception):
    """Excepción personalizada para errores del lector CSV."""
    pass


def is_number(value):
    try:
        float(value)
        return True
    except ValueError:
        return False


def read_csv_file(file_storage):
    """
    Lee un archivo CSV y devuelve los datos como lista de listas (float).
    Realiza validaciones básicas de formato y tipo numérico.
    """

    if not file_storage or file_storage.filename == "":
        raise CSVReaderError("No se seleccionó archivo")

    if not file_storage.filename.lower().endswith(".csv"):
        raise CSVReaderError("El archivo debe ser formato .csv")

    try:
        stream = io.StringIO(file_storage.stream.read().decode("utf-8"))

        # Detectar delimitador automáticamente
        sample = stream.read(1024)
        stream.seek(0)
        dialect = csv.Sniffer().sniff(sample)
        reader = csv.reader(stream, dialect)

        data = []

        first_row = next(reader, None)
        if first_row is None:
            raise CSVReaderError("Archivo vacío")

        # Detectar si la primera fila es encabezado
        if all(is_number(value.strip()) for value in first_row):
            data.append([float(value.strip()) for value in first_row])
        # Si no es numérica, la ignoramos como header

        for row in reader:
            cleaned_row = []

            for value in row:
                value = value.strip()

                if not is_number(value):
                    raise CSVReaderError("Entradas no correctas")

                cleaned_row.append(float(value))

            data.append(cleaned_row)

        if not data:
            raise CSVReaderError("Archivo sin datos numéricos")

        return data

    except CSVReaderError:
        raise
    except Exception:
        raise CSVReaderError("Error al procesar el archivo")
