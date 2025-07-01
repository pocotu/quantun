// Script para el índice principal
document.addEventListener('DOMContentLoaded', function() {
    // Animación de entrada para las tarjetas
    const phaseCards = document.querySelectorAll('.phase-card');
    
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
                this.style.transform = 'translateY(-10px) scale(1.02)';
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
        border-radius: 20px;
        padding: 30px;
        max-width: 500px;
        margin: 20px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        position: relative;
        animation: modalSlideUp 0.3s ease-out;
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
    
    // Iconos según el tipo
    let icon = '';
    let color = '';
    switch(type) {
        case 'info':
            icon = '<i class="fas fa-info-circle"></i>';
            color = '#3498db';
            break;
        case 'tech':
            icon = '<i class="fas fa-cogs"></i>';
            color = '#9b59b6';
            break;
        default:
            icon = '<i class="fas fa-lightbulb"></i>';
            color = '#f39c12';
    }
    
    modalContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 style="margin: 0; color: ${color}; font-size: 1.5rem; display: flex; align-items: center; gap: 10px;">
                ${icon} ${title}
            </h3>
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
            ">&times;</button>
        </div>
        <p style="line-height: 1.6; color: #333; font-size: 1.1rem;">${content}</p>
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

// Efectos adicionales
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
            setTimeout(() => modal.remove(), 300);
        });
    }
    
    // Navegación con teclas numéricas
    if (e.key >= '1' && e.key <= '6') {
        const phaseNumber = e.key;
        openPhase(phaseNumber);
    }
});

// Easter egg - Konami code
let konamiCode = [];
const konamiPattern = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiPattern.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateQuantumMode();
        konamiCode = [];
    }
});

function activateQuantumMode() {
    // Efecto especial cuántico
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.animation = 'quantumFloat 0.5s ease-in-out infinite';
        particle.style.background = 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)';
        particle.style.backgroundSize = '400% 400%';
        particle.style.animation += ', gradientShift 2s ease-in-out infinite';
    });
    
    const modal = createModal(
        '🔬 Modo de Investigación Activado',
        'Acceso especial a visualizaciones avanzadas del comportamiento cuántico simulado. Este modo mejora la representación visual de los conceptos criptográficos evaluados en el estudio.',
        'info'
    );
    document.body.appendChild(modal);
    
    // Agregar animación de gradiente
    if (!document.querySelector('#quantum-mode-styles')) {
        const style = document.createElement('style');
        style.id = 'quantum-mode-styles';
        style.textContent = `
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
}
