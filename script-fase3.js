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
    
    modal.innerHTML = `
        <div class="modal-container ${type}">
            <div class="modal-header">
                <h3><i class="fas fa-info-circle"></i> ${title}</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="modal-btn" onclick="this.closest('.modal-overlay').remove()">
                    Cerrar
                </button>
            </div>
        </div>
    `;
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
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
