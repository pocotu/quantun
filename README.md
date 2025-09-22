# Quantun

## Implementación y Análisis de Rendimiento de los Estándares PQC del NIST

**TLS-Kyber y Firmas Dilithium en una Aplicación Web Segura**

🔗 **Demo**: [quantun-dusky.vercel.app](https://quantun-dusky.vercel.app)

### 📋 Descripción

Quantun es un proyecto de investigación que implementa y analiza el rendimiento de los estándares de criptografía post-cuántica (PQC) del NIST. El proyecto se enfoca en la integración de algoritmos TLS-Kyber y firmas Dilithium en una aplicación web segura, evaluando su viabilidad y rendimiento en condiciones reales.

### 🎯 Objetivos

- Implementar algoritmos de criptografía post-cuántica estándar del NIST
- Analizar el rendimiento de TLS-Kyber y firmas Dilithium
- Evaluar la sobrecarga computacional en aplicaciones web
- Proporcionar métricas y análisis estadísticos comparativos

### 🚀 Fases del Proyecto

#### Fase 1: Fundamentos Teóricos
- **Amenaza Cuántica y Estándares NIST**
- Algoritmos de Shor/Grover, HNDL y Ecosistema OQS

#### Fase 2: Configuración del Entorno
- **Pila OpenSSL 3.x + liboqs + oqs-provider**
- Entorno Docker Contenedorizado y Reproducible

#### Fase 3: Implementación PQC
- **Nginx PQC + TLS-Kyber & Firmas Dilithium**
- Aplicación Web con KEMs y Firmas Post-Cuánticas

#### Fase 4: Mediciones de Rendimiento
- **Métricas TLS Handshake & Condiciones de Red**
- Latencia, CPU, Memoria y Simulación tc+netem

#### Fase 5: Análisis de Datos
- **Análisis Estadístico & Trade-offs PQC**
- Visualización de Datos y Sobrecarga Computacional

#### Fase 6: Conclusiones
- **Viabilidad PQC & Investigación Futura**
- Síntesis de Hallazgos y Limitaciones del Estudio

### 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Criptografía**: OpenSSL 3.x, liboqs, oqs-provider
- **Algoritmos PQC**: 
  - TLS-Kyber (Key Encapsulation Mechanism)
  - Dilithium (Firmas Digitales)
- **Infraestructura**: Docker, Nginx
- **Análisis**: Métricas de rendimiento, simulación de red

### 📊 Características

- ✅ Implementación completa de estándares NIST PQC
- ✅ Interface web interactiva para visualización
- ✅ Análisis de rendimiento en tiempo real
- ✅ Simulación de condiciones de red adversas
- ✅ Métricas detalladas de latencia y recursos
- ✅ Comparación con criptografía clásica

### 📁 Estructura del Proyecto

```
quantun/
├── index.html                 # Página principal
├── fase1.html - fase6.html    # Páginas de cada fase
├── script-principal.js        # Lógica principal
├── script-fase*.js           # Scripts específicos por fase
├── styles-principal.css      # Estilos principales
├── styles-fase*.css         # Estilos específicos por fase
├── animado/                 # Recursos de animaciones
├── docs/                    # Documentación adicional
└── README.md               # Este archivo
```

### 🎮 Uso

1. Visita la [demo en vivo](https://quantun-dusky.vercel.app)
2. Navega por las 6 fases del proyecto
3. Explora los análisis de rendimiento
4. Revisa las métricas y comparaciones

### 🔬 Investigación

Este proyecto forma parte de la investigación en criptografía post-cuántica, contribuyendo al entendimiento de:

- Viabilidad práctica de algoritmos PQC del NIST
- Impacto en el rendimiento de aplicaciones web
- Trade-offs entre seguridad y eficiencia
- Preparación para la era post-cuántica

### 📚 Referencias

El proyecto incluye referencias científicas y académicas relevantes a la criptografía post-cuántica y los estándares del NIST.

### 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

### 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

**Desarrollado por**: [pocotu](https://github.com/pocotu)  
**Estado**: 🟢 Activo  
**Último update**: Septiembre 2025