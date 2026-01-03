// Inicializar iconos
lucide.createIcons();

// --- ESTADO DE IDIOMA ---
// Intentamos leer el idioma guardado, si no existe, usamos 'en'
let currentLang = localStorage.getItem('site-lang') || 'en';

// Ejecutar traducción al cargar la página para mantener el idioma
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
    updateTimeAgo();
});

// --- SISTEMA DE TRADUCCIÓN ---
function toggleLanguage() {
    // Alternar idioma
    currentLang = currentLang === 'en' ? 'es' : 'en';
    
    // Guardar en memoria del navegador para que al cambiar de página se acuerde
    localStorage.setItem('site-lang', currentLang);
    
    applyLanguage(currentLang);
}

function applyLanguage(lang) {
    // 1. Actualizar texto del botón
    const langDisplay = document.getElementById('lang-display');
    if (langDisplay) langDisplay.innerText = lang.toUpperCase();

    // 2. Traducir textos
    const textElements = document.querySelectorAll('[data-lang-key]');
    textElements.forEach(el => {
        const translation = el.getAttribute(`data-${lang}`);
        if (translation) {
            if (translation.includes('<')) {
                el.innerHTML = translation;
            } else {
                el.innerText = translation;
            }
        }
    });

    // 3. Cambiar fondos
    const bgImages = document.querySelectorAll('.lang-img');
    bgImages.forEach(el => {
        const imgPath = el.getAttribute(`data-img-${lang}`);
        if (imgPath) {
            el.style.backgroundImage = `url('${imgPath}')`;
        }
    });

    // 4. Cambiar imágenes <img>
    const imgTags = document.querySelectorAll('.lang-img-tag');
    imgTags.forEach(el => {
        const imgPath = el.getAttribute(`data-img-${lang}`);
        if (imgPath) {
            el.src = imgPath;
        }
    });

    // 5. Recalcular fechas/tiempos
    updateTimeAgo();
    
    // 6. Recargar reseñas (si existen en esta página)
    if (typeof renderReviews === 'function') {
        renderReviews();
    }
}

// --- SCROLL SUAVE ---
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- SWITCH VIEW (Solo para Index.html: Home <-> About) ---
// Modificado para que no falle si no existen las vistas
function switchView(viewName) {
    const hubView = document.getElementById('hub-view');
    const aboutView = document.getElementById('about-view');

    // Si estamos en la página de Dunguns, 'hubView' no existe.
    // Redirigimos al index.html
    if (!hubView && viewName === 'hub') {
        window.location.href = 'index.html';
        return;
    }
    
    window.scrollTo(0, 0);

    if (hubView && aboutView) {
        hubView.classList.remove('active');
        aboutView.classList.remove('active');

        if (viewName === 'about') {
            aboutView.classList.add('active');
            aboutView.style.animation = 'none';
            aboutView.offsetHeight; 
            aboutView.style.animation = null; 
        } else {
            hubView.classList.add('active');
            hubView.style.animation = 'none';
            hubView.offsetHeight;
            hubView.style.animation = null;
        }
    }
}

// --- LÓGICA DE TIEMPO (FECHAS) ---
function updateTimeAgo() {
    const element = document.getElementById('dynamic-publish-time');
    if (!element) return; 

    // Aquí puedes volver a poner la lógica de "hace X días" si quieres,
    // o dejarlo vacío si usas la fecha estática.
}