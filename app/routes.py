# app/routes.py
from flask import Blueprint, render_template

main_bp = Blueprint("main", __name__)

@main_bp.get("/")
def home():
    return render_template("home.html")

@main_bp.get("/ec-no-lineales")
def non_linear_eq():
    return render_template("sections/placeholder.html", title="Ecuaciones no lineales")

@main_bp.get("/sist-ec-no-lineales")
def non_linear_systems():
    return render_template("sections/placeholder.html", title="Sistemas de ecuaciones no lineales")

@main_bp.get("/sist-ec-lineales")
def linear_systems():
    return render_template("sections/placeholder.html", title="Sistemas de ecuaciones lineales")

@main_bp.get("/factorizacion")
def factorization():
    return render_template("sections/placeholder.html", title="Factorización")

@main_bp.get("/iterativos")
def iterative():
    return render_template("sections/placeholder.html", title="Métodos iterativos")

@main_bp.get("/interpolacion")
def interpolation():
    return render_template("sections/placeholder.html", title="Interpolación / Aproximación")

@main_bp.get("/integracion")
def integration():
    return render_template("sections/placeholder.html", title="Integración numérica")

@main_bp.get("/edo")
def ode():
    return render_template("sections/placeholder.html", title="EDO")
