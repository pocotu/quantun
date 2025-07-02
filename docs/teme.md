Metodología Detallada para la Tesis: Implementación y Análisis de Rendimiento de los Estándares PQC del NIST (TLS-Kyber y Firmas Dilithium) en una Aplicación Web Segura
Indice

Fase 1: Fundamentos Teóricos y Estado del Arte	3
Objetivo	3
1.1 La Amenaza Cuántica a la Criptografía Moderna: Un Análisis Fundamental	3
1.1.1 Criptografía Asimétrica Bajo Asedio: El Algoritmo de Shor	3
1.1.2 La Seguridad Disminuida de la Criptografía Simétrica: El Algoritmo de Grover	4
1.1.3 El Imperativo "Harvest Now, Decrypt Later" (HNDL)	5
1.2 El Panorama de Estandarización de la Criptografía Post-Cuántica del NIST	6
1.2.1 Visión General del Proceso de Estandarización (2016-Presente)	6
1.2.2 Los Estándares Finalizados: Una Introducción Técnica	6
1.2.3 La Estrategia de Transición: Criptografía Híbrida	7
1.3 El Ecosistema del Proyecto Open Quantum Safe (OQS)	8
Fase 2: Diseño y Configuración del Entorno de Laboratorio Reproducible	9
Objetivo	9
2.1 Principios Arquitectónicos: Aislamiento y Reproducibilidad	9
2.1.1 Estrategia de Contenerización con Docker	9
2.1.2 Especificación del Entorno Base	10
2.2 Construcción de la Pila Criptográfica Habilitada para PQC desde el Código Fuente	10
2.2.1 El Dockerfile del Servidor	10
2.2.2 Paso 1: Compilación de una Versión Personalizada de OpenSSL 3.x	11
2.2.3 Paso 2: Compilación de liboqs	11
2.2.4 Paso 3: Compilación de oqs-provider	11
2.2.5 Paso 4: Configuración Final de OpenSSL	12
Fase 3: Implementación del Prototipo de Aplicación Web	13
Objetivo	13
3.1 Caso de Uso 1: Confidencialidad en Tránsito a través de TLS-Kyber	13
3.1.1 Compilación de Nginx con Soporte PQC	13
3.1.2 Generación y Gestión de Certificados	13
3.1.3 Configuración del Bloque de Servidor de Nginx	14
3.1.4 Interfaz de Usuario	14
3.2 Caso de Uso 2: Autenticidad de Documentos con Firmas Dilithium	14
3.2.1 Generación de Claves y Certificados PQC	14
3.2.2 Implementación del Backend (por ejemplo, Python con FastAPI)	15
3.2.3 Interfaz de Usuario	16
Fase 4: Diseño y Ejecución de la Batería de Pruebas (Benchmarking)	16
Objetivo	16
4.1 Definición de Escenarios y Configuraciones de Prueba	16
4.2 Métricas de Rendimiento Exhaustivas	17
4.3 Simulación de Condiciones de Red del Mundo Real (para el Escenario A)	19
4.4 Protocolo de Ejecución	19
Fase 5: Análisis de Resultados y Discusión	20
Objetivo	20
5.1 Procesamiento Estadístico y Visualización de Datos	20
5.2 Análisis Interpretativo de las Compensaciones (Trade-offs)	21
Fase 6: Conclusiones y Trabajo Futuro	23
Objetivo	23
6.1 Síntesis de Hallazgos Clave y Conclusión sobre la Viabilidad	23
6.2 Limitaciones del Estudio	23
6.3 Vías para el Trabajo Futuro	24
Referencias	24















Fase 1: Fundamentos Teóricos y Estado del Arte
Objetivo
Establecer el marco conceptual exhaustivo y justificar la relevancia crítica del proyecto, demostrando un dominio profundo del panorama actual de la Criptografía Post-Cuántica (PQC). Esta fase sienta las bases teóricas que validan la necesidad de la investigación empírica propuesta en las fases posteriores.
1.1 La Amenaza Cuántica a la Criptografía Moderna: Un Análisis Fundamental
La transición global hacia la PQC no es una actualización incremental, sino una respuesta necesaria a una amenaza fundamental planteada por la computación cuántica. Esta sección desglosa técnicamente los algoritmos cuánticos que invalidan las suposiciones de seguridad de la criptografía actual.
1.1.1 Criptografía Asimétrica Bajo Asedio: El Algoritmo de Shor
El algoritmo de Shor, desarrollado por Peter Shor en 1994, representa una amenaza existencial para la criptografía de clave pública moderna.1 Su poder no reside en una simple aceleración, sino en un cambio de paradigma computacional que explota las propiedades de la mecánica cuántica para resolver problemas matemáticos que son intratables para las computadoras clásicas.
Mecanismo de Funcionamiento: El algoritmo de Shor ataca el núcleo de la seguridad de RSA y ECC mediante un proceso de dos etapas 2:
Reducción Clásica a Búsqueda de Período: El problema de la factorización de enteros (la base de RSA) y el problema del logaritmo discreto (la base de ECC) se transforman, mediante teoría de números clásica, en un problema equivalente: encontrar el período de una función exponencial modular específica, de la forma f(x)=ax(modN).4
Núcleo Cuántico para la Búsqueda de Período: Una vez reformulado el problema, se utiliza la Transformada Cuántica de Fourier (QFT). La QFT se aplica a un registro cuántico preparado en una superposición de todos los posibles valores de entrada. Esta operación, que aprovecha el paralelismo cuántico, permite determinar el período de la función de manera eficiente, una tarea que requeriría un tiempo exponencial en una computadora clásica.5
Impacto en RSA y ECC:
Para RSA: La seguridad de RSA se basa en la dificultad de encontrar los factores primos p y q de un número grande N. Al encontrar el período de la función mencionada, el algoritmo de Shor puede derivar eficientemente estos factores, revelando así la clave privada y rompiendo por completo el criptosistema.1
Para ECC: El algoritmo de Shor se adapta para resolver el Problema del Logaritmo Discreto en Curvas Elípticas (ECDLP). Aunque la estructura del grupo es diferente, el principio subyacente de encontrar el período de una función relacionada sigue siendo aplicable. Esto requiere la implementación de las operaciones del grupo de la curva elíptica (suma de puntos y multiplicación escalar) como circuitos cuánticos.8 La resolución del ECDLP permite a un atacante calcular la clave privada a partir de la clave pública, neutralizando la seguridad de los esquemas de firma como ECDSA y los intercambios de claves como ECDH.7
La amenaza que plantea el algoritmo de Shor no es una degradación de la seguridad, sino un colapso total y catastrófico de los pilares de la criptografía de clave pública. Esto explica por qué la estandarización PQC se ha centrado con tanta urgencia en los Mecanismos de Encapsulamiento de Claves (KEM) y las firmas digitales, ya que son los más directamente afectados.

1.1.2 La Seguridad Disminuida de la Criptografía Simétrica: El Algoritmo de Grover
A diferencia de Shor, el algoritmo de Grover no rompe la criptografía simétrica, sino que debilita su seguridad. Su impacto es menos catastrófico pero igualmente significativo.
Mecanismo de Funcionamiento: El algoritmo de Grover ofrece una aceleración cuadrática para problemas de búsqueda no estructurada.5 En el contexto de un ataque de fuerza bruta contra un algoritmo de cifrado simétrico, esto significa encontrar una clave secreta de
k bits en un número de operaciones del orden de O(2k​), en lugar de los O(2k) intentos que requeriría una búsqueda exhaustiva clásica.11
Impacto en AES:
Para AES-128, la seguridad efectiva se reduce de 128 bits a aproximadamente 64 bits, un nivel que se considera criptográficamente rompible.12
Para AES-256, la seguridad efectiva se reduce a 128 bits.14 Aunque una seguridad de 128 bits sigue siendo extremadamente robusta y se considera segura para el futuro previsible, la degradación es lo suficientemente significativa como para que los estándares de seguridad post-cuánticos recomienden el uso de AES-256 como mínimo.15
Es crucial contextualizar el costo práctico de este ataque. La aceleración cuadrática se refiere a la complejidad de las consultas. La implementación física de un ataque de Grover contra AES sería un desafío de ingeniería monumental, que requeriría una enorme cantidad de qubits lógicos, una corrección de errores cuánticos casi perfecta y un tiempo de ejecución considerable. Análisis recientes indican que los recursos necesarios para romper AES-256 están mucho más allá de las capacidades tecnológicas previstas para las próximas décadas.17 No obstante, la amenaza teórica sobre AES-128 es lo suficientemente creíble como para justificar la migración a claves de 256 bits como una medida de "defensa en profundidad".
1.1.3 El Imperativo "Harvest Now, Decrypt Later" (HNDL)
El paradigma HNDL (Cosechar Ahora, Descifrar Después) es el argumento más convincente para la urgencia de la migración a PQC.
El Modelo de Ataque: HNDL es una estrategia de ataque sigilosa y a largo plazo. Los adversarios interceptan y almacenan grandes volúmenes de datos que hoy están cifrados de forma segura. No intentan descifrarlos en el presente, sino que los archivan pacientemente, a la espera de la llegada de una computadora cuántica criptográficamente relevante (CRQC) que pueda ejecutar el algoritmo de Shor.19
Urgencia y Alcance: Esta amenaza es inmediata para cualquier dato que deba permanecer confidencial durante un largo período (por ejemplo, décadas). Esto incluye secretos de estado, propiedad intelectual corporativa, registros financieros, datos de salud y comunicaciones diplomáticas.19 El ataque es invisible; no hay señales de intrusión, ya que el objetivo no es la explotación inmediata. Una organización puede no saber que sus datos más sensibles ya han sido comprometidos y están en posesión de un adversario, esperando el "Día Q".19 Este modelo de amenaza ha sido un catalizador clave para las directivas gubernamentales y los esfuerzos de migración de la industria.23
El paradigma HNDL cambia fundamentalmente el cálculo del riesgo criptográfico. Desacopla el acto del robo de datos de su explotación, lo que significa que la seguridad de un sistema debe evaluarse no solo contra las amenazas actuales, sino también contra las amenazas futuras a lo largo de toda la vida útil de los datos que protege. Esta es la justificación principal para la adopción de la criptografía híbrida, que se detallará más adelante: se necesita PQC para proteger contra el descifrado futuro (HNDL), pero se mantiene la criptografía clásica como salvaguarda contra posibles debilidades en los nuevos algoritmos PQC.
1.2 El Panorama de Estandarización de la Criptografía Post-Cuántica del NIST
En respuesta a la amenaza cuántica, el Instituto Nacional de Estándares y Tecnología (NIST) de EE. UU. inició un proceso público y transparente para desarrollar una nueva generación de estándares criptográficos.
1.2.1 Visión General del Proceso de Estandarización (2016-Presente)
En 2016, el NIST lanzó una convocatoria pública para propuestas de algoritmos de clave pública resistentes a la cuántica.25 El proceso se desarrolló a lo largo de varias rondas de evaluación, durante las cuales la comunidad criptográfica internacional analizó intensamente las propuestas en cuanto a su seguridad, rendimiento y características de implementación.27 Para facilitar comparaciones justas, el NIST definió cinco categorías de seguridad, diseñadas para ser comparables en resistencia a los ataques contra AES-128, AES-192, AES-256 y funciones hash como SHA-256/384.29
1.2.2 Los Estándares Finalizados: Una Introducción Técnica
En julio de 2022, el NIST anunció la primera selección de algoritmos para la estandarización, que culminó con la publicación de los estándares FIPS en 2024.
ML-KEM (CRYSTALS-Kyber, FIPS 203): Designado como el estándar principal para Mecanismos de Encapsulamiento de Claves (KEM), su función es establecer una clave secreta compartida para protocolos como TLS.31 Su seguridad se basa en la dificultad computacional del problema de Aprendizaje con Errores sobre Módulos (Module-LWE) en retículos.33 El estándar define tres conjuntos de parámetros con niveles de seguridad crecientes: ML-KEM-512 (Nivel 1), ML-KEM-768 (Nivel 3) y ML-KEM-1024 (Nivel 5).33
ML-DSA (CRYSTALS-Dilithium, FIPS 204): Es el estándar principal para firmas digitales, esencial para la autenticación de datos y entidades.31 Al igual que Kyber, su seguridad se basa en el problema Module-LWE. Sin embargo, su construcción utiliza una técnica conocida como "Fiat-Shamir con Abortos".35 Esta técnica emplea un proceso de
muestreo por rechazo durante la firma para garantizar que la distribución de la firma resultante no revele ninguna información sobre la clave secreta, lo que podría ser explotado en ataques de canal lateral.35 El estándar define conjuntos de parámetros como ML-DSA-44, ML-DSA-65 y ML-DSA-87.36
SLH-DSA (SPHINCS+, FIPS 205): El NIST también estandarizó SPHINCS+, un esquema de firma sin estado basado en hash, como un respaldo para ML-DSA.26 Su seguridad se deriva de la resistencia de las funciones hash subyacentes, una base matemática completamente diferente a la de los retículos. Esta decisión refleja una estrategia de
diversidad algorítmica, un principio de defensa en profundidad para protegerse contra un posible avance criptoanalítico en una sola familia de problemas matemáticos.
1.2.3 La Estrategia de Transición: Criptografía Híbrida
La estrategia recomendada por la industria y los organismos de estandarización para la transición a PQC es un enfoque híbrido.
Justificación: Un esquema híbrido combina un algoritmo clásico bien establecido (por ejemplo, el intercambio de claves de curva elíptica X25519) con un nuevo algoritmo PQC (como Kyber768).24 La clave de sesión final se deriva criptográficamente de las salidas de ambos intercambios de claves.
Garantía de Seguridad: Este modelo ofrece una seguridad robusta y conservadora. La comunicación permanece segura siempre que al menos uno de los algoritmos componentes no esté comprometido.38 De esta manera, se protege contra la amenaza HNDL (a través del componente PQC) y, al mismo tiempo, se mitiga el riesgo de una vulnerabilidad desconocida en los nuevos algoritmos PQC, que aún no han sido sometidos a décadas de escrutinio como sus predecesores clásicos.40
Implementación Práctica: Este enfoque ya está siendo implementado por gigantes de la industria como Meta y Google y está en proceso de estandarización por el IETF para su uso en TLS 1.3.24
La técnica "Fiat-Shamir con Abortos" utilizada en Dilithium introduce una compensación fascinante: seguridad a costa de la variabilidad en el rendimiento. El paso de "muestreo por rechazo" significa que el tiempo de firma no es determinista; es una variable aleatoria con un promedio conocido.35 El procedimiento de firma es iterativo y puede "abortar" y reiniciarse si un valor intermedio excede un umbral predefinido, para evitar la fuga de información de la clave secreta.35 Esto implica que, aunque se puede medir el tiempo
medio de firma, existirá una distribución de tiempos. Esto tiene implicaciones significativas para los sistemas en tiempo real donde la latencia predecible es crucial. Por lo tanto, la metodología de benchmarking en la Fase 4 debe medir no solo la media y la mediana, sino también los percentiles 95 y 99 para capturar este comportamiento en el peor de los casos.
1.3 El Ecosistema del Proyecto Open Quantum Safe (OQS)
La viabilidad práctica de esta tesis depende en gran medida del ecosistema de software de código abierto proporcionado por el proyecto Open Quantum Safe (OQS).
1.3.1 liboqs: Es una biblioteca en C que proporciona implementaciones de referencia y optimizadas de los algoritmos PQC estandarizados y candidatos del NIST. Actúa como la capa fundamental, ofreciendo una API común para los diferentes esquemas.44 La biblioteca incluye, cuando están disponibles, implementaciones optimizadas que utilizan extensiones de hardware como AVX2, que pueden mejorar drásticamente el rendimiento.34
1.3.2 oqs-provider para OpenSSL 3.x: Este componente es el "pegamento" crítico para este proyecto. OpenSSL 3.x introdujo una nueva arquitectura de "proveedores", que permite que los algoritmos criptográficos se implementen como módulos cargables dinámicamente.45 El
oqs-provider es una biblioteca compartida que utiliza liboqs para exponer los algoritmos PQC al motor de OpenSSL.44 Esto permite que cualquier aplicación que dependa de OpenSSL 3.x, como el servidor web Nginx, utilice KEMs y firmas PQC sin necesidad de modificar el código fuente de la aplicación, simplemente configurando OpenSSL adecuadamente.50
El cambio del antiguo modelo de un "fork" de OpenSSL 1.1.1 mantenido por OQS al modelo de oqs-provider para OpenSSL 3.x es una mejora arquitectónica fundamental. Desacopla las implementaciones de los algoritmos PQC de la implementación del protocolo TLS/SSL. En el modelo anterior, el equipo de OQS tenía que mantener una bifurcación completa de OpenSSL, lo que era difícil de sincronizar con los parches de seguridad oficiales.52 El modelo de proveedor significa que el equipo de OQS solo necesita mantener el proveedor, y los usuarios pueden utilizarlo con una distribución estándar y sin modificar de OpenSSL 3.x. Esto reduce drásticamente la barrera de entrada y mejora la mantenibilidad y la seguridad, haciendo que el enfoque de esta tesis esté mucho más alineado con los despliegues de producción futuros.
La siguiente tabla resume la pila de software que se construirá y utilizará en este proyecto.
Tabla 1.1: Pila de Software del Ecosistema Open Quantum Safe (OQS)
Componente
Función
Rol Clave en la Tesis
liboqs
Biblioteca C con implementaciones de algoritmos PQC (Kyber, Dilithium, etc.).
Proporciona las implementaciones criptográficas fundamentales que serán evaluadas.
oqs-provider
Módulo (proveedor) para OpenSSL 3.x que expone los algoritmos de liboqs.
Actúa como el puente que permite a OpenSSL utilizar los algoritmos PQC de liboqs.
OpenSSL 3.x
Motor criptográfico y biblioteca TLS/SSL.
Compilado a medida para cargar el oqs-provider, proporcionando la base para las comunicaciones seguras.
Nginx
Servidor web de alto rendimiento.
Compilado para usar la versión personalizada de OpenSSL, sirviendo como el prototipo de aplicación web para las pruebas de TLS.


Fase 2: Diseño y Configuración del Entorno de Laboratorio Reproducible
Objetivo
Construir un banco de pruebas meticulosamente documentado, contenedorizado y aislado. El énfasis se pone en la reproducibilidad, un pilar de la investigación científica creíble, para garantizar que los resultados sean verificables y no un artefacto de una configuración de entorno específica.
2.1 Principios Arquitectónicos: Aislamiento y Reproducibilidad
2.1.1 Estrategia de Contenerización con Docker
La investigación empírica rigurosa exige un control estricto sobre las variables experimentales. La contenerización es la herramienta principal para lograr este control en un entorno de software.
Justificación: Se utilizará Docker para encapsular los entornos del servidor y del cliente. Esto garantiza que todas las dependencias, versiones de bibliotecas, indicadores del compilador y configuraciones sean idénticos en cada ejecución de la prueba, eliminando las variables ambientales como fuente de error.53 La naturaleza declarativa de los
Dockerfile y los archivos docker-compose.yml permite que todo el entorno se defina como código. Esto no solo automatiza la configuración, sino que también la hace archivable y fácilmente compartible, cumpliendo con un requisito clave para la investigación reproducible.54
Implementación: Se utilizará docker-compose para orquestar la configuración de múltiples contenedores, como un contenedor de servidor que ejecuta Nginx y un contenedor de cliente para ejecutar los scripts de benchmarking. Esto simplifica el proceso de iniciar, detener y conectar en red los componentes del experimento.56
2.1.2 Especificación del Entorno Base
Sistema Operativo: Se utilizará una distribución de Linux moderna con soporte a largo plazo (LTS), específicamente Ubuntu 22.04 LTS, como imagen base para los contenedores Docker. Esta elección se justifica por su amplio soporte comunitario, su cadena de herramientas moderna y su uso frecuente en la literatura de benchmarking de PQC.57
Cadena de Herramientas de Compilación: El Dockerfile comenzará instalando las herramientas esenciales necesarias para compilar toda la pila de software desde el código fuente: build-essential (para el compilador GCC/G++), git, cmake, ninja-build (para compilaciones paralelas más rápidas) y perl (una dependencia de la compilación de OpenSSL).45
2.2 Construcción de la Pila Criptográfica Habilitada para PQC desde el Código Fuente
Esta sección detalla el proceso paso a paso para construir la pila de software completa dentro del entorno Docker. Este es un proceso no trivial que debe ser documentado con precisión para garantizar la reproducibilidad.
2.2.1 El Dockerfile del Servidor
Se creará un único Dockerfile que definirá el proceso de construcción para la imagen del servidor. Este archivo será la definición canónica del entorno experimental.

2.2.2 Paso 1: Compilación de una Versión Personalizada de OpenSSL 3.x
El proceso de construcción comienza con la base criptográfica.
Se clonará el código fuente de una versión estable y reciente de OpenSSL 3.x (por ejemplo, 3.2.x o superior) desde su repositorio oficial.45
Se configurará utilizando el script ./config. El indicador --prefix se establecerá en un directorio personalizado y aislado dentro del contenedor (por ejemplo, /opt/openssl-pqc). Esto es crucial para evitar conflictos con la instalación de OpenSSL predeterminada del sistema.45
La biblioteca se compilará con make y se instalará en el prefijo especificado con make install.
2.2.3 Paso 2: Compilación de liboqs
A continuación, se compila la biblioteca que contiene los algoritmos PQC.
Se clonará el repositorio de liboqs desde el GitHub oficial de Open Quantum Safe.45
Se configurará utilizando cmake. Es fundamental especificar que se debe construir como una biblioteca compartida (-DBUILD_SHARED_LIBS=ON) y apuntar a la instalación personalizada de OpenSSL para sus propias dependencias de criptografía simétrica.45
Se compilará con ninja y se instalará.
2.2.4 Paso 3: Compilación de oqs-provider
Este es el paso de integración que conecta los componentes.
Se clonará el repositorio de oqs-provider.47
Se configurará con cmake, pasando de manera crítica las rutas a las instalaciones personalizadas de OpenSSL y liboqs. Este paso de vinculación es lo que une toda la pila.
Se compilará con ninja y la biblioteca del proveedor resultante (oqsprovider.so) se instalará en el directorio de módulos correcto para la compilación personalizada de OpenSSL (por ejemplo, /opt/openssl-pqc/lib/ossl-modules/).
La cadena de compilación es una secuencia de dependencias delicada. La compatibilidad de versiones entre liboqs, oqs-provider y OpenSSL no está garantizada en todos los commits. Una compilación exitosa depende del uso de versiones de cada componente que se sabe que funcionan bien juntas. El proyecto OQS publica versiones de oqs-provider que se prueban con versiones específicas de liboqs.44 Algunos tutoriales explícitamente extraen commits de git específicos para garantizar una compilación estable.45 Por lo tanto, la metodología debe especificar una estrategia robusta: "Utilizar las últimas etiquetas de lanzamiento estables para
liboqs y oqs-provider, o alternativamente, usar las versiones especificadas en el repositorio oqs-demos, que están seleccionadas para ser compatibles".
2.2.5 Paso 4: Configuración Final de OpenSSL
El último paso es configurar la instancia personalizada de OpenSSL para que reconozca al nuevo proveedor.
Se creará o modificará el archivo openssl.cnf (por ejemplo, en /opt/openssl-pqc/ssl/).
La configuración incluirá secciones para definir el proveedor y activarlo por defecto, asegurando que cualquier aplicación que utilice esta instancia de OpenSSL pueda acceder a los algoritmos PQC.50 Una configuración de ejemplo es:
Ini, TOML
openssl_conf = openssl_init
[openssl_init]
providers = provider_sect
[provider_sect]
oqsprovider = oqsprovider_sect
default = default_sect
[oqsprovider_sect]
activate = 1
[default_sect]
activate = 1


Un detalle sutil pero crítico es la elección de compilar Nginx (en la siguiente fase) contra el código fuente de la compilación personalizada de OpenSSL (--with-openssl=<ruta-al-código-fuente-de-openssl>) en lugar de la biblioteca instalada. El sistema de compilación de Nginx necesita acceso a los archivos de cabecera y fuente de OpenSSL para vincularse correctamente de forma estática o configurar su carga de módulos dinámicos.60 Simplemente apuntar a las bibliotecas instaladas en
/opt/openssl-pqc suele ser insuficiente. Esto significa que el Dockerfile debe retener el directorio del código fuente de OpenSSL incluso después de la compilación e instalación, lo que tiene implicaciones para el tamaño final de la imagen. Este detalle, a menudo un punto de fallo para los desarrolladores, debe ser explícitamente declarado y manejado en la metodología.
Fase 3: Implementación del Prototipo de Aplicación Web
Objetivo
Desarrollar una aplicación web funcional que sirva como el banco de pruebas concreto para los dos casos de uso de PQC. El prototipo debe ser lo suficientemente realista como para generar mediciones significativas, pero lo suficientemente simple como para garantizar que el rendimiento medido se centre en las operaciones criptográficas y no en la lógica de la aplicación.
3.1 Caso de Uso 1: Confidencialidad en Tránsito a través de TLS-Kyber
Este sub-proyecto se centra en el caso de uso más común para PQC: asegurar el canal de comunicación entre un cliente y un servidor web.
3.1.1 Compilación de Nginx con Soporte PQC
Se descargará el código fuente de una versión estable y reciente de Nginx.
Se compilará desde la fuente dentro del contenedor Docker. El indicador de configuración clave es --with-openssl=<ruta>, que apuntará al directorio del código fuente de la versión de OpenSSL habilitada para PQC construida en la Fase 2.60 Este paso crucial asegura que Nginx se vincule contra la biblioteca criptográfica correcta. También se incluirá el indicador
--with-http_ssl_module para habilitar la funcionalidad SSL/TLS.
El binario de Nginx compilado se instalará en un directorio local dentro del contenedor (por ejemplo, /opt/nginx-pqc/).
3.1.2 Generación y Gestión de Certificados
Se creará una Autoridad de Certificación (CA) simple y autofirmada utilizando el binario de OpenSSL personalizado.
Esta CA se utilizará para emitir un certificado de servidor para la instancia de Nginx.
Decisión de Diseño Crítica: Para aislar el rendimiento del KEM (Mecanismo de Encapsulamiento de Claves), el certificado del servidor en sí mismo será firmado utilizando un algoritmo clásico (por ejemplo, ecdsa-with-SHA256). Esto asegura que la parte de verificación de la firma del handshake de TLS no introduzca una sobrecarga relacionada con PQC, permitiendo una medición pura del mecanismo de intercambio de claves.

3.1.3 Configuración del Bloque de Servidor de Nginx
Se configurará un bloque de servidor en nginx.conf para escuchar en el puerto 443 para el tráfico SSL/TLS. Las directivas clave para habilitar el intercambio de claves PQC serán 59:
Nginx


server {
    listen 443 ssl;
    server_name localhost;

    ssl_certificate /path/to/server_cert.pem;
    ssl_certificate_key /path/to/server_key.pem;

    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers on;

    # Priorizar el grupo híbrido, con ECDHE clásico como respaldo
    ssl_ecdh_curve x25519_kyber768:X25519;
}


El nombre exacto del grupo híbrido (por ejemplo, x25519_kyber768 o X25519MLKEM768) depende de la versión del proveedor OQS y de OpenSSL. Este nombre se verificará ejecutando openssl list -key-exchange-algorithms con el binario personalizado.47
3.1.4 Interfaz de Usuario
Se creará una página index.html mínima que contenga un formulario de inicio de sesión simple. El acto de un cliente conectándose y cargando esta página constituirá el handshake de TLS que se medirá.
3.2 Caso de Uso 2: Autenticidad de Documentos con Firmas Dilithium
Este sub-proyecto se centra en la autenticidad e integridad de los datos en reposo o en tránsito, un caso de uso crítico para las firmas digitales.
3.2.1 Generación de Claves y Certificados PQC

Utilizando la herramienta de línea de comandos de OpenSSL personalizada, se generará un nuevo par de claves PQC utilizando un conjunto de parámetros de Dilithium (por ejemplo, dilithium3).50
El comando de ejemplo para generar la clave privada y un certificado público autofirmado sería:
openssl req -x509 -new -newkey dilithium3 -keyout dilithium_priv.key -out dilithium_pub.crt -nodes -subj "/CN=DocSigner".62
3.2.2 Implementación del Backend (por ejemplo, Python con FastAPI)
Se utilizará un framework web ligero para crear dos puntos finales de API.
Punto Final /sign:
Aceptará la carga de un archivo (por ejemplo, un PDF).
Calculará el hash criptográfico (SHA-256) del contenido del archivo. Es importante destacar que la operación de firma no actúa sobre el archivo completo, sino sobre su hash de tamaño fijo.
Utilizará el módulo subprocess de Python para invocar el binario de OpenSSL personalizado (/opt/openssl-pqc/bin/openssl) para firmar el archivo de hash con la clave privada de Dilithium. Un comando de ejemplo, adaptado de los usos de OpenSSL, sería: openssl dgst -sha256 -sign dilithium_priv.key -out signature.bin document_hash.txt.63
Devolverá el archivo de firma binario resultante al usuario.
Punto Final /verify:
Aceptará tres cargas: el documento original, el archivo de firma y el certificado público (dilithium_pub.crt).
Calculará el hash SHA-256 del documento original.
Utilizará subprocess para invocar a OpenSSL y realizar la verificación. Un comando de ejemplo sería: openssl dgst -sha256 -verify dilithium_pub.crt -signature signature.bin document_hash.txt.63
Devolverá un mensaje de "Verificación Correcta" o "Fallo en la Verificación" al usuario.
Una implementación alternativa podría utilizar una biblioteca de Python dedicada como dilithium-py 64, si se puede configurar para usar la biblioteca compartida
liboqs construida en la Fase 2. Esto proporcionaría una API más limpia y podría evitar la sobrecarga de iniciar un nuevo proceso para cada operación. La elección entre estos dos enfoques (proceso externo vs. biblioteca) es un detalle metodológico que se anotará y justificará.

3.2.3 Interfaz de Usuario
Se creará una página HTML simple con dos formularios: uno para subir un archivo para ser firmado y otro para subir el documento, la firma y el certificado para su verificación.
El proceso de firma y verificación implica múltiples pasos discretos: E/S de archivos, hashing y la operación criptográfica central. Para el benchmarking en la Fase 4, es fundamental medir únicamente el tiempo de la operación criptográfica, no el tiempo que se tarda en leer/escribir archivos o calcular el hash. Por lo tanto, el script de benchmarking para el caso de uso de la firma debe estar diseñado para pre-calcular el hash y cargar los archivos en memoria antes de iniciar el temporizador para la operación de sign o verify, y detener el temporizador inmediatamente después de que la función criptográfica devuelva un resultado. Esto aísla la variable de interés.
Además, el tamaño de los datos firmados es irrelevante para el rendimiento de las operaciones de generación y verificación de la firma en sí, ya que operan sobre un hash de tamaño fijo (por ejemplo, 32 bytes para SHA-256).63 Esto significa que si el archivo de entrada es de 1 KB o 1 GB, los tiempos de las operaciones
Sign y Verify deberían ser casi idénticos. Esta es una hipótesis clave para probar y confirmar. El plan de benchmarking en la Fase 4 debe incluir una prueba para verificar esto, lo que fortalecería las conclusiones de la tesis sobre dónde se encuentran realmente los cuellos de botella de rendimiento en un flujo de trabajo de firma de documentos.
Fase 4: Diseño y Ejecución de la Batería de Pruebas (Benchmarking)
Objetivo
Medir de forma sistemática y cuantitativa el impacto en el rendimiento de los algoritmos PQC en comparación con sus homólogos clásicos bajo una variedad de condiciones controladas. Esta fase constituye el núcleo experimental de la tesis.
4.1 Definición de Escenarios y Configuraciones de Prueba
Para garantizar una comparación clara y directa, se definen dos escenarios principales y un conjunto de configuraciones algorítmicas.
Escenario A (Handshake TLS): Medición del establecimiento de una sesión completa de TLS 1.3 entre un cliente y el servidor Nginx. Esta es una medición de extremo a extremo a nivel de aplicación, que captura el impacto combinado del intercambio de claves, la verificación de certificados y la sobrecarga del protocolo.
Escenario B (Ciclo de Vida de la Firma Digital): Medición del rendimiento de las tres primitivas criptográficas discretas que componen un esquema de firma: Generación de Claves, Firma y Verificación. Este es un micro-benchmarking de los algoritmos en sí mismos.
La siguiente tabla define la matriz de configuraciones que se compararán.
Tabla 4.1: Matriz de Configuraciones Criptográficas de Prueba

Escenario
Nombre de Configuración
Algoritmo de Intercambio de Claves
Algoritmo de Firma (Primitiva / Certificado)
TLS
Baseline-Classical
ECDHE (X25519)
ECDSA (P-256)
TLS
PQC-Hybrid
x25519_kyber768
ECDSA (P-256)
Firma
Baseline-Classical
N/A
ECDSA (P-256)
Firma
PQC-Pure
N/A
ML-DSA-65 (Dilithium3)

Esta matriz proporciona una visión clara del diseño experimental, separando explícitamente las pruebas de TLS y de firma y definiendo los grupos de "control" (Baseline) y "experimental" (PQC) para cada uno.
4.2 Métricas de Rendimiento Exhaustivas
Se requiere un enfoque multifacético para la medición del rendimiento, que capture las sobrecargas computacionales, de memoria, de red y de almacenamiento.65 La siguiente tabla detalla las métricas que se recopilarán.
Tabla 4.2: Matriz de Métricas de Rendimiento a Recopilar
Categoría de Métrica
Métrica Específica
Herramienta/Método
Unidad
Escenario(s) Aplicable(s)
Latencia Computacional
Tiempo de Handshake TLS
openssl s_time -new
ms
A


Tiempo de Generación de Clave
Script personalizado + time
ms
B


Tiempo de Firma
Script personalizado + time
ms
B


Tiempo de Verificación
Script personalizado + time
ms
B
Uso de CPU (Servidor)
Ciclos de CPU, Instrucciones
perf stat -e cycles,instructions
recuento
A, B


Tiempo de CPU (Usuario + Kernel)
perf stat
s
A, B
Huella de Memoria (Servidor)
Pico de Conjunto Residente (RSS)
/usr/bin/time -v
kB
A, B
Sobrecarga de Red
Tamaño de ClientHello
tcpdump / Wireshark
bytes
A


Tamaño de ServerHello
tcpdump / Wireshark
bytes
A


Bytes Totales del Handshake
tcpdump / Wireshark
bytes
A
Tamaño de Artefactos
Tamaño de Clave Pública
ls -l
bytes
B


Tamaño de Clave Privada
ls -l
bytes
B


Tamaño de la Firma
ls -l
bytes
B


4.3 Simulación de Condiciones de Red del Mundo Real (para el Escenario A)
Para ir más allá de un entorno de laboratorio idealizado, se deben simular las imperfecciones de la red.
Herramientas: Se utilizará la utilidad de Control de Tráfico de Linux (tc) con el módulo Emulador de Red (netem) en el contenedor del cliente. Esto permite introducir impedimentos de red de manera controlada sin afectar al servidor.
Condiciones de Prueba: Las pruebas de benchmarking del handshake TLS se repetirán bajo una matriz de condiciones de red para evaluar el rendimiento en escenarios realistas 66:
Línea Base: Sin latencia ni pérdida de paquetes añadidas.
Inyección de Latencia: Retrasos fijos de tiempo de ida y vuelta (RTT) de 30 ms (banda ancha de buena calidad), 80 ms (tráfico transcontinental) y 150 ms (tráfico transoceánico o móvil).
Inyección de Pérdida de Paquetes: Tasas de pérdida de paquetes aleatorias del 0.1%, 1% y 3% para simular redes poco fiables.
Variación de la MTU: Se ajustará la Unidad de Transmisión Máxima (MTU) de la interfaz de red del cliente a 1500 bytes (Ethernet estándar), 1400 bytes (típico en VPN) y 576 bytes (un mínimo seguro) para probar el impacto de la fragmentación de paquetes.66
4.4 Protocolo de Ejecución
Automatización: Todas las pruebas serán impulsadas por scripts de shell para garantizar la consistencia y automatizar el proceso de iteración a través de las configuraciones y condiciones de red.
Significación Estadística: Cada punto de prueba individual (por ejemplo, handshake TLS con Kyber a 80 ms de latencia y 1% de pérdida de paquetes) se repetirá un gran número de veces (por ejemplo, N=1,000) para recopilar una muestra estadísticamente robusta.66
Registro de Datos: Todos los resultados brutos se registrarán en archivos CSV estructurados para facilitar su análisis en la siguiente fase.
Existe un potencial efecto de interacción entre los tamaños de paquete más grandes de PQC y las condiciones de red adversas. Un handshake clásico puede caber en un solo paquete, mientras que un handshake PQC más grande podría requerir dos o más.66 En una red perfecta, la diferencia de tiempo es mínima. Sin embargo, con una latencia de 80 ms, ese viaje de ida y vuelta adicional añade al menos 80 ms al tiempo total. Con una pérdida de paquetes del 1%, la probabilidad de que uno de los dos paquetes se pierda es mayor que la de que se pierda un solo paquete, lo que podría desencadenar costosas retransmisiones de TCP y más retrasos. Esto significa que la penalización de rendimiento de PQC no es una sobrecarga fija, sino un multiplicador que empeora a medida que se degradan las condiciones de la red. El diseño experimental con
netem y la variación de la MTU está estructurado específicamente para capturar este efecto crítico y no lineal.
Además, el rendimiento de las implementaciones optimizadas con AVX2 frente a las implementaciones de referencia en C puede ser drástico.34
liboqs permite compilar con o sin soporte para AVX2. La metodología debe incluir un eje de comparación adicional: ejecutar los benchmarks con una compilación de liboqs habilitada para AVX2 frente a una compilación con las optimizaciones desactivadas (-DOQS_DISABLE_AVX2=ON). Esto cuantificará la importancia de la aceleración por hardware para PQC y proporcionará información sobre el rendimiento en servidores más antiguos o CPUs sin estos conjuntos de instrucciones.
Fase 5: Análisis de Resultados y Discusión
Objetivo
Transformar los datos brutos recopilados en la Fase 4 en conocimiento significativo. Esto implica un procesamiento estadístico riguroso, una visualización clara y una interpretación matizada de las compensaciones de rendimiento.
5.1 Procesamiento Estadístico y Visualización de Datos

5.1.1 Agregación y Limpieza de Datos:
Los datos brutos en formato CSV se procesarán utilizando un script de Python con la biblioteca pandas.
Para cada grupo de prueba, se calcularán medidas estadísticas clave: la media, la mediana (para mitigar el efecto de valores atípicos), la desviación estándar y los percentiles 95 y 99 (para comprender el rendimiento en el peor de los casos, especialmente relevante para el tiempo de firma variable de Dilithium).66
Los valores atípicos se identificarán y manejarán utilizando un método estándar como el puntaje Z modificado.66
5.1.2 Visualización de Datos:
Tablas Comparativas: Una tabla de resumen principal presentará las métricas clave (latencia mediana, tamaños de artefactos, etc.) para las configuraciones clásicas frente a las de PQC.
Diagramas de Caja (Box Plots): Se utilizarán para visualizar la distribución de las mediciones de latencia para los handshakes de TLS y las operaciones de firma. Esto mostrará claramente la mediana, el rango intercuartílico y los valores atípicos, proporcionando una imagen mucho más rica que un simple promedio.
Gráficos de Barras: Se emplearán para comparar valores discretos como los ciclos de CPU, el uso de memoria y los tamaños de las claves y firmas.
Gráficos de Líneas: Se usarán para trazar el tiempo del handshake de TLS en función del aumento de la latencia y la pérdida de paquetes de la red, tanto para las configuraciones clásicas como para las de PQC. Esta será la visualización principal para demostrar el efecto de interacción entre la elección del algoritmo y la calidad de la red.
5.2 Análisis Interpretativo de las Compensaciones (Trade-offs)
Esta sección responde a la pregunta fundamental: "¿Y qué?". El análisis debe ir más allá de la simple presentación de números para explicar sus implicaciones prácticas.
5.2.1 Cuantificación de la "Sobrecarga PQC":
Los resultados se enmarcarán en términos de costo versus beneficio. Por ejemplo: "La implementación del KEM híbrido x25519_kyber768 en TLS 1.3 resultó en un aumento de la latencia mediana del handshake de Z ms (X%) y un aumento de la sobrecarga de red de Y bytes en una red de baja latencia. Esto representa el costo de rendimiento concreto para mitigar la amenaza HNDL para datos seguros a largo plazo".68
Para las firmas: "La migración de ECDSA-P256 a Dilithium-3 resulta en una clave pública A veces más grande, una clave privada B veces más grande y una firma C veces más grande. El costo computacional de la verificación aumenta en un D%, mientras que el rendimiento de la firma..." Esto proporciona una visión clara y multidimensional de las compensaciones.67
5.2.2 Impacto de las Condiciones de la Red:
Los gráficos de líneas de la sección 5.1.2 se analizarán para determinar si la brecha de rendimiento entre los esquemas clásicos y los de PQC se amplía en condiciones de red adversas. La discusión se centrará en el "precipicio de rendimiento" que puede ocurrir cuando el tamaño del handshake excede la MTU de la red, forzando un viaje de ida y vuelta adicional.66
El análisis concluirá si la sobrecarga de red de PQC es una barrera significativa para las aplicaciones desplegadas en redes de alta latencia (por ejemplo, móviles, satelitales) o poco fiables.
5.2.3 Evaluación del Rol de la Aceleración por Hardware (AVX2):
Si las pruebas se realizaron con y sin AVX2, los resultados se compararán para cuantificar la ganancia de rendimiento de estas instrucciones específicas de la CPU.
Esto conducirá a una discusión sobre las implicaciones del despliegue: el rendimiento de PQC puede ser significativamente mejor en hardware de servidor moderno en comparación con sistemas más antiguos o ciertos entornos virtualizados que no exponen estas instrucciones.46
El "costo" de PQC no es uniforme en todas las operaciones. El análisis debe resaltar dónde el costo es mayor. Es probable que los datos muestren que la generación de claves y la firma para PQC son computacionalmente más costosas que la verificación.37 Para TLS, las operaciones costosas están en el servidor. Para la firma de documentos, la operación de
Sign es el cuello de botella. Esto permite una optimización dirigida. Por ejemplo, en un sistema donde los documentos se firman una vez pero se verifican muchas veces, el tiempo de firma más lento de Dilithium podría ser aceptable a cambio de su verificación más rápida en comparación con otros esquemas. Este análisis matizado es mucho más valioso que una simple conclusión de que "PQC es más lento".
Los resultados pueden utilizarse para crear un "marco de decisión" para los profesionales. Basándose en los datos recopilados, la tesis puede proponer un diagrama de flujo o una tabla simple. Por ejemplo: "Si su aplicación se despliega en un entorno de centro de datos de baja latencia y realiza muchas verificaciones de firmas, Falcon podría ser óptimo debido a sus firmas pequeñas y su rápida verificación.71 Si su aplicación requiere una firma rápida y opera a través de la internet pública, el equilibrio de rendimiento de Dilithium es preferible.37 Si su servidor TLS maneja tráfico de redes móviles, la sobrecarga de red de Kyber-1024 podría ser prohibitiva, lo que sugiere que Kyber-768 es una mejor opción". Esto traduce los hallazgos académicos en una guía procesable.
Fase 6: Conclusiones y Trabajo Futuro
Objetivo
Sintetizar los hallazgos del proyecto, reconocer las limitaciones de la investigación y proponer líneas claras para la investigación futura en el campo.
6.1 Síntesis de Hallazgos Clave y Conclusión sobre la Viabilidad
Esta sección presentará un resumen conciso y de alto nivel de los resultados cuantitativos más importantes de la Fase 5. Se ofrecerá una declaración definitiva sobre la pregunta central de la investigación: ¿cuál es la viabilidad práctica y el costo de rendimiento de implementar los estándares PQC del NIST, Kyber y Dilithium, en una aplicación web segura típica?
La conclusión principal será que PQC está listo para ser desplegado en la mayoría de las aplicaciones convencionales. Sin embargo, esta afirmación viene con una advertencia crucial: la selección del algoritmo y sus parámetros debe ser cuidadosamente adaptada a las restricciones específicas del entorno de destino.66 Los algoritmos basados en retículos, como Kyber y Dilithium, ofrecen un sólido equilibrio entre eficiencia computacional y una sobrecarga moderada de comunicación y almacenamiento, lo que los hace muy adecuados para una amplia gama de aplicaciones.67 El rendimiento, aunque generalmente más lento que el de sus homólogos clásicos, es manejable y, en muchos casos, la sobrecarga se vuelve insignificante en condiciones de red realistas.66
6.2 Limitaciones del Estudio
Una autoevaluación transparente y crítica de las limitaciones de la investigación es esencial para la integridad académica y para contextualizar los hallazgos.
Hardware y Entorno: El estudio se realizó en un único tipo de hardware (x86-64) dentro de un entorno Docker simulado, no en una red de producción. El rendimiento en otras arquitecturas (por ejemplo, ARM, RISC-V) o en infraestructuras de red del mundo real podría diferir significativamente.67
Alcance Algorítmico: El análisis se limitó a Kyber y Dilithium, los principales estándares del NIST para KEM y firmas. No proporciona un análisis comparativo con otros algoritmos estandarizados (Falcon, SPHINCS+) o candidatos de otras familias matemáticas (basados en código, isogenias, etc.), que ofrecen diferentes compensaciones de rendimiento.65
Análisis de Seguridad: Esta tesis se centra en el rendimiento, no en la seguridad criptoanalítica. Se asume la seguridad de las implementaciones de liboqs. Una auditoría de seguridad completa, que incluya la resistencia a ataques de canal lateral (Side-Channel Attacks), estuvo fuera del alcance de este trabajo. La evaluación sistemática de las contramedidas para estos ataques y su impacto en el rendimiento es un área crítica para la investigación futura.66
6.3 Vías para el Trabajo Futuro
Proponer direcciones específicas y bien justificadas para la investigación futura demuestra un dominio del campo y el impacto potencial del trabajo actual.
Benchmarking en Dispositivos de Recursos Limitados y de Borde (Edge): Replicar la batería de benchmarks en plataformas de bajo consumo basadas en ARM (por ejemplo, Raspberry Pi, teléfonos móviles) para evaluar específicamente la viabilidad de PQC para el Internet de las Cosas (IoT) y aplicaciones móviles. Esto es crucial ya que estos dispositivos tienen estrictas restricciones de CPU, memoria y energía.67
Análisis del Consumo de Energía: Extender la metodología para incluir la medición directa del consumo de energía (en vatios) y el gasto energético (en julios) por operación criptográfica, particularmente en dispositivos alimentados por batería. Este es un área crítica y poco explorada para PQC en contextos móviles y de IoT.66
Análisis de la Resistencia a Ataques de Canal Lateral: Investigar las implementaciones de liboqs en busca de posibles fugas de información a través de canales laterales no invasivos (por ejemplo, variaciones de tiempo, análisis de consumo de energía, ataques de temporización de caché). Este es un paso siguiente fundamental antes de que estas implementaciones puedan considerarse "endurecidas para producción".66
Comparación Algorítmica Ampliada: Extender el marco de benchmarking para incluir otros algoritmos estandarizados como Falcon (para comparar sus compensaciones de tamaño de firma y velocidad de verificación con Dilithium) y SPHINCS+ (para evaluar el rendimiento de las firmas basadas en hash).70
Estudios de Despliegue a Gran Escala en el Mundo Real: Colaborar con socios de la industria para desplegar el servidor Nginx habilitado para PQC en un entorno de producción limitado. Esto permitiría recopilar datos de rendimiento bajo cargas de tráfico de internet y condiciones de red reales, yendo más allá de las simulaciones de laboratorio y abordando desafíos de compatibilidad con infraestructura heredada y "middleboxes".68
Referencias
El estado actual de la criptografía cuántica & por qué la preparación es clave - Sectigo, accessed June 30, 2025, https://www.sectigo.com/es/recursos/preparacion-cuantica
Shor's algorithm - Wikipedia, accessed June 30, 2025, https://en.wikipedia.org/wiki/Shor%27s_algorithm
Algoritmo De Shors Y Algoritmo De Grovers - FasterCapital, accessed June 30, 2025, https://fastercapital.com/es/tema/algoritmo-de-shors-y-algoritmo-de-grovers.html/1
Algoritmo de Shor: como las computadoras cuánticas pueden romper los cimientos de la criptografía actual - Blog de Divulgación Científica y Tecnológica, accessed June 30, 2025, https://divulgando-ciencia.blog/algoritmo-de-shor-o-como-las-computadoras-cuanticas-pueden-romper-la-base-de-la-criptografia-actual/
Algoritmos Cuánticos: Shor & Grover - Manu Duque, accessed June 30, 2025, https://www.manuduque.com/algoritmos-cuanticos-shor-grover/
Shor's Algorithm and Its Impact On Present-Day Cryptography, accessed June 30, 2025, https://web.eecs.umich.edu/~aveliche/PDFs/RC_paper.pdf
The Impact of Quantum Computing on Cryptography | by Prabhu Srivastava - Medium, accessed June 30, 2025, https://medium.com/@prabhuss73/the-impact-of-quantum-computing-on-cryptography-58e76fbb0696
elliptic curves - How can Shor's Algorithm be applied to ECC ..., accessed June 30, 2025, https://crypto.stackexchange.com/questions/52777/how-can-shors-algorithm-be-applied-to-ecc
Elliptic Curve Cryptography in Post Quantum Age - Sefik Ilkin Serengil, accessed June 30, 2025, https://sefiks.com/2023/10/05/elliptic-curve-cryptography-in-post-quantum-age/
medium.com, accessed June 30, 2025, https://medium.com/@prabhuss73/the-impact-of-quantum-computing-on-cryptography-58e76fbb0696#:~:text=Shor's%20Algorithm,-Shor's%20algorithm%20efficiently&text=Breaking%20RSA%3A%20A%20quantum%20computer,%2C%20compromising%20ECC%2Dbased%20systems.
uisil.net, accessed June 30, 2025, https://uisil.net/repositorio/files/47/BERMUDEZ%20BLANCO%20ALBERTO%20JESUS.pdf
freemindtronic.com, accessed June 30, 2025, https://freemindtronic.com/quantum-computing-threats-rsa-aes/#:~:text=Impact%20of%20Grover's%20Algorithm%20on,far%20beyond%20foreseeable%20quantum%20capabilities.
Attacking AES-128 with Grover's algorithm - Cryptography Stack Exchange, accessed June 30, 2025, https://crypto.stackexchange.com/questions/63068/attacking-aes-128-with-grovers-algorithm
Quantum Computing Threats: RSA & AES Still Safe - Freemindtronic, accessed June 30, 2025, https://freemindtronic.com/quantum-computing-threats-rsa-aes/
Applying Grover's Algorithm to AES: Quantum Resource Estimates - ResearchGate, accessed June 30, 2025, https://www.researchgate.net/publication/312672796_Applying_Grover's_Algorithm_to_AES_Quantum_Resource_Estimates
Exploring Post-Quantum Cryptography: Review and Directions for the Transition Process, accessed June 30, 2025, https://www.mdpi.com/2227-7080/12/12/241
On the practical cost of Grover for AES key recovery - NIST Computer Security Resource Center, accessed June 30, 2025, https://csrc.nist.gov/csrc/media/Events/2024/fifth-pqc-standardization-conference/documents/papers/on-practical-cost-of-grover.pdf
On the Practical cost of Grover for AES Key Recovery - NIST Computer Security Resource Center, accessed June 30, 2025, https://csrc.nist.gov/csrc/media/Presentations/2024/practical-cost-of-grover-for-aes-key-recovery/images-media/sarah-practical-cost-grover-pqc2024.pdf
Harvest now, decrypt later: Why today's encrypted data isn't safe ..., accessed June 30, 2025, https://www.hashicorp.com/blog/harvest-now-decrypt-later-why-today-s-encrypted-data-isn-t-safe-forever
Harvest Now, Decrypt Later(HNDL): Preparing for the Quantum Threat, accessed June 30, 2025, https://www.encryptionconsulting.com/harvest-now-decrypt-later-preparing-for-the-quantum-threat/
Harvest Now, Decrypt Later: The Quantum Security Threat Hanging Over Today's Data, accessed June 30, 2025, https://quantumxc.com/blog/harvest-now-decrypt-later/
What You Need to Know About "Harvest-Now, Decrypt-Later" Attacks - AppViewX, accessed June 30, 2025, https://www.appviewx.com/blogs/what-you-need-to-know-about-harvest-now-decrypt-later-attacks/
Harvest now, decrypt later - Wikipedia, accessed June 30, 2025, https://en.wikipedia.org/wiki/Harvest_now,_decrypt_later
Meta Uses Hybrid Approach as it Faces Transition to Post-Quantum Cryptography, accessed June 30, 2025, https://thequantuminsider.com/2024/05/24/meta-uses-hybrid-approach-as-it-faces-transition-to-post-quantum-cryptography/
What is the NIST standardization process? - Utimaco, accessed June 30, 2025, https://utimaco.com/service/knowledge-base/post-quantum-cryptography/what-nist-standardization-process
Post-Quantum Cryptography | CSRC - NIST Computer Security Resource Center, accessed June 30, 2025, https://csrc.nist.gov/projects/post-quantum-cryptography
NIST: Technical Summary of the new PQC Standards Process ..., accessed June 30, 2025, https://www.infosecglobal.com/posts/new-pqc-standards-process
Evaluation Process - Post-Quantum Cryptography | CSRC - National Institute of Standards and Technology, accessed June 30, 2025, https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization/evaluation-process
Post-Quantum Cryptography | CSRC - NIST Computer Security Resource Center, accessed June 30, 2025, https://csrc.nist.gov/projects/post-quantum-cryptography/post-quantum-cryptography-standardization/evaluation-criteria/security-(evaluation-criteria)
Post-Quantum crypto standardization - NIST Computer Security Resource Center | CSRC, accessed June 30, 2025, https://csrc.nist.rip/groups/ST/post-quantum-crypto/evaluation-criteria.html
NIST Post-Quantum Cryptography Standardization - Wikipedia, accessed June 30, 2025, https://en.wikipedia.org/wiki/NIST_Post-Quantum_Cryptography_Standardization
Kyber - Wikipedia, accessed June 30, 2025, https://en.wikipedia.org/wiki/Kyber
FIPS 203, Module-Lattice-Based Key-Encapsulation Mechanism ..., accessed June 30, 2025, https://csrc.nist.gov/pubs/fips/203/final
Kyber - CRYSTALS, accessed June 30, 2025, https://pq-crystals.org/kyber/
Improving Speed of Dilithium's Signing Procedure - Cryptology ..., accessed June 30, 2025, https://eprint.iacr.org/2019/420.pdf
The Wonderful World of Dilithium (aka ML-DSA) and The Fiat Shamir Method, accessed June 30, 2025, https://billatnapier.medium.com/the-wonderful-world-of-dilithium-aka-ml-dsa-and-the-fiat-shamir-method-cea55fad5e12
Dilithium - CRYSTALS, accessed June 30, 2025, https://pq-crystals.org/dilithium/
What is hybrid post-quantum encryption? - QCVE.org, accessed June 30, 2025, https://qcve.org/blog/what-is-hybrid-post-quantum-encryption
PQC Roundtable: When (and When Not to Use) Hybrid Encryption - Quantum Xchange, accessed June 30, 2025, https://quantumxc.com/blog/white-house-pqc-roundtable-hybrid-encryption/
To Hybrid or Not to Hybrid: Navigating the PQC Transition - YouTube, accessed June 30, 2025, https://www.youtube.com/watch?v=QBy4bL6Ke_k
ANSSI views on the Post-Quantum Cryptography transition, accessed June 30, 2025, https://cyber.gouv.fr/en/publications/anssi-views-post-quantum-cryptography-transition
Cryptographic Agility for Control over Hybrid Post-Quantum TLS - QuSecure, accessed June 30, 2025, https://www.qusecure.com/cryptographic-agility-for-control-over-hybrid-post-quantum-tls/
Post-Quantum Cryptography - Amazon Web Services, accessed June 30, 2025, https://aws.amazon.com/security/post-quantum-cryptography/
Open Quantum Safe: Home, accessed June 30, 2025, https://openquantumsafe.org/
Developing with quantum-safe OpenSSL, accessed June 30, 2025, https://developer.ibm.com/tutorials/awb-quantum-safe-openssl/
The Performance of Post-Quantum Key Encapsulation Mechanisms - DiVA portal, accessed June 30, 2025, https://www.diva-portal.org/smash/get/diva2:1574260/FULLTEXT01.pdf
How to Configure Post-Quantum Cryptography in Your Web Server - Medium, accessed June 30, 2025, https://medium.com/be-tech-with-santander/how-to-configure-post-quantum-cryptography-in-your-web-server-fcf79e05e526
README.md - open-quantum-safe/oqs-provider - GitHub, accessed June 30, 2025, https://github.com/open-quantum-safe/oqs-provider/blob/main/README.md
open-quantum-safe/oqs-provider: OpenSSL 3 provider containing post-quantum algorithms - GitHub, accessed June 30, 2025, https://github.com/open-quantum-safe/oqs-provider
Post Quantum TLS server/client in C using OpenSSL and Open Quantum Safe project | by Taehoon Yoon | Medium, accessed June 30, 2025, https://medium.com/@seantywork/post-quantum-tls-server-client-in-c-using-openssl-and-open-quantum-safe-project-a73ce19a9607
OpenSSL Tutorial Video-15 | Using OQSProvider - YouTube, accessed June 30, 2025, https://www.youtube.com/watch?v=Cm_PIAfvo9A
Updates from the Open Quantum Safe Project, accessed June 30, 2025, https://csrc.nist.gov/CSRC/media/Events/third-pqc-standardization-conference/documents/accepted-papers/schanck-open-quantum-safe-project-pqc2021.pdf
TLS | Open Quantum Safe, accessed June 30, 2025, https://openquantumsafe.org/applications/tls.html
Essential guidelines for computational method benchmarking - PMC - PubMed Central, accessed June 30, 2025, https://pmc.ncbi.nlm.nih.gov/articles/PMC6584985/
Five keys to writing a reproducible lab protocol - ResearchGate, accessed June 30, 2025, https://www.researchgate.net/publication/354396784_Five_keys_to_writing_a_reproducible_lab_protocol
crt26/pqc-evaluation-tools: A comprehensive benchmarking ... - GitHub, accessed June 30, 2025, https://github.com/crt26/pqc-evaluation-tools
PQC Benchmark 2025: Kyber vs BIKE vs HQC - Online Hash Crack, accessed June 30, 2025, https://www.onlinehashcrack.com/guides/post-quantum-crypto/pqc-benchmark-2025-kyber-vs-bike-vs-hqc.php
Post Quantum Encryption with NGINX on Ubuntu 24.04 | Linode Docs, accessed June 30, 2025, https://www.linode.com/docs/guides/post-quantum-encryption-nginx-ubuntu2404/
docs/docs/guides/security/encryption/post-quantum-encryption-nginx-ubuntu2404/index.md at develop · linode/docs - GitHub, accessed June 30, 2025, https://github.com/linode/docs/blob/develop/docs/guides/security/encryption/post-quantum-encryption-nginx-ubuntu2404/index.md
Unable to configure NGINX to using custom installed openssl : r/docker - Reddit, accessed June 30, 2025, https://www.reddit.com/r/docker/comments/lpnivh/unable_to_configure_nginx_to_using_custom/
Go Developers, Get Ready for Quantum-Safe TLS | by Gil Adda | CyberArk Engineering, accessed June 30, 2025, https://medium.com/cyberark-engineering/go-developers-get-ready-for-quantum-safe-tls-28034a656e88
openquantumsafe/oqs-ossl3 - Docker Image, accessed June 30, 2025, https://hub.docker.com/r/openquantumsafe/oqs-ossl3
Tutorial: Code Signing and Verification with OpenSSL - EclipseSource, accessed June 30, 2025, https://eclipsesource.com/blogs/2016/09/07/tutorial-code-signing-and-verification-with-openssl/
GiacomoPope/dilithium-py: A pure python implementation ... - GitHub, accessed June 30, 2025, https://github.com/GiacomoPope/dilithium-py
Performance Evaluation of Post-Quantum Cryptography: A Comprehensive Framework for Experimental Analysis - ResearchGate, accessed June 30, 2025, https://www.researchgate.net/publication/388845887_Performance_Evaluation_of_Post-Quantum_Cryptography_A_Comprehensive_Framework_for_Experimental_Analysis
A Practical Performance Benchmark of Post-Quantum Cryptography ..., accessed June 30, 2025, https://www.mdpi.com/2410-387X/9/2/32
Performance Analysis and Deployment Considerations of Post-Quantum Cryptography for Consumer Electronics - arXiv, accessed June 30, 2025, https://arxiv.org/html/2505.02239v1
Reading between the lines of the IEEE's PQC algorithms benchmark ..., accessed June 30, 2025, https://medium.com/@quantumalexey/reading-between-the-lines-of-the-ieees-pqc-algorithms-benchmark-publication-e52704e00969
Performance Analysis and Industry Deployment of Post-Quantum Cryptography Algorithms, accessed June 30, 2025, https://arxiv.org/html/2503.12952v1
Performance Analysis of Post-Quantum Cryptography Algorithms for ..., accessed June 30, 2025, https://www.mdpi.com/2076-3417/14/12/4994
Post-Quantum Authentication in TLS 1.3: A Performance Study - Network and Distributed System Security (NDSS) Symposium, accessed June 30, 2025, https://www.ndss-symposium.org/wp-content/uploads/2020/02/24203.pdf
(PDF) A Practical Performance Benchmark of Post-Quantum Cryptography Across Heterogeneous Computing Environments - ResearchGate, accessed June 30, 2025, https://www.researchgate.net/publication/391971178_A_Practical_Performance_Benchmark_of_Post-Quantum_Cryptography_Across_Heterogeneous_Computing_Environments
Post-quantum cryptography - Wikipedia, accessed June 30, 2025, https://en.wikipedia.org/wiki/Post-quantum_cryptography
pqm4: Benchmarking NIST Additional Post-Quantum Signature Schemes on Microcontrollers, accessed June 30, 2025, https://csrc.nist.gov/csrc/media/Events/2024/fifth-pqc-standardization-conference/documents/papers/pqm4-benchmarking-nist-addl-pq-sig-schemes.pdf
