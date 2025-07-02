// Script para Fase 1
document.addEventListener('DOMContentLoaded', function() {
    // Animaciones de entrada
    const elements = document.querySelectorAll('.threat-card, .nist-card, .oqs-card, .objective-compact');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    // Inicializar animaciones
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Efectos interactivos en algoritmos
    const algoCards = document.querySelectorAll('.algo-card');
    algoCards.forEach(card => {
        card.addEventListener('click', function() {
            const isShort = this.classList.contains('shor-card');
            const algorithm = isShort ? 'Shor' : 'Grover';
            showAlgorithmDetails(algorithm);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Efectos en estándares
    const standardCards = document.querySelectorAll('.standard-card');
    standardCards.forEach(card => {
        card.addEventListener('click', function() {
            const standard = this.querySelector('h4').textContent;
            showStandardDetails(standard);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efectos en stack items
    const stackItems = document.querySelectorAll('.stack-item');
    stackItems.forEach(item => {
        item.addEventListener('click', function() {
            const component = this.querySelector('h4').textContent;
            showComponentDetails(component);
        });
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Animación HNDL
    const hndlSteps = document.querySelectorAll('.hndl-step');
    let hndlAnimationRunning = false;
    
    const animateHNDL = () => {
        if (hndlAnimationRunning) return;
        hndlAnimationRunning = true;
        
        hndlSteps.forEach((step, index) => {
            setTimeout(() => {
                step.style.transform = 'scale(1.1)';
                step.style.background = 'rgba(255, 255, 255, 0.2)';
                
                setTimeout(() => {
                    step.style.transform = 'scale(1)';
                    step.style.background = 'rgba(255, 255, 255, 0.1)';
                    
                    if (index === hndlSteps.length - 1) {
                        hndlAnimationRunning = false;
                    }
                }, 800);
            }, index * 1200);
        });
    };
    
    // Observer para HNDL
    const hndlSection = document.querySelector('.hndl-section');
    if (hndlSection) {
        const hndlObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateHNDL, 1000);
                }
            });
        }, { threshold: 0.5 });
        
        hndlObserver.observe(hndlSection);
    }
    
    // Efectos en parámetros
    const paramChips = document.querySelectorAll('.param-chips span');
    paramChips.forEach(param => {
        param.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.opacity = '0.8';
        });
        
        param.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.opacity = '1';
        });
    });
    
    // Efectos en feature tags
    const featureTags = document.querySelectorAll('.feature-tags span');
    featureTags.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.background = 'var(--primary)';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(108, 117, 125, 0.1)';
            this.style.color = 'var(--gray)';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Efectos HNDL click
    if (hndlSection) {
        hndlSection.addEventListener('click', function() {
            showHNDLDetails();
        });
    }

    // Efectos en badges críticos
    const urgencyBadge = document.querySelector('.urgency-badge');
    if (urgencyBadge) {
        urgencyBadge.addEventListener('click', function() {
            showThreatUrgencyDetails();
        });
    }

    // Efectos en AES items
    const aesItems = document.querySelectorAll('.aes-item');
    aesItems.forEach(item => {
        item.addEventListener('click', function() {
            const aesType = this.querySelector('span').textContent;
            showAESDetails(aesType);
        });
    });

    // Efectos en estrategia híbrida
    const hybridStrategy = document.querySelector('.hybrid-strategy');
    if (hybridStrategy) {
        hybridStrategy.addEventListener('click', function() {
            showHybridStrategyDetails();
        });
    }
});

// Funciones de navegación
function goBack() {
    window.location.href = 'index.html';
}

function nextPhase() {
    window.location.href = 'fase2.html';
}

// Funciones de detalles
function showAlgorithmDetails(algorithm) {
    let title, content;
    
    if (algorithm === 'Shor') {
        title = '🔬 Algoritmo de Shor';
        content = `Desarrollado por Peter Shor en 1994, representa una amenaza existencial para RSA y ECC.

• Factorización de enteros en tiempo polinomial
• Problema del logaritmo discreto en curvas elípticas
• Utiliza Transformada Cuántica de Fourier (QFT)
• Requiere una computadora cuántica criptográficamente relevante (CRQC)

Impacto: Colapso total de la criptografía de clave pública actual.`;
    } else {
        title = '🔍 Algoritmo de Grover';
        content = `Desarrollado por Lov Grover en 1996, reduce la seguridad de la criptografía simétrica.

• Búsqueda cuadrática en espacios no estructurados
• Reduce O(2^k) a O(2^k/2)
• AES-128 → seguridad efectiva de ~64 bits
• AES-256 → seguridad efectiva de ~128 bits

Recomendación: Migrar de AES-128 a AES-256 como medida preventiva.`;
    }
    
    const modal = createModal(title, content, 'algorithm');
    document.body.appendChild(modal);
}

function showStandardDetails(standard) {
    let title, content;
    
    switch(standard) {
        case 'ML-KEM':
            title = '🔑 ML-KEM (CRYSTALS-Kyber)';
            content = `Estándar FIPS 203 para Mecanismos de Encapsulamiento de Claves.

• Base matemática: Module Learning With Errors (LWE)
• Utilizado para establecer claves secretas compartidas
• Implementación principal en TLS/SSL
• Parámetros: 512 (Nivel 1), 768 (Nivel 3), 1024 (Nivel 5)
• Optimizaciones disponibles: AVX2, ARM Neon

Uso típico: Establecimiento de claves de sesión en conexiones HTTPS.`;
            break;
        case 'ML-DSA':
            title = '✍️ ML-DSA (CRYSTALS-Dilithium)';
            content = `Estándar FIPS 204 para Firmas Digitales Post-Cuánticas.

• Base matemática: Module Learning With Errors (LWE)
• Técnica: Fiat-Shamir con muestreo por rechazo
• Tiempo de firma variable debido a "abortos"
• Parámetros: 44, 65, 87 (diferentes niveles de seguridad)
• Tamaños de firma: 2420-4595 bytes

Consideración: Variabilidad temporal debe considerarse en benchmarking.`;
            break;
        case 'SLH-DSA':
            title = '🏷️ SLH-DSA (SPHINCS+)';
            content = `Estándar FIPS 205 para Firmas basadas en Hash.

• Base matemática: Resistencia de funciones hash (SHA-256)
• Esquema sin estado (stateless)
• Diversidad algorítmica vs ML-DSA
• Basado en árboles de Merkle
• Firmas más grandes pero diferentes supuestos de seguridad

Ventaja: Proporciona diversidad algorítmica como respaldo a ML-DSA.`;
            break;
    }
    
    const modal = createModal(title, content, 'standard');
    document.body.appendChild(modal);
}

function showComponentDetails(component) {
    let title, content;
    
    switch(component) {
        case 'Nginx':
            title = '🌐 Nginx';
            content = `Servidor web de alto rendimiento utilizado como prototipo.

• Servidor HTTP/HTTPS y proxy reverso
• Arquitectura basada en eventos
• Bajo consumo de memoria
• Soporte nativo para TLS/SSL
• Compilado con OpenSSL personalizado para PQC

Rol: Prototipo de aplicación web para evaluación de rendimiento.`;
            break;
        case 'OpenSSL 3.x':
            title = '🔒 OpenSSL 3.x';
            content = `Motor criptográfico y biblioteca TLS/SSL de nueva generación.

• Arquitectura de proveedores modular
• Soporte para algoritmos externos via providers
• API compatible con versiones anteriores
• Mejor separación de responsabilidades
• Configuración flexible de algoritmos

Mejora clave: Arquitectura de proveedores permite cargar PQC sin modificar código.`;
            break;
        case 'oqs-provider':
            title = '🔌 oqs-provider';
            content = `Módulo proveedor que conecta liboqs con OpenSSL 3.x.

• Puente entre implementaciones PQC y OpenSSL
• Carga dinámica de algoritmos
• Configuración via archivos de configuración
• Sin modificaciones en aplicaciones existentes
• Soporte para híbridos clásicos + PQC

Ventaja: Integración transparente de PQC en aplicaciones existentes.`;
            break;
        case 'liboqs':
            title = '⚙️ liboqs';
            content = `Biblioteca C con implementaciones de algoritmos PQC.

• Implementaciones de referencia y optimizadas
• Soporte para extensiones de CPU (AVX2, ARM Neon)
• API unificada para diferentes familias de algoritmos
• Benchmarking integrado
• Actualizaciones constantes con nuevos algoritmos

Base: Proporciona las implementaciones criptográficas fundamentales evaluadas.`;
            break;
    }
    
    const modal = createModal(title, content, 'component');
    document.body.appendChild(modal);
}

function showComingSoonModal(phaseNumber) {
    const modal = createModal(
        `🚧 Fase ${phaseNumber}`,
        `Esta fase estará disponible próximamente. Actualmente trabajando en el desarrollo del contenido.

Progreso del proyecto:
✅ Fase 1: Fundamentos Teóricos (Completado)
⏳ Fase 2: Análisis Comparativo (En desarrollo)
⏳ Fases 3-6: Planificadas

¡Regresa pronto para ver las actualizaciones!`,
        'info'
    );
    document.body.appendChild(modal);
}

function showHNDLDetails() {
    const title = '⏰ Harvest Now, Decrypt Later (HNDL)';
    const content = `Paradigma de ataque sigiloso y a largo plazo que justifica la urgencia de PQC.

🎯 **Modelo de Ataque:**
• Interceptar y almacenar grandes volúmenes de datos cifrados actuales
• Esperar pacientemente la llegada de una CRQC (Computadora Cuántica Criptográficamente Relevante)
• Ejecutar algoritmo de Shor para descifrar retroactivamente
• Ataque invisible - sin señales de intrusión detectables

🚨 **Urgencia del Problema:**
• Amenaza inmediata para datos de larga confidencialidad (décadas)
• Secretos de estado, propiedad intelectual corporativa, registros financieros
• Datos de salud y comunicaciones diplomáticas
• "Día Q" - momento crítico donde se activa el descifrado masivo

💡 **Cambio de Paradigma:**
• Desacopla el robo de datos de su explotación
• Seguridad debe evaluarse contra amenazas futuras durante toda la vida útil de los datos
• Justificación principal para adopción inmediata de criptografía híbrida

📊 **Impacto Estratégico:**
• Catalizador clave para directivas gubernamentales de migración PQC
• Esfuerzos de migración acelerados en la industria
• Necesidad de protección PQC + salvaguarda clásica`;
    
    const modal = createModal(title, content, 'threat');
    document.body.appendChild(modal);
}

function showThreatUrgencyDetails() {
    const title = '🚨 Criticidad de la Amenaza Cuántica';
    const content = `Análisis del nivel de urgencia CRÍTICO para la transición a Criptografía Post-Cuántica.

📊 **Evaluación de Criticidad:**
• Timeline de desarrollo de computadoras cuánticas: 2030-2040 (estimaciones conservadoras)
• Tiempo requerido para migración completa de infraestructura global: 10-15 años
• Vida útil de datos sensibles: 20-50 años de confidencialidad requerida

⚡ **Factores de Urgencia:**
• Algoritmo de Shor: colapso TOTAL de RSA y ECC (no degradación)
• HNDL: datos ya comprometidos, esperando "Día Q"
• Proceso de estandarización NIST (2016-2024): finalmente completado
• Directivas gubernamentales: migración mandatoria iniciada

🔄 **Respuesta Estratégica:**
• Implementación híbrida inmediata (X25519 + Kyber, ECDSA + Dilithium)
• Agilidad criptográfica en arquitecturas de sistemas
• "Defensa en profundidad" contra vulnerabilidades desconocidas en nuevos algoritmos

🏢 **Adopción Industrial Actual:**
• Meta, Google, Amazon: implementación en producción
• IETF: proceso de estandarización TLS 1.3 híbrido en curso
• NIST/ANSSI: recomendaciones oficiales de transición`;
    
    const modal = createModal(title, content, 'urgent');
    document.body.appendChild(modal);
}

function showAESDetails(aesType) {
    let title, content;
    
    if (aesType === 'AES-128') {
        title = '⚠️ AES-128 bajo Amenaza de Grover';
        content = `Impacto del Algoritmo de Grover en la seguridad de AES-128.

🔍 **Mecanismo de Ataque:**
• Algoritmo de Grover ofrece aceleración cuadrática O(√N)
• Búsqueda no estructurada: de O(2^k) a O(2^k/2)
• Para clave de k=128 bits: reducción de 2^128 a 2^64 operaciones

⚡ **Reducción de Seguridad:**
• Seguridad original: 128 bits
• Seguridad efectiva post-cuántica: ~64 bits
• 64 bits: nivel criptográficamente ROMPIBLE con hardware dedicado
• Tiempo de ataque estimado: días/semanas vs. imposible anteriormente

📋 **Costo Práctico del Ataque:**
• Requiere qubits lógicos masivos + corrección de errores cuánticos casi perfecta
• Tiempo de ejecución considerable incluso con CRQC
• Desafío de ingeniería monumental, pero amenaza teórica CREÍBLE

✅ **Medidas Recomendadas:**
• MIGRACIÓN INMEDIATA a AES-256 como mínimo
• Implementar agilidad criptográfica en sistemas
• "Defensa en profundidad": AES-256 + preparación para algoritmos PQC simétricos`;
    } else {
        title = '✅ AES-256 Resistente a Amenaza Cuántica';
        content = `Evaluación de AES-256 bajo el impacto del Algoritmo de Grover.

🛡️ **Seguridad Mantenida:**
• Seguridad original: 256 bits
• Seguridad efectiva post-cuántica: ~128 bits
• 128 bits: EXTREMADAMENTE ROBUSTO y seguro para futuro previsible

📈 **Análisis de Viabilidad de Ataque:**
• Recursos necesarios para romper AES-256: mucho más allá de capacidades tecnológicas previstas
• Tiempo de ataque: computacionalmente INVIABLE durante décadas
• Estado de seguridad: ROBUSTO contra amenaza cuántica

✨ **Ventajas Estratégicas:**
• Sin necesidad de migración inmediata urgente
• Compatible con infraestructura actual
• Medida de "defensa en profundidad" efectiva
• Recomendación oficial de estándares post-cuánticos

📊 **Recomendación de Estándares:**
• NIST: AES-256 como mínimo para nueva infraestructura
• Degradación de 256→128 bits: suficientemente significativa para justificar migración preventiva
• Pero amenaza práctica: mucho menor que para AES-128`;
    }
    
    const modal = createModal(title, content, 'security');
    document.body.appendChild(modal);
}

function showHybridStrategyDetails() {
    const title = '🔄 Estrategia de Criptografía Híbrida';
    const content = `Enfoque conservador recomendado por NIST/ANSSI para transición segura a PQC.

🛡️ **Principio de Funcionamiento:**
• Combinar algoritmo clásico bien establecido + nuevo algoritmo PQC
• Derivación criptográfica de ambas salidas para clave de sesión final
• Garantía de seguridad: comunicación segura si AL MENOS UNO no está comprometido

📋 **Implementación Práctica Típica:**
• KEMs: X25519 (curva elíptica) + Kyber768 (PQC) → clave híbrida
• Firmas: ECDSA (clásico) + Dilithium (PQC) en paralelo
• TLS 1.3: grupos híbridos x25519_kyber768

✅ **Garantías de Seguridad Dual:**
• Protección contra amenaza HNDL → componente PQC resiste Shor
• Protección contra vulnerabilidades desconocidas en PQC → componente clásico como salvaguarda
• Compatibilidad retroactiva durante período de transición

🏢 **Adopción Industrial Actual:**
• Meta: implementación híbrida en infraestructura de producción
• Google: despliegue gradual en servicios principales
• Amazon Web Services: soporte PQC híbrido disponible
• Proceso de estandarización IETF: TLS 1.3 híbrido en desarrollo activo

🔬 **Justificación Técnica:**
• Nuevos algoritmos PQC: no han sido sometidos a décadas de escrutinio como predecesores clásicos
• Diversidad algorítmica: diferente base matemática (retículos vs. curvas elípticas)
• Principio de "defensa en profundidad" criptográfica`;
    
    const modal = createModal(title, content, 'strategy');
    document.body.appendChild(modal);
}

// Función para crear modales
function createModal(title, content, type) {
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
    
    // Agregar estilos de animación
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
        case 'algorithm': headerColor = '#e74c3c'; break;
        case 'standard': headerColor = '#3498db'; break;
        case 'component': headerColor = '#9b59b6'; break;
        case 'threat': headerColor = '#e67e22'; break;
        case 'urgent': headerColor = '#c0392b'; break;
        case 'security': headerColor = '#27ae60'; break;
        case 'strategy': headerColor = '#2980b9'; break;
        default: headerColor = '#f39c12';
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

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
            setTimeout(() => modal.remove(), 300);
        });
    }
    
    if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        goBack();
    }
    
    if (e.key === 'ArrowRight') {
        nextPhase();
    }
});

// Scroll suave
document.documentElement.style.scrollBehavior = 'smooth';
