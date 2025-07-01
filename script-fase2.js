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
