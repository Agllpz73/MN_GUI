# app/routes.py
from flask import Blueprint, abort, app, render_template

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


# Aquí se colocan la carga de los html
"""
"""
@main_bp.route("/<category>/<method>")
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

    return render_template(
        "calculator.html",
        category=category,   
        method=method,
        method_template=methods[method]
        
    )


