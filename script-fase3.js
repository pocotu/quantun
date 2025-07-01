// Script para Fase 3: Implementación del Prototipo
document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de la página
    initPage();
    
    // Animaciones de entrada
    initAnimations();
    
    // Funcionalidades interactivas
    initInteractions();
});

// Inicialización general
function initPage() {
    console.log('Fase 3: Implementación del Prototipo - Cargada');
    
    // Configurar tooltips para comandos
    const commands = document.querySelectorAll('.command-line');
    commands.forEach(cmd => {
        cmd.addEventListener('click', function() {
            copyToClipboard(this.textContent);
            showTooltip(this, 'Comando copiado');
        });
    });
}

// Animaciones de entrada
function initAnimations() {
    const cards = document.querySelectorAll('.usecase-card, .command-card, .flow-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Interacciones
function initInteractions() {
    // Hover effects para las tarjetas
    const cards = document.querySelectorAll('.usecase-card, .command-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Click handlers para comandos
    const commandButtons = document.querySelectorAll('.copy-cmd');
    commandButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const command = this.parentElement.querySelector('.command-line').textContent;
            copyToClipboard(command);
            showTooltip(this, 'Copiado');
        });
    });
}

// Función para copiar al portapapeles
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Comando copiado: ', text);
        }).catch(err => {
            console.error('Error copiando comando: ', err);
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

// Función de respaldo para copiar texto
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        console.log('Fallback: Copiado ' + (successful ? 'exitoso' : 'falló'));
    } catch (err) {
        console.error('Fallback: No se pudo copiar', err);
    }
    
    document.body.removeChild(textArea);
}

// Mostrar tooltip
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = message;
    
    element.style.position = 'relative';
    element.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(-5px)';
    }, 10);
    
    setTimeout(() => {
        tooltip.remove();
    }, 2000);
}

// Navegación - Función para volver al índice
function goBack() {
    window.location.href = 'index.html';
}

// Navegación entre fases
function nextPhase() {
    window.location.href = 'fase4.html';
}

function prevPhase() {
    window.location.href = 'fase2.html';
}

// Funciones para mostrar detalles de casos de uso
function showKyberDetails() {
    const modal = createModal(
        'TLS-Kyber 768 - Detalles Técnicos',
        `
        <div class="modal-content-detailed">
            <h3>Parámetros del Algoritmo</h3>
            <ul>
                <li><strong>Nivel de Seguridad:</strong> NIST Nivel 3 (AES-192 equivalente)</li>
                <li><strong>Tamaño de Clave Pública:</strong> 1,184 bytes</li>
                <li><strong>Tamaño de Clave Privada:</strong> 2,400 bytes</li>
                <li><strong>Tamaño del Ciphertext:</strong> 1,088 bytes</li>
            </ul>
            
            <h3>Ventajas</h3>
            <ul>
                <li>Rendimiento superior en operaciones de encapsulación</li>
                <li>Tamaños de clave más pequeños comparado con otros niveles</li>
                <li>Amplio soporte en implementaciones</li>
            </ul>
            
            <h3>Consideraciones</h3>
            <ul>
                <li>Mayor overhead en el handshake TLS</li>
                <li>Impacto en latencia de establecimiento de conexión</li>
            </ul>
        </div>
        `,
        'info'
    );
    document.body.appendChild(modal);
}

function showDilithiumDetails() {
    const modal = createModal(
        'Dilithium 3 - Detalles Técnicos',
        `
        <div class="modal-content-detailed">
            <h3>Parámetros del Algoritmo</h3>
            <ul>
                <li><strong>Nivel de Seguridad:</strong> NIST Nivel 3 (AES-192 equivalente)</li>
                <li><strong>Tamaño de Clave Pública:</strong> 1,952 bytes</li>
                <li><strong>Tamaño de Clave Privada:</strong> 4,000 bytes</li>
                <li><strong>Tamaño de Firma:</strong> 3,293 bytes</li>
            </ul>
            
            <h3>Ventajas</h3>
            <ul>
                <li>Firmas deterministas</li>
                <li>Verificación rápida</li>
                <li>Resistencia a ataques de canal lateral</li>
            </ul>
            
            <h3>Consideraciones</h3>
            <ul>
                <li>Firmas significativamente más grandes que RSA/ECDSA</li>
                <li>Mayor tiempo de generación de firma</li>
            </ul>
        </div>
        `,
        'info'
    );
    document.body.appendChild(modal);
}

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
            .copy-tooltip {
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 6px 10px;
                border-radius: 4px;
                font-size: 0.8rem;
                top: -30px;
                left: 50%;
                transform: translateX(-50%) translateY(10px);
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
                white-space: nowrap;
                z-index: 1000;
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
    
    // Agregar soporte para tecla Escape
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
            setTimeout(() => modal.remove(), 300);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
    
    modal.appendChild(modalContent);
    return modal;
}

// Función para mostrar información de herramientas
function showToolInfo(tool) {
    let info = '';
    switch(tool) {
        case 'openssl':
            info = 'Herramienta de línea de comandos para operaciones criptográficas y gestión de certificados.';
            break;
        case 'curl':
            info = 'Cliente HTTP/HTTPS para realizar pruebas de conectividad y transferencia de datos.';
            break;
        case 'nginx':
            info = 'Servidor web de alto rendimiento configurado con soporte PQC.';
            break;
        case 'docker':
            info = 'Plataforma de contenerización para aislar y reproducir el entorno de pruebas.';
            break;
        default:
            info = 'Herramienta especializada para el entorno de criptografía post-cuántica.';
    }
    
    const tooltip = createModal(`Información: ${tool}`, info, 'info');
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}
