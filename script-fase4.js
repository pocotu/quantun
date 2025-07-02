// Script para Fase 4: Diseño y Ejecución de Benchmarking
document.addEventListener('DOMContentLoaded', function() {
    initPage();
    initAnimations();
    initInteractions();
});

// Inicialización general
function initPage() {
    console.log('Fase 4: Diseño y Ejecución de Benchmarking - Cargada');
    
    // Configurar tooltips para comandos
    const commands = document.querySelectorAll('.cmd-content code');
    commands.forEach(cmd => {
        cmd.addEventListener('click', function() {
            copyToClipboard(this.textContent);
            showTooltip(this.parentElement, 'Comando copiado');
        });
    });
}

// Animaciones de entrada
function initAnimations() {
    const cards = document.querySelectorAll('.scenarios-card, .metrics-card, .network-simulation, .execution-protocol');
    
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

    // Animaciones especiales para elementos interactivos
    animateConfigMatrix();
    animateMetrics();
    animateNetworkConditions();
    animateProtocolSteps();
}

// Animaciones específicas
function animateConfigMatrix() {
    const configRows = document.querySelectorAll('.config-row:not(.header)');
    configRows.forEach((row, index) => {
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 500 + (index * 100));
        
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.5s ease';
    });
}

function animateMetrics() {
    const matrixRows = document.querySelectorAll('.matrix-row:not(.header)');
    matrixRows.forEach((row, index) => {
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 800 + (index * 100));
        
        row.style.opacity = '0';
        row.style.transform = 'translateX(-15px)';
        row.style.transition = 'all 0.5s ease';
    });
}

function animateNetworkConditions() {
    const networkRows = document.querySelectorAll('.network-row:not(.header)');
    networkRows.forEach((row, index) => {
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, 1200 + (index * 150));
        
        row.style.opacity = '0';
        row.style.transform = 'translateY(10px)';
        row.style.transition = 'all 0.5s ease';
    });
}

function animateProtocolSteps() {
    const pipelineSteps = document.querySelectorAll('.pipeline-step');
    pipelineSteps.forEach((step, index) => {
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }, 1500 + (index * 200));
        
        step.style.opacity = '0';
        step.style.transform = 'translateX(-15px)';
        step.style.transition = 'all 0.6s ease';
    });
}

// Interacciones
function initInteractions() {
    // Hover effects para las tarjetas
    addHoverEffects();
    
    // Click handlers para botones de copia
    const copyButtons = document.querySelectorAll('.copy-cmd');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const command = this.parentElement.querySelector('code').textContent;
            copyToClipboard(command);
            showTooltip(this, 'Copiado');
        });
    });

    // Interacciones con la matriz de configuraciones
    initConfigMatrixInteractions();
    
    // Interacciones con métricas
    initMetricsInteractions();
    
    // Interacciones con condiciones de red
    initNetworkInteractions();
    
    // Interacciones con protocolo
    initProtocolInteractions();
    
    // Event listeners para modales educativos
    setupEducationalModals();
}

// Configuración de modales educativos
function setupEducationalModals() {
    // Modal para scenario-badge (Matriz de Pruebas)
    const scenarioBadge = document.querySelector('.scenario-badge');
    if (scenarioBadge) {
        scenarioBadge.style.cursor = 'pointer';
        scenarioBadge.addEventListener('click', () => showScenarioMatrixModal());
    }
    
    // Modal para metrics-badge (Análisis Multifacético)
    const metricsBadge = document.querySelector('.metrics-badge');
    if (metricsBadge) {
        metricsBadge.style.cursor = 'pointer';
        metricsBadge.addEventListener('click', () => showMetricsAnalysisModal());
    }
    
    // Modal para simulation-badge (Simulación de Red)
    const simulationBadge = document.querySelector('.simulation-badge');
    if (simulationBadge) {
        simulationBadge.style.cursor = 'pointer';
        simulationBadge.addEventListener('click', () => showNetworkSimulationModal());
    }
    
    // Modal para protocol-badge (Protocolo de Ejecución)
    const protocolBadge = document.querySelector('.protocol-badge');
    if (protocolBadge) {
        protocolBadge.style.cursor = 'pointer';
        protocolBadge.addEventListener('click', () => showExecutionProtocolModal());
    }
}

// Modal: Matriz de Pruebas - Escenarios y Configuraciones
function showScenarioMatrixModal() {
    showModal({
        title: "Matriz de Configuraciones de Benchmarking",
        content: `
            <div class="modal-section">
                <h4><i class="fas fa-sitemap"></i> Metodología de Benchmarking Sistemático</h4>
                <p>La matriz de configuraciones implementa un enfoque exhaustivo para evaluar algoritmos post-cuánticos bajo múltiples condiciones operacionales.</p>
                
                <h5>🔬 Escenarios de Evaluación:</h5>
                <ul>
                    <li><strong>TLS Handshake End-to-End:</strong> Evaluación del handshake completo TLS 1.3 con algoritmos post-cuánticos (Kyber para intercambio de claves, Dilithium para autenticación)</li>
                    <li><strong>Primitivas Criptográficas Puras:</strong> Medición directa de operaciones KeyGen, Sign y Verify sin overhead de protocolo</li>
                </ul>
                
                <h5>⚙️ Variables de Configuración:</h5>
                <ul>
                    <li><strong>Optimización Hardware (AVX2):</strong> Comparación entre implementaciones optimizadas y genéricas</li>
                    <li><strong>Configuraciones de Red:</strong> Simulación de latencias WAN/LAN y pérdida de paquetes</li>
                    <li><strong>Cargas de Trabajo:</strong> Variación en tamaños de mensaje y frecuencia de operaciones</li>
                </ul>
                
                <div class="tech-note">
                    <i class="fas fa-info-circle"></i>
                    <strong>Fundamentación Técnica:</strong> Esta matriz permite identificar compensaciones (trade-offs) entre seguridad post-cuántica y rendimiento operacional, proporcionando datos empíricos para decisiones de implementación.
                </div>
            </div>
        `
    });
}

// Modal: Análisis Multifacético de Métricas
function showMetricsAnalysisModal() {
    showModal({
        title: "Análisis Multifacético de Rendimiento",
        content: `
            <div class="modal-section">
                <h4><i class="fas fa-chart-line"></i> Métricas Comprehensivas de Evaluación</h4>
                <p>El análisis multifacético captura múltiples dimensiones del rendimiento para proporcionar una evaluación holística de los algoritmos post-cuánticos.</p>
                
                <h5>📊 Dimensiones de Medición:</h5>
                <ul>
                    <li><strong>Rendimiento Temporal:</strong>
                        <ul>
                            <li>Latencia de handshake TLS completo</li>
                            <li>Tiempo de generación de claves (KeyGen)</li>
                            <li>Tiempo de firma digital (Sign/Verify)</li>
                        </ul>
                    </li>
                    <li><strong>Eficiencia Computacional:</strong>
                        <ul>
                            <li>Utilización de CPU durante operaciones criptográficas</li>
                            <li>Throughput de conexiones simultáneas</li>
                            <li>Escalabilidad bajo carga</li>
                        </ul>
                    </li>
                    <li><strong>Overhead de Comunicación:</strong>
                        <ul>
                            <li>Tamaño de claves públicas y firmas</li>
                            <li>Bandwidth adicional en handshakes</li>
                            <li>Fragmentación de paquetes</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>🎯 Metodología de Análisis:</h5>
                <p>Aplicación de técnicas estadísticas robustas incluyendo análisis de percentiles, detección de outliers y correlación entre métricas para identificar patrones de rendimiento.</p>
                
                <div class="tech-note">
                    <i class="fas fa-lightbulb"></i>
                    <strong>Valor Metodológico:</strong> Este enfoque multidimensional permite identificar algoritmos que optimizan globalmente el rendimiento, no solo métricas individuales.
                </div>
            </div>
        `
    });
}

// Modal: Simulación de Condiciones de Red
function showNetworkSimulationModal() {
    showModal({
        title: "Simulación de Condiciones de Red Realistas",
        content: `
            <div class="modal-section">
                <h4><i class="fas fa-network-wired"></i> Traffic Control y Network Emulation</h4>
                <p>La simulación de red utiliza herramientas Linux avanzadas para replicar condiciones de red del mundo real y evaluar la robustez de algoritmos post-cuánticos.</p>
                
                <h5>🛠️ Herramientas Utilizadas:</h5>
                <ul>
                    <li><strong>tc (Traffic Control):</strong> Control de tráfico a nivel de kernel para simular limitaciones de bandwidth</li>
                    <li><strong>netem (Network Emulation):</strong> Emulación de características de red como latencia, jitter y pérdida de paquetes</li>
                </ul>
                
                <h5>📡 Escenarios de Red Simulados:</h5>
                <ul>
                    <li><strong>LAN (Red Local):</strong>
                        <ul>
                            <li>Latencia: 1-5ms</li>
                            <li>Bandwidth: 1Gbps</li>
                            <li>Pérdida de paquetes: 0%</li>
                        </ul>
                    </li>
                    <li><strong>WAN (Internet):</strong>
                        <ul>
                            <li>Latencia: 50-200ms</li>
                            <li>Bandwidth: 10-100Mbps</li>
                            <li>Pérdida de paquetes: 0.1-1%</li>
                        </ul>
                    </li>
                    <li><strong>Condiciones Adversas:</strong>
                        <ul>
                            <li>Alta latencia: >300ms</li>
                            <li>Bandwidth limitado: <1Mbps</li>
                            <li>Pérdida significativa: >2%</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>🎯 Objetivo de la Simulación:</h5>
                <p>Evaluar cómo el mayor tamaño de claves y firmas de algoritmos post-cuánticos afecta el rendimiento en redes con limitaciones reales, especialmente en el contexto de timeouts de TLS y retransmisiones.</p>
                
                <div class="tech-note">
                    <i class="fas fa-shield-alt"></i>
                    <strong>Importancia Práctica:</strong> Los algoritmos post-cuánticos introducen overhead significativo. La simulación de red permite identificar configuraciones óptimas para diferentes entornos de despliegue.
                </div>
            </div>
        `
    });
}

// Modal: Protocolo de Ejecución Riguroso
function showExecutionProtocolModal() {
    showModal({
        title: "Protocolo de Ejecución de Benchmarks",
        content: `
            <div class="modal-section">
                <h4><i class="fas fa-cogs"></i> Metodología de Ejecución Sistemática</h4>
                <p>El protocolo de ejecución garantiza la reproducibilidad y validez estadística de los resultados mediante un enfoque sistemático y controlado.</p>
                
                <h5>🔄 Parámetros de Ejecución:</h5>
                <ul>
                    <li><strong>N = 1,000 Iteraciones:</strong> Número de ejecuciones por configuración para asegurar significancia estadística</li>
                    <li><strong>Warmup Period:</strong> 100 iteraciones iniciales descartadas para estabilizar el sistema</li>
                    <li><strong>Cooldown:</strong> Pausa entre batches para evitar efectos térmicos</li>
                </ul>
                
                <h5>🎯 Control de Variables:</h5>
                <ul>
                    <li><strong>Aislamiento del Sistema:</strong>
                        <ul>
                            <li>CPU governor fijado en "performance"</li>
                            <li>Desactivación de power saving</li>
                            <li>Isolation de cores específicos</li>
                        </ul>
                    </li>
                    <li><strong>Reproducibilidad:</strong>
                        <ul>
                            <li>Seeds fijas para generadores aleatorios</li>
                            <li>Orden determinístico de ejecución</li>
                            <li>Logging completo de configuraciones</li>
                        </ul>
                    </li>
                </ul>
                
                <h5>📈 Análisis Estadístico:</h5>
                <ul>
                    <li><strong>Medidas de Tendencia Central:</strong> Media, mediana y percentiles</li>
                    <li><strong>Variabilidad:</strong> Desviación estándar y coeficiente de variación</li>
                    <li><strong>Detección de Outliers:</strong> Método IQR para identificar mediciones anómalas</li>
                    <li><strong>Intervalos de Confianza:</strong> 95% de confianza para todas las métricas</li>
                </ul>
                
                <div class="tech-note">
                    <i class="fas fa-microscope"></i>
                    <strong>Rigor Científico:</strong> El protocolo sigue estándares de benchmarking académico para asegurar que los resultados sean comparables con investigación previa y futura en el campo.
                </div>
            </div>
        `
    });
}

function addHoverEffects() {
    const hoverElements = document.querySelectorAll('.scenario-item, .focus-item, .hypothesis-compact, .config-row:not(.header)');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.15)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        });
    });
}

function initConfigMatrixInteractions() {
    const configRows = document.querySelectorAll('.config-row:not(.header)');
    
    configRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remover selección anterior
            configRows.forEach(r => r.classList.remove('selected'));
            
            // Agregar selección actual
            this.classList.add('selected');
            
            // Mostrar información detallada
            showConfigDetails(this);
        });
    });
}

function initMetricsInteractions() {
    const matrixRows = document.querySelectorAll('.matrix-row:not(.header)');
    
    matrixRows.forEach(row => {
        row.addEventListener('click', function() {
            const metricMain = this.querySelector('.metric-main').textContent;
            const toolCompact = this.querySelector('.tool-compact').textContent;
            showMetricDetails(metricMain, toolCompact);
        });
        
        row.style.cursor = 'pointer';
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function initNetworkInteractions() {
    const networkRows = document.querySelectorAll('.network-row:not(.header)');
    
    networkRows.forEach(row => {
        row.addEventListener('click', function() {
            // Toggle selección
            this.classList.toggle('selected');
            
            // Efecto visual
            if (this.classList.contains('selected')) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                this.style.borderLeft = '4px solid var(--secondary-blue)';
            } else {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
                this.style.borderLeft = 'none';
            }
        });
        
        row.style.cursor = 'pointer';
        row.style.transition = 'all 0.3s ease';
    });
}

function initProtocolInteractions() {
    const pipelineSteps = document.querySelectorAll('.pipeline-step');
    
    pipelineSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            showProtocolDetails(index + 1);
        });
        
        step.style.cursor = 'pointer';
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Funciones de información detallada
function showConfigDetails(configRow) {
    const configName = configRow.querySelector('.config-name').textContent;
    let details = '';
    
    switch(configName) {
        case 'Baseline-Classical':
            details = `
                <h3>Configuración Baseline-Classical</h3>
                <ul>
                    <li><strong>Propósito:</strong> Línea base para comparación</li>
                    <li><strong>Algoritmos:</strong> ECDHE + ECDSA establecidos</li>
                    <li><strong>Ventajas:</strong> Rendimiento optimizado, amplio soporte</li>
                    <li><strong>Limitaciones:</strong> Vulnerable a ataques cuánticos</li>
                </ul>
            `;
            break;
        case 'PQC-Hybrid':
            details = `
                <h3>Configuración PQC-Hybrid</h3>
                <ul>
                    <li><strong>Propósito:</strong> Transición gradual a PQC</li>
                    <li><strong>KEM:</strong> Kyber768 + X25519 combinados</li>
                    <li><strong>Ventajas:</strong> Seguridad cuántica + compatibilidad</li>
                    <li><strong>Overhead:</strong> Mayor tamaño de paquetes</li>
                </ul>
            `;
            break;
        case 'PQC-Pure':
            details = `
                <h3>Configuración PQC-Pure</h3>
                <ul>
                    <li><strong>Propósito:</strong> Firmas completamente post-cuánticas</li>
                    <li><strong>Algoritmo:</strong> ML-DSA-65 (Dilithium3)</li>
                    <li><strong>Nivel:</strong> NIST Categoría 3</li>
                    <li><strong>Consideraciones:</strong> Firmas más grandes</li>
                </ul>
            `;
            break;
    }
    
    const modal = createModal(`Configuración: ${configName}`, details, 'info');
    document.body.appendChild(modal);
}

function showMetricDetails(metricName, tool) {
    let details = '';
    
    switch(metricName) {
        case 'Handshake TLS':
            details = `
                <h3>Medición de Handshake TLS</h3>
                <p><strong>Herramienta:</strong> ${tool}</p>
                <ul>
                    <li><strong>Qué mide:</strong> Tiempo total de establecimiento de sesión TLS 1.3</li>
                    <li><strong>Incluye:</strong> Intercambio de claves, verificación de certificados</li>
                    <li><strong>Comando ejemplo:</strong> <code>openssl s_time -connect server:443 -new -time 30</code></li>
                    <li><strong>Importancia:</strong> Métrica de rendimiento de extremo a extremo</li>
                </ul>
            `;
            break;
        case 'CPU Cycles':
            details = `
                <h3>Medición de Ciclos de CPU</h3>
                <p><strong>Herramienta:</strong> ${tool}</p>
                <ul>
                    <li><strong>Qué mide:</strong> Número de ciclos de CPU utilizados</li>
                    <li><strong>Comando:</strong> <code>perf stat -e cycles ./benchmark</code></li>
                    <li><strong>Ventaja:</strong> Independiente de frecuencia de CPU</li>
                    <li><strong>Uso:</strong> Comparación precisa entre algoritmos</li>
                </ul>
            `;
            break;
        case 'RSS Peak':
            details = `
                <h3>Medición de Memoria RSS</h3>
                <p><strong>Herramienta:</strong> ${tool}</p>
                <ul>
                    <li><strong>Qué mide:</strong> Pico de memoria residente utilizada</li>
                    <li><strong>Comando:</strong> <code>/usr/bin/time -v ./programa</code></li>
                    <li><strong>Importancia:</strong> Impacto en recursos del sistema</li>
                    <li><strong>PQC:</strong> Claves más grandes = mayor uso de memoria</li>
                </ul>
            `;
            break;
        default:
            details = `<h3>${metricName}</h3><p>Herramienta: ${tool}</p><p>Métrica importante para evaluación de rendimiento PQC.</p>`;
    }
    
    const modal = createModal(`Métrica: ${metricName}`, details, 'info');
    document.body.appendChild(modal);
}

function showProtocolDetails(stepNumber) {
    let details = '';
    
    switch(stepNumber) {
        case 1:
            details = `
                <h3>Automatización con Scripts</h3>
                <ul>
                    <li><strong>Lenguaje:</strong> Bash/Shell scripting</li>
                    <li><strong>Ventajas:</strong> Reproducibilidad, consistencia</li>
                    <li><strong>Funciones:</strong> Iteración automática de configuraciones</li>
                    <li><strong>Gestión:</strong> Variables de entorno, configuración dinámica</li>
                </ul>
            `;
            break;
        case 2:
            details = `
                <h3>Proceso de Calentamiento</h3>
                <ul>
                    <li><strong>Propósito:</strong> Estabilizar estado del sistema</li>
                    <li><strong>Incluye:</strong> Cachés CPU, L1/L2/L3, TLB</li>
                    <li><strong>Duración:</strong> 5-10 ejecuciones previas</li>
                    <li><strong>Importancia:</strong> Evitar variabilidad inicial</li>
                </ul>
            `;
            break;
        case 3:
            details = `
                <h3>Significación Estadística</h3>
                <ul>
                    <li><strong>Tamaño de muestra:</strong> N = 1,000 ejecuciones</li>
                    <li><strong>Análisis:</strong> Media, desviación estándar, percentiles</li>
                    <li><strong>Criterio:</strong> Intervalos de confianza 95%</li>
                    <li><strong>Validación:</strong> Test de normalidad, outliers</li>
                </ul>
            `;
            break;
        case 4:
            details = `
                <h3>Registro Estructurado</h3>
                <ul>
                    <li><strong>Formato:</strong> CSV con headers consistentes</li>
                    <li><strong>Campos:</strong> Configuración, condiciones, métricas, timestamp</li>
                    <li><strong>Ventajas:</strong> Fácil análisis con Python/R</li>
                    <li><strong>Almacenamiento:</strong> Un archivo por tipo de experimento</li>
                </ul>
            `;
            break;
    }
    
    const modal = createModal(`Protocolo Paso ${stepNumber}`, details, 'info');
    document.body.appendChild(modal);
}

// Función para copiar comandos
function copyCommand(button) {
    const command = button.parentElement.querySelector('code').textContent;
    copyToClipboard(command);
    showTooltip(button, 'Comando copiado');
}

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
        if (tooltip.parentNode) {
            tooltip.remove();
        }
    }, 2000);
}

// Navegación
function goBack() {
    window.location.href = 'index.html';
}

function nextPhase() {
    window.location.href = 'fase5.html';
}

function prevPhase() {
    window.location.href = 'fase3.html';
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
    
    // Estilos del modal
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                animation: modalFadeIn 0.3s ease forwards;
            }
            
            .modal-container {
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                transform: scale(0.9);
                animation: modalSlideIn 0.3s ease forwards;
            }
            
            .modal-header {
                background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
                color: white;
                padding: 15px 20px;
                border-radius: 12px 12px 0 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 5px;
                border-radius: 4px;
                transition: background 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .modal-body {
                padding: 20px;
                line-height: 1.6;
            }
            
            .modal-body h3 {
                color: var(--primary-blue);
                margin-bottom: 15px;
            }
            
            .modal-body ul {
                padding-left: 20px;
                margin-bottom: 15px;
            }
            
            .modal-body li {
                margin-bottom: 8px;
            }
            
            .modal-body code {
                background: var(--light-gray);
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                font-size: 0.9em;
            }
            
            .modal-footer {
                padding: 15px 20px;
                border-top: 1px solid var(--border-light);
                text-align: right;
            }
            
            .modal-btn {
                background: var(--secondary-blue);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9rem;
                transition: background 0.3s ease;
            }
            
            .modal-btn:hover {
                background: var(--primary-blue);
            }
            
            @keyframes modalFadeIn {
                to { opacity: 1; }
            }
            
            @keyframes modalSlideIn {
                to { transform: scale(1); }
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    return modal;
}

// Función helper para mostrar modales
function showModal(config) {
    const modal = createModal(config.title, config.content, config.type || 'info');
    document.body.appendChild(modal);
}

// Función para mostrar información de herramientas
function showToolInfo(tool) {
    let info = '';
    switch(tool) {
        case 'tc':
            info = 'Traffic Control: Herramienta de Linux para control de tráfico de red y emulación de condiciones.';
            break;
        case 'netem':
            info = 'Network Emulator: Módulo del kernel para emular propiedades de red como latencia y pérdida de paquetes.';
            break;
        case 'perf':
            info = 'Performance Analysis Tool: Herramienta de profiling para análisis detallado de rendimiento del sistema.';
            break;
        case 'tcpdump':
            info = 'Analizador de paquetes de red para captura y análisis de tráfico de red en tiempo real.';
            break;
        default:
            info = 'Herramienta especializada para benchmarking y análisis de rendimiento.';
    }
    
    const tooltip = createModal(`Información: ${tool}`, info, 'info');
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

// Función para resaltar configuraciones seleccionadas
function highlightSelectedConfigs() {
    const selectedConfigs = document.querySelectorAll('.config-row.selected');
    if (selectedConfigs.length > 0) {
        selectedConfigs.forEach(config => {
            config.style.borderLeft = '4px solid var(--secondary-blue)';
            config.style.background = 'linear-gradient(90deg, var(--light-gray), white)';
        });
    }
}

// Inicializar estilos CSS adicionales
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .config-row.selected {
        border-left: 4px solid var(--secondary-blue) !important;
        background: linear-gradient(90deg, var(--light-gray), white) !important;
        transform: translateX(5px);
    }
    
    .condition-value.selected {
        transform: scale(1.02) !important;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
        border-left-width: 5px !important;
    }
    
    .metric-item:hover {
        background: var(--light-gray) !important;
        transform: translateY(-2px);
    }
    
    .protocol-step:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
    }
`;
document.head.appendChild(additionalStyles);
