// ==========================================================================
// SCRIPT DEFINITIVO INTERACTIVO - REFACTORIZADO POR BOTÓN (SILENCIO MANUAL)
// ==========================================================================

const audioEspera = document.getElementById('audio-wait');
const audioTransicion = document.getElementById('audio-transition');

// Inicialización global al cargar cualquier página
window.addEventListener('DOMContentLoaded', () => {
    if (audioEspera) {
        audioEspera.play().catch(() => console.log("Música de espera aguardando interacción."));
    }
    
    if (document.body.classList.contains('teatro-body')) {
        iniciarContadorAbstraccion();
        
        if (typeof inyectarBurbujaCaine === 'function') inyectarBurbujaCaine();
        if (typeof configurarGlitchPrecios === 'function') configurarGlitchPrecios();
        
        // Vincular botón de mutación manual
        const botonAbstraer = document.getElementById('btn-abstraer-manual');
        if (botonAbstraer) {
            botonAbstraer.addEventListener('click', ejecutarMutacionElenco);
        }
    }
});

// ==========================================================================
// 1. MOCIÓN DE LA BOCA Y TRANSICIÓN DE DIAPOSITIVAS (index.html)
// ==========================================================================
function iniciarEspectaculo() {
    const jawTop = document.querySelector('.jaw-top');
    const jawBottom = document.querySelector('.jaw-bottom');
    const logo = document.querySelector('.logo-intro');
    const textClick = document.querySelector('.click-text');

    if (audioEspera) audioEspera.pause();
    if (audioTransicion) audioTransicion.play().catch(e => console.log(e));

    if(jawTop) jawTop.style.transform = "translateY(-100%)";
    if(jawBottom) jawBottom.style.transform = "translateY(100%)";
    if(logo) logo.style.transform = "scale(0) rotate(720deg)";
    if(textClick) textClick.style.display = "none";

    setTimeout(() => {
        const intro = document.getElementById('intro-screen');
        const transitionScreen = document.getElementById('slide-transition');
        if(intro) intro.style.display = 'none';
        if(transitionScreen) transitionScreen.style.display = 'flex';
        mostrarDiapositivas();
    }, 1200);
}

function mostrarDiapositivas() {
    const slides = [
        document.getElementById('slide1'),
        document.getElementById('slide2'),
        document.getElementById('slide3'),
        document.getElementById('slide4')
    ];
    let currentSlide = 0;

    function procesarSiguiente() {
        if (currentSlide > 0) {
            slides[currentSlide - 1].style.display = 'none';
        }
        if (currentSlide < slides.length) {
            slides[currentSlide].style.display = 'block';
            currentSlide++;
            setTimeout(procesarSiguiente, 3200);
        } else {
            window.location.href = "home.html";
        }
    }
    procesarSiguiente();
}

// ==========================================================================
// 2. TEMPORIZADOR DE ABSTRACCIÓN GENERAL (2 MINUTOS DE INACTIVIDAD)
// ==========================================================================
let tiempoInactividad;
function iniciarContadorAbstraccion() {
    resetearTemporizador();
    const eventos = ['mousemove', 'keydown', 'click', 'scroll'];
    eventos.forEach(evt => window.addEventListener(evt, resetearTemporizador));
}

function resetearTemporizador() {
    clearTimeout(tiempoInactividad);
    tiempoInactividad = setTimeout(irAlVacioHTML, 120000); // 2 minutos estrictos
}

// ==========================================================================
// 3. BURBUJA INTERACTIVA FLOTANTE DE CAINE (DICE FRASES ALEATORIAS)
// ==========================================================================
const frasesCaine = [
    "¡Recuerda limpiar tus molares antes de que la realidad colapse!",
    "¿Sabías que un render en 3D de tus dientes es matemáticamente perfecto?",
    "¡El doctor Angulo está preparing el instrumental clínico virtual!",
    "No te quedes quieto mucho tiempo... ¡El vacío digital tiene hambre!",
    "¡Pomni está intentando escapar de la carpa usando brackets estructurales!",
    "¡Los domingos cerramos para evitar distorsiones matriciales en Parcona!"
];

function inyectarBurbujaCaine() {
    const burbuja = document.createElement('div');
    burbuja.id = "burbuja-caine-chat";
    burbuja.innerHTML = `
        <img src="imagen/bubble-cerrado.png" alt="Caine Bubble" id="burbuja-avatar-img">
        <div id="burbuja-texto-caja">¡Hola! Soy Bubble. Hazme click para un sabio consejo dental.</div>
    `;
    
    // Estilos inline rápidos para posicionarlo abajo a la derecha de la pantalla
    Object.assign(burbuja.style, {
        position: 'fixed', bottom: '20px', right: '20px',
        display: 'flex', alignItems: 'center', background: 'rgba(10,10,10,0.95)',
        border: '3px solid #ffeb3b', padding: '12px', borderRadius: '50px',
        zIndex: '10000', maxWidth: '340px', color: 'white', fontFamily: "'Roboto', sans-serif",
        fontSize: '0.85rem', boxShadow: '0 0 15px rgba(255,235,59,0.4)', cursor: 'pointer',
        transition: '0.3s'
    });
    
    document.body.appendChild(burbuja);
    
    const imgAvatar = document.getElementById('burbuja-avatar-img');
    imgAvatar.style.width = "40px";
    imgAvatar.style.marginRight = "10px";

    const textoCaja = document.getElementById('burbuja-texto-caja');

    burbuja.addEventListener('click', () => {
        // CAMBIO: Ruta de imagen interactiva corregida sin assets/
        imgAvatar.src = "imagen/bubble-abierto.png";
        const fraseAleatoria = frasesCaine[Math.floor(Math.random() * frasesCaine.length)];
        textoCaja.innerText = fraseAleatoria;
        textoCaja.style.color = "#ffeb3b";
        textoCaja.style.fontWeight = "bold";
        
        setTimeout(() => {
            // CAMBIO: Regresa al estado cerrado con la ruta directa corregida
            imgAvatar.src = "imagen/bubble-cerrado.png";
            textoCaja.style.color = "white";
            textoCaja.style.fontWeight = "normal";
        }, 3000);
    });
}

// ==========================================================================
// 4. MÓDULO DE TRATAMIENTOS - GLITCH DE PRECIOS AL PASAR EL MOUSE (galeria.html)
// ==========================================================================
function configurarGlitchPrecios() {
    const cajasPrecio = document.querySelectorAll('.precio-box');
    cajasPrecio.forEach(caja => {
        const precioOriginal = caja.getAttribute('data-precio');
        
        caja.addEventListener('mouseenter', () => {
            caja.innerText = "S/. " + precioOriginal;
            caja.style.color = "#2196f3";
            caja.style.textShadow = "0 0 8px #2196f3";
        });
        
        caja.addEventListener('mouseleave', () => {
            caja.innerText = "Pasa el mouse para ver precio";
            caja.style.color = "#ffeb3b";
            caja.style.textShadow = "none";
        });
    });
}

// ==========================================================================
// 5. EFECTO DINÁMICO DE MUTACIÓN / ABSTRACCIÓN EN EL STAFF (elenco.html)
// ==========================================================================
function ejecutarMutacionElenco() {
    const tarjetasStaff = document.querySelectorAll('.staff-member');
    const boton = document.getElementById('btn-abstraer-manual');
    
    if (boton) {
        boton.disabled = true;
        boton.innerText = "🌀 PROCESANDO CORRUPCIÓN...";
        boton.style.background = "#333";
        boton.style.boxShadow = "none";
    }

    tarjetasStaff.forEach((tarjeta, index) => {
        setTimeout(() => {
            tarjeta.style.position = "relative";
            tarjeta.style.overflow = "hidden";
            tarjeta.style.animation = "glitchEfecto 0.2s infinite alternate";
            tarjeta.style.border = "4px solid #ff0055";
            tarjeta.style.boxShadow = "0 0 25px #ff0055";
            
            const img = tarjeta.querySelector('img');
            if (img) {
                // CAMBIO: Imagen de error corrupto directa sin assets/
                img.src = "imagen/modelo-3d-2.png";
                img.style.filter = "hue-rotate(90deg) invert(1)";
            }
            
            const infoNombre = tarjeta.querySelector('h3');
            if(infoNombre) infoNombre.innerText = "ERR_DATA_LOST";
            
            const infoRol = tarjeta.querySelector('.rol');
            if(infoRol) {
                infoRol.innerText = "【 ABSTRAÍDO 】";
                infoRol.style.color = "#ff0055";
            }
        }, index * 400); 
    });

    setTimeout(() => {
        irAlVacioHTML();
    }, tarjetasStaff.length * 400 + 1500);
}

// Configuración de audios interactivos en hover para personajes específicos del staff
if (document.body.classList.contains('teatro-body')) {
    window.addEventListener('DOMContentLoaded', configurarAudiosStaff);
}

function configurarAudiosStaff() {
    const miembrosConAudio = document.querySelectorAll('.staff-member[data-personaje]');
    let audioHoverActual = null;

    miembrosConAudio.forEach(tarjeta => {
        const personaje = tarjeta.getAttribute('data-personaje');
        
        tarjeta.addEventListener('mouseenter', () => {
            if (audioHoverActual) {
                audioHoverActual.pause();
                audioHoverActual.currentTime = 0;
            }
            // CAMBIO: Rutas de audios interactivas corregidas sin assets/
            audioHoverActual = new Audio(`audio/hover_${personaje}.mp3`);
            if (audioHoverActual) {
                audioHoverActual.play().catch(e => console.log("Audio bloqueado: ", e));
            }
        });

        tarjeta.addEventListener('mouseleave', () => {
            if (audioHoverActual) {
                audioHoverActual.pause();
                audioHoverActual.currentTime = 0;
            }
        });
    });
}

function irAlVacioHTML() {
    document.body.innerHTML = `
        <div style="background:black; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center; overflow:hidden; margin:0; position:fixed; top:0; left:0; width:100vw; z-index:999999;">
            <h1 style="color:#ff0055; font-family:'Bungee', sans-serif; text-align:center; font-size:3.2rem; text-shadow: 0 0 20px red; margin-bottom:20px;">
                TE HAS ABSTRAÍDO...
            </h1>
            <p style="color:white; font-family:'Roboto', sans-serif; font-size:1.4rem; text-align:center; max-width:600px; opacity:0.8; line-height:1.5; padding:0 20px;">
                Pasaste más de 2 minutos sin registrar actividad. Tu mente se ha corrompido y ahora formas parte del Vacío del Circo Digital junto con el elenco.
            </p>
            <button onclick="window.location.reload()" style="margin-top:30px; background:transparent; color:white; border:2px solid white; padding:12px 25px; font-family:'Bungee', sans-serif; font-size:1rem; border-radius:5px; cursor:pointer; transition:0.3s;" onmouseover="this.style.background='white'; this.style.color='black';" onmouseout="this.style.background='transparent'; this.style.color='white';">
                🔄 CONTEMPLAR REINICIO MATRICIAL
            </button>
        </div>
    `;
}
