# app/routes.py
from flask import Blueprint, abort, app, render_template
from flask import request, jsonify, redirect, url_for, flash
from .file_render import read_csv_file
from .validators import (
    validate_minimos_cuadrados,
    validate_lagrange,
    validate_sistema_lineal
)
from .file_render import CSVReaderError
from flask import jsonify, request
from .core.engine import solve


method_validators = {
    "minimos-cuadrados": validate_minimos_cuadrados,
    "mc-transf": validate_minimos_cuadrados,
    "lagrange": validate_lagrange,
    "gauss": validate_sistema_lineal,
    "gauss-jordan": validate_sistema_lineal,
    "lu": validate_sistema_lineal,
    "cholesky": validate_sistema_lineal,
}



"""
Creación de las rutas para la aplicación, cada ruta corresponde a una categoría o método específico.
Se utiliza un Blueprint para organizar las rutas relacionadas con la funcionalidad principal de la aplicación.
"""
main_bp = Blueprint("main", __name__)

@main_bp.get("/")
def home():
    return render_template("home.html")

@main_bp.get("/ec-no-lineales")
def non_linear_eq():
    return render_template("calculator.html", title="Ecuaciones no lineales")

@main_bp.get("/sist-ec-no-lineales")
def non_linear_systems():
    return render_template("calculator.html", title="Sistemas de ecuaciones no lineales")

@main_bp.get("/sist-ec-lineales")
def linear_systems():
    return render_template("calculator.html", title="Sistemas de ecuaciones lineales")

@main_bp.get("/factorizacion")
def factorization():
    return render_template("calculator.html", title="Factorización")

@main_bp.get("/iterativos")
def iterative():
    return render_template("calculator.html", title="Métodos iterativos")

@main_bp.get("/interpolacion")
def interpolation():
    return render_template("calculator.html", title="Interpolación / Aproximación")

@main_bp.get("/integracion")
def integration():
    return render_template("calculator.html", title="Integración numérica")

@main_bp.get("/edo")
def ode():
    return render_template("calculator.html", title="EDO")

@main_bp.get("/<category>")
def category(category):
    # página por categoría (cards, descripción, etc.)
    return render_template("calculator.html", category=category)


@main_bp.get("/calculator-demo")
def calculator_demo():
    return render_template("calculator.html")


"""
Aquí iniciamos el módulo de carga de archivos.
Se espera un archivo CSV con el formato adecuado 
para cada método,que será procesado por la función 
read_csv_file, se procesa en la API REST y luego
utilizado en los cálculos numéricos
"""
# Método de ejemplo para poder corroborar la carga de archivos, se puede replicar para otros métodos que requieran entrada de datos desde archivos.

@main_bp.route("/<category>/<method>", methods=["GET", "POST"])
def method_view(category, method):
    methods = {
        "newton-raphson": "methods/newton_raphson.html",
        "biseccion": "methods/biseccion.html",
        "secante": "methods/secante.html",
        "falsa-posicion": "methods/falsa_posicion.html",
        "punto-fijo": "methods/punto_fijo.html",
        "newton-raphson-sistema": "methods/newton_raphson_Sistema.html",
        "punto-fijo-sistema": "methods/punto_fijo_Sitema.html",
        "gauss": "methods/gauss.html",
        "gauss-jordan": "methods/gauss_jordan.html",
        "matriz-inversa": "methods/matriz_inversa.html",
        "lu": "methods/lu.html",
        "cholesky": "methods/cholesky.html",
        "gauss-seidel": "methods/gauss_seidel.html",
        "jacobi": "methods/jacobi.html",
        "lagrange": "methods/lagrange.html",
        "newton-dd": "methods/newton_divididas.html",
        "newton-df": "methods/newton_diferencias.html",
        "minimos-cuadrados": "methods/minimos_cuadrados.html",
        "mc-transf": "methods/mc_transf.html",
        "trapecio": "methods/trapecio.html",
        "simpson-1-3": "methods/simpson_1_3.html",
        "simpson-3-8": "methods/simpson_3_8.html",
        "cuadratura-gauss": "methods/cuadratura_gauss.html",
        "euler": "methods/euler.html",
        "runge-kutta": "methods/runge_kutta.html",
        "euler-mejorado": "methods/euler_mejorado.html"

    }

    if method not in methods:
        abort(404)

    datos = None
    error = None
    filename = None
    success = False
    
    # Lista de métodos que requieren carga de archivos, para mostrar u ocultar el formulario de carga en el template
    file_methods = {
    "minimos-cuadrados",
    "mc-transf",
    "lagrange",
    "newton-dd",
    "newton-df",
    "gauss",
    "gauss-jordan",
    "matriz-inversa",
    "lu",
    "cholesky",
    "gauss-seidel",
    "jacobi",
    "trapecio",
    "simpson-1-3",
    "simpson-3-8",
    "cuadratura-gauss"
    }


    # ===============================
    # MANEJO DE POST
    # ===============================
    if request.method == "POST":

        if method in file_methods:

            archivo = request.files.get("matrix_file")

            if not archivo or archivo.filename == "":
                flash("Debe adjuntar un archivo CSV", "error")
            else:
                try:
                    data = read_csv_file(archivo)

                    if method in method_validators:
                        method_validators[method](data)

                    flash(f"Archivo cargado: {archivo.filename}", "success")

                except CSVReaderError as e:
                    flash(str(e), "error")

            return redirect(url_for(
                "main.method_view",
                category=category,
                method=method
            ))

       

    return render_template(
        "calculator.html",
        method=method,
        method_template=methods[method],
        datos=datos,
        
        error=error,
        filename=filename,
        success=success
    )
    
"""
Validación de entrada por archivos
"""
@main_bp.route("/validate-file", methods=["POST"])
def validate_file():

    archivo = next(iter(request.files.values()), None)

    if not archivo or archivo.filename == "":
        return {"status": "error", "message": "No se seleccionó archivo"}, 400

    try:
        read_csv_file(archivo)
        return {"status": "success", "filename": archivo.filename}
    except ValueError:
        return {"status": "error", "message": "Entradas no correctas"}, 400


"""
---------------------
Sección de rutas para la API REST
----------------------
"""




@main_bp.route("/api/solve/<method>", methods=["POST"])
def solve_api(method):

    

    try:
        if request.is_json:
            data = request.json()
        else: 
            file = request.files.get("matrix_file")
            if not file:
                return jsonify({
                    "error" : "No se envio archivo .CSV"
                }), 400
                
            data = {
                "file" : file
            }
        result = solve(method, data)
        return jsonify(result)
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400