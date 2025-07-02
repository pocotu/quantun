// Script para Fase 2: Diseño y Configuración del Entorno

document.addEventListener('DOMContentLoaded', function() {
    initializePhase2();
});

function initializePhase2() {
    setupAnimations();
    setupInteractivity();
    setupHoverEffects();
}

// Animaciones de entrada
function setupAnimations() {
    // Animación secuencial de las tarjetas
    const cards = document.querySelectorAll('.architecture-card, .crypto-stack-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Animación de los elementos del stack diagram
    setTimeout(() => {
        animateStackDiagram();
    }, 400);

    // Animación de los pasos de construcción
    setTimeout(() => {
        animateBuildSteps();
    }, 800);
}

function animateStackDiagram() {
    const stackElements = document.querySelectorAll('.stack-layer, .stack-layer-dual, .stack-arrow');
    
    stackElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

function animateBuildSteps() {
    const steps = document.querySelectorAll('.step-card');
    
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            step.style.transition = 'all 0.5s ease';
            step.style.opacity = '1';
            step.style.transform = 'scale(1)';
        }, index * 100);
    });
}

// Interactividad
function setupInteractivity() {
    // Efecto de click en benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);
            
            // Mostrar información específica
            const title = this.querySelector('span').textContent;
            showBenefitInfo(title);
        });
    });

    // Efecto de click en step cards
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach(card => {
        card.addEventListener('click', function() {
            // Resaltar el paso seleccionado
            stepCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Efecto visual
            this.style.transform = 'translateY(-5px) scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1)';
            }, 200);
        });
    });

    // Click en layers del stack
    const stackLayers = document.querySelectorAll('.stack-layer, .stack-layer-dual');
    stackLayers.forEach(layer => {
        layer.addEventListener('click', function() {
            // Efecto de selección
            stackLayers.forEach(l => l.classList.remove('selected'));
            this.classList.add('selected');
            
            // Mostrar información de la capa
            const layerType = this.classList.contains('app') ? 'app' :
                             this.classList.contains('ssl') ? 'ssl' :
                             this.classList.contains('lib') ? 'lib' :
                             this.classList.contains('stack-layer-dual') ? 'provider' : 'base';
            showStackLayerInfo(layerType);
        });
    });

    // Click en spec cards
    const specCards = document.querySelectorAll('.spec-card');
    specCards.forEach(card => {
        card.addEventListener('click', function() {
            const isOS = this.classList.contains('os');
            if (isOS) {
                showUbuntuInfo();
            } else {
                showToolchainInfo();
            }
        });
    });

    // Click en badges de principios
    const principleBadge = document.querySelector('.principle-badge');
    if (principleBadge) {
        principleBadge.addEventListener('click', function() {
            showIsolationPrincipleDetails();
        });
    }

    // Click en version badge
    const versionBadge = document.querySelector('.version-badge');
    if (versionBadge) {
        versionBadge.addEventListener('click', function() {
            showVersionCompatibilityDetails();
        });
    }

    // Click en improvement note
    const improvementNote = document.querySelector('.improvement-note');
    if (improvementNote) {
        improvementNote.addEventListener('click', function() {
            showProviderArchitectureDetails();
        });
    }

    // Click en compilation details
    const compilationDetails = document.querySelectorAll('.compilation-detail');
    compilationDetails.forEach(detail => {
        detail.addEventListener('click', function() {
            const step = this.querySelector('h4').textContent;
            showCompilationStepDetails(step);
        });
    });

    // Agregar manejadores de teclado para modales
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal-overlay');
            modals.forEach(modal => {
                modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
                setTimeout(() => modal.remove(), 300);
            });
        }
    });
}

// Funciones para mostrar información específica
function showBenefitInfo(title) {
    let content = '';
    switch(title) {
        case 'Control Variables':
            content = `Control preciso sobre todas las variables del entorno de ejecución.

Beneficios:
• Kernel específico y versión determinista
• Bibliotecas con versiones fijas
• Configuración de red controlada
• Recursos de sistema predecibles

Resultado: Mediciones reproducibles y confiables.`;
            break;
        case 'Entorno como Código':
            content = `Definición declarativa del entorno mediante Dockerfile.

Características:
• Configuración versionada
• Reproducible en cualquier máquina
• Auditoria completa de cambios
• Rollback rápido a versiones anteriores

Ventaja: Investigación reproducible y colaborativa.`;
            break;
        case 'Reproducibilidad':
            content = `Garantía de resultados consistentes en diferentes ejecuciones.

Elementos clave:
• Misma imagen base siempre
• Dependencias con versiones fijas
• Configuración idéntica
• Aislamiento del host

Importancia: Validación científica de los resultados.`;
            break;
        case 'Orquestación':
            content = `Gestión coordinada de múltiples contenedores con docker-compose.

Capacidades:
• Definición de servicios
• Redes virtuales
• Volúmenes compartidos
• Escalado automático

Aplicación: Simulación de entornos distribuidos complejos.`;
            break;
    }
    
    const modal = createModal(`💡 ${title}`, content, 'info');
    document.body.appendChild(modal);
}

function showUbuntuInfo() {
    const modal = createModal(
        '🐧 Ubuntu 22.04 LTS - Sistema Base',
        `Ubuntu 22.04 LTS "Jammy Jellyfish" proporciona una base estable y moderna.

Características técnicas:
• Kernel Linux 5.15 LTS
• GCC 11.2 con soporte C++20
• Python 3.10 nativo
• Bibliotecas actualizadas

Ventajas para PQC:
• Amplio soporte en literatura académica
• Cadena de herramientas moderna
• Repositorios bien mantenidos
• Compatibilidad con herramientas de benchmarking

Soporte a largo plazo:
• Actualizaciones de seguridad hasta 2027
• Estabilidad para investigación reproducible`,
        'info'
    );
    document.body.appendChild(modal);
}

function showToolchainInfo() {
    const modal = createModal(
        '🛠️ Cadena de Compilación - Herramientas de Desarrollo',
        `Conjunto completo de herramientas para compilar OpenSSL y componentes PQC.

Herramientas incluidas:
• build-essential - Compiladores GCC/G++
• git - Control de versiones para código fuente
• cmake - Sistema de construcción moderno
• ninja-build - Backend de construcción rápido
• perl - Requerido por scripts de OpenSSL

Versiones específicas:
• GCC 11.2 - Optimizaciones modernas
• CMake 3.22 - Soporte completo C++20
• Ninja 1.10 - Construcción paralela eficiente

Resultado: Compilación optimizada de toda la pila PQC`,
        'info'
    );
    document.body.appendChild(modal);
}



// Efectos hover mejorados
function setupHoverEffects() {
    // Efecto hover en benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto hover en spec cards
    const specCards = document.querySelectorAll('.spec-card');
    specCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        });
    });

    // Efecto hover en stack layers
    const stackLayers = document.querySelectorAll('.stack-layer, .stack-layer-dual');
    stackLayers.forEach(layer => {
        layer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.2)';
        });
        
        layer.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
        });
    });
}

// Funciones de navegación
function goBack() {
    window.location.href = 'index.html';
}

function prevPhase() {
    window.location.href = 'fase1.html';
}

function nextPhase() {
    window.location.href = 'fase3.html';
}

// Efectos especiales para elementos críticos
document.addEventListener('DOMContentLoaded', function() {
    // Efecto pulsante en la nota crítica
    const criticalNote = document.querySelector('.critical-note');
    if (criticalNote) {
        setInterval(() => {
            criticalNote.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.3)';
            setTimeout(() => {
                criticalNote.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }, 1000);
        }, 3000);
    }

    // Animación de los números de paso
    const stepNumbers = document.querySelectorAll('.step-number');
    stepNumbers.forEach((number, index) => {
        setTimeout(() => {
            number.style.animation = 'pulse 0.6s ease-in-out';
        }, index * 200 + 1000);
    });
});

// Función para crear modales
function createModal(title, content, type = 'info') {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(10px);
        animation: modalFadeIn 0.3s ease-out;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 30px;
        max-width: 600px;
        max-height: 80vh;
        margin: 20px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        position: relative;
        animation: modalSlideUp 0.3s ease-out;
        overflow-y: auto;
    `;
    
    // Agregar estilos de animación si no existen
    if (!document.querySelector('#modal-animations')) {
        const style = document.createElement('style');
        style.id = 'modal-animations';
        style.textContent = `
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalSlideUp {
                from {
                    opacity: 0;
                    transform: translateY(50px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Color según tipo
    let headerColor;
    switch(type) {
        case 'info': headerColor = '#3498db'; break;
        case 'success': headerColor = '#27ae60'; break;
        case 'warning': headerColor = '#f39c12'; break;
        case 'error': headerColor = '#e74c3c'; break;
        default: headerColor = '#9b59b6';
    }
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <h3 style="margin: 0; color: ${headerColor}; font-size: 1.5rem; line-height: 1.3; flex: 1;">${title}</h3>
            <button class="close-btn" style="
                background: none;
                border: none;
                font-size: 1.8rem;
                cursor: pointer;
                color: #999;
                padding: 5px;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                margin-left: 15px;
                flex-shrink: 0;
            ">&times;</button>
        </div>
        <div style="line-height: 1.6; color: #333; font-size: 1rem; white-space: pre-line;">${content}</div>
    `;
    
    const closeBtn = modalContent.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
        setTimeout(() => modal.remove(), 300);
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.background = '#f0f0f0';
        closeBtn.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.background = 'none';
        closeBtn.style.transform = 'scale(1)';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    modal.appendChild(modalContent);
    return modal;
}

// Funciones para mostrar información de componentes
function showDockerInfo() {
    const modal = createModal(
        '🐳 Docker - Contenerización',
        `Docker proporciona un entorno aislado y reproducible para nuestras pruebas.

Ventajas:
• Control total sobre el entorno de ejecución
• Eliminación de variables del sistema host
• Portabilidad entre diferentes máquinas
• Configuración declarativa via Dockerfile

En nuestro proyecto:
• Ubuntu 22.04 LTS como base
• Cadena de compilación completa
• OpenSSL + oqs-provider + liboqs preinstalados`,
        'info'
    );
    document.body.appendChild(modal);
}

function showOpenSSLInfo() {
    const modal = createModal(
        '🔒 OpenSSL 3.x - Motor Criptográfico',
        `OpenSSL 3.x introduce la arquitectura de proveedores que revoluciona la integración PQC.

Características clave:
• Arquitectura modular con proveedores
• Carga dinámica de algoritmos
• Compatibilidad hacia atrás
• Configuración flexible

Ventaja para PQC:
• No requiere modificar aplicaciones existentes
• oqs-provider se conecta transparentemente
• Soporte híbrido clásico + PQC`,
        'info'
    );
    document.body.appendChild(modal);
}

function showStackLayerInfo(layerType) {
    let title, content;
    
    switch(layerType) {
        case 'app':
            title = '🌐 Capa de Aplicación - Nginx';
            content = `Nginx actúa como nuestro prototipo de aplicación web.

Configuración:
• Compilado con OpenSSL personalizado
• Soporte para TLS 1.3
• Certificados híbridos
• Métricas de rendimiento integradas

Rol en benchmarking:
• Representa aplicaciones web reales
• Permite medición end-to-end
• Configurable para diferentes escenarios`;
            break;
        case 'ssl':
            title = '🔐 Capa SSL/TLS - OpenSSL';
            content = `OpenSSL maneja todo el protocolo TLS/SSL.

Funcionalidades:
• Negociación de algoritmos
• Establecimiento de claves
• Cifrado de datos
• Validación de certificados

Integración PQC:
• Carga automática de oqs-provider
• Soporte para curvas híbridas
• Transparente para aplicaciones`;
            break;
        case 'provider':
            title = '🔌 Capa Provider - oqs-provider';
            content = `El puente entre OpenSSL y las implementaciones PQC.

Responsabilidades:
• Traducir llamadas OpenSSL a liboqs
• Gestionar algoritmos híbridos
• Configuración via archivos
• Optimizaciones específicas

Algoritmos soportados:
• ML-KEM (Kyber) - Intercambio de claves
• ML-DSA (Dilithium) - Firmas digitales
• SLH-DSA (SPHINCS+) - Firmas hash`;
            break;
        case 'lib':
            title = '⚙️ Capa Biblioteca - liboqs';
            content = `Las implementaciones fundamentales de algoritmos PQC.

Contenido:
• Implementaciones de referencia NIST
• Optimizaciones específicas (AVX2, ARM)
• API unificada
• Benchmarking integrado

Mantenimiento:
• Actualizaciones frecuentes
• Nuevos algoritmos
• Correcciones de seguridad
• Optimizaciones de rendimiento`;
            break;
    }
    
    const modal = createModal(title, content, 'info');
    document.body.appendChild(modal);
}

function showIsolationPrincipleDetails() {
    const title = '🛡️ Principio de Aislamiento Arquitectónico';
    const content = `Fundamento metodológico para investigación empírica rigurosa en PQC.

🔬 **Control de Variables Experimentales:**
• Eliminación de variables ambientales como fuente de error
• Dependencias con versiones exactas y reproducibles
• Configuración determinista del entorno de ejecución
• Aislamiento del sistema host para evitar interferencias

🏗️ **Estrategia de Contenerización:**
• Docker: encapsulación completa de entornos servidor y cliente
• Garantía de configuraciones idénticas en cada ejecución de prueba
• Dockerfile declarativo: entorno definido como código
• docker-compose: orquestación de múltiples componentes

📊 **Requisitos de Investigación Científica:**
• Reproducibilidad: pilar de investigación creíble
• Verificabilidad: resultados deben ser confirmables por terceros
• Archivabilidad: configuración compartible y documentada
• Automatización: eliminación de variabilidad humana

🎯 **Beneficio para Benchmarking PQC:**
• Mediciones consistentes entre algoritmos clásicos y post-cuánticos
• Eliminación de sesgos por diferencias de configuración
• Comparaciones justas de rendimiento bajo condiciones controladas`;
    
    const modal = createModal(title, content, 'principle');
    document.body.appendChild(modal);
}

function showVersionCompatibilityDetails() {
    const title = '🏷️ Compatibilidad Crítica de Versiones';
    const content = `Desafío fundamental en la construcción de pila criptográfica PQC desde código fuente.

⚠️ **Problema de Compatibilidad:**
• Versiones de liboqs, oqs-provider y OpenSSL no garantizan compatibilidad en todos los commits
• Compilación exitosa depende de versiones específicas probadas conjuntamente
• APIs en evolución constante durante desarrollo activo de PQC

🔧 **Estrategia de Mitigación:**
• Usar últimas etiquetas de lanzamiento estables para liboqs y oqs-provider
• Alternativamente: versiones especificadas en repositorio oqs-demos
• oqs-demos: selección curada de versiones compatibles probadas

📋 **Metodología Robusta:**
• Especificar commits exactos de git para reproducibilidad
• Proyecto OQS publica versiones de oqs-provider probadas con liboqs específicas
• Tutoriales oficiales: extraen commits específicos para garantizar compilación estable

🏗️ **Implementación en Dockerfile:**
• Variables de entorno para especificar versiones exactas
• Estrategia de fallback si versiones principales fallan
• Documentación de matriz de compatibilidad en comentarios

⭐ **Lección Crítica:**
• Investigación reproducible requiere especificación precisa de dependencias
• Flexibilidad vs. estabilidad: balance crítico en desarrollo experimental`;
    
    const modal = createModal(title, content, 'compatibility');
    document.body.appendChild(modal);
}

function showProviderArchitectureDetails() {
    const title = '🏗️ Mejora Arquitectónica: Modelo de Proveedores';
    const content = `Evolución fundamental de OpenSSL 1.1.1 fork a OpenSSL 3.x provider architecture.

🔄 **Modelo Anterior (Fork):**
• Equipo OQS mantenía fork completo de OpenSSL 1.1.1
• Sincronización difícil con parches de seguridad oficiales
• Barrera alta de entrada para adopción
• Mantenimiento costoso de código base completo

✨ **Modelo Actual (Provider):**
• OpenSSL 3.x: arquitectura de proveedores modular
• oqs-provider: solo algoritmos PQC, no protocolo TLS/SSL
• Usuarios: OpenSSL estándar sin modificar + provider como módulo
• Separación clara de responsabilidades

🚀 **Ventajas del Desacoplamiento:**
• Mantenibilidad: equipo OQS solo mantiene provider
• Seguridad: parches oficiales OpenSSL aplicables inmediatamente
• Adopción: sin necesidad de fork personalizado
• Compatibilidad: aplicaciones existentes sin modificación de código

🔌 **Integración Transparente:**
• Carga dinámica de algoritmos PQC
• Configuración via openssl.cnf
• API OpenSSL estándar, funcionalidad PQC transparente
• Soporte híbridos clásicos + PQC sin cambios en aplicación

📈 **Impacto en Despliegue Futuro:**
• Alineación con despliegues de producción reales
• Reducción drástica de barrera de entrada
• Mejor modelo de seguridad y mantenimiento
• Base sólida para adopción industrial de PQC`;
    
    const modal = createModal(title, content, 'architecture');
    document.body.appendChild(modal);
}

function showCompilationStepDetails(step) {
    let title, content;
    
    switch(step) {
        case 'OpenSSL 3.x':
            title = '🔧 Compilación Personalizada de OpenSSL 3.x';
            content = `Paso fundamental: construcción de motor criptográfico con soporte para proveedores.

📦 **Proceso de Compilación:**
• Clonar código fuente de versión estable reciente (3.2.x+)
• ./config --prefix=/opt/openssl-pqc (directorio aislado)
• make && make install en ubicación personalizada
• Evitar conflictos con OpenSSL del sistema

🎯 **Configuración Crítica:**
• --prefix: directorio personalizado para evitar conflictos
• Ubicación típica: /opt/openssl-pqc
• Separación completa de instalación del sistema
• Preparación para carga de providers externos

🔑 **Arquitectura de Proveedores:**
• OpenSSL 3.x: soporte nativo para módulos cargables
• Interfaz estándar para algoritmos externos
• Base para integración transparente de PQC
• Compatibilidad API con versiones anteriores

⚙️ **Consideraciones de Compilación:**
• Flags de optimización para rendimiento
• Soporte para extensiones de hardware (AVX2)
• Configuración de paths para bibliotecas dinámicas
• Preparación para linking con aplicaciones`;
            break;
            
        case 'liboqs':
            title = '⚙️ Compilación de liboqs - Implementaciones PQC';
            content = `Biblioteca fundamental con implementaciones de algoritmos post-cuánticos.

🏗️ **Proceso de Construcción:**
• cmake . -DBUILD_SHARED_LIBS=ON
• Compilación como biblioteca compartida (esencial para provider)
• ninja (build system paralelo para compilación rápida)
• Apuntar a OpenSSL personalizado para dependencias

🔬 **Contenido de la Biblioteca:**
• Implementaciones de referencia NIST: Kyber, Dilithium, SPHINCS+
• Implementaciones optimizadas con extensiones CPU (AVX2, ARM Neon)
• API unificada para diferentes familias de algoritmos
• Benchmarking integrado para evaluación de rendimiento

🚀 **Optimizaciones Disponibles:**
• AVX2: aceleración significativa en CPUs modernas x86-64
• ARM Neon: optimización para arquitectura ARM
• Compilación condicional según hardware disponible
• Impact drástico en rendimiento (factor 2-10x)

🔧 **Configuración CMAKE:**
• -DBUILD_SHARED_LIBS=ON: biblioteca compartida para provider
• -DOQS_USE_OPENSSL=ON: integración con OpenSSL personalizado
• -DOQS_ENABLE_AVX2=ON/OFF: control de optimizaciones
• Variables de entorno para paths de OpenSSL personalizado`;
            break;
            
        case 'oqs-provider':
            title = '🔌 Compilación de oqs-provider - Puente de Integración';
            content = `Componente crítico que conecta liboqs con OpenSSL 3.x provider architecture.

🔗 **Función de Integración:**
• Puente entre implementaciones PQC (liboqs) y motor OpenSSL
• Exposición de algoritmos PQC via API estándar OpenSSL
• Traducción de llamadas API a funciones liboqs específicas
• Manejo de parámetros y configuraciones algorítmicas

🛠️ **Proceso de Compilación:**
• cmake con paths a OpenSSL y liboqs personalizados
• Linking crítico: debe encontrar ambas bibliotecas
• Compilación de oqsprovider.so (módulo dinámico)
• Instalación en directorio módulos OpenSSL

📍 **Configuración de Paths:**
• CMAKE_PREFIX_PATH: ubicación de OpenSSL personalizado
• liboqs_DIR: path a instalación de liboqs
• Linking dinámico vs. estático según configuración
• RPATH: paths de runtime para bibliotecas compartidas

⚙️ **Instalación del Provider:**
• Copia a /opt/openssl-pqc/lib/ossl-modules/
• Directorio específico donde OpenSSL busca providers
• Permisos y ownership correctos
• Verificación de dependencias resueltas

🔧 **Configuración Final:**
• Modificación de openssl.cnf para activar provider
• Sección [provider_sect] con oqsprovider activado
• Activación por defecto para aplicaciones
• Verificación: openssl list -providers`;
            break;
            
        case 'Configuración Final':
            title = '⚡ Configuración Final de OpenSSL + PQC';
            content = `Paso crítico: activación y configuración del provider para uso transparente.

📝 **Archivo openssl.cnf:**
• Ubicación: /opt/openssl-pqc/ssl/openssl.cnf
• Configuración de secciones provider
• Activación automática del oqsprovider
• Mantenimiento del provider default para compatibilidad

🔧 **Estructura de Configuración:**
\`\`\`
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
\`\`\`

✅ **Verificación de Funcionamiento:**
• openssl list -providers: verificar carga de oqsprovider
• openssl list -key-exchange-algorithms: ver algoritmos PQC
• Grupos disponibles: x25519_kyber768, p256_kyber512, etc.
• Test de funcionalidad con algoritmos híbridos

🎯 **Preparación para Nginx:**
• Retener directorio código fuente OpenSSL (requerido para compilación Nginx)
• Variables de entorno para build de aplicaciones
• Configuración de LD_LIBRARY_PATH para runtime
• Documentación de paths para uso en aplicaciones`;
            break;
    }
    
    const modal = createModal(title, content, 'compilation');
    document.body.appendChild(modal);
}

// Agregar estilos CSS dinámicos
const style = document.createElement('style');
style.textContent = `
    .layer-tooltip {
        animation: fadeInTooltip 0.3s ease;
    }
    
    @keyframes fadeInTooltip {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    
    .stack-layer.selected,
    .stack-layer-dual.selected {
        border-left-width: 6px !important;
        transform: translateY(-3px) scale(1.02) !important;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2) !important;
    }
    
    .step-card.active {
        border-width: 3px !important;
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
    }
    
    .benefit-item:active {
        transform: scale(0.95) !important;
    }
`;
document.head.appendChild(style);
