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
            
            // Mostrar información adicional (simulado)
            showLayerInfo(this);
        });
    });
}

function showLayerInfo(layer) {
    // Crear tooltip temporal con información del layer
    const existingTooltip = document.querySelector('.layer-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    const tooltip = document.createElement('div');
    tooltip.className = 'layer-tooltip';
    tooltip.innerHTML = getLayerInfo(layer);
    
    document.body.appendChild(tooltip);
    
    // Posicionar tooltip
    const rect = layer.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.left = rect.right + 10 + 'px';
    tooltip.style.top = rect.top + 'px';
    tooltip.style.zIndex = '1000';
    tooltip.style.background = 'rgba(0,0,0,0.9)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '8px';
    tooltip.style.fontSize = '0.8rem';
    tooltip.style.maxWidth = '200px';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.style.opacity = '0';
            setTimeout(() => {
                tooltip.remove();
            }, 300);
        }
    }, 3000);
}

function getLayerInfo(layer) {
    if (layer.classList.contains('app')) {
        return '<strong>Nginx Application</strong><br/>Compiled with custom OpenSSL support for PQC algorithms.';
    } else if (layer.classList.contains('ssl')) {
        return '<strong>Custom OpenSSL 3.x</strong><br/>Provides TLS/SSL engine with provider architecture.';
    } else if (layer.classList.contains('lib')) {
        return '<strong>liboqs Library</strong><br/>Core implementations of post-quantum algorithms.';
    } else if (layer.classList.contains('base')) {
        return '<strong>Ubuntu 22.04 LTS</strong><br/>Stable foundation with modern toolchain.';
    } else if (layer.classList.contains('stack-layer-dual')) {
        return '<strong>Provider Architecture</strong><br/>Classic and PQC algorithms side by side.';
    }
    return 'Click for more information';
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
