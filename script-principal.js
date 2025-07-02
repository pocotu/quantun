// Script para el índice principal
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el qubit del header
    initHeaderQubit();
    
    // Animación de entrada para las tarjetas
    const phaseCards = document.querySelectorAll('.phase-card-mini');
    
    // Observer para animaciones
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
    phaseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Agregar eventos de clic
    phaseCards.forEach(card => {
        card.addEventListener('click', function() {
            const phaseNumber = this.dataset.phase;
            openPhase(phaseNumber);
        });
        
        // Efectos hover mejorados
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Animación de partículas cuánticas mejorada
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        particle.addEventListener('click', () => {
            particle.style.animation = 'none';
            setTimeout(() => {
                particle.style.animation = 'quantumFloat 3s ease-in-out infinite';
            }, 100);
        });
    });
    
    // Efectos en los iconos de tecnología
    const techIcons = document.querySelectorAll('.tech-icons span');
    techIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const title = this.getAttribute('title');
            showTechInfo(title);
        });
    });
    
    // Scroll suave
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Función principal para abrir fases
function openPhase(phaseNumber) {
    if (phaseNumber == 1) {
        // Redireccionar a la Fase 1
        window.location.href = 'fase1.html';
    } else if (phaseNumber == 2) {
        // Redireccionar a la Fase 2
        window.location.href = 'fase2.html';
    } else if (phaseNumber == 3) {
        // Redireccionar a la Fase 3
        window.location.href = 'fase3.html';
    } else if (phaseNumber == 4) {
        // Redireccionar a la Fase 4
        window.location.href = 'fase4.html';
    } else if (phaseNumber == 5) {
        // Redireccionar a la Fase 5
        window.location.href = 'fase5.html';
    } else if (phaseNumber == 6) {
        // Redireccionar a la Fase 6
        window.location.href = 'fase6.html';
    } else {
        // Mostrar modal para fases no disponibles
        showComingSoonModal(phaseNumber);
    }
}

// Modal para fases próximamente
function showComingSoonModal(phaseNumber) {
    const modal = createModal(
        `Fase ${phaseNumber}`,
        `Esta sección del estudio está disponible para consulta. El marco de investigación incluye todas las fases del análisis desde los fundamentos teóricos hasta las conclusiones y recomendaciones.`,
        'info'
    );
    document.body.appendChild(modal);
    
    // Auto cerrar después de 3 segundos
    setTimeout(() => {
        modal.remove();
    }, 3000);
}

// Función para mostrar información de tecnologías
function showTechInfo(techName) {
    let info = '';
    switch(techName) {
        case 'ML-KEM (FIPS 203)':
            info = 'Estándar NIST FIPS 203 para Mecanismos de Encapsulamiento de Claves basado en CRYSTALS-Kyber. Evaluado en niveles de seguridad 512, 768 y 1024 bits.';
            break;
        case 'ML-DSA (FIPS 204)':
            info = 'Estándar NIST FIPS 204 para Firmas Digitales basado en CRYSTALS-Dilithium. Evaluado en configuraciones de seguridad 44, 65 y 87.';
            break;
        case 'OpenSSL 3.x':
            info = 'Motor criptográfico de código abierto con arquitectura de proveedores modular, utilizado como plataforma base para la integración de algoritmos post-cuánticos.';
            break;
        case 'NIST Post-Quantum Standards':
            info = 'Estándares oficiales de criptografía post-cuántica establecidos por el Instituto Nacional de Estándares y Tecnología de Estados Unidos tras el proceso de estandarización 2016-2024.';
            break;
        default:
            info = 'Componente técnico evaluado en el marco de investigación de criptografía post-cuántica.';
    }
    
    const modal = createModal(techName, info, 'tech');
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
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(8px);
        animation: modalFadeIn 0.3s ease-out;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        position: relative;
        animation: modalSlideIn 0.3s ease-out;
    `;
    
    const iconClass = type === 'info' ? 'fas fa-info-circle' : 
                     type === 'tech' ? 'fas fa-microchip' : 'fas fa-exclamation-triangle';
    const iconColor = type === 'info' ? '#3b82f6' : 
                     type === 'tech' ? '#059669' : '#f59e0b';
    
    modalContent.innerHTML = `
        <div style="margin-bottom: 20px;">
            <i class="${iconClass}" style="font-size: 3rem; color: ${iconColor}; margin-bottom: 15px;"></i>
            <h3 style="color: #1f2937; margin-bottom: 15px; font-size: 1.5rem;">${title}</h3>
            <p style="color: #6b7280; line-height: 1.6; font-size: 1rem;">${content}</p>
        </div>
        <button onclick="this.closest('.modal-overlay').remove()" 
                style="background: linear-gradient(135deg, #1e40af, #3b82f6); 
                       color: white; border: none; padding: 12px 30px; 
                       border-radius: 25px; cursor: pointer; font-weight: 600;
                       transition: all 0.3s ease;">
            Entendido
        </button>
    `;
    
    modal.appendChild(modalContent);
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    return modal;
}

// Función para inicializar el qubit del header
function initHeaderQubit() {
    const qubitSystem = document.querySelector('.qubit-system-header');
    const virtualParticles = document.querySelectorAll('.virtual-particle-header');
    const qubitStates = document.querySelectorAll('.qubit-state-header');
    const sphereCore = document.querySelector('.sphere-core-header');
    
    if (!qubitSystem) return;
    
    // Variables para el seguimiento del mouse
    let mouseX = 0;
    let mouseY = 0;
    
    // Interacción con el mouse - el qubit reacciona sutilmente
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
        
        // Movimiento suave siguiendo el mouse
        qubitSystem.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        
        // Efecto de resplandor en el núcleo basado en la proximidad del mouse
        const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
        const intensity = Math.max(0.8, 1 - distance / 50);
        
        if (sphereCore) {
            sphereCore.style.filter = `hue-rotate(${distance * 3}deg) brightness(${intensity})`;
        }
        
        // Resetear después de un tiempo sin movimiento
        clearTimeout(window.mouseTimeout);
        window.mouseTimeout = setTimeout(() => {
            qubitSystem.style.transform = 'translate(0, 0)';
            if (sphereCore) {
                sphereCore.style.filter = '';
            }
        }, 1500);
    });
    
    // Cambio de estados cuánticos aleatorio
    function randomStateTransition() {
        const randomState = qubitStates[Math.floor(Math.random() * qubitStates.length)];
        if (randomState) {
            // Efecto de destello
            randomState.style.animation = 'none';
            randomState.style.transform = 'scale(1.3)';
            randomState.style.opacity = '1';
            
            setTimeout(() => {
                randomState.style.animation = 'stateTransition 3s ease-in-out infinite';
                randomState.style.transform = '';
                randomState.style.opacity = '';
            }, 300);
        }
    }
    
    // Ejecutar transiciones aleatorias
    setInterval(randomStateTransition, 6000 + Math.random() * 3000);
    
    // Efecto de entrelazamiento cuántico - sincronizar partículas
    function quantumEntanglement() {
        virtualParticles.forEach((particle, index) => {
            const delay = index * 100;
            const colors = ['var(--primary)', 'var(--accent)', 'var(--accent-dark)', 'var(--secondary)'];
            
            setTimeout(() => {
                // Efecto de sincronización
                particle.style.filter = 'brightness(2) saturate(2)';
                particle.style.transform = 'scale(1.5)';
                
                setTimeout(() => {
                    particle.style.filter = '';
                    particle.style.transform = '';
                }, 800);
            }, delay);
        });
    }
    
    // Ejecutar entrelazamiento cada 12-18 segundos
    setInterval(quantumEntanglement, 12000 + Math.random() * 6000);
    
    // Efecto de colapso cuántico al hacer clic en el header
    document.querySelector('.main-header')?.addEventListener('click', function(e) {
        if (qubitSystem) {
            qubitSystem.style.filter = 'brightness(1.3) hue-rotate(180deg)';
            qubitSystem.style.transform += ' scale(1.05)';
            
            setTimeout(() => {
                qubitSystem.style.filter = '';
                qubitSystem.style.transform = qubitSystem.style.transform.replace(' scale(1.05)', '');
            }, 400);
        }
    });
    
    console.log('🚀 Qubit del Header Inicializado');
}

// Animaciones CSS en JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes modalFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes modalSlideIn {
        from { transform: scale(0.8) translateY(50px); opacity: 0; }
        to { transform: scale(1) translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
