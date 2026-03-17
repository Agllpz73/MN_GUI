const methodDetails = {
        biseccion: {
          title: "Método de Bisección",
          subtitle:
            "Método cerrado para aproximar raíces en un intervalo [a, b].",
          params: [
            {
              name: "Sintaxis permitida",
              description: "Operadores y funciones disponibles.",
              syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x)",
            },
            {
              name: "Función f(x)",
              description:
                "Expresión matemática continua que se desea evaluar. Debe escribirse con una sintaxis válida para la aplicación.",
              syntax: "Ejemplo: x^3 - x - 2 ó x**3 - x - 2*x**2",
            },
            {
              name: "Límite inferior a",
              description:
                "Extremo izquierdo del intervalo inicial donde se buscará la raíz.",
            },
            {
              name: "Límite superior b",
              description:
                "Extremo derecho del intervalo inicial donde se buscará la raíz.",
            },
            {
              name: "Tolerancia (ε)",
              description: "Error máximo permitido para detener el método.",
            },
            {
              name: "Iteraciones máximas",
              description:
                "Número máximo de iteraciones antes de detener el procedimiento.",
            },
          ],
          errors: [
            "La función debe poder evaluarse correctamente en el intervalo.",
            "Debe cumplirse que f(a) y f(b) tengan signos opuestos.",
            "El límite inferior debe ser menor que el límite superior.",
            "La tolerancia debe ser mayor que cero.",
            "Las iteraciones máximas deben ser un entero positivo.",
          ],
        },

        "newton-raphson": {
          title: "Método de Newton-Raphson",
          subtitle:
            "Método abierto que aproxima raíces a partir de un valor inicial.",
          params: [
            {
              name: "Sintaxis permitida",
              description: "Operadores y funciones disponibles.",
              syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x)",
            },
            {
              name: "Función f(x)",
              description: "Función para la cual se desea encontrar una raíz.",
              syntax: "Ejemplo: x^3 - 2*x - 5",
            },
            {
              name: "Valor inicial x₀",
              description:
                "Punto inicial desde donde comienza el método iterativo.",
            },
            {
              name: "Tolerancia (ε)",
              description: "Criterio de paro basado en el error aceptable.",
            },
            {
              name: "Iteraciones máximas",
              description: "Número máximo de iteraciones permitidas.",
            },
          ],
          errors: [
            "La función debe ser derivable en la zona de análisis.",
            "La derivada no debe anularse durante el proceso.",
            "Un mal valor inicial puede provocar divergencia.",
            "La tolerancia debe ser mayor que cero.",
            "Las iteraciones máximas deben ser positivas.",
          ],
        },

        "falsa-posicion": {
          title: "Método de Falsa Posición",
          subtitle:
            "Método cerrado que usa interpolación lineal dentro de un intervalo.",
          params: [
            {
              name: "Sintaxis permitida",
              description: "Operadores y funciones disponibles.",
              syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x)",
            },
            {
              name: "Función f(x)",
              description: "Función continua a evaluar.",
              syntax: "Ejemplo: exp(-x) - x",
            },
            {
              name: "Límite inferior a",
              description: "Extremo izquierdo del intervalo.",
            },
            {
              name: "Límite superior b",
              description: "Extremo derecho del intervalo.",
            },
            {
              name: "Tolerancia (ε)",
              description: "Error máximo permitido.",
            },
            {
              name: "Iteraciones máximas",
              description: "Número máximo de iteraciones.",
            },
          ],
          errors: [
            "Debe existir cambio de signo entre f(a) y f(b).",
            "La función debe ser evaluable en ambos extremos.",
            "Si el intervalo está mal elegido, el método puede ser lento.",
            "La tolerancia debe ser positiva.",
          ],
        },
        secante: {
          title: "Método de la Secante",
          subtitle:
            "Método abierto que aproxima reíces usando dos valores iniciales.",
          params: [
            {
              name: "Sintaxis permitida",
              description: "Operadores y funciones disponibles.",
              syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x)",
            },
            {
              name: "Función f(x)",
              description: "Función continua a evaluar.",
              syntax: "Ejemplo: 0.1*sqrt(y)+0.4*x**2",
            },
            {
              name: "Límite inferior  x₀",
              description:
                "Primera aproximación inicial para comenzar el método.",
            },
            {
              name: "Límite superior x₁",
              description:
                "Segunda aproximación inicial para construir la primera secante.",
            },
            {
              name: "Tolerancia (ε)",
              description: "Error máximo permitido.",
            },
            {
              name: "Iteraciones máximas",
              description: "Número máximo de iteraciones.",
            },
          ],
          errors: [
            "La función debe poder evaluarse correctamente en x₀ y x₁.",
            "Los valores iniciales no deben producir división entre cero en la fórmula iterativa.",
            "Si x₀ y x₁ están mal elegidos, el método puede divergir o converger lentamente.",
            "La tolerancia debe ser mayor que cero.",
            "Las iteraciones máximas deben ser un entero positivo.",
          ],
        },
        "punto-fijo": {
          title: "Método de Punto Fijo",
          subtitle:
            "Método abierto que transforma f(x)=0 en una forma iterativa x=g(x).",
          params: [
            {
              name: "Sintaxis permitida",
              description: "Operadores y funciones disponibles.",
              syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x)",
            },
            {
              name: "Función g(x)",
              description:
                "Función iterativa despejada a partir del problema original. Es la expresión que se usará en la fórmula xₙ₊₁ = g(xₙ).",
              syntax: "Ejemplo: cos(x) ó (x + 2)**(1/3)",
            },
            {
              name: "Valor inicial x₀",
              description:
                "Aproximación inicial desde la cual comienza la iteración.",
            },
            {
              name: "Tolerancia (ε)",
              description:
                "Error máximo permitido para considerar que el método convergió.",
            },
            {
              name: "Iteraciones máximas",
              description:
                "Número máximo de iteraciones antes de detener el proceso.",
            },
          ],
          errors: [
            "La función iterativa g(x) debe estar bien definida en la zona de análisis.",
            "Si la transformación elegida no es adecuada, el método puede no converger.",
            "Un valor inicial mal elegido puede alejar la iteración de la solución.",
            "En general se recomienda que |g'(x)| < 1 cerca del punto fijo para favorecer convergencia.",
            "La tolerancia debe ser mayor que cero.",
            "Las iteraciones máximas deben ser un entero positivo.",
          ],
        },
        "newton-raphson-sistema": {
          title: "Newton-Raphson para sistemas",
          subtitle:
            "Método iterativo para resolver sistemas de ecuaciones no lineales utilizando el Jacobiano.",

          params: [
            {
              name: "Sintaxis permitida",
              description: "Operadores y funciones disponibles.",
              syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x)",
            },
            {
              name: "Número de ecuaciones",
              description:
                "Cantidad de ecuaciones del sistema. Debe coincidir con el número de variables. El sistema solo acepta hasta 3 variables",
            },
            {
              name: "Funciones fᵢ(x)",
              description:
                "Cada ecuación del sistema debe escribirse en forma f(x)=0.",
              syntax:
                "Ejemplo:\nf1(x,y) = x**2 + y - 4\nf2(x,y) = x + y**2 - 4",
            },
            {
              name: "Valores iniciales",
              description:
                "Aproximación inicial para cada variable del sistema.",
              syntax: "Ejemplo:\nx₀ = 1\ny₀ = 1",
            },
            {
              name: "Tolerancia (ε)",
              description:
                "Error máximo permitido entre iteraciones consecutivas para considerar convergencia.",
            },
            {
              name: "Iteraciones máximas",
              description:
                "Número máximo de iteraciones antes de detener el proceso.",
            },
          ],

          errors: [
            "El número de ecuaciones debe coincidir con el número de variables.",
            "Todas las funciones deben estar definidas correctamente.",
            "El Jacobiano no debe ser singular durante las iteraciones.",
            "Si los valores iniciales están lejos de la solución el método puede divergir.",
            "La tolerancia debe ser mayor que cero.",
            "Las iteraciones máximas deben ser un entero positivo.",
          ],
        },

        "punto-fijo-sistema": {
          title: "Punto Fijo para sistemas",
          subtitle:
            "Método iterativo que transforma el sistema en una forma despejada x = g(x).",

          params: [
            {
              name: "Sintaxis permitida",
              description: "Operadores y funciones disponibles.",
              syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x)",
            },
            {
              name: "Número de ecuaciones",
              description:
                "Cantidad de ecuaciones del sistema. Debe coincidir con el número de variables.",
            },
            {
              name: "Funciones despejadas gᵢ(x)",
              description:
                "Cada variable debe despejarse en función de las demás.",
              syntax: "Ejemplo:\nx = sqrt(4 - y)\ny = sqrt(4 - x)",
            },
            {
              name: "Valores iniciales",
              description:
                "Aproximación inicial para cada variable del sistema.",
              syntax: "Ejemplo:\nx₀ = 1\ny₀ = 1",
            },
            {
              name: "Tolerancia (ε)",
              description:
                "Error máximo permitido entre iteraciones consecutivas.",
            },
            {
              name: "Iteraciones máximas",
              description:
                "Número máximo de iteraciones antes de detener el proceso.",
            },
          ],

          errors: [
            "Las funciones deben estar correctamente despejadas.",
            "Si la transformación elegida no es adecuada el método puede divergir.",
            "Se recomienda que la norma del Jacobiano de g(x) sea menor que 1 cerca de la solución.",
            "Los valores iniciales deben estar cerca de la solución.",
            "La tolerancia debe ser mayor que cero.",
            "Las iteraciones máximas deben ser un entero positivo.",
          ],
        },
        gauss: {
          title: "Eliminación Gauss",
          subtitle:
            "Método directo que transforma la matriz aumentada en una forma triangular superior para resolver el sistema.",

          params: [
            {
              name: "Archivo .CSV del sistema",
              description:
                "Debe cargarse un archivo .csv que represente una matriz aumentada del sistema de ecuaciones lineales.",
              syntax:
                "Ejemplo de archivo:<br>x,y,Vector <br>10,1,11 <br>2,10,12",
            },
            {
              name: "Coeficientes del sistema",
              description:
                "Las primeras columnas del archivo corresponden a los coeficientes de las variables del sistema.",
            },
            {
              name: "Vector independiente",
              description:
                "La última columna del archivo debe contener los términos independientes del sistema.",
            },
            {
              name: "Dimensión del sistema",
              description:
                "Si el sistema tiene n variables, el archivo debe contener n filas y n+1 columnas en total. El sistema solamente permitirá sistemas de ecuaciones 3x3.",
            },
          ],

          errors: [
            "El archivo debe tener formato .csv válido.",
            "El archivo no debe estar vacío.",
            "Todos los valores del archivo deben ser numéricos.",
            "La matriz debe ser una matriz aumentada válida de tamaño n x (n+1).",
            "El número de ecuaciones debe coincidir con el número de incógnitas.",
            "Si durante la eliminación aparece un pivote igual a cero, el sistema puede requerir pivoteo o no tener solución única.",
            "Si la matriz es singular, el método no podrá encontrar una solución única.",
          ],
        },

        "gauss-jordan": {
          title: "Gauss-Jordan",
          subtitle:
            "Método directo que transforma la matriz aumentada hasta una forma reducida por renglones para obtener la solución directamente.",

          params: [
            {
              name: "Archivo .CSV del sistema",
              description:
                "Debe cargarse un archivo .csv que represente una matriz aumentada del sistema de ecuaciones lineales.",
              syntax:
                "Ejemplo de archivo:<br>x,y,Vector <br>10,1,11 <br>2,10,12",
            },
            {
              name: "Coeficientes del sistema",
              description:
                "Las primeras columnas representan los coeficientes de las variables en cada ecuación.",
            },
            {
              name: "Vector independiente",
              description:
                "La última columna debe contener el vector de términos independientes del sistema.",
            },
            {
              name: "Estructura esperada",
              description:
                "Para un sistema de n incógnitas, el archivo debe tener n filas y n+1 columnas.",
            },
          ],

          errors: [
            "El archivo debe tener extensión .csv.",
            "Todos los elementos del archivo deben ser numéricos.",
            "La matriz cargada debe ser aumentada y tener dimensiones válidas.",
            "No debe haber filas incompletas ni columnas vacías.",
            "Si la matriz es singular, el método no podrá reducir correctamente a la identidad.",
            "Si aparece un pivote nulo y no puede intercambiarse con otra fila, el sistema puede no tener solución única.",
            "El número de ecuaciones debe coincidir con el número de incógnitas.",
          ],
        },

        "matriz-inversa": {
          title: "Matriz Inversa",
          subtitle:
            "Método directo que resuelve el sistema a partir de la relación X = A⁻¹B, siempre que la matriz de coeficientes sea invertible.",

          params: [
            {
              name: "Archivo .CSV del sistema",
              description:
                "Debe cargarse un archivo .csv que represente una matriz aumentada del sistema de ecuaciones lineales.",
              syntax:
                "Ejemplo de archivo:<br>x,y,Vector <br>10,1,11 <br>2,10,12",
            },
            {
              name: "Matriz de coeficientes A",
              description:
                "Se obtiene a partir de todas las columnas excepto la última.",
            },
            {
              name: "Vector independiente B",
              description:
                "Se obtiene a partir de la última columna del archivo.",
            },
            {
              name: "Condición de invertibilidad",
              description:
                "La matriz A debe ser cuadrada e invertible para poder aplicar este método.",
            },
          ],

          errors: [
            "El archivo debe ser un .csv válido.",
            "Todos los valores cargados deben ser numéricos.",
            "La matriz de coeficientes debe ser cuadrada.",
            "La matriz aumentada debe tener tamaño n x (n+1).",
            "Si el determinante de A es cero, la matriz no es invertible.",
            "Si A no tiene inversa, el método no puede aplicarse.",
            "No debe haber datos vacíos, texto o símbolos no numéricos dentro del archivo.",
          ],
        },
        lu: {
          title: "Factorización LU",
          subtitle:
            "Método directo que descompone la matriz de coeficientes en el producto de una matriz triangular inferior L y una matriz triangular superior U.",

          params: [
            {
              name: "Archivo .CSV del sistema",
              description:
                "Debe cargarse un archivo .csv que represente una matriz aumentada del sistema de ecuaciones lineales.",
              syntax:
                "Ejemplo de archivo:<br>x,y,Vector <br>10,1,11 <br>2,10,12",
            },
            {
              name: "Matriz de coeficientes A",
              description:
                "Se obtiene de todas las columnas excepto la última. Esta matriz es la que se factoriza en L y U.",
            },
            {
              name: "Vector independiente B",
              description:
                "Se obtiene de la última columna del archivo y se usa después de la factorización para resolver el sistema.",
            },
            {
              name: "Estructura del sistema",
              description:
                "Para un sistema de n incógnitas, el archivo debe contener n filas y n+1 columnas en total.",
            },
          ],

          errors: [
            "El archivo debe tener formato .csv válido.",
            "El archivo no debe estar vacío.",
            "Todos los valores del archivo deben ser numéricos.",
            "La matriz aumentada debe tener tamaño n x (n+1).",
            "La matriz de coeficientes debe ser cuadrada.",
            "Si aparece un pivote igual a cero durante la factorización, el método puede fallar o requerir pivoteo.",
            "Si la matriz es singular, no podrá obtenerse una factorización útil para una solución única.",
            "El número de ecuaciones debe coincidir con el número de incógnitas.",
          ],
        },

        cholesky: {
          title: "Factorización de Cholesky",
          subtitle:
            "Método directo que descompone la matriz de coeficientes en el producto de una matriz triangular inferior y su transpuesta, siempre que la matriz cumpla ciertas condiciones.",

          params: [
            {
              name: "Archivo .CSV del sistema",
              description:
                "Debe cargarse un archivo .csv que represente una matriz aumentada del sistema de ecuaciones lineales.",
              syntax:
                "Ejemplo de archivo:<br>x,y,Vector <br>10,1,11 <br>2,10,12",
            },
            {
              name: "Matriz de coeficientes A",
              description:
                "Se obtiene de todas las columnas excepto la última. Para aplicar Cholesky, esta matriz debe ser simétrica y definida positiva.",
            },
            {
              name: "Vector independiente B",
              description:
                "Se obtiene de la última columna del archivo y se utiliza para resolver el sistema una vez realizada la factorización.",
            },
            {
              name: "Condiciones de aplicación",
              description:
                "La matriz A debe ser cuadrada, simétrica y definida positiva.",
            },
          ],

          errors: [
            "El archivo debe ser un .csv válido.",
            "Todos los valores del archivo deben ser numéricos.",
            "La matriz aumentada debe tener tamaño n x (n+1).",
            "La matriz de coeficientes debe ser cuadrada.",
            "La matriz de coeficientes debe ser simétrica.",
            "La matriz debe ser definida positiva para que la factorización de Cholesky exista.",
            "Si algún elemento diagonal calculado resulta no positivo, el método no puede aplicarse.",
            "No debe haber celdas vacías ni texto dentro del archivo.",
          ],
        },
        "gauss-seidel": {
          title: "Método de Gauss-Seidel",
          subtitle:
            "Método iterativo para resolver sistemas de ecuaciones lineales a partir de una aproximación inicial.",

          params: [
            {
              name: "Archivo .CSV del sistema",
              description:
                "Debe cargarse un archivo .csv que represente la matriz aumentada del sistema de ecuaciones lineales.",
              syntax: "Ejemplo de archivo:\nx,y,Vector\n10,1,11\n2,10,12",
            },
            {
              name: "Número de valores iniciales",
              description:
                "Debe coincidir con el número de variables del sistema. Define cuántas aproximaciones iniciales se ingresarán.",
            },
            {
              name: "Valores iniciales",
              description:
                "Son las aproximaciones iniciales para cada variable del sistema, por ejemplo x₀, y₀, z₀, según el número de incógnitas.",
              syntax: "Ejemplo:\nx₀ = 1\ny₀ = 1",
            },
            {
              name: "Tolerancia (ε)",
              description:
                "Error máximo permitido entre iteraciones consecutivas para detener el proceso.",
            },
            {
              name: "Iteraciones máximas",
              description:
                "Número máximo de iteraciones permitidas antes de detener el método.",
            },
          ],

          errors: [
            "El archivo debe tener formato .csv válido.",
            "El archivo no debe estar vacío.",
            "Todos los valores del archivo deben ser numéricos.",
            "La matriz aumentada debe tener tamaño n x (n+1).",
            "El número de valores iniciales debe coincidir con el número de variables.",
            "La tolerancia debe ser mayor que cero.",
            "Las iteraciones máximas deben ser un entero positivo.",
            "Si la matriz no cumple condiciones favorables como diagonal dominante, el método puede no converger.",
            "Si existe un elemento diagonal igual a cero, el método no puede aplicarse directamente.",
          ],
        },

        jacobi: {
          title: "Método de Jacobi",
          subtitle:
            "Método iterativo para resolver sistemas de ecuaciones lineales usando una aproximación inicial y actualización simultánea.",

          params: [
            {
              name: "Archivo .CSV del sistema",
              description:
                "Debe cargarse un archivo .csv que represente la matriz aumentada del sistema de ecuaciones lineales.",
              syntax: "Ejemplo de archivo:\nx,y,Vector\n10,1,11\n2,10,12",
            },
            {
              name: "Número de valores iniciales",
              description:
                "Debe coincidir con el número de variables del sistema. Define cuántas aproximaciones iniciales se ingresarán.",
            },
            {
              name: "Valores iniciales",
              description:
                "Son las aproximaciones iniciales para cada variable del sistema, por ejemplo x₀, y₀, z₀, según el número de incógnitas.",
              syntax: "Ejemplo:\nx₀ = 1\ny₀ = 1",
            },
            {
              name: "Tolerancia (ε)",
              description:
                "Error máximo permitido entre iteraciones consecutivas para considerar convergencia.",
            },
            {
              name: "Iteraciones máximas",
              description:
                "Número máximo de iteraciones permitidas antes de detener el proceso.",
            },
          ],

          errors: [
            "El archivo debe tener formato .csv válido.",
            "El archivo no debe estar vacío.",
            "Todos los valores del archivo deben ser numéricos.",
            "La matriz aumentada debe tener tamaño n x (n+1).",
            "El número de valores iniciales debe coincidir con el número de variables.",
            "La tolerancia debe ser mayor que cero.",
            "Las iteraciones máximas deben ser un entero positivo.",
            "Si la matriz no cumple condiciones suficientes como diagonal dominante, el método puede no converger.",
            "Si algún elemento diagonal es cero, no puede despejarse correctamente la variable correspondiente.",
          ],
        },
        lagrange: {
          title: "Interpolación de Lagrange",
          subtitle:
            "Método de interpolación que construye un polinomio único que pasa exactamente por los puntos dados.",

          params: [
            {
              name: "Archivo .CSV con valores (x, y)",
              description:
                "Debe cargarse un archivo .csv con los pares de datos que se usarán para construir el polinomio interpolante.",
              syntax: "Ejemplo de archivo:\nx,y\n1,2\n2,3\n3,5",
            },
            {
              name: "Valores x",
              description:
                "Corresponden a las abscisas de los puntos. Para interpolación, no deben repetirse.",
            },
            {
              name: "Valores y",
              description:
                "Corresponden a las ordenadas asociadas a cada valor de x.",
            },
            {
              name: "Valor de interpolación",
              description:
                "Es el valor de x en el cual se desea evaluar el polinomio interpolante construido con los datos.",
              syntax: "Ejemplo: 4.3",
            },
          ],

          errors: [
            "El archivo debe tener formato .csv válido.",
            "El archivo no debe estar vacío.",
            "Todos los valores del archivo deben ser numéricos.",
            "El archivo debe contener al menos una columna para x y una para y.",
            "Los valores de x no deben repetirse, ya que la interpolación de Lagrange no está definida correctamente en ese caso.",
            "Debe haber suficientes puntos para construir el polinomio.",
            "El valor de interpolación debe ser numérico.",
          ],
        },

        "newton-dd": {
          title: "Interpolación de Newton por Diferencias Divididas",
          subtitle:
            "Método de interpolación que construye el polinomio usando diferencias divididas a partir de un conjunto de puntos.",

          params: [
            {
              name: "Archivo .CSV con valores (x, y)",
              description:
                "Debe cargarse un archivo .csv con los pares de datos necesarios para construir la tabla de diferencias divididas.",
              syntax: "Ejemplo de archivo:\nx,y\n1,2\n2,3\n3,5",
            },
            {
              name: "Valores x",
              description:
                "Son los valores independientes del conjunto de datos. No deben repetirse.",
            },
            {
              name: "Valores y",
              description: "Son los valores dependientes asociados a cada x.",
            },
            {
              name: "Valor de interpolación",
              description:
                "Es el valor de x en el cual se evaluará el polinomio interpolante.",
              syntax: "Ejemplo: 4.3",
            },
          ],

          errors: [
            "El archivo debe tener formato .csv válido.",
            "El archivo no debe estar vacío.",
            "Todos los valores del archivo deben ser numéricos.",
            "El archivo debe contener columnas válidas para x y y.",
            "Los valores de x no deben repetirse.",
            "Debe haber al menos dos puntos para construir diferencias divididas.",
            "El valor de interpolación debe ser numérico.",
          ],
        },

        "newton-df": {
          title: "Interpolación de Newton por Diferencias Finitas",
          subtitle:
            "Método de interpolación que utiliza una tabla de diferencias finitas, generalmente con datos igualmente espaciados.",

          params: [
            {
              name: "Archivo .CSV con valores (x, y)",
              description:
                "Debe cargarse un archivo .csv con los pares de datos que se usarán para construir la tabla de diferencias finitas.",
              syntax: "Ejemplo de archivo:\nx,y\n1,2\n2,3\n3,5",
            },
            {
              name: "Valores x",
              description:
                "Son los valores independientes del conjunto de datos. Para este método se recomienda que estén igualmente espaciados.",
            },
            {
              name: "Valores y",
              description: "Son los valores dependientes asociados a cada x.",
            },
            {
              name: "Valor de interpolación",
              description:
                "Es el valor de x donde se desea evaluar el polinomio aproximante.",
              syntax: "Ejemplo: 4.3",
            },
          ],

          errors: [
            "El archivo debe tener formato .csv válido.",
            "El archivo no debe estar vacío.",
            "Todos los datos del archivo deben ser numéricos.",
            "El archivo debe contener columnas para x y y.",
            "Los valores de x no deben repetirse.",
            "Para obtener resultados correctos, los valores de x deben estar igualmente espaciados.",
            "Debe haber suficientes puntos para construir la tabla de diferencias.",
            "El valor de interpolación debe ser numérico.",
          ],
        },

        "minimos-cuadrados": {
          title: "Mínimos Cuadrados",
          subtitle:
            "Método de ajuste que obtiene una función aproximante minimizando el error total entre los datos observados y el modelo.",

          params: [
            {
              name: "Archivo .CSV con valores (x, y)",
              description:
                "Debe cargarse un archivo .csv con los pares de datos experimentales o muestrales que se desean ajustar.",
              syntax: "Ejemplo de archivo:\nx,y\n1,2.1\n2,2.9\n3,5.2",
            },
            {
              name: "Valores x",
              description:
                "Representan la variable independiente del conjunto de datos.",
            },
            {
              name: "Valores y",
              description:
                "Representan la variable dependiente observada en cada valor de x.",
            },
            {
              name: "Modelo de ajuste",
              description:
                "El método utiliza los datos para construir una función aproximada, normalmente lineal o polinómica según la implementación de la aplicación.",
            },
          ],

          errors: [
            "El archivo debe tener formato .csv válido.",
            "El archivo no debe estar vacío.",
            "Todos los valores deben ser numéricos.",
            "El archivo debe contener al menos una columna para x y otra para y.",
            "Debe haber suficientes datos para realizar el ajuste.",
            "Si todos los valores de x son iguales, no puede construirse correctamente un ajuste lineal.",
            "No debe haber celdas vacías ni texto no numérico.",
          ],
        },

        "mc-transf": {
          title: "Mínimos Cuadrados con Transformación",
          subtitle:
            "Método de ajuste que transforma los datos para linealizar un modelo y luego aplica mínimos cuadrados.",

          params: [
            {
              name: "Archivo .CSV con valores (x, y)",
              description:
                "Debe cargarse un archivo .csv con los pares de datos que serán transformados para ajustar un modelo no lineal.",
              syntax: "Ejemplo de archivo:\nx,y\n1,2.1\n2,2.9\n3,5.2",
            },
            {
              name: "Valores x",
              description:
                "Representan la variable independiente. Deben ser compatibles con la transformación elegida.",
            },
            {
              name: "Valores y",
              description:
                "Representan la variable dependiente. También deben ser compatibles con la transformación aplicada.",
            },
            {
              name: "Transformación del modelo",
              description:
                "La aplicación transforma los datos según el tipo de ajuste para convertir el problema en uno linealizable.",
            },
          ],

          errors: [
            "El archivo debe tener formato .csv válido.",
            "El archivo no debe estar vacío.",
            "Todos los valores deben ser numéricos.",
            "El archivo debe contener columnas para x y y.",
            "No debe haber valores incompatibles con la transformación elegida, por ejemplo valores no positivos si se aplica logaritmo.",
            "Debe haber suficientes datos para ajustar el modelo transformado.",
            "No debe haber celdas vacías ni texto no numérico.",
          ],
        },
        trapecio: {
          title: "Regla del Trapecio",
          subtitle:
            "Método numérico para aproximar integrales definidas mediante la suma de áreas de trapecios.",

          params: [
            {
              name: "Función f(x)",
              description:
                "Función matemática que se desea integrar. Debe escribirse en términos de la variable x.",
              syntax: "Ejemplos:\nx**2 + 3*x - 1\nsin(x)\nexp(x) + x",
            },
            {
              name: "Límite inferior (a)",
              description: "Valor inicial del intervalo de integración.",
              syntax: "Ejemplo: 0",
            },
            {
              name: "Límite superior (b)",
              description:
                "Valor final del intervalo donde se calculará la integral.",
              syntax: "Ejemplo: 5",
            },
            {
              name: "Paso (h)",
              description:
                "Tamaño del subintervalo utilizado para dividir el intervalo [a,b]. Determina la precisión de la aproximación.",
              syntax: "Ejemplo: 0.1",
            },
          ],

          errors: [
            "La función debe ser válida y escribirse en términos de x.",
            "El límite superior debe ser mayor que el límite inferior.",
            "El valor de h debe ser mayor que cero.",
            "El paso h no debe ser demasiado grande para evitar errores grandes de aproximación.",
            "El intervalo de integración debe poder dividirse correctamente con el paso h.",
          ],
        },

        "simpson-1-3": {
          title: "Regla de Simpson 1/3",
          subtitle:
            "Método numérico para aproximar integrales definidas utilizando interpolación cuadrática.",

          params: [
            {
              name: "Función f(x)",
              description: "Función matemática que se desea integrar.",
              syntax: "Ejemplos:\nx**2\nsin(x)\nlog(x)",
            },
            {
              name: "Límite inferior (a)",
              description: "Valor inicial del intervalo de integración.",
            },
            {
              name: "Límite superior (b)",
              description:
                "Valor final del intervalo donde se evaluará la integral.",
            },
            {
              name: "Paso (h)",
              description:
                "Tamaño del subintervalo utilizado para dividir el intervalo.",
              syntax: "Ejemplo: 0.1",
            },
          ],

          errors: [
            "La función debe escribirse correctamente en términos de x.",
            "El límite superior debe ser mayor que el límite inferior.",
            "El valor de h debe ser mayor que cero.",
            "El número de subintervalos debe ser PAR para aplicar Simpson 1/3.",
            "El intervalo debe dividirse correctamente con el paso h.",
          ],
        },

        "simpson-3-8": {
          title: "Regla de Simpson 3/8",
          subtitle:
            "Método de integración numérica que aproxima la función mediante interpolación cúbica.",

          params: [
            {
              name: "Función f(x)",
              description: "Función matemática que se desea integrar.",
              syntax: "Ejemplos:\nx**3\ncos(x)\nsqrt(x)",
            },
            {
              name: "Límite inferior (a)",
              description: "Valor inicial del intervalo de integración.",
            },
            {
              name: "Límite superior (b)",
              description:
                "Valor final del intervalo donde se evaluará la integral.",
            },
            {
              name: "Paso (h)",
              description:
                "Tamaño del subintervalo utilizado para dividir el intervalo.",
            },
          ],

          errors: [
            "La función debe escribirse correctamente en términos de x.",
            "El límite superior debe ser mayor que el límite inferior.",
            "El valor de h debe ser mayor que cero.",
            "El número de subintervalos debe ser múltiplo de 3 para aplicar Simpson 3/8.",
            "El intervalo debe dividirse correctamente con el paso h.",
          ],
        },

        "cuadratura-gauss": {
          title: "Cuadratura de Gauss",
          subtitle:
            "Método de integración numérica que aproxima la integral mediante combinaciones lineales de valores de la función evaluados en puntos específicos.",

          params: [
            {
              name: "Función f(x)",
              description: "Función matemática que se desea integrar.",
              syntax: "Ejemplos:\nx**2\nsin(x)\nexp(x)",
            },
            {
              name: "Límite inferior (a)",
              description: "Valor inicial del intervalo de integración.",
            },
            {
              name: "Límite superior (b)",
              description:
                "Valor final del intervalo donde se evaluará la integral.",
            },
          ],

          errors: [
            "La función debe escribirse correctamente en términos de x.",
            "El límite superior debe ser mayor que el límite inferior.",
            "Los valores de la función deben poder evaluarse dentro del intervalo.",
            "Si la función no es continua en el intervalo, el método puede producir resultados incorrectos.",
          ],
        },
        euler: {
          title: "Método de Euler",
          subtitle:
            "Método numérico básico para aproximar la solución de una ecuación diferencial ordinaria de primer orden.",

          params: [
            {
              name: "Función f(x,y)",
              description:
                "Expresión de la ecuación diferencial en la forma y' = f(x,y). Debe escribirse usando las variables x y y.",
              syntax: "Ejemplos:\nx + y\nx - y\nsin(x) + y",
            },
            {
              name: "Valor inicial x₀",
              description:
                "Valor inicial de la variable independiente desde donde comienza la aproximación.",
              syntax: "Ejemplo: 0",
            },
            {
              name: "Condición inicial y₀",
              description:
                "Valor inicial de la solución correspondiente al punto x₀.",
              syntax: "Ejemplo: 1",
            },
            {
              name: "Condición final x_f",
              description:
                "Valor final de la variable independiente hasta donde se desea aproximar la solución.",
              syntax: "Ejemplo: 2",
            },
            {
              name: "Tamaño de paso h",
              description:
                "Incremento usado para avanzar en la aproximación numérica. Un valor más pequeño suele mejorar la precisión.",
              syntax: "Ejemplo: 0.1",
            },
          ],

          errors: [
            "La función debe escribirse correctamente en términos de x y y.",
            "El valor final x_f debe ser distinto del valor inicial x₀.",
            "El tamaño de paso h debe ser mayor que cero.",
            "La función debe poder evaluarse correctamente en todos los puntos del intervalo.",
            "Un tamaño de paso muy grande puede generar una aproximación poco precisa.",
            "Si el intervalo no es consistente con el paso h, la discretización puede no cubrir exactamente el rango deseado.",
          ],
        },

        "euler-mejorado": {
          title: "Método de Euler Mejorado",
          subtitle:
            "Método numérico que mejora la aproximación del método de Euler usando una corrección basada en la pendiente promedio.",

          params: [
            {
              name: "Función f(x,y)",
              description:
                "Expresión de la ecuación diferencial en la forma y' = f(x,y). Debe escribirse usando x y y.",
              syntax: "Ejemplos:\nx + y\nx*y\nexp(x) - y",
            },
            {
              name: "Valor inicial x₀",
              description: "Valor inicial de la variable independiente.",
            },
            {
              name: "Condición inicial y₀",
              description: "Valor inicial de la solución asociado a x₀.",
            },
            {
              name: "Condición final x_f",
              description:
                "Valor final de la variable independiente donde se quiere aproximar la solución.",
            },
            {
              name: "Tamaño de paso h",
              description: "Incremento utilizado en cada iteración del método.",
              syntax: "Ejemplo: 0.1",
            },
          ],

          errors: [
            "La función debe escribirse correctamente en términos de x y y.",
            "El valor final x_f debe ser distinto del valor inicial x₀.",
            "El tamaño de paso h debe ser mayor que cero.",
            "La función debe ser evaluable en todos los puntos requeridos por el método.",
            "Un tamaño de paso demasiado grande puede reducir la precisión.",
            "Si el intervalo no se divide de forma consistente con h, la aproximación puede presentar ajustes en el último paso.",
          ],
        },

        "runge-kutta": {
          title: "Método de Runge-Kutta",
          subtitle:
            "Método numérico de mayor precisión para aproximar la solución de ecuaciones diferenciales ordinarias de primer orden.",

          params: [
            {
              name: "Función f(x,y)",
              description:
                "Expresión de la ecuación diferencial en la forma y' = f(x,y). Debe escribirse usando las variables x y y.",
              syntax: "Ejemplos:\nx + y\nx**2 - y\nsin(x) + cos(y)",
            },
            {
              name: "Valor inicial x₀",
              description: "Valor inicial de la variable independiente.",
            },
            {
              name: "Condición inicial y₀",
              description: "Valor inicial de la solución en x₀.",
            },
            {
              name: "Condición final x_f",
              description:
                "Valor final hasta donde se desea aproximar la solución.",
            },
            {
              name: "Tamaño de paso h",
              description:
                "Incremento utilizado para avanzar entre aproximaciones sucesivas.",
              syntax: "Ejemplo: 0.1",
            },
          ],

          errors: [
            "La función debe escribirse correctamente en términos de x y y.",
            "El valor final x_f debe ser distinto del valor inicial x₀.",
            "El tamaño de paso h debe ser mayor que cero.",
            "La función debe poder evaluarse correctamente en todos los puntos intermedios del método.",
            "Aunque Runge-Kutta suele ser más preciso, un paso muy grande puede producir errores de aproximación.",
            "El intervalo debe ser coherente con el tamaño de paso definido.",
          ],
        },
      };
      function getCurrentMethodKey() {
        const pathParts = window.location.pathname.split("/").filter(Boolean);
        return pathParts[pathParts.length - 1];
      }
      document.addEventListener("DOMContentLoaded", () => {
        const openBtn = document.getElementById("open-details-btn");
        const modal = document.getElementById("details-modal");
        const overlay = document.getElementById("details-overlay");
        const closeBtn = document.getElementById("details-close");

        const titleEl = document.getElementById("details-method-title");
        const subtitleEl = document.getElementById("details-method-subtitle");

        const paramsPanel = document.getElementById("details-params");
        const errorsPanel = document.getElementById("details-errors");

        const tabs = document.querySelectorAll(".details-tab");

        function getCurrentMethodKey() {
          const parts = window.location.pathname.split("/").filter(Boolean);
          return parts[parts.length - 1];
        }

        function renderParams(params = []) {
          if (!params.length) {
            paramsPanel.innerHTML = `<div class="details-card"><p>No hay información disponible para este método.</p></div>`;
            return;
          }

          paramsPanel.innerHTML = `
      <div class="details-section">
        ${params
          .map(
            (param) => `
          <div class="details-card">
            <strong>${param.name}</strong>
            <p>${param.description}</p>
            ${param.syntax ? `<code class="details-code">${param.syntax}</code>` : ""}
          </div>
        `,
          )
          .join("")}
      </div>
    `;
        }

        function renderErrors(errors = []) {
          if (!errors.length) {
            errorsPanel.innerHTML = `<div class="details-card"><p>No hay condiciones registradas para este método.</p></div>`;
            return;
          }

          errorsPanel.innerHTML = `
      <div class="details-section">
        <h3>Condiciones generales y posibles errores</h3>
        <div class="details-card">
          <ul class="details-list">
            ${errors.map((error) => `<li>${error}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
        }

        function loadMethodDetails() {
          const methodKey = getCurrentMethodKey();
          const method = methodDetails[methodKey];

          if (!method) {
            titleEl.textContent = "Detalles del método";
            subtitleEl.textContent =
              "No hay información registrada para este método.";
            renderParams([]);
            renderErrors([]);
            return;
          }

          titleEl.textContent = method.title;
          subtitleEl.textContent = method.subtitle;
          renderParams(method.params);
          renderErrors(method.errors);
        }

        function openModal() {
          loadMethodDetails();
          modal.classList.add("show");
        }

        function closeModal() {
          modal.classList.remove("show");
        }

        openBtn?.addEventListener("click", openModal);
        closeBtn?.addEventListener("click", closeModal);
        overlay?.addEventListener("click", closeModal);

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") closeModal();
        });

        tabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");

            const target = tab.dataset.tab;

            document.querySelectorAll(".details-panel").forEach((panel) => {
              panel.classList.remove("active");
            });

            if (target === "params") {
              paramsPanel.classList.add("active");
            } else {
              errorsPanel.classList.add("active");
            }
          });
        });
      });