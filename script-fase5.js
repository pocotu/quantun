// Script para Fase 5: Análisis de Resultados y Discusión
document.addEventListener('DOMContentLoaded', function() {
    initPage();
    initAnimations();
    initInteractions();
});

// Inicialización general
function initPage() {
    console.log('Fase 5: Análisis de Resultados y Discusión - Cargada');
    
    // Configurar tooltips para elementos informativos
    const infoElements = document.querySelectorAll('[data-info]');
    infoElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.dataset.info);
        });
    });
}

// Animaciones de entrada
function initAnimations() {
    const cards = document.querySelectorAll('.processing-card, .analysis-card, .decision-framework, .objective-banner');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
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

    // Animaciones específicas para elementos interactivos
    animateMatrixRows();
    animateChartTypes();
    animateMetrics();
}

// Animaciones específicas
function animateMatrixRows() {
    const matrixRows = document.querySelectorAll('.matrix-row:not(.matrix-header)');
    matrixRows.forEach((row, index) => {
        setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
        }, 800 + (index * 100));
        
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 0.5s ease';
    });
}

function animateChartTypes() {
    const chartTypes = document.querySelectorAll('.chart-type');
    chartTypes.forEach((chart, index) => {
        setTimeout(() => {
            chart.style.opacity = '1';
            chart.style.transform = 'translateY(0)';
        }, 600 + (index * 150));
        
        chart.style.opacity = '0';
        chart.style.transform = 'translateY(10px)';
        chart.style.transition = 'all 0.5s ease';
    });
}

function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-item');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            metric.style.opacity = '1';
            metric.style.transform = 'scale(1)';
        }, 1000 + (index * 100));
        
        metric.style.opacity = '0';
        metric.style.transform = 'scale(0.95)';
        metric.style.transition = 'all 0.4s ease';
    });
}

// Interacciones
function initInteractions() {
    // Hover effects para tarjetas
    addHoverEffects();
    
    // Click handlers para elementos interactivos
    initMatrixInteractions();
    initChartInteractions();
    initExampleInteractions();
    initToolInteractions();
}

function addHoverEffects() {
    const hoverElements = document.querySelectorAll('.tool-card, .chart-type, .example-card, .metric-item');
    
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

function initMatrixInteractions() {
    const matrixRows = document.querySelectorAll('.matrix-row:not(.matrix-header)');
    
    matrixRows.forEach(row => {
        row.addEventListener('click', function() {
            showDecisionDetails(this);
        });
        
        row.style.cursor = 'pointer';
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });
}

function initChartInteractions() {
    const chartTypes = document.querySelectorAll('.chart-type');
    
    chartTypes.forEach(chart => {
        chart.addEventListener('click', function() {
            showChartDetails(this);
        });
        
        chart.style.cursor = 'pointer';
    });
}

function initExampleInteractions() {
    const exampleCards = document.querySelectorAll('.example-card');
    
    exampleCards.forEach(card => {
        card.addEventListener('click', function() {
            showOverheadDetails(this);
        });
        
        card.style.cursor = 'pointer';
    });
}

function initToolInteractions() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(tool => {
        tool.addEventListener('click', function() {
            showToolDetails(this);
        });
        
        tool.style.cursor = 'pointer';
    });
}

// Funciones de información detallada
function showDecisionDetails(row) {
    const priority = row.querySelector('.priority-cell span').textContent;
    const recommendation = row.querySelector('.recommendation-cell').textContent;
    
    let details = '';
    
    switch(priority) {
        case 'Firmas Pequeñas':
            details = `
                <h3>Optimización por Tamaño de Firma</h3>
                <div class="detailed-analysis">
                    <h4>Comparación de Tamaños:</h4>
                    <ul>
                        <li><strong>ECDSA P-256:</strong> ~70 bytes</li>
                        <li><strong>Falcon-512:</strong> ~690 bytes (~10x)</li>
                        <li><strong>Dilithium-2:</strong> ~2,420 bytes (~35x)</li>
                        <li><strong>Dilithium-3:</strong> ~3,293 bytes (~47x)</li>
                    </ul>
                    <h4>Caso de Uso Típico:</h4>
                    <p>Aplicaciones IoT, sistemas embebidos, almacenamiento limitado.</p>
                    <h4>Trade-off:</h4>
                    <p>Falcon ofrece firmas más pequeñas pero generación de claves más lenta y mayor complejidad de implementación.</p>
                </div>
            `;
            break;
        case 'Verificación Rápida':
            details = `
                <h3>Optimización por Velocidad de Verificación</h3>
                <div class="detailed-analysis">
                    <h4>Rendimiento de Verificación (ops/sec):</h4>
                    <ul>
                        <li><strong>ECDSA P-256:</strong> ~8,000 verificaciones/sec</li>
                        <li><strong>Dilithium-2:</strong> ~5,500 verificaciones/sec</li>
                        <li><strong>Dilithium-3:</strong> ~4,200 verificaciones/sec</li>
                        <li><strong>Falcon-512:</strong> ~9,000 verificaciones/sec</li>
                    </ul>
                    <h4>Caso de Uso Típico:</h4>
                    <p>Servidores de autenticación, validación de certificados en alta escala.</p>
                    <h4>Justificación:</h4>
                    <p>Dilithium mantiene rendimiento competitivo mientras ofrece seguridad post-cuántica.</p>
                </div>
            `;
            break;
        case 'Firma Rápida':
            details = `
                <h3>Optimización por Velocidad de Firma</h3>
                <div class="detailed-analysis">
                    <h4>Rendimiento de Firma (ops/sec):</h4>
                    <ul>
                        <li><strong>ECDSA P-256:</strong> ~2,000 firmas/sec</li>
                        <li><strong>Dilithium-2:</strong> ~1,800 firmas/sec</li>
                        <li><strong>Dilithium-3:</strong> ~1,200 firmas/sec</li>
                        <li><strong>Falcon-512:</strong> ~8,000 firmas/sec</li>
                    </ul>
                    <h4>Variabilidad:</h4>
                    <p>Dilithium tiene tiempo de firma variable, pero media competitiva y determinista.</p>
                    <h4>Caso de Uso Típico:</h4>
                    <p>Aplicaciones cliente que firman frecuentemente, transacciones en tiempo real.</p>
                </div>
            `;
            break;
        case 'TLS Móvil':
            details = `
                <h3>TLS en Redes Móviles/Adversas</h3>
                <div class="detailed-analysis">
                    <h4>Tamaños de Handshake:</h4>
                    <ul>
                        <li><strong>ECDHE X25519:</strong> ~200 bytes</li>
                        <li><strong>Kyber-512:</strong> ~800 bytes</li>
                        <li><strong>Kyber-768:</strong> ~1,200 bytes</li>
                        <li><strong>Kyber-1024:</strong> ~1,600 bytes</li>
                    </ul>
                    <h4>"Precipicio de Rendimiento":</h4>
                    <p>MTU típica: 1,500 bytes. Kyber-768 evita fragmentación en la mayoría de casos.</p>
                    <h4>Consideraciones Móviles:</h4>
                    <p>Alta latencia (100-500ms), pérdida de paquetes (1-5%), costo por byte.</p>
                </div>
            `;
            break;
        case 'Máxima Seguridad':
            details = `
                <h3>Máxima Seguridad TLS</h3>
                <div class="detailed-analysis">
                    <h4>Niveles de Seguridad NIST:</h4>
                    <ul>
                        <li><strong>Kyber-512:</strong> Nivel 1 (AES-128)</li>
                        <li><strong>Kyber-768:</strong> Nivel 3 (AES-192)</li>
                        <li><strong>Kyber-1024:</strong> Nivel 5 (AES-256)</li>
                    </ul>
                    <h4>Entorno de Centro de Datos:</h4>
                    <p>Redes de alta calidad (baja latencia <1ms, pérdida <0.01%, ancho de banda abundante).</p>
                    <h4>Justificación:</h4>
                    <p>El overhead adicional de Kyber-1024 es despreciable en redes optimales, proporcionando máxima seguridad futura.</p>
                </div>
            `;
            break;
    }
    
    const modal = createModal(`Marco de Decisión: ${priority}`, details, 'info');
    document.body.appendChild(modal);
}

function showChartDetails(chartElement) {
    const chartTitle = chartElement.querySelector('.chart-details h4').textContent;
    let details = '';
    
    switch(chartTitle) {
        case 'Tablas Comparativas':
            details = `
                <h3>Tablas Comparativas de Rendimiento</h3>
                <div class="chart-explanation">
                    <h4>Propósito:</h4>
                    <p>Presentar métricas clave de manera estructurada para comparación directa.</p>
                    <h4>Métricas Incluidas:</h4>
                    <ul>
                        <li><strong>Latencia mediana:</strong> Tiempo típico de handshake TLS</li>
                        <li><strong>Ciclos de CPU:</strong> Costo computacional</li>
                        <li><strong>Uso de memoria:</strong> RSS peak durante operaciones</li>
                        <li><strong>Tamaños de artefactos:</strong> Claves, firmas, certificados</li>
                    </ul>
                    <h4>Formato:</h4>
                    <p>Configuración clásica vs PQC en condiciones ideales de red.</p>
                </div>
            `;
            break;
        case 'Box Plots':
            details = `
                <h3>Diagramas de Caja (Box Plots)</h3>
                <div class="chart-explanation">
                    <h4>Ventajas:</h4>
                    <p>Visualización completa de la distribución de datos, más allá de simples promedios.</p>
                    <h4>Elementos Mostrados:</h4>
                    <ul>
                        <li><strong>Mediana:</strong> Línea central</li>
                        <li><strong>IQR:</strong> Caja (Q1 a Q3)</li>
                        <li><strong>Whiskers:</strong> Rango normal</li>
                        <li><strong>Outliers:</strong> Puntos fuera del rango</li>
                    </ul>
                    <h4>Ideal para:</h4>
                    <p>Latencia de handshake TLS y tiempo variable de firmas Dilithium.</p>
                </div>
            `;
            break;
        case 'Gráficos de Barras':
            details = `
                <h3>Gráficos de Barras Comparativos</h3>
                <div class="chart-explanation">
                    <h4>Métricas Discretas:</h4>
                    <ul>
                        <li><strong>Ciclos de CPU:</strong> Por operación criptográfica</li>
                        <li><strong>Uso de memoria:</strong> Peak RSS por algoritmo</li>
                        <li><strong>Tamaños:</strong> Claves públicas/privadas, firmas</li>
                    </ul>
                    <h4>Formato:</h4>
                    <p>Barras agrupadas: Clásico vs PQC lado a lado.</p>
                    <h4>Escala:</h4>
                    <p>Logarítmica para mostrar diferencias de órdenes de magnitud.</p>
                </div>
            `;
            break;
        case 'Gráficos de Líneas':
            details = `
                <h3>Gráficos de Líneas - Interacción Red</h3>
                <div class="chart-explanation">
                    <h4>Ejes:</h4>
                    <ul>
                        <li><strong>X:</strong> Latencia de red inyectada (0-500ms)</li>
                        <li><strong>Y:</strong> Tiempo total de handshake TLS</li>
                    </ul>
                    <h4>Líneas Trazadas:</h4>
                    <p>Configuraciones clásicas vs PQC bajo diferentes condiciones de red.</p>
                    <h4>Objetivo:</h4>
                    <p>Identificar el "precipicio de rendimiento" donde PQC sufre desproporcionalmente.</p>
                </div>
            `;
            break;
    }
    
    const modal = createModal(`Visualización: ${chartTitle}`, details, 'info');
    document.body.appendChild(modal);
}

function showOverheadDetails(exampleCard) {
    const isTransport = exampleCard.classList.contains('tls-example');
    
    let details = '';
    
    if (isTransport) {
        details = `
            <h3>Sobrecarga en TLS Handshake</h3>
            <div class="overhead-analysis">
                <h4>Componentes del Overhead:</h4>
                <ul>
                    <li><strong>Tamaño del KEM:</strong> Kyber768 ciphertext ~1,088 bytes</li>
                    <li><strong>Viajes de ida y vuelta:</strong> Potencial fragmentación</li>
                    <li><strong>Procesamiento:</strong> Operaciones adicionales de encap/decap</li>
                </ul>
                <h4>Medición Típica:</h4>
                <p>Baseline ECDHE: ~15ms | Kyber768: ~18-25ms (+20-67%)</p>
                <h4>Factores de Variación:</h4>
                <ul>
                    <li>Calidad de la conexión de red</li>
                    <li>MTU del enlace</li>
                    <li>Capacidad de procesamiento del cliente/servidor</li>
                </ul>
            </div>
        `;
    } else {
        details = `
            <h3>Sobrecarga en Firmas Digitales</h3>
            <div class="overhead-analysis">
                <h4>Multiplicadores Típicos:</h4>
                <ul>
                    <li><strong>Clave Pública:</strong> ECDSA 64 bytes → Dilithium-3 1,952 bytes (~30x)</li>
                    <li><strong>Clave Privada:</strong> ECDSA 32 bytes → Dilithium-3 4,000 bytes (~125x)</li>
                    <li><strong>Firma:</strong> ECDSA ~70 bytes → Dilithium-3 3,293 bytes (~47x)</li>
                </ul>
                <h4>Impacto en Rendimiento:</h4>
                <p>Verificación: ECDSA ~8,000 ops/s → Dilithium-3 ~4,200 ops/s (~50%)</p>
                <h4>Consideraciones:</h4>
                <ul>
                    <li>Mayor uso de ancho de banda</li>
                    <li>Incremento en almacenamiento</li>
                    <li>Impacto en cache de certificados</li>
                </ul>
            </div>
        `;
    }
    
    const modal = createModal('Análisis de Sobrecarga PQC', details, 'warning');
    document.body.appendChild(modal);
}

function showToolDetails(toolCard) {
    const details = `
        <h3>Stack de Análisis Estadístico</h3>
        <div class="tool-analysis">
            <h4>Python + pandas:</h4>
            <ul>
                <li><strong>Agregación:</strong> GroupBy, pivot tables</li>
                <li><strong>Limpieza:</strong> Manejo de outliers, normalización</li>
                <li><strong>Estadísticas:</strong> describe(), quantile(), std()</li>
            </ul>
            <h4>matplotlib + seaborn:</h4>
            <ul>
                <li><strong>Box plots:</strong> sns.boxplot() para distribuciones</li>
                <li><strong>Bar charts:</strong> plt.bar() para comparaciones</li>
                <li><strong>Line plots:</strong> plt.plot() para tendencias</li>
            </ul>
            <h4>Flujo de Trabajo:</h4>
            <p>CSV → pandas DataFrame → Statistical Analysis → Visualization → Interpretation</p>
        </div>
    `;
    
    const modal = createModal('Herramientas de Análisis', details, 'info');
    document.body.appendChild(modal);
}

// Navegación
function goBack() {
    window.location.href = 'index.html';
}

function nextPhase() {
    // Ir a Fase 6: Conclusiones y Trabajo Futuro
    window.location.href = 'fase6.html';
}

function prevPhase() {
    window.location.href = 'fase4.html';
}

// Función para copiar datos de ejemplo
function copyExampleData(button) {
    const exampleData = `
# Ejemplo de análisis estadístico
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Cargar datos del benchmarking
df = pd.read_csv('pqc_benchmark_results.csv')

# Estadísticas descriptivas
stats = df.groupby('algorithm').describe()

# Box plot de latencias
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, x='algorithm', y='handshake_latency_ms')
plt.title('Distribución de Latencia por Algoritmo')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
    `;
    
    copyToClipboard(exampleData);
    showTooltip(button, 'Código copiado');
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Código copiado: ', text.substring(0, 50) + '...');
        }).catch(err => {
            console.error('Error copiando código: ', err);
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

// Función para crear modales
function createModal(title, content, type = 'info') {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const iconClass = type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
    
    modal.innerHTML = `
        <div class="modal-container ${type}">
            <div class="modal-header">
                <h3><i class="fas ${iconClass}"></i> ${title}</h3>
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
                max-width: 700px;
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
            
            .modal-container.warning .modal-header {
                background: linear-gradient(135deg, var(--warning-yellow), #f59e0b);
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
                font-size: 1.2rem;
            }
            
            .modal-body h4 {
                color: var(--secondary-blue);
                margin: 15px 0 10px 0;
                font-size: 1rem;
            }
            
            .modal-body ul {
                padding-left: 20px;
                margin-bottom: 15px;
            }
            
            .modal-body li {
                margin-bottom: 8px;
            }
            
            .modal-body p {
                margin-bottom: 12px;
                color: var(--text-dark);
            }
            
            .modal-body strong {
                color: var(--primary-blue);
            }
            
            .detailed-analysis,
            .chart-explanation,
            .overhead-analysis,
            .tool-analysis {
                background: var(--light-gray);
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid var(--secondary-blue);
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
            
            .copy-tooltip {
                position: absolute;
                top: -30px;
                right: 0;
                background: var(--text-dark);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.7rem;
                opacity: 0;
                transform: translateY(5px);
                transition: all 0.3s ease;
                z-index: 1000;
            }
        `;
        document.head.appendChild(modalStyles);
    }
    
    return modal;
}

// Inicializar estilos CSS adicionales para interactividad
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .matrix-row.selected {
        background: var(--light-blue) !important;
        border-left-width: 6px !important;
        transform: translateX(5px);
    }
    
    .chart-type.active {
        background: var(--light-blue) !important;
        border-left-width: 5px !important;
        transform: translateY(-2px);
    }
    
    .tool-card:hover {
        background: var(--light-blue) !important;
    }
    
    .example-card:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
    }
    
    .metric-item:hover {
        background: var(--light-blue) !important;
        transform: scale(1.02) !important;
    }
`;
document.head.appendChild(additionalStyles);
