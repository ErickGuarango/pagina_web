/* ============================================
   SCRIPT PRINCIPAL - InarexSoft
   Archivo: script.js
   ============================================ */

// ============================================
// SLIDER AUTOMÁTICO
// ============================================

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[n].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Cambiar slide cada 2 segundos
setInterval(nextSlide, 2000);

// ============================================
// VALIDACIÓN DE FORMULARIO BÁSICA
// ============================================

const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', function(e) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#ddd';
            }

            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                }
            }
        });

        if (!isValid) {
            e.preventDefault();
            alert('Por favor completa todos los campos requeridos correctamente');
        }
    });

    form.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', function() {
            this.style.borderColor = '#ddd';
        });
    });
}

// ============================================
// SCROLL SUAVE
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// INTEGRACIÓN CON SUPABASE Y EMAILJS (OPCIONAL)
// ============================================

// Solo si tienes los archivos de configuración
try {
    import('./supabaseConfig.js').then(module => {
        console.log('✅ Supabase Config cargado');
    }).catch(err => {
        console.warn('⚠️ Supabase Config no encontrado - usando FormSubmit');
    });

    import('./emailConfig.js').then(module => {
        console.log('✅ Email Config cargado');
    }).catch(err => {
        console.warn('⚠️ Email Config no encontrado');
    });

    import('./formularioService.js').then(module => {
        console.log('✅ Formulario Service cargado');
    }).catch(err => {
        console.warn('⚠️ Formulario Service no encontrado');
    });
} catch (error) {
    console.warn('Módulos opcionales no disponibles');
}

console.log('%c🚀 InarexSoft iniciado correctamente', 'color: #1e3c72; font-size: 14px; font-weight: bold;');