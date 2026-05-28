document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const successMessage = document.getElementById('success-message');

    // Frases divertidas que cambiarán cuando intente dar clic en "No"
    const frasesDivertidas = [
        "¿Estás segura?",
        "¡Piénsalo bien!",
        "Esa no es una opción...",
        "¡Me romperás el corazón!",
        "¡Intenta de nuevo!",
        "¡Te necesito!",
        "¡No puedes escapar!",
        "Dedo resbaladizo, ¿eh?",
        "¡Dale al botón rosa mejor!",
        "¡Ups, fallaste!",
        "¡No te librarás tan fácil!",
        "¿De verdad vas a decir que no?",
        "¡Mi boda te necesita!",
        "¡Sé que en el fondo quieres!",
        "¡Vamos, di que sí!",
        "Botón equivocado...",
        "¡Casi le das!",
        "No acepto un no por respuesta",
        "¿Segura, segura?",
        "¡Mira qué bonito es el otro botón!",
        "¡Te estoy vigilando! 👀",
        "¡Será la mejor fiesta!",
        "¡Imposible hacer clic aquí!",
        "¡Hazme feliz y di que sí!"
    ];

    // Función para mover el botón de forma aleatoria
    function moverBoton() {

        btnNo.style.position = 'fixed';

        // Mover el botón al body para evitar que el 'backdrop-filter' del contenedor padre
        // atrape el contexto de posición fija y provoque que se salga de la pantalla.
        if (btnNo.parentNode !== document.body) {
            document.body.appendChild(btnNo);
        }

        // Frase aleatoria
        const fraseAleatoria = frasesDivertidas[
            Math.floor(Math.random() * frasesDivertidas.length)
        ];

        btnNo.innerText = fraseAleatoria;

        requestAnimationFrame(() => {

            // Obtener tamaño REAL del botón
            const rect = btnNo.getBoundingClientRect();

            const botonWidth = rect.width;
            const botonHeight = rect.height;

            const margen = 10;

            // Área segura disponible
            let maxX = window.innerWidth - botonWidth - margen;
            let maxY = window.innerHeight - botonHeight - margen;

            // Evitar negativos
            maxX = Math.max(margen, maxX);
            maxY = Math.max(margen, maxY);

            // Generar posiciones válidas
            const randomX = Math.floor(
                Math.random() * (maxX - margen)
            ) + margen;

            const randomY = Math.floor(
                Math.random() * (maxY - margen)
            ) + margen;

            // Aplicar límites finales por seguridad
            const finalX = Math.min(randomX, maxX);
            const finalY = Math.min(randomY, maxY);

            btnNo.style.left = `${finalX}px`;
            btnNo.style.top = `${finalY}px`;
        });
    }

    // EVENTO PARA COMPUTADORAS (Cuando el mouse pasa por encima)
    btnNo.addEventListener('mouseover', (e) => {
        // Comprobamos si el dispositivo usa un cursor preciso (mouse)
        if (window.matchMedia("(pointer: fine)").matches) {
            moverBoton();
        }
    });

    // EVENTO PARA MÓVILES/TABLETS (Cuando intentan tocar el botón)
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        moverBoton();
    });

    // EVENTO BOTÓN "SÍ"
    btnYes.addEventListener('click', () => {
        // Mostramos el mensaje y ocultamos el botón de "No"
        successMessage.classList.remove('hidden');
        btnNo.style.display = 'none';

        // Agregamos un retraso de 2.5 segundos para que la usuaria pueda leer el mensaje de emoción
        setTimeout(() => {
            // Lógica para descargar o abrir el PDF
            const linkDescarga = document.createElement('a');

            // AQUÍ DEBES PONER EL NOMBRE DE TU ARCHIVO PDF
            linkDescarga.href = 'instrucciones_dama_de_honor.pdf';
            linkDescarga.download = 'instrucciones_dama_de_honor.pdf';

            // Le decimos al navegador que si va a abrir el PDF en vez de descargarlo directo, use una nueva pestaña
            linkDescarga.target = '_blank';

            // Simulamos el clic para iniciar la descarga
            document.body.appendChild(linkDescarga);
            linkDescarga.click();
            document.body.removeChild(linkDescarga);
        }, 2500); // 2500 milisegundos = 2.5 segundos
    });
});