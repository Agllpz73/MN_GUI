const methodDetails = {
  biseccion: {
    title: "Método de Bisección",
    subtitle: "Método cerrado para aproximar raíces en un intervalo [a, b].",
    params: [
      {
        name: "Sintaxis permitida",
        description: "Operadores y funciones disponibles.",
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Función f(x)",
        description:
          "Expresión matemática continua que se desea evaluar. Debe escribirse con una sintaxis válida para la aplicación.",
        syntax: "Ejemplo: <br> x^3 - x - 2 <br>  x**3 - x - 2*x**2",
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
    output: [
      "Aproximación de la raíz encontrada dentro del intervalo [a, b].",
      "Tabla de iteraciones con los valores de a, b, punto medio y error.",
      "Procedimiento paso a paso del método hasta cumplir la tolerancia o alcanzar el máximo de iteraciones.",
      "Representación gráfica de la función y una suseción de puntos color rojo 🔴 que nos muestra la aproximación de la raíz.",
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
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Función f(x)",
        description: "Función para la cual se desea encontrar una raíz.",
        syntax: "Ejemplo: x^3 - 2*x - 5",
      },
      {
        name: "Valor inicial x₀",
        description: "Punto inicial desde donde comienza el método iterativo.",
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
    output: [
      "📍 Aproximación de la raíz obtenida a partir de un valor inicial dado.",
      "📊 Tabla de iteraciones con los valores de xₙ, xₙ₊₁ y el error calculado en cada paso.",
      "🧮 Procedimiento paso a paso del método hasta cumplir la tolerancia o alcanzar el máximo de iteraciones.",
      "📈 Representación gráfica de la función 🔵 y de los puntos de aproximación que ilustran la convergencia hacia la raíz en color rojo 🔴.",
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
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
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
      "⚠️ Debe existir cambio de signo entre f(a) y f(b).",
      "🔎 La función debe poder evaluarse correctamente en ambos extremos del intervalo.",
      "⏳ Si el intervalo inicial está mal elegido, el método puede converger lentamente.",
      "📏 La tolerancia debe ser un valor positivo mayor que cero.",
    ],
    output: [
      "📍 Aproximación de la raíz encontrada dentro del intervalo [a, b].",
      "📊 Tabla de iteraciones con los valores de a, b, la aproximación calculada mediante interpolación lineal y el error en cada paso.",
      "🧮 Procedimiento paso a paso del método hasta cumplir la tolerancia o alcanzar el número máximo de iteraciones.",
      "📈 Representación gráfica de la función 🔵 y de las aproximaciones sucesivas de la raíz en color rojo 🔴 obtenidas mediante la recta secante.",
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
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Función f(x)",
        description: "Función continua a evaluar.",
        syntax: "Ejemplo: 0.1*sqrt(y)+0.4*x**2",
      },
      {
        name: "Límite inferior  x₀",
        description: "Primera aproximación inicial para comenzar el método.",
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
      "🔎 La función debe poder evaluarse correctamente en x₀ y x₁.",
      "⚠️ Los valores iniciales no deben producir división entre cero en la fórmula iterativa. Esto ocurre si f(xₙ) − f(xₙ₋₁) = 0.",
      "⏳ Si x₀ y x₁ están mal elegidos, el método puede divergir o converger lentamente.",
      "📏 La tolerancia debe ser un valor positivo mayor que cero.",
      "⚠️ Las iteraciones máximas deben ser un entero positivo.",
    ],
    output: [
      "📍 Aproximación de la raíz obtenida a partir de dos valores iniciales.",
      "📊 Tabla de iteraciones con los valores de xₙ, xₙ₊₁ y el error calculado en cada paso.",
      "🧮 Procedimiento paso a paso del método hasta cumplir la tolerancia o alcanzar el número máximo de iteraciones.",
      "📈 Representación gráfica de la función 🔵 y de las aproximaciones sucesivas de la raíz en color rojo 🔴 generadas por las rectas secantes.",
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
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
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
      "🔎 La función iterativa g(x) debe estar bien definida en la zona de análisis.",
      "⚠️ Si la transformación elegida no es adecuada, el método puede no converger.",
      "⏳ Un valor inicial mal elegido puede alejar la iteración de la solución o hacer más lenta la convergencia.",
      "📐 Para favorecer la convergencia, se recomienda que |g'(x)| < 1 cerca del punto fijo.",
      "📏 La tolerancia debe ser un valor positivo mayor que cero.",
      "⚠️ Las iteraciones máximas deben ser un entero positivo.",
    ],
    output: [
      "📍 Aproximación del punto fijo obtenida a partir de un valor inicial dado.",
      "📊 Tabla de iteraciones con los valores de xₙ, xₙ₊₁ = g(xₙ) y el error calculado en cada paso.",
      "🧮 Procedimiento paso a paso del método hasta cumplir la tolerancia o alcanzar el número máximo de iteraciones.",
      "📈 Representación gráfica de la función iterativa y de los puntos de aproximación que muestran la convergencia hacia el punto fijo.",
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
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
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
        syntax: "Ejemplo:<br>f1(x,y) = x**2 + y - 4<br>f2(x,y) = x + y**2 - 4",
      },
      {
        name: "Valores iniciales",
        description: "Aproximación inicial para cada variable del sistema.",
        syntax: "Ejemplo:<br>x₀ = 1<br>y₀ = 1",
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
      "⚠️ El número de ecuaciones debe coincidir con el número de variables.",
      "🔎 Todas las funciones del sistema deben estar definidas y escritas correctamente.",
      "⚠️ El Jacobiano no debe ser singular durante las iteraciones; esto ocurre cuando det(J(x)) = 0.",
      "⏳ Si los valores iniciales están lejos de la solución, el método puede divergir o converger lentamente.",
      "📏 La tolerancia debe ser un valor positivo mayor que cero.",
      "⚠️ Las iteraciones máximas deben ser un entero positivo.",
    ],
    output: [
      "📍 Aproximación de la solución del sistema obtenida a partir de los valores iniciales dados.",
      "📊 Tabla de iteraciones con los valores aproximados de cada variable y el error calculado en cada paso.",
      "🧮 Procedimiento paso a paso del método utilizando el Jacobiano hasta cumplir la tolerancia o alcanzar el número máximo de iteraciones.",
      "📈 Si el sistema es de 2 variables, se muestra la gráfica de las funciones del sistema y la aproximación de la solución.",
      "📉 Si el sistema es de 3 variables, se muestra la evolución de las iteraciones: 'x' en rojo 🔴, 'y' en azul 🔵 y 'z' en verde 🟢.",
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
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Número de ecuaciones",
        description:
          "Cantidad de ecuaciones del sistema. Debe coincidir con el número de variables.",
      },
      {
        name: "Funciones despejadas gᵢ(x)",
        description: "Cada variable debe despejarse en función de las demás.",
        syntax: "Ejemplo:<br>x = sqrt(4 - y)<br>y = sqrt(4 - x)",
      },
      {
        name: "Valores iniciales",
        description: "Aproximación inicial para cada variable del sistema.",
        syntax: "Ejemplo:<br>x₀ = 1<br>y₀ = 1",
      },
      {
        name: "Tolerancia (ε)",
        description: "Error máximo permitido entre iteraciones consecutivas.",
      },
      {
        name: "Iteraciones máximas",
        description:
          "Número máximo de iteraciones antes de detener el proceso.",
      },
    ],

    errors: [
      "⚠️ El número de ecuaciones debe coincidir con el número de variables.",
      "🔎 Las funciones despejadas gᵢ(x) deben estar definidas y escritas correctamente.",
      "⚠️ Si la transformación elegida no es adecuada, el método puede divergir.",
      "📐 Para favorecer la convergencia, se recomienda que la norma del Jacobiano de g(x) sea menor que 1 cerca de la solución.",
      "⏳ Los valores iniciales deben estar suficientemente cerca de la solución para mejorar la convergencia.",
      "📏 La tolerancia debe ser un valor positivo mayor que cero.",
      "⚠️ Las iteraciones máximas deben ser un entero positivo.",
    ],
    output: [
      "📍 Aproximación de la solución del sistema obtenida a partir de los valores iniciales dados.",
      "📊 Tabla de iteraciones con los valores aproximados de cada variable y el error calculado en cada paso.",
      "🧮 Procedimiento paso a paso del método hasta cumplir la tolerancia o alcanzar el número máximo de iteraciones.",
      "📈 Si el sistema es de 2 variables, se muestra la gráfica de las funciones del sistema y la aproximación de la solución.",
      "📉 Si el sistema es de 3 variables, se muestra la evolución de las iteraciones: x en rojo 🔴, y en azul 🔵 y z en verde 🟢.",
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
        syntax: "Ejemplo de archivo:<br>x,y,Vector <br>10,1,11 <br>2,10,12",
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
      "📄 El archivo debe tener un formato .csv válido.",
      "⚠️ El archivo no debe estar vacío.",
      "🔢 Todos los valores del archivo deben ser numéricos con excepción de la primera fila, que contiene los nombres de las variables.",
      "📐 La matriz debe representar una matriz aumentada válida de tamaño n x (n+1).",
      "⚠️ El número de ecuaciones debe coincidir con el número de incógnitas.",
      "🔎 Si durante la eliminación aparece un pivote igual a cero, el sistema puede requerir pivoteo o no tener solución única.",
      "⛔ Si la matriz es singular, el método no podrá encontrar una solución única.",
    ],
    output: [
      "📍 Solución del sistema de ecuaciones lineales, cuando existe una solución única.",
      "📊 Visualización de las matrices resultantes en cada paso del proceso de eliminación.",
      "🧮 Procedimiento paso a paso hasta obtener la forma triangular superior del sistema.",
      "📌 Presentación final de los valores de cada variable obtenidos a partir de la sustitución regresiva.",
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
        syntax: "Ejemplo de archivo:<br>x,y,Vector <br>10,1,11 <br>2,10,12",
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
      "📄 El archivo debe tener extensión .csv válida.",
      "🔢 Todos los valores del archivo deben ser numéricos con excepción de la primera fila, que contiene los nombres de las variables.",
      "📐 La matriz cargada debe ser una matriz aumentada con dimensiones válidas n x (n+1).",
      "⚠️ No debe haber filas incompletas ni columnas vacías dentro del archivo.",
      "⛔ Si la matriz es singular, el método no podrá reducirse correctamente hasta la matriz identidad.",
      "🔎 Si aparece un pivote igual a cero y no puede intercambiarse con otra fila, el sistema puede no tener solución única.",
      "⚖️ El número de ecuaciones debe coincidir con el número de incógnitas.",
    ],
    output: [
      "📍 Solución directa del sistema de ecuaciones lineales cuando existe una solución única.",
      "📊 Visualización de las matrices obtenidas en cada paso del proceso de reducción.",
      "🧮 Procedimiento paso a paso aplicando operaciones elementales hasta obtener la forma reducida por renglones (matriz identidad).",
      "📌 Presentación final de los valores de cada variable directamente a partir de la matriz identidad resultante.",
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
        syntax: "Ejemplo de archivo:<br>x,y,Vector <br>10,1,11 <br>2,10,12",
      },
      {
        name: "Matriz de coeficientes A",
        description:
          "Se obtiene a partir de todas las columnas excepto la última.",
      },
      {
        name: "Vector independiente B",
        description: "Se obtiene a partir de la última columna del archivo.",
      },
      {
        name: "Condición de invertibilidad",
        description:
          "La matriz A debe ser cuadrada e invertible para poder aplicar este método.",
      },
    ],

    errors: [
      "📄 El archivo debe ser un .csv válido.",
      "🔢 Todos los valores del archivo deben ser numéricos con excepción de la primera fila, que contiene los nombres de las variables.",
      "📐 La matriz de coeficientes A debe ser cuadrada.",
      "📏 La matriz aumentada debe tener dimensiones válidas n x (n+1).",
      "⛔ Si el determinante de A es igual a cero, la matriz no es invertible.",
      "⚠️ Si A no tiene inversa, el método no puede aplicarse.",
      "🚫 No debe haber datos vacíos, texto o símbolos no numéricos dentro del archivo.",
    ],
    output: [
      "📍 Solución del sistema de ecuaciones lineales obtenida mediante la relación X = A⁻¹B.",
      "📊 Visualización de las matrices generadas en cada paso del proceso para obtener la matriz inversa.",
      "🧮 Procedimiento paso a paso hasta transformar la matriz de coeficientes en la identidad y obtener A⁻¹.",
      "✖️ Presentación final del producto entre la matriz inversa A⁻¹ y el vector independiente B.",
      "📌 Resultado final con los valores de cada variable del sistema.",
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
        syntax: "Ejemplo de archivo:<br>x,y,Vector <br>10,1,11 <br>2,10,12",
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
      "📄 El archivo debe tener un formato .csv válido.",
      "⚠️ El archivo no debe estar vacío.",
      "🔢 Todos los valores del archivo deben ser numéricos con excepción de la primera fila, que contiene los nombres de las variables.",
      "📐 La matriz aumentada debe tener dimensiones válidas n x (n+1).",
      "📏 La matriz de coeficientes A debe ser cuadrada.",
      "🔎 Si aparece un pivote igual a cero durante la factorización, el método puede fallar o requerir pivoteo.",
      "⛔ Si la matriz es singular, no podrá obtenerse una factorización útil para una solución única.",
      "⚖️ El número de ecuaciones debe coincidir con el número de incógnitas.",
    ],
    output: [
      "📍 Solución del sistema de ecuaciones lineales obtenida a partir de la factorización A = LU.",
      "📊 Visualización del sistema original, la separación de la matriz A y el vector b, y las matrices L y U resultantes.",
      "🧮 Procedimiento paso a paso de la factorización, seguido de la sustitución hacia adelante para resolver Ly = b y la sustitución hacia atrás para resolver Ux = y.",
      "📌 Presentación final de los valores de cada variable del sistema.",
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
        syntax: "Ejemplo de archivo:<br>x,y,Vector <br>10,1,11 <br>2,10,12",
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
      "📄 El archivo debe ser un .csv válido.",
      "🔢 Todos los valores del archivo deben ser numéricos con excepción de la primera fila, que contiene los nombres de las variables.",
      "📐 La matriz aumentada debe tener dimensiones válidas n x (n+1).",
      "📏 La matriz de coeficientes A debe ser cuadrada y simétrica.",
      "⚠️ La matriz A debe ser definida positiva para que exista la factorización de Cholesky.",
      "⛔ Si algún elemento diagonal calculado resulta menor o igual a cero, el método no puede aplicarse.",
      "🚫 No debe haber celdas vacías ni texto dentro del archivo.",
    ],
    output: [
      "📍 Solución del sistema de ecuaciones lineales obtenida mediante la factorización A = LLᵀ.",
      "📊 Visualización del sistema original, la separación de la matriz A y el vector b, y las matrices L y Lᵀ resultantes.",
      "🧮 Procedimiento paso a paso de la factorización de Cholesky, seguido de la sustitución hacia adelante para resolver Ly = b y la sustitución hacia atrás para resolver Lᵀx = y.",
      "📌 Presentación final de los valores de cada variable del sistema.",
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
        syntax: "Ejemplo de archivo:<br>x,y,Vector<br>10,1,11<br>2,10,12",
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
        syntax: "Ejemplo:<br>x₀ = 1<br>y₀ = 1",
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
      "📄 El archivo debe tener un formato .csv válido.",
      "⚠️ El archivo no debe estar vacío.",
      "🔢 Todos los valores del archivo deben ser numéricos.",
      "📐 La matriz aumentada debe tener dimensiones válidas n x (n+1).",
      "⚖️ El número de valores iniciales debe coincidir con el número de variables del sistema.",
      "📏 La tolerancia debe ser un valor positivo mayor que cero.",
      "⚠️ Las iteraciones máximas deben ser un entero positivo.",
      "⏳ Si la matriz no cumple condiciones favorables, como ser diagonalmente dominante, el método puede no converger.",
      "⛔ Si existe un elemento diagonal igual a cero, el método no puede aplicarse directamente.",
    ],
    output: [
      "📍 Aproximación de la solución del sistema obtenida a partir de los valores iniciales dados.",
      "📊 Tabla de iteraciones con las aproximaciones de cada variable y el error calculado en cada paso.",
      "🧮 Procedimiento iterativo paso a paso hasta cumplir la tolerancia o alcanzar el número máximo de iteraciones.",
      "📈 Si el sistema es de 2 variables, se muestran las ecuaciones del sistema y las aproximaciones sucesivas trazadas en color rojo 🔴.",
      "📉 Si el sistema es de 3 variables, se muestra la gráfica de iteración vs aproximación para cada variable: x en rojo 🔴, y en azul 🔵 y z en verde 🟢.",
      "📌 Indicación final de la raíz aproximada obtenida y del estado de convergencia del método.",
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
        syntax: "Ejemplo de archivo:<br>x,y,Vector<br>10,1,11<br>2,10,12",
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
        syntax: "Ejemplo:<br>x₀ = 1<br>y₀ = 1",
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
      "📄 El archivo debe tener un formato .csv válido.",
      "⚠️ El archivo no debe estar vacío.",
      "🔢 Todos los valores del archivo deben ser numéricos.",
      "📐 La matriz aumentada debe tener dimensiones válidas n x (n+1).",
      "⚖️ El número de valores iniciales debe coincidir con el número de variables del sistema.",
      "📏 La tolerancia debe ser un valor positivo mayor que cero.",
      "⚠️ Las iteraciones máximas deben ser un entero positivo.",
      "⏳ Si la matriz no cumple condiciones suficientes, como ser diagonalmente dominante, el método puede no converger.",
      "⛔ Si algún elemento diagonal es igual a cero, no puede despejarse correctamente la variable correspondiente.",
    ],
    output: [
      "📍 Aproximación de la solución del sistema obtenida a partir de los valores iniciales dados.",
      "📊 Tabla de iteraciones con las aproximaciones de cada variable y el error calculado en cada paso.",
      "🧮 Procedimiento iterativo paso a paso hasta cumplir la tolerancia o alcanzar el número máximo de iteraciones.",
      "📈 Si el sistema es de 2 variables, se muestran las ecuaciones del sistema y las aproximaciones sucesivas trazadas en color rojo 🔴.",
      "📉 Si el sistema es de 3 variables, se muestra la gráfica de iteración vs aproximación para cada variable: x en rojo 🔴, y en azul 🔵 y z en verde 🟢.",
      "📌 Indicación final de la raíz aproximada obtenida y del estado de convergencia del método.",
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
        syntax: "Ejemplo de archivo:<br>x,y<br>1,2<br>2,3<br>3,5",
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
      "📄 El archivo debe tener un formato .csv válido.",
      "⚠️ El archivo no debe estar vacío.",
      "🔢 Todos los valores del archivo deben ser numéricos.",
      "📐 El archivo debe contener al menos una columna para x y una para y.",
      "⛔ Los valores de x no deben repetirse, ya que la interpolación de Lagrange no está definida correctamente en ese caso.",
      "📊 Debe haber suficientes puntos para construir el polinomio interpolante.",
      "📍 El valor de interpolación debe ser numérico.",
    ],
    output: [
      "📍 Construcción del polinomio interpolante de Lagrange a partir de los puntos dados.",
      "📊 Visualización de la tabla de datos utilizada en el método.",
      "🧮 Desarrollo del modelo matemático, incluyendo los polinomios base de Lagrange y la expresión final del polinomio interpolante.",
      "📈 Representación gráfica de los puntos originales, del polinomio interpolante y del valor evaluado en la interpolación.",
      "🟢 El punto de color verde representa el valor de interpolación evaluado sobre la función obtenida por el método.",
      "📌 Presentación final de la evaluación del polinomio en el valor de interpolación indicado.",
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
        syntax: "Ejemplo de archivo:<br>x,y<br>1,2<br>2,3<br>3,5",
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
      "📄 El archivo debe tener un formato .csv válido.",
      "⚠️ El archivo no debe estar vacío.",
      "🔢 Todos los valores del archivo deben ser numéricos.",
      "📐 El archivo debe contener columnas válidas para x y y.",
      "⛔ Los valores de x no deben repetirse.",
      "📊 Debe haber al menos dos puntos para construir la tabla de diferencias divididas.",
      "📍 El valor de interpolación debe ser numérico.",
    ],
    output: [
      "📍 Construcción del polinomio interpolante de Newton a partir de las diferencias divididas.",
      "📊 Visualización de la tabla de datos y de la tabla de diferencias divididas generada con los puntos proporcionados.",
      "🧮 Desarrollo del modelo matemático del método y de la expresión final del polinomio interpolante.",
      "📈 Representación gráfica de los puntos originales, del polinomio interpolante y del valor evaluado en la interpolación.",
      "🟢 El punto de color verde representa la coordenada obtenida al evaluar el valor de interpolación en el polinomio generado por el método.",
      "📌 Presentación final de la evaluación del polinomio en el valor de interpolación indicado.",
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
        syntax: "Ejemplo de archivo:<br>x,y<br>1,2<br>2,3<br>3,5",
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
      "📄 El archivo debe tener formato .csv válido.",
      "⚠️ El archivo no debe estar vacío.",
      "🔢 Todos los datos del archivo deben ser numéricos.",
      "📐 El archivo debe contener columnas válidas para x y y.",
      "⛔ Los valores de x no deben repetirse.",
      "📏 Para aplicar correctamente el método, los valores de x deben estar igualmente espaciados.",
      "📊 Debe haber suficientes puntos para construir la tabla de diferencias finitas.",
      "📍 El valor de interpolación debe ser numérico.",
    ],
    output: [
      "📍 Construcción del polinomio interpolante utilizando el método de Newton con diferencias finitas.",
      "📊 Visualización de la tabla de datos y de la tabla de diferencias finitas generada a partir de los puntos.",
      "🧮 Desarrollo del modelo matemático del método y de la expresión final del polinomio interpolante.",
      "📈 Representación gráfica de los puntos originales 🔴 y del polinomio interpolante generado 🔵.",
      "🟢 El punto verde representa la coordenada obtenida al evaluar el valor de interpolación en el polinomio construido.",
      "📌 Presentación final de la evaluación del polinomio en el valor de interpolación indicado.",
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
        syntax: "Ejemplo de archivo:<br>x,y<br>1,2.1<br>2,2.9<br>3,5.2",
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
      "📄 El archivo debe tener formato .csv válido.",
      "⚠️ El archivo no debe estar vacío.",
      "🔢 Todos los valores deben ser numéricos.",
      "📐 El archivo debe contener al menos una columna para x y otra para y.",
      "📊 Debe haber suficientes datos para realizar el ajuste.",
      "⛔ Si todos los valores de x son iguales, no puede construirse correctamente el modelo de ajuste.",
      "⚠️ No debe haber celdas vacías ni texto no numérico en el archivo.",
    ],
    output: [
      "📍 Construcción de la función aproximante mediante el método de mínimos cuadrados.",
      "📊 Visualización de la tabla de datos utilizada para realizar el ajuste.",
      "🧮 Cálculo de los coeficientes del modelo que minimiza el error cuadrático total.",
      "📈 Representación gráfica de los puntos originales 🔴 y de la función aproximante obtenida 🔵.",
      "🟢 El punto verde representa la coordenada obtenida al evaluar el modelo aproximado en el valor de x indicado.",
      "📌 Presentación final de la ecuación del modelo ajustado y del valor evaluado en el punto solicitado.",
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
        syntax: "Ejemplo de archivo:<br>x,y<br>1,2.1<br>2,2.9<br>3,5.2",
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
      "📄 El archivo debe tener formato .csv válido.",
      "⚠️ El archivo no debe estar vacío.",
      "🔢 Todos los valores deben ser numéricos.",
      "📐 El archivo debe contener columnas válidas para x y y.",
      "⛔ No debe haber valores incompatibles con la transformación elegida (por ejemplo valores negativos o cero si se utiliza logaritmo).",
      "📊 Debe haber suficientes datos para ajustar el modelo transformado.",
      "⚠️ No debe haber celdas vacías ni texto no numérico.",
    ],

    output: [
      "📍 Transformación de los datos para linealizar el modelo de ajuste.",
      "📊 Visualización de la tabla de datos transformados utilizados en el proceso.",
      "🧮 Aplicación del método de mínimos cuadrados sobre los datos transformados para obtener los coeficientes del modelo.",
      "📈 Representación gráfica de los puntos originales 🔴 y de la función aproximante obtenida 🔵.",
      "🟢 El punto verde representa la coordenada obtenida al evaluar el modelo transformado en el valor de x indicado.",
      "📌 Presentación final de la ecuación del modelo ajustado y del valor evaluado en el punto solicitado.",
    ],
  },
  trapecio: {
    title: "Regla del Trapecio",
    subtitle:
      "Método numérico para aproximar integrales definidas mediante la suma de áreas de trapecios.",

    params: [
      {
        name: "Sintaxis permitida",
        description: "Operadores y funciones disponibles.",
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Función f(x)",
        description:
          "Función matemática que se desea integrar. Debe escribirse en términos de la variable x.",
        syntax: "Ejemplos: <br>x**2 + 3*x - 1 <br> sin(x) <br>exp(x) + x",
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
      "🔎 La función debe ser válida y escribirse correctamente en términos de x.",
      "📏 El límite superior debe ser mayor que el límite inferior. Sin embargo, el sistema hace valido este error sin afectar al resultado.",
      "📐 El tamaño de paso h debe ser un valor positivo mayor que cero.",
      "⏳ Si el paso h es demasiado grande, la aproximación puede presentar un error considerable.",
      "⚠️ El intervalo de integración debe poder dividirse correctamente con el paso h.",
    ],
    output: [
      "📍 Aproximación numérica de la integral definida en el intervalo indicado.",
      "📊 Visualización de los parámetros de entrada, la tabla de evaluación y el resumen del cálculo realizado.",
      "🧮 Desarrollo paso a paso del procedimiento, incluyendo el cálculo del tamaño de paso, los nodos y la aplicación de la fórmula compuesta.",
      "📈 Representación gráfica de la función y de los trapecios construidos para aproximar el área bajo la curva.",
      "📌 Presentación final del valor aproximado de la integral y del mensaje de ejecución del método.",
      "💡 Interpretación: la integral se aproxima como la suma de áreas trapezoidales construidas entre nodos consecutivos del intervalo.",
    ],
  },

  "simpson-1-3": {
    title: "Regla de Simpson 1/3",
    subtitle:
      "Método numérico para aproximar integrales definidas utilizando interpolación cuadrática.",

    params: [
      {
        name: "Sintaxis permitida",
        description: "Operadores y funciones disponibles.",
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Función f(x)",
        description: "Función matemática que se desea integrar.",
        syntax: "Ejemplos:<br>x**2 <br> sin(x) + exp(x**2) <br>e**x - log(x)",
      },
      {
        name: "Límite inferior (a)",
        description: "Valor inicial del intervalo de integración.",
      },
      {
        name: "Límite superior (b)",
        description: "Valor final del intervalo donde se evaluará la integral.",
      },
      {
        name: "Paso (h)",
        description:
          "Tamaño del subintervalo utilizado para dividir el intervalo.",
        syntax: "Ejemplo: 0.1",
      },
    ],

    errors: [
      "🔎 La función debe escribirse correctamente en términos de x.",
      "📏 El límite superior debe ser mayor que el límite inferior.",
      "📐 El tamaño de paso h debe ser un valor positivo mayor que cero.",
      "⚠️ El número de subintervalos debe ser PAR para aplicar correctamente la regla de Simpson 1/3.",
      "📊 El intervalo debe dividirse correctamente con el paso h.",
    ],
    output: [
      "📍 Aproximación numérica de la integral definida en el intervalo indicado.",
      "📊 Visualización de los parámetros de entrada, la tabla de evaluación y el resumen del cálculo realizado.",
      "🧮 Desarrollo paso a paso del procedimiento, incluyendo el cálculo del tamaño de paso, los nodos y la aplicación de la fórmula de Simpson 1/3.",
      "📈 Representación gráfica de la función y de los subintervalos utilizados para aproximar el área bajo la curva.",
      "📌 Presentación final del valor aproximado de la integral y del mensaje de ejecución del método.",
      "💡 Interpretación: la integral se aproxima mediante arcos parabólicos que interpolan grupos de tres nodos consecutivos del intervalo.",
    ],
  },

  "simpson-3-8": {
    title: "Regla de Simpson 3/8",
    subtitle:
      "Método de integración numérica que aproxima la función mediante interpolación cúbica.",

    params: [
      {
        name: "Sintaxis permitida",
        description: "Operadores y funciones disponibles.",
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Función f(x)",
        description: "Función matemática que se desea integrar.",
        syntax:
          "Ejemplos:<br>x**3 <br>sin(x) + cos(x) <br>e**(sqrt(x)) - sqrt(x)",
      },
      {
        name: "Límite inferior (a)",
        description: "Valor inicial del intervalo de integración.",
      },
      {
        name: "Límite superior (b)",
        description: "Valor final del intervalo donde se evaluará la integral.",
      },
      {
        name: "Paso (h)",
        description:
          "Tamaño del subintervalo utilizado para dividir el intervalo.",
      },
    ],

    errors: [
      "🔎 La función debe escribirse correctamente en términos de x.",
      "📏 El límite superior debe ser mayor que el límite inferior.",
      "📐 El tamaño de paso h debe ser un valor positivo mayor que cero.",
      "⚠️ El número de subintervalos debe ser múltiplo de 3 para aplicar correctamente la regla de Simpson 3/8.",
      "📊 El intervalo debe dividirse correctamente con el paso h.",
    ],
    output: [
      "📍 Aproximación numérica de la integral definida en el intervalo indicado.",
      "📊 Visualización de los parámetros de entrada, la tabla de evaluación y el resumen del cálculo realizado.",
      "🧮 Desarrollo paso a paso del procedimiento, incluyendo el cálculo del tamaño de paso, los nodos y la aplicación de la fórmula de Simpson 3/8.",
      "📈 Representación gráfica de la función y de los subintervalos utilizados para aproximar el área bajo la curva.",
      "📌 Presentación final del valor aproximado de la integral y del mensaje de ejecución del método.",
      "💡 Interpretación: la integral se aproxima mediante segmentos cúbicos construidos sobre grupos de cuatro nodos consecutivos del intervalo.",
    ],
  },

  "cuadratura-gauss": {
    title: "Cuadratura de Gauss",
    subtitle:
      "Método de integración numérica que aproxima la integral mediante combinaciones lineales de valores de la función evaluados en puntos específicos.",

    params: [
      {
        name: "Sintaxis permitida",
        description: "Operadores y funciones disponibles.",
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Función f(x)",
        description: "Función matemática que se desea integrar.",
        syntax: "Ejemplos:<br>x**2<br>sin(x)<br>exp(x)",
      },
      {
        name: "Límite inferior (a)",
        description: "Valor inicial del intervalo de integración.",
      },
      {
        name: "Límite superior (b)",
        description: "Valor final del intervalo donde se evaluará la integral.",
      },
      {
        name: "Número de puntos",
        description: "Puntos que se desea integrar el método",
      },
    ],

    errors: [
      "🔎 La función debe escribirse correctamente en términos de x.",
      "📏 El límite superior debe ser mayor que el límite inferior.",
      "📍 La función debe poder evaluarse correctamente en todos los puntos de integración del método.",
      "⚠️ Si la función no es continua o presenta problemas dentro del intervalo, el resultado puede ser incorrecto.",
    ],
    output: [
      "📍 Aproximación numérica de la integral definida en el intervalo indicado.",
      "📊 Visualización de los parámetros de entrada, la tabla de evaluación y el resumen del cálculo realizado.",
      "🧮 Desarrollo paso a paso del procedimiento, incluyendo la transformación del intervalo y la evaluación en los nodos y pesos de Gauss.",
      "📈 Representación gráfica de la función y de los puntos especiales donde se evalúa el método para aproximar el área.",
      "📌 Presentación final del valor aproximado de la integral y del mensaje de ejecución del método.",
      "💡 Interpretación: la integral se aproxima mediante una combinación ponderada de valores de la función evaluados en nodos óptimos dentro del intervalo.",
    ],
  },
  euler: {
    title: "Método de Euler",
    subtitle:
      "Método numérico básico para aproximar la solución de una ecuación diferencial ordinaria de primer orden.",

    params: [
      {
        name: "Sintaxis permitida",
        description: "Operadores y funciones disponibles.",
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Función f(x,y)",
        description:
          "Expresión de la ecuación diferencial en la forma y' = f(x,y). Debe escribirse usando las variables 'x' y 'y'.",
        syntax: "Ejemplos:<br>x + y<br>x - y<br>sin(x) + y",
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
      "🔎 La función debe escribirse correctamente en términos de (x,y).",
      "📏 El valor final x_f debe ser distinto del valor inicial x₀.",
      "📐 El tamaño de paso h debe ser un valor positivo mayor que cero.",
      "⚠️ La función debe poder evaluarse correctamente en todos los puntos del intervalo.",
      "⏳ Un tamaño de paso muy grande puede generar una aproximación poco precisa.",
      "📊 Si el intervalo no es consistente con el paso h, la discretización puede requerir un ajuste en el último paso.",
    ],
    output: [
      "📍 Aproximación numérica de la solución de la ecuación diferencial ordinaria a partir de la condición inicial dada.",
      "📊 Visualización del resumen del método, la tabla de iteraciones y el resultado final obtenido.",
      "🧮 Desarrollo paso a paso del método de Euler, avanzando mediante la pendiente evaluada en cada punto.",
      "📈 Representación gráfica de los valores iniciales y de los puntos aproximados calculados por el método.",
      "📌 Presentación final del valor aproximado de y(x_f), del valor final alcanzado en x y del estado del último paso ajustado.",
    ],
  },

  "euler-mejorado": {
    title: "Método de Euler Mejorado",
    subtitle:
      "Método numérico que mejora la aproximación del método de Euler usando una corrección basada en la pendiente promedio.",

    params: [
      {
        name: "Sintaxis permitida",
        description: "Operadores y funciones disponibles.",
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Función f(x,y)",
        description:
          "Expresión de la ecuación diferencial en la forma y' = f(x,y). Debe escribirse usando 'x' y 'y'.",
        syntax: "Ejemplos:<br>x + y<br>x*y<br>exp(x) - y",
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
      "🔎 La función debe escribirse correctamente en términos de (x,y).",
      "📏 El valor final x_f debe ser distinto del valor inicial x₀.",
      "📐 El tamaño de paso h debe ser un valor positivo mayor que cero.",
      "⚠️ La función debe poder evaluarse correctamente en todos los puntos requeridos por el método.",
      "⏳ Un tamaño de paso demasiado grande puede reducir la precisión de la aproximación.",
      "📊 Si el intervalo no se divide de forma consistente con h, la aproximación puede requerir ajuste en el último paso.",
    ],
    output: [
      "📍 Aproximación numérica de la solución de la ecuación diferencial ordinaria usando una corrección basada en la pendiente promedio.",
      "📊 Visualización del resumen del método, la tabla de iteraciones y el resultado final obtenido.",
      "🧮 Desarrollo paso a paso del método de Euler Mejorado, combinando una predicción inicial y una corrección posterior.",
      "📈 Representación gráfica de los valores iniciales y de los puntos aproximados calculados por el método.",
      "📌 Presentación final del valor aproximado de y(x_f), del valor final alcanzado en x y del estado del último paso ajustado.",
    ],
  },

  "runge-kutta": {
    title: "Método de Runge-Kutta",
    subtitle:
      "Método numérico de mayor precisión para aproximar la solución de ecuaciones diferenciales ordinarias de primer orden.",

    params: [
      {
        name: "Sintaxis permitida",
        description: "Operadores y funciones disponibles.",
        syntax: "x**2, sqrt(x), sin(x), cos(x), exp(x), log(x), e**x",
      },
      {
        name: "Función f(x,y)",
        description:
          "Expresión de la ecuación diferencial en la forma y' = f(x,y). Debe escribirse usando las variables 'x' y 'y'.",
        syntax: "Ejemplos:<br>x + y<br>x**2 - y<br>sin(x) + cos(y)",
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
        description: "Valor final hasta donde se desea aproximar la solución.",
      },
      {
        name: "Tamaño de paso h",
        description:
          "Incremento utilizado para avanzar entre aproximaciones sucesivas.",
        syntax: "Ejemplo: 0.1",
      },
    ],

    errors: [
      "🔎 La función debe escribirse correctamente en términos de (x,y).",
      "📏 El valor final x_f debe ser distinto del valor inicial x₀.",
      "📐 El tamaño de paso h debe ser un valor positivo mayor que cero.",
      "⚠️ La función debe poder evaluarse correctamente en todos los puntos intermedios requeridos por el método.",
      "⏳ Aunque Runge-Kutta suele ser más preciso, un tamaño de paso muy grande puede producir errores de aproximación.",
      "📊 El intervalo debe ser coherente con el tamaño de paso definido.",
    ],
    output: [
      "📍 Aproximación numérica de la solución de la ecuación diferencial ordinaria mediante el método de Runge-Kutta.",
      "📊 Visualización del resumen del método, la tabla de iteraciones y el resultado final obtenido.",
      "🧮 Desarrollo paso a paso del método utilizando evaluaciones intermedias de la pendiente para mejorar la precisión.",
      "📈 Representación gráfica de los valores iniciales y de los puntos aproximados calculados por el método.",
      "📌 Presentación final del valor aproximado de y(x_f), del valor final alcanzado en x y del estado del último paso ajustado.",
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
  const outputPanel = document.getElementById("details-output");

  const tabs = document.querySelectorAll(".details-tab");

  function renderOutput(output = []) {
    if (!output.length) {
      outputPanel.innerHTML = `<div class="details-card"><p>No hay información registrada sobre la salida para este método.</p></div>`;
      return;
    }

    outputPanel.innerHTML = `
    <div class="details-section">
      <h3>¿Qué muestra la salida?</h3>
      <div class="details-card">
        <ul class="details-list">
          ${output.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
  }

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
      errorsPanel.innerHTML = `
      <div class="details-card">
        <p>No hay condiciones registradas para este método.</p>
      </div>
    `;
      return;
    }

    errorsPanel.innerHTML = `
    <div class="details-section">
      <h3>Errores y condiciones importantes</h3>
      <div class="details-card">
        <ul class="details-list details-list--alerts">
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
      renderOutput([]);
      return;
    }

    titleEl.textContent = method.title;
    subtitleEl.textContent = method.subtitle;
    renderParams(method.params);
    renderErrors(method.errors);
    renderOutput(method.output);
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
      } else if (target === "errors") {
        errorsPanel.classList.add("active");
      } else if (target === "output") {
        outputPanel.classList.add("active");
      }
    });
  });
});
