/**
 * properties_panel.js
 * Gestiona la visualización de las propiedades de un elemento en su panel dedicado.
 * AHORA ORQUESTA el AnalysisViewer para mostrar los detalles.
 */
(function() {
    'use strict';
    window.EditorTools = window.EditorTools || {};

    class PropertiesPanelManager {
        constructor(options) {
            this.panelCodigo = options.panelCodigo;
            this.contenidoCodigo = options.contenidoCodigo;
            this.analysisContainer = options.analysisContainer;
            this.codigoHtmlToggle = options.codigoHtmlToggle;
            this.elementAnalysisToggle = options.elementAnalysisToggle;
            this.codigoHtmlPre = document.getElementById('codigo-html-pre');

            // ✅ Instanciar el visor de análisis, pasándole su contenedor.
            this.analysisViewer = new window.EditorTools.AnalysisViewer(this.analysisContainer);
        }

        init() {
            this.codigoHtmlToggle.addEventListener('click', (e) => {
                this.codigoHtmlPre.classList.toggle('hidden');
                e.currentTarget.querySelector('svg').classList.toggle('-rotate-90', this.codigoHtmlPre.classList.contains('hidden'));
            });

            this.elementAnalysisToggle.addEventListener('click', (e) => {
                this.analysisContainer.classList.toggle('hidden');
                e.currentTarget.querySelector('svg').classList.toggle('-rotate-90', this.analysisContainer.classList.contains('hidden'));
            });
        }

        show(element) {
            if (!element) return;
            
            // Lógica para mostrar el código HTML
            const escapedHtml = element.outerHTML.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            this.contenidoCodigo.innerHTML = escapedHtml;
            
            // ✅ Delegar la muestra del análisis al visor.
            this.analysisViewer.show(element);
            
            // Mostrar y expandir todo el panel de propiedades
            this.panelCodigo.classList.remove('hidden', 'panel-compactado');
            this.panelCodigo.querySelector('.panel-toggle-btn').textContent = '-';
            document.getElementById('codigo-html-content').classList.remove('hidden');
            this.codigoHtmlToggle.querySelector('svg').classList.remove('-rotate-90');
            this.analysisContainer.classList.remove('hidden');
            this.elementAnalysisToggle.querySelector('svg').classList.remove('-rotate-90');
        }
    }

    window.EditorTools.PropertiesPanelManager = PropertiesPanelManager;
})();