/* ==========================================================================
   CONFIGURACIÓN GLOBAL Y ESTADOS
   ========================================================================== */
// Música
const musica = document.getElementById("miMusica");
const disco = document.getElementById("disco");
const iconoPlay = document.getElementById("icono-play");
let estaTocando = false;
let intervaloCorazones;

// Galería y Zoom
const track = document.getElementById("sliderTrack");
const overlay = document.getElementById("overlayGaleria");
const imgZoom = document.getElementById("imgZoom");

// Cierre y Video
const video = document.getElementById("miVideo");
const btnCerrar = document.getElementById("btn-cerrar");
const pantallaNegra = document.getElementById("pantalla-negra");
const modalFinal = document.getElementById("modal-final");

// Máquina de escribir
const tituloTexto = "Amor Mio...Te escribi esto";
const mensajeTexto = `No importa cómo corra el tiempo en el reloj, cada día a tu lado me demuestra que tomar tu mano fue la mejor decisión de mi vida. Eres mi lugar seguro, mi motivación constante y el amor más bonito que tengo.
    Gracias por construir esta historia conmigo, paso a paso y segundo a segundo.❤️`;
let i = 0;
let t = 0;


/* ==========================================================================
   1. ANIMACIONES DE FONDO (CORAZONES FLOTANTES LOBBY)
   ========================================================================== */
const corazones = document.querySelector('.corazones');

for (let i = 0; i < 45; i++) {
    const heart = document.createElement('span');
    heart.innerHTML = '💖';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 25 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    corazones.appendChild(heart);
}


/* ==========================================================================
   2. EFECTO TÍTULO (PARPADEO DE SOMBRA)
   ========================================================================== */
const titulo = document.querySelector('.texto-amor h2');

setInterval(() => {
    titulo.style.textShadow = `
        0 0 20px #fff,
        0 0 40px #ff4d88,
        0 0 80px #ff0055
    `;

    setTimeout(() => {
        titulo.style.textShadow = '0 0 20px rgba(255,255,255,.8)';
    }, 1000);
}, 2000);


/* ==========================================================================
   3. OBSERVER DEL VÍDEO
   ========================================================================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    });
}, { threshold: 0.5 });

observer.observe(video);


/* ==========================================================================
   4. LÓGICA DE CIERRE CON MODAL
   ========================================================================== */
btnCerrar.addEventListener('click', () => {
    // 1. Oscurecer pantalla
    pantallaNegra.classList.add('activo');

    // 2. Mostrar el modal elegante después de que se oscurezca
    setTimeout(() => {
        modalFinal.classList.add('mostrar');

        // Intentar cerrar automáticamente después de mostrar el modal
        setTimeout(() => {
            window.close();
        }, 4000);
    }, 2000);
});


/* ==========================================================================
   5. LÓGICA DE PICA PICA (CONFETTI)
   ========================================================================== */
function celebrar() {
    // Explosión de pica pica masiva
    var count = 200;
    var defaults = {
        origin: { y: 0.7 },
    };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
        });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}


/* ==========================================================================
   6. LÓGICA DE MÚSICA Y ESTRELLAS FLOTANTES
   ========================================================================== */
function toggleMusica() {
    if (estaTocando) {
        musica.pause();
        disco.classList.remove("gridando", "girando"); // Mantiene compatibilidad si usabas otra clase, pero asegura 'girando'
        disco.classList.remove("girando");
        iconoPlay.innerText = "▶";
        clearInterval(intervaloCorazones);
    } else {
        musica.play().catch((e) =>
            console.log("Esperando interacción del usuario para audio")
        );
        disco.classList.add("girando");
        iconoPlay.innerText = "||";
        // Iniciar lluvia de estrellas/corazones en el disco
        intervaloCorazones = setInterval(crearCorazonFlotante, 400);
    }
    estaTocando = !estaTocando;
}

function crearCorazonFlotante() {
    const container = document.querySelector(".disco-wrapper");
    const corazon = document.createElement("div");
    corazon.innerHTML = "🌟";
    corazon.classList.add("corazon-flotante");

    // Posición aleatoria de dispersión
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;

    corazon.style.setProperty("--x", `${x}px`);
    corazon.style.setProperty("--y", `${y}px`);
    corazon.style.left = "45%";
    corazon.style.top = "45%";

    container.appendChild(corazon);

    setTimeout(() => {
        corazon.remove();
    }, 2000);
}


/* ==========================================================================
   7. LÓGICA DE LA GALERÍA (ZOOM Y CARRUSEL)
   ========================================================================== */
document.querySelectorAll(".card-foto img").forEach((imagen) => {
    imagen.addEventListener("click", function (e) {
        e.stopPropagation();
        imgZoom.src = this.src;
        overlay.style.display = "flex";
        track.style.animationPlayState = "paused"; // Detiene el carrusel
    });
});

function cerrarZoom() {
    overlay.style.display = "none";
    track.style.animationPlayState = "running"; // Reinicia el carrusel
}


/* ==========================================================================
   8. LÓGICA SOBRE / MÁQUINA DE ESCRIBIR
   ========================================================================== */
function abrirMensaje() {
    document.getElementById("pantallaMensaje").style.display = "flex";
    escribirTitulo();
}

function escribirTitulo() {
    if (t < tituloTexto.length) {
        document.getElementById("tituloAnimado").innerHTML += tituloTexto.charAt(t);
        t++;
        setTimeout(escribirTitulo, 50);
    } else {
        escribirMensaje();
    }
}

function escribirMensaje() {
    if (i < mensajeTexto.length) {
        document.getElementById("mensajeEscrito").innerHTML += mensajeTexto.charAt(i);
        i++;
        setTimeout(escribirMensaje, 0);
    } else {
        document.getElementById("btnContinuar").style.display = "inline-block";
    }
}

function cerrarMensaje() {
    document.getElementById("pantallaMensaje").style.display = "none";
    // Reiniciamos para la próxima vez
    document.getElementById("tituloAnimado").innerHTML = "";
    document.getElementById("mensajeEscrito").innerHTML = "";
    document.getElementById("btnContinuar").style.display = "none";
    i = 0;
    t = 0;
}

function cerrarSiTocaFuera(event) {
    if (event.target.id === "pantallaMensaje") {
        cerrarMensaje();
    }
}


/* ==========================================================================
   9. INTERACCIÓN DE ESCENARIO / CHISPAS
   ========================================================================== */
function unirFotos() {
    const escenario = document.querySelector(".escenario-fotos");
    const boton = document.getElementById("btn-accion");
    const mensaje = document.getElementById("txt-final");

    boton.classList.add("ocultar");
    escenario.classList.add("unido");

    setTimeout(() => {
        crearChispas(35);
        mensaje.classList.add("mostrar");
    }, 500);
}

function crearChispas(cantidad) {
    const contenedor = document.getElementById("zona-chispas");
    const colores = ["#ffead0", "#ff2a4b", "#ffb3c1", "#ffd700", "#ffffff"];

    for (let i = 0; i < cantidad; i++) {
        const chispa = document.createElement("div");
        chispa.classList.add("chispa");

        const angulo = Math.random() * Math.PI * 2;
        const distancia = 60 + Math.random() * 140;
        const mx = Math.cos(angulo) * distancia + "px";
        const my = Math.sin(angulo) * distancia + "px";

        chispa.style.setProperty("--mx", mx);
        chispa.style.setProperty("--my", my);

        chispa.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        chispa.style.left = "50%";
        chispa.style.top = "50%";

        contenedor.appendChild(chispa);

        setTimeout(() => chispa.remove(), 900);
    }
}


/* ==========================================================================
   10. CONTADOR DE TIEMPO (DOM CONTENT LOADED)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Configuración de la fecha origen (15 de Junio de 2023)
    const targetDate = new Date(2023, 5, 15, 0, 0, 0);

    const dDisplay = document.getElementById("days-count");
    const hDisplay = document.getElementById("hours-count");
    const mDisplay = document.getElementById("mins-count");
    const sDisplay = document.getElementById("secs-count");

    function runCounter() {
        const timeDifference = new Date() - targetDate;

        if (timeDifference < 0) return;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        dDisplay.textContent = String(days).padStart(2, "0");
        hDisplay.textContent = String(hours).padStart(2, "0");
        mDisplay.textContent = String(minutes).padStart(2, "0");
        sDisplay.textContent = String(seconds).padStart(2, "0");
    }

    runCounter();
    setInterval(runCounter, 1000);
});


/* ==========================================================================
   11. LLUVIA CONTINUA DE CORAZONES (SECCIÓN FOTOS_FRASE)
   ========================================================================== */
function createHearts() {
    const section = document.getElementById('fotos_frase');
    const heart = document.createElement('div');

    heart.classList.add('heart');
    heart.innerHTML = '❤️';

    // Posición horizontal aleatoria
    heart.style.left = Math.random() * 100 + 'vw';

    // Tamaño y duración aleatoria
    const size = Math.random() * 15 + 15 + 'px';
    heart.style.fontSize = size;

    const duration = Math.random() * 2 + 3 + 's';
    heart.style.animationDuration = duration;

    section.appendChild(heart);

    // Borrar corazón después de que termine la animación
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Crear un corazón cada 350ms
setInterval(createHearts, 350);