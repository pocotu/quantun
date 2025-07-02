// ========================================
// QUBIT ANIMADO - INTERACCIONES CUÁNTICAS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initBackgroundQubit();
});

// Función para inicializar el qubit de fondo
function initBackgroundQubit() {
    const qubitContainer = document.querySelector('.background-qubit-container');
    if (!qubitContainer) return;
    
    const qubitSystem = document.querySelector('.qubit-system');
    const virtualParticles = document.querySelectorAll('.virtual-particle');
    const qubitStates = document.querySelectorAll('.qubit-state');
    const sphereCore = document.querySelector('.sphere-core');
    
    // Variables para el seguimiento del mouse
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    
    // Interacción con el mouse - el qubit reacciona sutilmente
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
        isMouseMoving = true;
        
        if (qubitSystem) {
            // Movimiento suave siguiendo el mouse
            qubitSystem.style.transform = `translate(calc(-50% + ${mouseX}px), calc(-50% + ${mouseY}px))`;
            
            // Efecto de resplandor en el núcleo basado en la proximidad del mouse
            const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
            const intensity = Math.max(0.5, 1 - distance / 100);
            
            if (sphereCore) {
                sphereCore.style.filter = `hue-rotate(${distance * 2}deg) brightness(${intensity})`;
            }
        }
        
        // Resetear después de un tiempo sin movimiento
        clearTimeout(window.mouseTimeout);
        window.mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
            if (qubitSystem) {
                qubitSystem.style.transform = 'translate(-50%, -50%)';
            }
            if (sphereCore) {
                sphereCore.style.filter = '';
            }
        }, 2000);
    });
    
    // Cambio de estados cuánticos aleatorio
    function randomStateTransition() {
        const randomState = qubitStates[Math.floor(Math.random() * qubitStates.length)];
        if (randomState) {
            // Efecto de destello
            randomState.style.animation = 'none';
            randomState.style.transform = 'scale(1.5)';
            randomState.style.opacity = '1';
            
            setTimeout(() => {
                randomState.style.animation = 'stateTransition 4s ease-in-out infinite';
                randomState.style.transform = '';
                randomState.style.opacity = '';
            }, 200);
        }
    }
    
    // Ejecutar transiciones aleatorias
    setInterval(randomStateTransition, 8000 + Math.random() * 4000);
    
    // Efecto de entrelazamiento cuántico - sincronizar partículas
    function quantumEntanglement() {
        virtualParticles.forEach((particle, index) => {
            const delay = index * 150;
            const colors = [
                'var(--quantum-primary)',
                'var(--quantum-purple)',
                'var(--quantum-pink)',
                'var(--quantum-green)',
                'var(--quantum-yellow)',
                'var(--quantum-accent)'
            ];
            
            setTimeout(() => {
                // Efecto de sincronización
                particle.style.filter = 'brightness(2) saturate(2)';
                particle.style.transform = 'scale(1.5)';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                setTimeout(() => {
                    particle.style.filter = '';
                    particle.style.transform = '';
                    particle.style.background = '';
                }, 1000);
            }, delay);
        });
    }
    
    // Ejecutar entrelazamiento cada 15-25 segundos
    setInterval(quantumEntanglement, 15000 + Math.random() * 10000);
    
    // Efecto de colapso cuántico al hacer clic
    document.addEventListener('click', function(e) {
        // Crear efecto de onda desde el punto de clic
        createQuantumWave(e.clientX, e.clientY);
        
        // Efecto en el qubit
        if (qubitSystem) {
            qubitSystem.style.filter = 'brightness(1.5) hue-rotate(180deg)';
            qubitSystem.style.transform += ' scale(1.1)';
            
            setTimeout(() => {
                qubitSystem.style.filter = '';
                qubitSystem.style.transform = qubitSystem.style.transform.replace(' scale(1.1)', '');
            }, 500);
        }
    });
    
    // Crear onda cuántica desde un punto
    function createQuantumWave(x, y) {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border: 2px solid var(--quantum-accent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
            animation: clickWave 1s ease-out forwards;
        `;
        
        document.body.appendChild(wave);
        
        // Agregar animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes clickWave {
                0% {
                    width: 20px;
                    height: 20px;
                    opacity: 1;
                    border-width: 2px;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                    border-width: 0px;
                }
            }
        `;
        
        if (!document.querySelector('#click-wave-style')) {
            style.id = 'click-wave-style';
            document.head.appendChild(style);
        }
        
        // Eliminar la onda después de la animación
        setTimeout(() => {
            wave.remove();
        }, 1000);
    }
    
    // Optimización de performance - pausar animaciones cuando no es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                qubitContainer.style.animationPlayState = 'running';
                virtualParticles.forEach(p => p.style.animationPlayState = 'running');
                qubitStates.forEach(s => s.style.animationPlayState = 'running');
            } else {
                qubitContainer.style.animationPlayState = 'paused';
                virtualParticles.forEach(p => p.style.animationPlayState = 'paused');
                qubitStates.forEach(s => s.style.animationPlayState = 'paused');
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(document.body);
    
    // Efecto de respiración cuántica basado en el tiempo
    function quantumBreathing() {
        const time = Date.now() * 0.001;
        const intensity = (Math.sin(time * 0.5) + 1) * 0.5; // 0 a 1
        
        if (qubitSystem) {
            qubitSystem.style.opacity = 0.2 + intensity * 0.2; // Variar entre 0.2 y 0.4
        }
        
        requestAnimationFrame(quantumBreathing);
    }
    
    // Iniciar respiración cuántica
    quantumBreathing();
    
    // Efecto de carga inicial
    setTimeout(() => {
        if (qubitSystem) {
            qubitSystem.style.opacity = '0.3';
            qubitSystem.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }, 100);
    
    console.log('🚀 Sistema Cuántico Inicializado');
    console.log('💫 Estados: |0⟩, |1⟩, |ψ⟩');
    console.log('⚛️ Partículas virtuales activas');
    console.log('🌊 Ondas de probabilidad en expansión');
}

// Función para ajustar la intensidad del qubit (uso opcional)
function setQubitIntensity(intensity) {
    const qubitSystem = document.querySelector('.qubit-system');
    if (qubitSystem) {
        qubitSystem.style.opacity = Math.max(0.1, Math.min(1, intensity));
    }
}

// Función para cambiar el color dominante del qubit (uso opcional)
function setQubitColor(color) {
    const root = document.documentElement;
    root.style.setProperty('--quantum-primary', color);
}
