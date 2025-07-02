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
    
    // Click en badges de casos de uso
    const caseBadges = document.querySelectorAll('.case-badge');
    caseBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const isConfidentiality = this.classList.contains('tls');
            if (isConfidentiality) {
                showConfidentialityDetails();
            } else {
                showAuthenticityDetails();
            }
        });
    });
    
    // Click en methodology badge
    const methodologyBadge = document.querySelector('.methodology-badge');
    if (methodologyBadge) {
        methodologyBadge.addEventListener('click', function() {
            showBenchmarkingMethodologyDetails();
        });
    }

    // Click en compilation steps
    const compilationSteps = document.querySelectorAll('.compilation-step');
    compilationSteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepTitle = this.querySelector('h4').textContent;
            showCompilationStepDetails(stepTitle);
        });
    });

    // Click en certificate management
    const certManagement = document.querySelector('.cert-management');
    if (certManagement) {
        certManagement.addEventListener('click', function() {
            showCertificateManagementDetails();
        });
    }

    // Click en nginx config
    const nginxConfig = document.querySelector('.nginx-config');
    if (nginxConfig) {
        nginxConfig.addEventListener('click', function() {
            showNginxConfigDetails();
        });
    }

    // Click en dilithium workflow
    const dilithiumWorkflow = document.querySelectorAll('.workflow-step');
    dilithiumWorkflow.forEach(step => {
        step.addEventListener('click', function() {
            const stepType = this.classList.contains('keygen-step') ? 'keygen' :
                             this.classList.contains('sign-step') ? 'sign' : 'verify';
            showDilithiumWorkflowDetails(stepType);
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

function showConfidentialityDetails() {
    const title = '🔒 Caso de Uso 1: Confidencialidad en Tránsito';
    const content = `
        <div class="modal-content-formatted">
            <p class="modal-intro">Implementación de TLS-Kyber para asegurar canales de comunicación post-cuánticos.</p>
            
            <div class="modal-section">
                <h4>🎯 <strong>Objetivo del Prototipo:</strong></h4>
                <ul>
                    <li>Caso de uso más común para PQC: seguridad del canal cliente-servidor</li>
                    <li>Evaluación de rendimiento de handshake TLS con KEMs post-cuánticos</li>
                    <li>Implementación realista para generar mediciones significativas</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>🏗️ <strong>Componentes de Implementación:</strong></h4>
                <ul>
                    <li>Nginx compilado con OpenSSL 3.x + oqs-provider</li>
                    <li>Certificados híbridos (firma clásica + KEM PQC)</li>
                    <li>Configuración <code>ssl_ecdh_curve: x25519_kyber768:X25519</code></li>
                    <li>Página index.html simple para generar handshakes medibles</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>🔑 <strong>Decisión de Diseño Crítica:</strong></h4>
                <ul>
                    <li><strong>Certificado servidor:</strong> firmado con algoritmo clásico (ECDSA)</li>
                    <li><strong>KEMs:</strong> híbridos post-cuánticos (x25519_kyber768)</li>
                    <li><strong>Aislamiento de rendimiento:</strong> solo KEM evaluado, no firma</li>
                    <li><strong>Medición pura:</strong> del mecanismo de intercambio de claves</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>⚙️ <strong>Configuración Nginx:</strong></h4>
                <ul>
                    <li><code>listen 443 ssl</code> con TLSv1.3 únicamente</li>
                    <li><code>ssl_prefer_server_ciphers on</code></li>
                    <li>Grupos híbridos priorizados con fallback clásico</li>
                    <li>Certificados generados con CA autofirmada</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>📊 <strong>Mediciones Objetivo:</strong></h4>
                <ul>
                    <li>Latencia de handshake TLS completo (extremo a extremo)</li>
                    <li>Impacto de condiciones de red adversas</li>
                    <li>Comparación directa: clásico vs. híbrido vs. PQC puro</li>
                </ul>
            </div>
        </div>
    `;
    
    const modal = createModal(title, content, 'confidentiality');
    document.body.appendChild(modal);
}

function showAuthenticityDetails() {
    const title = '✍️ Caso de Uso 2: Autenticidad de Documentos';
    const content = `
        <div class="modal-content-formatted">
            <p class="modal-intro">Implementación de firmas Dilithium para garantizar integridad y autenticidad.</p>
            
            <div class="modal-section">
                <h4>🎯 <strong>Objetivo del Prototipo:</strong></h4>
                <ul>
                    <li>Evaluación de firmas digitales post-cuánticas en flujo realista</li>
                    <li>Medición de primitivas criptográficas discretas: KeyGen, Sign, Verify</li>
                    <li>Aplicación práctica: firma y verificación de documentos</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>🏗️ <strong>Implementación Backend (FastAPI):</strong></h4>
                <ul>
                    <li><strong>Endpoint /sign:</strong> carga de archivo → hash SHA-256 → firma Dilithium</li>
                    <li><strong>Endpoint /verify:</strong> documento + firma + certificado → verificación</li>
                    <li><strong>Subprocess:</strong> para invocar OpenSSL personalizado con comandos dgst</li>
                    <li><strong>Alternativa:</strong> dilithium-py library para API más limpia</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>🔑 <strong>Flujo de Firma Digital:</strong></h4>
                <ul>
                    <li><strong>Generación par de claves:</strong> <code>openssl req -x509 -new -newkey dilithium3</code></li>
                    <li><strong>Cálculo hash:</strong> SHA-256 del contenido (tamaño fijo)</li>
                    <li><strong>Firma:</strong> <code>openssl dgst -sha256 -sign dilithium_priv.key</code></li>
                    <li><strong>Verificación:</strong> <code>openssl dgst -sha256 -verify dilithium_pub.crt</code></li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>⚠️ <strong>Consideración Crítica - "Fiat-Shamir con Abortos":</strong></h4>
                <ul>
                    <li>Técnica de muestreo por rechazo durante firma</li>
                    <li>Tiempo de firma <strong>VARIABLE</strong> debido a "abortos" probabilísticos</li>
                    <li>Distribución de tiempos: no determinista, requiere análisis estadístico</li>
                    <li>Implicaciones para sistemas en tiempo real</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>📊 <strong>Mediciones Específicas:</strong></h4>
                <ul>
                    <li><strong>Tiempo de generación de claves</strong> (una vez)</li>
                    <li><strong>Tiempo de firma</strong> (variable - medir percentiles 95, 99)</li>
                    <li><strong>Tiempo de verificación</strong> (consistente)</li>
                    <li><strong>Tamaños:</strong> clave pública, clave privada, firma</li>
                    <li><strong>Independencia del tamaño</strong> de documento (hash tamaño fijo)</li>
                </ul>
            </div>
        </div>
    `;
    
    const modal = createModal(title, content, 'authenticity');
    document.body.appendChild(modal);
}

function showBenchmarkingMethodologyDetails() {
    const title = '⏱️ Metodología de Benchmarking (Fase 4)';
    const content = `
        <div class="modal-content-formatted">
            <p class="modal-intro">Preparación crítica para mediciones precisas en la siguiente fase.</p>
            
            <div class="modal-section">
                <h4>🎯 <strong>Principio de Aislamiento de Variables:</strong></h4>
                <ul>
                    <li>Medir <strong>ÚNICAMENTE</strong> la operación criptográfica</li>
                    <li>Pre-cargar archivos en memoria antes del timer</li>
                    <li>Excluir I/O de archivos, hashing y lógica de aplicación</li>
                    <li>Temporizador: start después de preparación, stop inmediatamente post-crypto</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>📊 <strong>Metodología para Firmas:</strong></h4>
                <ul>
                    <li>Pre-calcular hash SHA-256 del documento</li>
                    <li>Cargar claves en memoria</li>
                    <li>Timer solo para: <code>sign()</code> o <code>verify()</code></li>
                    <li>Confirmar independencia del tamaño de documento</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>🔬 <strong>Metodología para TLS:</strong></h4>
                <ul>
                    <li>Medición extremo a extremo del handshake completo</li>
                    <li>Incluir impacto del protocolo TLS + overhead PQC</li>
                    <li>Simulación condiciones de red con <code>tc+netem</code></li>
                    <li><strong>N=1,000</strong> repeticiones para significancia estadística</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>⚡ <strong>Variables Críticas a Controlar:</strong></h4>
                <ul>
                    <li>Versiones exactas de bibliotecas</li>
                    <li>Flags de compilación (AVX2 vs. referencia)</li>
                    <li>Condiciones de red simuladas</li>
                    <li>Configuración de algoritmos híbridos</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>📈 <strong>Métricas Objetivo:</strong></h4>
                <ul>
                    <li><strong>Latencia:</strong> tiempo de handshake, operaciones criptográficas</li>
                    <li><strong>Recursos:</strong> ciclos CPU, memoria RSS, instrucciones</li>
                    <li><strong>Red:</strong> bytes transmitidos, paquetes, fragmentación</li>
                    <li><strong>Almacenamiento:</strong> tamaños de claves, firmas, certificados</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>🔧 <strong>Herramientas de Medición:</strong></h4>
                <ul>
                    <li><code>openssl s_time</code> para handshakes TLS</li>
                    <li><code>perf stat</code> para métricas de CPU</li>
                    <li><code>tcpdump/Wireshark</code> para análisis de red</li>
                    <li><code>/usr/bin/time -v</code> para memoria</li>
                </ul>
            </div>
        </div>
    `;
    
    const modal = createModal(title, content, 'methodology');
    document.body.appendChild(modal);
}

function showCertificateManagementDetails() {
    const title = '🏷️ Generación y Gestión de Certificados PQC';
    const content = `
        <div class="modal-content-formatted">
            <p class="modal-intro">Estrategia de certificados para evaluación aislada de rendimiento de KEMs.</p>
            
            <div class="modal-section">
                <h4>🎯 <strong>Diseño de Certificados:</strong></h4>
                <ul>
                    <li>CA autofirmada simple para entorno de pruebas</li>
                    <li><strong>Certificado servidor:</strong> firmado con algoritmo CLÁSICO (ECDSA)</li>
                    <li><strong>Objetivo:</strong> aislar rendimiento del KEM, no de verificación de firma</li>
                    <li>Evitar sobrecarga PQC en verificación de certificados</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>🔧 <strong>Proceso de Generación:</strong></h4>
                <ul>
                    <li><strong>CA root:</strong> <code>openssl req -x509 -new -newkey ecdsa</code></li>
                    <li><strong>Certificado servidor:</strong> firmado por CA con ECDSA-SHA256</li>
                    <li><strong>Sin firmas PQC</strong> en certificados para esta fase</li>
                    <li><strong>Enfoque:</strong> medición pura del intercambio de claves</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>🔑 <strong>Configuración Nginx Crítica:</strong></h4>
                <ul>
                    <li><strong>Grupos híbridos:</strong> <code>ssl_ecdh_curve x25519_kyber768:X25519</code></li>
                    <li><strong>Verificación:</strong> <code>openssl list -key-exchange-algorithms</code></li>
                    <li><strong>Fallback:</strong> X25519 clásico como respaldo</li>
                    <li><strong>Priorización:</strong> servidor prefiere algoritmos PQC</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>🧪 <strong>Validación de Funcionamiento:</strong></h4>
                <ul>
                    <li>Conectar cliente y verificar algoritmo utilizado</li>
                    <li>Capturar handshake con <code>tcpdump</code></li>
                    <li>Confirmar intercambio de claves PQC en logs</li>
                    <li>Medición baseline con configuración clásica</li>
                </ul>
            </div>
        </div>
    `;
    
    const modal = createModal(title, content, 'certificates');
    document.body.appendChild(modal);
}

function showNginxConfigDetails() {
    const title = '🌐 Configuración de Nginx con Soporte PQC';
    const content = `
        <div class="modal-content-formatted">
            <p class="modal-intro">Configuración específica para servidor web con capacidades post-cuánticas.</p>
            
            <div class="modal-section">
                <h4>🏗️ <strong>Compilación desde Código Fuente:</strong></h4>
                <ul>
                    <li><code>--with-openssl=&lt;path-to-source&gt;</code>: vinculación con OpenSSL personalizado</li>
                    <li><code>--with-http_ssl_module</code>: habilitación funcionalidad SSL/TLS</li>
                    <li>Compilación estática vs. dinámica según requerimientos</li>
                    <li>Instalación en directorio aislado <code>(/opt/nginx-pqc/)</code></li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>⚙️ <strong>Bloque de Servidor Crítico:</strong></h4>
                <div class="code-block">
                    <pre><code>server {
    listen 443 ssl;
    server_name localhost;
    
    ssl_certificate /path/to/server_cert.pem;
    ssl_certificate_key /path/to/server_key.pem;
    
    ssl_protocols TLSv1.3;
    ssl_prefer_server_ciphers on;
    
    # Grupos híbridos con fallback clásico
    ssl_ecdh_curve x25519_kyber768:X25519;
}</code></pre>
                </div>
            </div>

            <div class="modal-section">
                <h4>🔑 <strong>Configuración de Grupos KEMs:</strong></h4>
                <ul>
                    <li><strong>x25519_kyber768:</strong> algoritmo híbrido principal</li>
                    <li><strong>X25519:</strong> fallback clásico para compatibilidad</li>
                    <li>Nombres específicos dependen de versión oqs-provider</li>
                    <li><strong>Verificación:</strong> <code>openssl list -key-exchange-algorithms</code></li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>📡 <strong>Protocolo TLS 1.3:</strong></h4>
                <ul>
                    <li>Requerido para KEMs modernos post-cuánticos</li>
                    <li>Handshake optimizado vs. versiones anteriores</li>
                    <li>Soporte nativo para extensiones de criptografía</li>
                    <li>Negociación de algoritmos durante ClientHello</li>
                </ul>
            </div>

            <div class="modal-section">
                <h4>🎯 <strong>Objetivo de la Configuración:</strong></h4>
                <ul>
                    <li>Prototipo realista para mediciones de rendimiento</li>
                    <li>Entorno controlado para benchmarking</li>
                    <li>Base para comparación algoritmos clásicos vs. PQC</li>
                    <li>Simulación de servidor web típico con capacidades futuras</li>
                </ul>
            </div>
        </div>
    `;
    
    const modal = createModal(title, content, 'nginx-config');
    document.body.appendChild(modal);
}

function showDilithiumWorkflowDetails(stepType) {
    let title, content;
    
    switch(stepType) {
        case 'keygen':
            title = '🔑 Generación de Claves Dilithium';
            content = `Proceso de generación de par de claves para firma digital post-cuántica.

🔧 **Comando OpenSSL:**
• openssl req -x509 -new -newkey dilithium3
• -keyout dilithium_priv.key: clave privada
• -out dilithium_pub.crt: certificado público autofirmado
• -nodes: sin protección por contraseña (entorno pruebas)

📊 **Parámetros Dilithium3 (ML-DSA-65):**
• Nivel de seguridad: equivalente AES-192
• Tamaño clave pública: ~1952 bytes
• Tamaño clave privada: ~4000 bytes
• Balance rendimiento/seguridad optimizado

⚡ **Consideraciones de Rendimiento:**
• Generación una vez por entidad
• Costo computacional alto pero amortizado
• Almacenamiento persistente requerido
• No crítico para latencia de operaciones frecuentes

🔬 **Benchmarking KeyGen:**
• Medición aislada del tiempo de generación
• Comparación con ECDSA P-256 baseline
• Variabilidad según parámetros de seguridad
• Impacto de optimizaciones AVX2`;
            break;
            
        case 'sign':
            title = '✍️ Proceso de Firma Dilithium';
            content = `Operación de firma digital con técnica "Fiat-Shamir con Abortos".

🔧 **Flujo de Firma:**
• Hash SHA-256 del documento (tamaño fijo: 32 bytes)
• openssl dgst -sha256 -sign dilithium_priv.key
• Resultado: signature.bin (2420-4595 bytes según parámetros)
• Independiente del tamaño del documento original

⚠️ **Muestreo por Rechazo:**
• Proceso iterativo con posibles "abortos"
• Prevención de fuga de información de clave secreta
• Tiempo de firma VARIABLE (no determinista)
• Distribución estadística con media conocida

📊 **Implicaciones para Benchmarking:**
• Medir percentiles 95, 99 además de media
• N=1,000+ muestras para análisis estadístico robusto
• Comparación con ECDSA (tiempo determinista)
• Identificación de outliers por abortos múltiples

🎯 **Sistemas Tiempo Real:**
• Variabilidad puede ser problemática
• Considerar buffering o pre-firma
• Análisis de worst-case scenarios
• Trade-off seguridad vs. predictibilidad temporal`;
            break;
            
        case 'verify':
            title = '✅ Verificación de Firma Dilithium';
            content = `Proceso de verificación de autenticidad e integridad del documento.

🔧 **Flujo de Verificación:**
• Recálculo SHA-256 del documento original
• openssl dgst -sha256 -verify dilithium_pub.crt
• Comparación con signature.bin
• Resultado binario: válida/inválida

⚡ **Características de Rendimiento:**
• Tiempo CONSISTENTE (sin abortos como en firma)
• Computacionalmente más rápido que firma
• Escalable para verificaciones masivas
• Optimizable con paralelización

📈 **Ventajas de Dilithium:**
• Verificación más rápida vs. otros esquemas PQC
• Tamaño firma moderado vs. esquemas basados en hash
• Balance óptimo para aplicaciones con muchas verificaciones
• Implementaciones optimizadas disponibles (AVX2)

🔬 **Mediciones Críticas:**
• Tiempo de verificación vs. ECDSA baseline
• Throughput: verificaciones por segundo
• Escalabilidad con número de verificaciones concurrentes
• Impacto de tamaño de firma en cache de CPU

💡 **Aplicaciones Típicas:**
• Sistemas donde documentos se firman una vez, verifican muchas
• Distribución de software con verificación masiva
• Blockchain y sistemas distribuidos
• Archivos de log con integridad criptográfica`;
            break;
    }
    
    const modal = createModal(title, content, 'dilithium-workflow');
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
    modalContent.className = 'modal-content modal-content-compact';
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 20px;
        max-width: 650px;
        max-height: 85vh;
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
    
    modalContent.innerHTML = `
        <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="close-btn">&times;</button>
        </div>
        <div class="modal-body">${content}</div>
    `;
    
    const closeBtn = modalContent.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'modalFadeIn 0.3s ease-out reverse';
        setTimeout(() => modal.remove(), 300);
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
