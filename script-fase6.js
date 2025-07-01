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
    // Click en hallazgos para destacar
    const findingItems = document.querySelectorAll('.finding-item');
    findingItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover clase activa de otros
            findingItems.forEach(f => f.classList.remove('active'));
            
            // Agregar clase activa al clickeado
            this.classList.add('active');
            
            // Efecto visual temporal
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Click en análisis de canal lateral
    const attackAnalyses = document.querySelectorAll('.attack-analysis');
    attackAnalyses.forEach(analysis => {
        analysis.addEventListener('click', function() {
            showAttackDetails(this);
        });
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

console.log('Script Fase 6 cargado exitosamente');
