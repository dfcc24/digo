// script.js

// Espera que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", async () => {
    const downloadButton = document.getElementById("capture");

    // Función para cargar imágenes de forma asincrónica
    function loadImages(imageUrls) {
        const promises = imageUrls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = () => reject(new Error(`Error loading image: ${url}`));
            });
        });
        return Promise.all(promises);
    }

    // Array de URLs de las imágenes que necesitas cargar
    const imageUrls = [
        'img/electrogenos1.jpg',
        'img/electrogenos2.jpg',
        'img/electrogenos3.jpg',
        'img/climatizacion1.jpg',
        'img/climatizacion2.jpg',
        'img/climatizacion3.jpg',
        'img/electricidad1.jpg',
        'img/electricidad2.jpg',
        'img/electricidad3.jpg',
        'img/energia-renovable1.jpg',
        'img/energia-renovable2.jpg',
        'img/energia-renovable3.jpg',
        '../img/hero-background.jpg'
    ];

    // Listener del botón de descarga
    downloadButton.addEventListener("click", async () => {
        try {
            // Cargar todas las imágenes antes de generar el PDF
            await loadImages(imageUrls);
            console.log("Todas las imágenes han sido cargadas correctamente.");

            // Elemento que quieres convertir en PDF
            const element = document.getElementById("capture");

            // Configuración de html2pdf
            const options = {
                margin: 1,
                filename: 'mi-portafolio.pdf',
                image: { type: 'jpeg', quality: 0.9 }, // Ajustar calidad aquí
                html2canvas: {
                    scale: 1,
                    logging: true,
                    useCORS: true
                },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Genera y descarga el PDF
            html2pdf().from(element).set(options).save();
        } catch (error) {
            console.error("Error al cargar imágenes o generar PDF:", error);
        }
    });
});
