# nummethods/navigation.py

NAV = [
    {
        "label": "Ec. no lineales",
        "key": "ec_no_lineales",
        "endpoint": "main.category",
        "args": {"category": "ec-no-lineales"},
        "methods": [
            {"label": "Bisección", "slug": "biseccion"},
            {"label": "Falsa Posición", "slug": "falsa-posicion"},
            {"label": "Newton-Raphson", "slug": "newton-raphson"},
            {"label": "Punto Fijo", "slug": "punto-fijo"},
            {"label": "Secante", "slug": "secante"},
        ],
    },
    {
        "label": "Sist. Ec. No lineales",
        "key": "sist_no_lineales",
        "endpoint": "main.category",
        "args": {"category": "sist-ec-no-lineales"},
        "methods": [
            {"label": "Newton-Raphson", "slug": "newton-raphson"},
            {"label": "Punto Fijo", "slug": "punto-fijo"},
        ],
    },
    {
        "label": "Sist. Ec. Lineales",
        "key": "sist_lineales",
        "endpoint": "main.category",
        "args": {"category": "sist-ec-lineales"},
        "methods": [
            {"label": "Gauss", "slug": "gauss"},
            {"label": "Gauss-Jordan", "slug": "gauss-jordan"},
            {"label": "Matriz Inversa", "slug": "matriz-inversa"},
        ],
    },
    {
        "label": "Factorización",
        "key": "factorizacion",
        "endpoint": "main.category",
        "args": {"category": "factorizacion"},
        "methods": [
            {"label": "LU", "slug": "lu"},
            {"label": "Cholesky", "slug": "cholesky"},
        ],
    },
    {
        "label": "Iterativos",
        "key": "iterativos",
        "endpoint": "main.category",
        "args": {"category": "iterativos"},
        "methods": [
            {"label": "Gauss-Seidel", "slug": "gauss-seidel"},
            {"label": "Jacobi", "slug": "jacobi"},
        ],
    },
    {
        "label": "Interpolación / Aproximación",
        "key": "interpolacion",
        "endpoint": "main.category",
        "args": {"category": "interpolacion"},
        "methods": [
            {"label": "Lagrange", "slug": "lagrange"},
            {"label": "Newton DD", "slug": "newton-dd"},
            {"label": "Newton DF", "slug": "newton-df"},
            {"label": "Mínimos cuadrados", "slug": "minimos-cuadrados"},
            {"label": "MC Transf.", "slug": "mc-transf"},
        ],
    },
    {
        "label": "Integración",
        "key": "integracion",
        "endpoint": "main.category",
        "args": {"category": "integracion"},
        "methods": [
            {"label": "Trapecio", "slug": "trapecio"},
            {"label": "Simpson 1/3", "slug": "simpson-1-3"},
            {"label": "Simpson 3/8", "slug": "simpson-3-8"},
            {"label": "Cuadratura de Gauss", "slug": "cuadratura-gauss"},
        ],
    },
    {
        "label": "EDO",
        "key": "edo",
        "endpoint": "main.category",
        "args": {"category": "edo"},
        "methods": [
            {"label": "Euler", "slug": "euler"},
            {"label": "Euler mejorado", "slug": "euler-mejorado"},
            {"label": "Runge-Kutta", "slug": "runge-kutta"},
        ],
    },
]
