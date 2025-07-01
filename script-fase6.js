// Script para Fase 6: Conclusiones y Trabajo Futuro
document.addEventListener('DOMContentLoaded', function() {
    // Inicialización
    initializePhase6();
    setupInteractions();
    setupNavigation();
});

function initializePhase6() {
    console.log('Fase 6: Conclusiones y Trabajo Futuro - Iniciada');
    
    // Animación de entrada para elementos
    animateElements();
    
    // Configurar efectos especiales para finalización
    setupCompletionEffects();
}

function animateElements() {
    // Animar cards de entrada
    const cards = document.querySelectorAll('.synthesis-card, .limitations-card, .future-work-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animar elementos internos
    setTimeout(() => {
        animateInternalElements();
    }, 600);
}

function animateInternalElements() {
    // Animar hallazgos
    const findings = document.querySelectorAll('.finding-item');
    findings.forEach((finding, index) => {
        finding.style.opacity = '0';
        finding.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            finding.style.transition = 'all 0.4s ease';
            finding.style.opacity = '1';
            finding.style.transform = 'translateX(0)';
        }, index * 100);
    });
    
    // Animar limitaciones
    const limitations = document.querySelectorAll('.limitation-point, .algo-limit');
    limitations.forEach((limitation, index) => {
        limitation.style.opacity = '0';
        limitation.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            limitation.style.transition = 'all 0.4s ease';
            limitation.style.opacity = '1';
            limitation.style.transform = 'translateX(0)';
        }, index * 100 + 200);
    });
    
    // Animar trabajo futuro
    const futureItems = document.querySelectorAll('.future-item, .attack-analysis, .deployment-step');
    futureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, index * 80 + 400);
    });
}

function setupInteractions() {
    // Efectos hover para elementos interactivos
    setupHoverEffects();
    
    // Click handlers para elementos especiales
    setupClickHandlers();
}

function setupHoverEffects() {
    // Efecto especial para la conclusión final
    const conclusionBox = document.querySelector('.final-conclusion');
    if (conclusionBox) {
        conclusionBox.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.2)';
        });
        
        conclusionBox.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    }
    
    // Efectos para badges
    const badges = document.querySelectorAll('.synthesis-badge, .limitations-badge, .future-badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.zIndex = '10';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
}

function setupClickHandlers() {
    // Click en hallazgos para más información
    const findings = document.querySelectorAll('.finding-item');
    findings.forEach(finding => {
        finding.addEventListener('click', function() {
            const type = this.classList.contains('tls-finding') ? 'tls' :
                         this.classList.contains('signature-finding') ? 'signature' :
                         this.classList.contains('performance-finding') ? 'performance' :
                         'variability';
            showFindingDetails(type);
        });
    });

    // Click en limitaciones
    const limitations = document.querySelectorAll('.limitation-point');
    limitations.forEach(limitation => {
        limitation.addEventListener('click', function() {
            const type = this.classList.contains('hardware') ? 'hardware' :
                         this.classList.contains('other-arch') ? 'architecture' :
                         'algorithmic';
            showLimitationDetails(type);
        });
    });

    // Click en elementos de trabajo futuro
    const futureItems = document.querySelectorAll('.future-item');
    futureItems.forEach(item => {
        item.addEventListener('click', function() {
            const type = this.classList.contains('short-term') ? 'short' :
                         this.classList.contains('medium-term') ? 'medium' :
                         'long';
            showFutureWorkDetails(type);
        });
    });

    // Click en la conclusión final para certificado
    const finalConclusion = document.querySelector('.final-conclusion');
    if (finalConclusion) {
        finalConclusion.addEventListener('click', function() {
            showCertificate();
        });
    }

    // Click en análisis de canal lateral
    const attackAnalyses = document.querySelectorAll('.attack-analysis');
    attackAnalyses.forEach(analysis => {
        analysis.addEventListener('click', function() {
            showAttackDetails(this);
        });
    });

    // Agregar manejadores de teclado
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

function showAttackDetails(analysisElement) {
    const analysisType = analysisElement.classList.contains('timing-analysis') ? 'timing' :
                        analysisElement.classList.contains('power-analysis') ? 'power' : 'cache';
    
    const details = {
        timing: 'Análisis de variaciones temporales en operaciones criptográficas para detectar dependencias de datos secretos.',
        power: 'Medición del consumo energético para correlacionar patrones con información criptográfica procesada.',
        cache: 'Ataques como Flush+Reload que explotan patrones de acceso a memoria caché para extraer claves.'
    };
    
    // Mostrar tooltip o modal con detalles
    showTooltip(analysisElement, details[analysisType]);
}

function showTooltip(element, text) {
    // Crear tooltip dinámico
    const tooltip = document.createElement('div');
    tooltip.className = 'attack-tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--text-dark);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.75rem;
        max-width: 200px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    
    document.body.appendChild(tooltip);
    
    // Posicionar tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + 5) + 'px';
    
    // Mostrar
    setTimeout(() => tooltip.style.opacity = '1', 50);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
    }, 3000);
}

function setupCompletionEffects() {
    const completionBtn = document.querySelector('.nav-btn.completion');
    if (completionBtn) {
        completionBtn.addEventListener('mouseenter', function() {
            // Crear efecto de partículas doradas
            createGoldenParticles(this);
        });
    }
}

function createGoldenParticles(element) {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--completion-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = element.getBoundingClientRect();
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(particle);
        
        // Animar partícula
        particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: 'translateY(-20px) scale(0)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }
}

function setupNavigation() {
    // Configurar navegación específica de Fase 6
    window.prevPhase = function() {
        console.log('Navegando a Fase 5');
        window.location.href = 'fase5.html';
    };
    
    window.goBack = function() {
        console.log('Volviendo al índice principal');
        window.location.href = 'index.html';
    };
    
    window.showCompletion = function() {
        showCompletionCelebration();
    };
}

function showCompletionCelebration() {
    // Crear overlay de celebración
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    const celebrationBox = document.createElement('div');
    celebrationBox.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        transform: scale(0.8);
        transition: transform 0.5s ease;
    `;
    
    celebrationBox.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
        <h2 style="color: var(--completion-gold); margin-bottom: 15px; font-size: 2rem;">
            <i class="fas fa-trophy"></i> ¡Proyecto Completado!
        </h2>
        <p style="color: var(--text-dark); font-size: 1.1rem; margin-bottom: 25px;">
            Has completado exitosamente el análisis completo de 
            <strong>Criptografía Post-Cuántica</strong>
        </p>
        <div style="display: flex; gap: 15px; justify-content: center;">
            <button onclick="closeCelebration()" style="
                background: var(--completion-gold);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                <i class="fas fa-home"></i> Ir al Inicio
            </button>
            <button onclick="restartJourney()" style="
                background: var(--secondary-blue);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">
                <i class="fas fa-redo"></i> Revisar Fases
            </button>
        </div>
    `;
    
    overlay.appendChild(celebrationBox);
    document.body.appendChild(overlay);
    
    // Mostrar con animación
    setTimeout(() => {
        overlay.style.opacity = '1';
        celebrationBox.style.transform = 'scale(1)';
    }, 50);
    
    // Crear confeti
    createConfetti();
    
    // Funciones globales para los botones
    window.closeCelebration = function() {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            window.location.href = 'index.html';
        }, 500);
    };
    
    window.restartJourney = function() {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.remove();
            window.location.href = 'fase1.html';
        }, 500);
    };
}

function createConfetti() {
    const colors = ['#f59e0b', '#3b82f6', '#059669', '#dc2626', '#7c3aed'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            z-index: 10001;
            border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'ease-out'
        }).onfinish = () => confetti.remove();
    }
}

// CSS adicional dinámico
const additionalStyles = `
    .finding-item.active {
        transform: scale(1.02) !important;
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2) !important;
        border-left-width: 6px !important;
    }
    
    .attack-analysis:hover {
        cursor: pointer;
        transform: scale(1.05);
    }
    
    .deployment-step:hover {
        transform: translateX(5px);
        border-left-width: 5px;
    }
`;

// Inyectar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

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
        case 'success': headerColor = '#27ae60'; break;
        case 'warning': headerColor = '#f39c12'; break;
        case 'error': headerColor = '#e74c3c'; break;
        case 'info': headerColor = '#3498db'; break;
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

// Funciones para mostrar detalles específicos
function showFindingDetails(type) {
    let title, content;
    
    switch(type) {
        case 'tls':
            title = '🔗 TLS Híbrido - Análisis Detallado';
            content = `La implementación de TLS híbrido muestra resultados prometedores con consideraciones importantes.

Resultados específicos:
• Sobrecarga promedio: 15-25ms en redes LAN
• Incremento de 3-5x en redes con latencia >100ms
• Tamaño de handshake: +1.5KB vs clásico

Factores críticos:
• Calidad de la conexión de red
• Configuración del servidor
• Optimizaciones de implementación

Recomendación: Evaluación específica por caso de uso.`;
            break;
        case 'signature':
            title = '✍️ Dilithium vs ECDSA - Comparativa';
            content = `Las firmas post-cuánticas requieren un replanteamiento del diseño de aplicaciones.

Diferencias clave:
• Tamaño de firma: 3,293 bytes vs 64 bytes (ECDSA)
• Clave pública: 1,952 bytes vs 64 bytes
• Velocidad de verificación: Competitiva
• Generación de firma: 2-3x más lenta

Implicaciones:
• Protocolos de red necesitan adaptación
• Almacenamiento de certificados aumenta
• Ancho de banda de aplicaciones críticas

Estrategia: Implementación gradual con híbridos.`;
            break;
        case 'performance':
            title = '⚡ Rendimiento Computacional - Factores Clave';
            content = `El rendimiento depende críticamente de las optimizaciones de hardware disponibles.

Con optimizaciones AVX2:
• Kyber: Competitivo con ECDH
• Dilithium: 2-3x overhead vs ECDSA
• Uso de CPU: Incremento moderado

Sin optimizaciones:
• Kyber: 5-10x más lento
• Dilithium: 10x+ overhead
• Uso de CPU: Incremento significativo

Hardware recomendado:
• Procesadores Intel/AMD modernos (2018+)
• Soporte AVX2 habilitado
• Memoria suficiente para claves más grandes`;
            break;
        case 'variability':
            title = '📊 Variabilidad Temporal - Implicaciones';
            content = `Los algoritmos Fiat-Shamir introducen variabilidad que debe considerarse en el diseño de sistemas.

Causas de variabilidad:
• Rechazo de muestras en Dilithium
• Calidad del generador aleatorio
• Condiciones de red variables

Métricas importantes:
• P50 (mediana): Rendimiento típico
• P95: Casos moderadamente adversos  
• P99: Peor caso realista

Diseño de sistemas:
• Timeouts basados en P95/P99
• Buffers adicionales para firmas
• Monitoreo de cola de percentiles altos`;
            break;
    }
    
    const modal = createModal(title, content, 'info');
    document.body.appendChild(modal);
}

function showLimitationDetails(type) {
    let title, content;
    
    switch(type) {
        case 'hardware':
            title = '🖥️ Limitaciones de Hardware';
            content = `Este estudio se limitó a una configuración específica que puede no representar todos los escenarios.

Limitaciones identificadas:
• Solo arquitectura x86-64 evaluada
• Procesador específico (Intel/AMD)
• Entorno virtualizado (Docker)
• Recursos de memoria fijos

Impacto en generalización:
• Resultados pueden variar en hardware diferente
• Optimizaciones específicas no evaluadas
• Rendimiento real vs virtualizado

Trabajo futuro necesario:
• Evaluación en ARM/RISC-V
• Pruebas en hardware embebido
• Medición en metal desnudo`;
            break;
        case 'architecture':
            title = '🏗️ Otras Arquitecturas No Evaluadas';
            content = `La diversidad de arquitecturas modernas requiere evaluación específica.

Arquitecturas pendientes:
• ARM64 (servidores y móviles)
• RISC-V (emergente)
• Arquitecturas embebidas

Consideraciones específicas:
• Instrucciones SIMD diferentes (NEON vs AVX)
• Jerarquías de memoria distintas
• Limitaciones de potencia/térmica

Relevancia práctica:
• Servidores ARM en centros de datos
• Dispositivos IoT y embebidos
• Diversidad de ecosistemas cloud

Recomendación: Evaluación específica por arquitectura objetivo.`;
            break;
        case 'algorithmic':
            title = '🔬 Limitaciones Algorítmicas';
            content = `Este estudio se enfocó en estándares NIST específicos, excluyendo otras alternativas prometedoras.

Algoritmos no evaluados:
• BIKE, HQC (Code-based)
• Rainbow, MAYO (Multivariate)
• Falcon (NTRU lattices)

Limitaciones del enfoque:
• Solo ML-KEM y ML-DSA evaluados
• Híbridos limitados a x25519+Kyber
• Sin evaluación de diversidad algorítmica

Consideraciones de seguridad:
• Monocultura algorítmica vs diversidad
• Riesgos de ataques futuros
• Estrategias de migración múltiple

Evolución esperada: Evaluación de portfolio diverso.`;
            break;
    }
    
    const modal = createModal(title, content, 'warning');
    document.body.appendChild(modal);
}

function showFutureWorkDetails(type) {
    let title, content;
    
    switch(type) {
        case 'short':
            title = '🚀 Trabajo Futuro - Corto Plazo (6-12 meses)';
            content = `Extensiones inmediatas identificadas para el proyecto.

Prioridad alta:
• Evaluación en hardware ARM64
• Implementación de más algoritmos híbridos
• Medición en aplicaciones web reales
• Optimización de configuraciones de red

Metodología:
• Mismo framework de benchmarking
• Extensión de métricas existentes
• Validación con casos de uso industriales

Resultados esperados:
• Guías de implementación específicas
• Recomendaciones de hardware
• Configuraciones optimizadas`;
            break;
        case 'medium':
            title = '🎯 Trabajo Futuro - Mediano Plazo (1-2 años)';
            content = `Investigación más profunda y casos de uso complejos.

Áreas de investigación:
• Análisis de seguridad de implementaciones
• Evaluación de resistencia a canales laterales
• Impacto en aplicaciones de tiempo real
• Estudios de adopción empresarial

Colaboraciones necesarias:
• Industria para casos de uso reales
• Comunidad académica para validación
• Estándares para interoperabilidad

Objetivos:
• Marcos de referencia industriales
• Mejores prácticas establecidas
• Herramientas de evaluación automatizadas`;
            break;
        case 'long':
            title = '🔮 Trabajo Futuro - Largo Plazo (3+ años)';
            content = `Visión a largo plazo para la criptografía post-cuántica.

Investigación fundamental:
• Nuevas familias de algoritmos
• Optimizaciones de hardware específico
• Integración con computación cuántica
• Protocolos de nueva generación

Evolución tecnológica:
• Estándares de segunda generación
• Hardware con aceleración PQC nativa
• Protocolos optimizados desde diseño

Impacto esperado:
• Ecosistema PQC maduro y adoptado
• Herramientas de migración automatizadas
• Seguridad cuántica ubicua

Meta: Transición completa del ecosistema digital.`;
            break;
    }
    
    const modal = createModal(title, content, 'info');
    document.body.appendChild(modal);
}

function showCertificate() {
    const modal = createModal(
        '🏆 Certificado de Finalización',
        `¡Felicitaciones! Has completado exitosamente el recorrido por todas las fases del proyecto de Criptografía Post-Cuántica.

Fases completadas:
✅ Fase 1: Fundamentos Teóricos
✅ Fase 2: Entorno de Laboratorio  
✅ Fase 3: Implementación Práctica
✅ Fase 4: Diseño de Benchmarking
✅ Fase 5: Análisis de Resultados
✅ Fase 6: Conclusiones y Trabajo Futuro

Conocimientos adquiridos:
• Comprensión de la amenaza cuántica
• Conocimiento de estándares NIST
• Experiencia con implementaciones PQC
• Análisis de rendimiento y trade-offs
• Visión de futuro de la criptografía

¡Estás preparado para contribuir a la transición hacia la criptografía post-cuántica!

Seminario I - Informática
Evaluación de Rendimiento de Algoritmos Post-Cuánticos`,
        'success'
    );
    document.body.appendChild(modal);
}

// Funciones de navegación
function goBack() {
    window.location.href = 'index.html';
}

function prevPhase() {
    window.location.href = 'fase5.html';
}

console.log('Script Fase 6 cargado exitosamente');
