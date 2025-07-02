// Script para el índice principal
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el qubit del header
    initHeaderQubit();
    
    // Configurar el botón de referencias
    setupReferencesButton();
    
    // Animación de entrada para las tarjetas y referencias
    const phaseCards = document.querySelectorAll('.phase-card-mini');
    const referencesContainer = document.querySelector('.academic-references-inline');
    
    // Observer para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay especial para el contenedor de referencias (aparece al final)
                if (entry.target.classList.contains('academic-references-inline')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, phaseCards.length * 200 + 400); // Aparece después de todas las fases + 400ms extra
                } else {
                    // Animación normal para las tarjetas de fases
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            }
        });
    }, observerOptions);
    
    // Inicializar animaciones para las tarjetas de fases
    phaseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Inicializar animación para el contenedor de referencias
    if (referencesContainer) {
        referencesContainer.style.opacity = '0';
        referencesContainer.style.transform = 'translateY(30px)';
        referencesContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(referencesContainer);
    }
    
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

// Configuración del botón de referencias
function setupReferencesButton() {
    const referencesBtn = document.getElementById('referencesBtn');
    if (referencesBtn) {
        referencesBtn.addEventListener('click', showReferencesModal);
    }
}

// Modal de referencias científicas
function showReferencesModal() {
    const modal = createReferencesModal();
    document.body.appendChild(modal);
}

function createReferencesModal() {
    const modal = document.createElement('div');
    modal.className = 'references-modal-overlay';
    modal.innerHTML = `
        <div class="references-modal-container">
            <div class="references-header">
                <h2><i class="fas fa-graduation-cap"></i> Referencias Científicas</h2>
                <button class="close-btn" onclick="this.closest('.references-modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="references-content">
                ${getReferencesContent()}
            </div>
        </div>
    `;
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Cerrar con tecla Escape
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    return modal;
}

function getReferencesContent() {
    return `
        <div class="references-section">
            <h3><i class="fas fa-book"></i> Fundamentos Teóricos</h3>
            <div class="reference-item">
                <strong>[1]</strong> NIST Post-Quantum Cryptography Standardization. 
                <em>CSRC - NIST Computer Security Resource Center</em>. 
                <a href="https://csrc.nist.gov/projects/post-quantum-cryptography" target="_blank">
                    https://csrc.nist.gov/projects/post-quantum-cryptography
                </a>
            </div>
            
            <div class="reference-item">
                <strong>[2]</strong> Shor, P. W. (1994). Algorithms for quantum computation: discrete logarithms and factoring. 
                <em>Proceedings 35th Annual Symposium on Foundations of Computer Science</em>.
                <a href="https://en.wikipedia.org/wiki/Shor%27s_algorithm" target="_blank">
                    https://en.wikipedia.org/wiki/Shor%27s_algorithm
                </a>
            </div>
            
            <div class="reference-item">
                <strong>[3]</strong> Grover, L. K. (1996). A fast quantum mechanical algorithm for database search. 
                <em>Proceedings of the 28th Annual ACM Symposium on Theory of Computing</em>.
                <a href="https://crypto.stackexchange.com/questions/63068/attacking-aes-128-with-grovers-algorithm" target="_blank">
                    Quantum Computing Threats: RSA & AES
                </a>
            </div>
        </div>

        <div class="references-section">
            <h3><i class="fas fa-shield-alt"></i> Estándares y Algoritmos PQC</h3>
            <div class="reference-item">
                <strong>[4]</strong> FIPS 203, Module-Lattice-Based Key-Encapsulation Mechanism Standard. 
                <em>NIST Federal Information Processing Standards</em>.
                <a href="https://csrc.nist.gov/pubs/fips/203/final" target="_blank">
                    https://csrc.nist.gov/pubs/fips/203/final
                </a>
            </div>
            
            <div class="reference-item">
                <strong>[5]</strong> CRYSTALS-Kyber: Key Encapsulation Mechanism. 
                <em>CRYSTALS - Cryptographic Suite for Algebraic Lattices</em>.
                <a href="https://pq-crystals.org/kyber/" target="_blank">
                    https://pq-crystals.org/kyber/
                </a>
            </div>
            
            <div class="reference-item">
                <strong>[6]</strong> CRYSTALS-Dilithium: Digital Signature Algorithm. 
                <em>CRYSTALS - Cryptographic Suite for Algebraic Lattices</em>.
                <a href="https://pq-crystals.org/dilithium/" target="_blank">
                    https://pq-crystals.org/dilithium/
                </a>
            </div>
        </div>

        <div class="references-section">
            <h3><i class="fas fa-code"></i> Implementación y Herramientas</h3>
            <div class="reference-item">
                <strong>[7]</strong> Open Quantum Safe Project. 
                <em>Quantum-safe cryptography software</em>.
                <a href="https://openquantumsafe.org/" target="_blank">
                    https://openquantumsafe.org/
                </a>
            </div>
            
            <div class="reference-item">
                <strong>[8]</strong> oqs-provider: OpenSSL 3 provider containing post-quantum algorithms. 
                <em>GitHub Repository</em>.
                <a href="https://github.com/open-quantum-safe/oqs-provider" target="_blank">
                    https://github.com/open-quantum-safe/oqs-provider
                </a>
            </div>
            
            <div class="reference-item">
                <strong>[9]</strong> Post Quantum TLS server/client in C using OpenSSL and Open Quantum Safe project. 
                <em>Medium - Technical Implementation Guide</em>.
                <a href="https://medium.com/@seantywork/post-quantum-tls-server-client-in-c-using-openssl-and-open-quantum-safe-project-a73ce19a9607" target="_blank">
                    Implementation Guide
                </a>
            </div>
        </div>

        <div class="references-section">
            <h3><i class="fas fa-chart-line"></i> Análisis de Rendimiento</h3>
            <div class="reference-item">
                <strong>[10]</strong> Performance Evaluation of Post-Quantum Cryptography: A Comprehensive Framework. 
                <em>ResearchGate</em>.
                <a href="https://www.researchgate.net/publication/388845887_Performance_Evaluation_of_Post-Quantum_Cryptography_A_Comprehensive_Framework_for_Experimental_Analysis" target="_blank">
                    Comprehensive Framework Analysis
                </a>
            </div>
            
            <div class="reference-item">
                <strong>[11]</strong> A Practical Performance Benchmark of Post-Quantum Cryptography. 
                <em>MDPI - Applied Sciences</em>.
                <a href="https://www.mdpi.com/2410-387X/9/2/32" target="_blank">
                    https://www.mdpi.com/2410-387X/9/2/32
                </a>
            </div>
            
            <div class="reference-item">
                <strong>[12]</strong> Post-Quantum Authentication in TLS 1.3: A Performance Study. 
                <em>Network and Distributed System Security (NDSS) Symposium</em>.
                <a href="https://www.ndss-symposium.org/wp-content/uploads/2020/02/24203.pdf" target="_blank">
                    NDSS Performance Study
                </a>
            </div>
        </div>

        <div class="references-section">
            <h3><i class="fas fa-tools"></i> Metodología y Benchmarking</h3>
            <div class="reference-item">
                <strong>[13]</strong> Essential guidelines for computational method benchmarking. 
                <em>PMC - PubMed Central</em>.
                <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6584985/" target="_blank">
                    Benchmarking Guidelines
                </a>
            </div>
            
            <div class="reference-item">
                <strong>[14]</strong> PQC Benchmark 2025: Kyber vs BIKE vs HQC. 
                <em>Online Hash Crack - Technical Analysis</em>.
                <a href="https://www.onlinehashcrack.com/guides/post-quantum-crypto/pqc-benchmark-2025-kyber-vs-bike-vs-hqc.php" target="_blank">
                    Algorithm Comparison Study
                </a>
            </div>
            
            <div class="reference-item">
                <strong>[15]</strong> Post Quantum Encryption with NGINX on Ubuntu 24.04. 
                <em>Linode Documentation</em>.
                <a href="https://www.linode.com/docs/guides/post-quantum-encryption-nginx-ubuntu2404/" target="_blank">
                    NGINX PQC Implementation
                </a>
            </div>
        </div>

        <div class="references-note">
            <h4><i class="fas fa-info-circle"></i> Nota Metodológica</h4>
            <p>Esta investigación se basa en estándares NIST actualizados y implementaciones de referencia del proyecto Open Quantum Safe. 
            Todas las mediciones de rendimiento se realizaron en un entorno controlado y reproducible utilizando metodologías de benchmarking científico establecidas.</p>
            
            <p><strong>Fecha de acceso a referencias web:</strong> Junio 30, 2025</p>
            <p><strong>Frameworks utilizados:</strong> OpenSSL 3.x, liboqs, oqs-provider, NGINX</p>
            <p><strong>Algoritmos evaluados:</strong> ML-KEM (Kyber), ML-DSA (Dilithium)</p>
        </div>
    `;
}

// Estilos para el modal de referencias
const referencesStyles = document.createElement('style');
referencesStyles.textContent = `
    .references-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: modalFadeIn 0.3s ease-out;
        backdrop-filter: blur(8px);
    }

    .references-modal-container {
        background: white;
        border-radius: 16px;
        max-width: 900px;
        width: 90%;
        max-height: 85vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
        animation: modalSlideIn 0.4s ease-out;
    }

    .references-header {
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        padding: 20px 30px;
        border-radius: 16px 16px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .references-header h2 {
        margin: 0;
        font-size: 1.8rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 8px;
        border-radius: 50%;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
    }

    .references-content {
        padding: 30px;
        line-height: 1.6;
    }

    .references-section {
        margin-bottom: 35px;
    }

    .references-section h3 {
        color: var(--primary);
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 2px solid var(--light-gray);
        padding-bottom: 8px;
    }

    .reference-item {
        margin-bottom: 18px;
        padding: 15px;
        background: var(--light);
        border-radius: 8px;
        border-left: 4px solid var(--accent);
        transition: all 0.3s ease;
    }

    .reference-item:hover {
        background: #f0f9ff;
        transform: translateX(5px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
    }

    .reference-item strong {
        color: var(--primary);
        font-weight: 600;
    }

    .reference-item a {
        color: var(--accent);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
    }

    .reference-item a:hover {
        color: var(--accent-dark);
        text-decoration: underline;
    }

    .references-note {
        background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #bae6fd;
        margin-top: 30px;
    }

    .references-note h4 {
        color: var(--primary);
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.1rem;
    }

    .references-note p {
        margin-bottom: 10px;
        color: var(--dark);
        font-size: 0.95rem;
    }

    .references-note p:last-child {
        margin-bottom: 0;
    }
`;
document.head.appendChild(referencesStyles);
