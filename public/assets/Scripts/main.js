/* public/assets/Scripts/main.js */

// Función para validar el Login
function validateLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[name="email"]');
    const password = form.querySelector('input[name="contraseña"]');
    let isValid = true;

    clearErrors(form);

    if (!email.value || !email.value.includes('@')) {
        showError(email, "Por favor, ingresa un correo válido.");
        isValid = false;
    }

    if (!password.value) {
        showError(password, "La contraseña es obligatoria.");
        isValid = false;
    }

    if (isValid) {
        const successMsg = document.getElementById('login-success');
        if(successMsg) {
            successMsg.style.display = 'block';
            successMsg.textContent = "¡Inicio de sesión exitoso! Redirigiendo...";
        }
        setTimeout(() => {
            window.location.href = "LoggedIndex.html";
        }, 1500);
    }
    return false;
}

// Función para validar el Registro (ACTUALIZADA)
function validateRegistration(event) {
    event.preventDefault(); // Evita que se recargue la página
    const form = event.target;
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    clearErrors(form);

    // Validar que no haya campos vacíos
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, "Este campo es obligatorio.");
            isValid = false;
        }
    });

    if (isValid) {
        // Mensaje solicitado por el usuario
        alert("Cuenta creada exitosamente. Redirigiendo a iniciar sesión...");
        window.location.href = "login.html";
    }
    return false;
}

// Helpers de UI
function showError(input, message) {
    input.classList.add('input-error');
    const errorDiv = document.createElement('span');
    errorDiv.className = 'error-text';
    errorDiv.innerText = message;
    input.parentNode.appendChild(errorDiv);
}

function clearErrors(form) {
    const errorTexts = form.querySelectorAll('.error-text');
    errorTexts.forEach(el => el.remove());
    const errorInputs = form.querySelectorAll('.input-error');
    errorInputs.forEach(el => el.classList.remove('input-error'));
}

function limpiarFiltros() {
    const inputBusqueda = document.querySelector('.busqueda-container input');
    if (inputBusqueda) inputBusqueda.value = '';
    alert("Filtros limpiados.");
}
/* public/assets/Scripts/responsive-menu.js */

/* public/assets/Scripts/responsive-menu.js */

document.addEventListener('DOMContentLoaded', () => {
    /* --- 1. Funcionalidad del Botón Hamburguesa --- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.menu-horizontal');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita cierres inesperados
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    /* --- 2. Funcionalidad de Submenús (La solución a tu problema) --- */
    // Seleccionamos todos los items que tienen submenú
    const menuItems = document.querySelectorAll('.menu-horizontal > li');

    menuItems.forEach(item => {
        // Buscamos si tiene un submenú dentro
        const submenu = item.querySelector('.menu-vertical');
        const link = item.querySelector('a');

        if (submenu && link) {
            link.addEventListener('click', (e) => {
                // Verificamos si estamos en versión móvil (768px o menos)
                if (window.innerWidth <= 768) {
                    // Si el ítem NO está activo, prevenimos la navegación y lo abrimos
                    if (!item.classList.contains('active')) {
                        e.preventDefault(); // ¡ESTO ES LO QUE FALTABA!
                        
                        // Opcional: Cerrar otros menús abiertos para que no se amontonen
                        menuItems.forEach(i => {
                            if (i !== item) i.classList.remove('active');
                        });

                        item.classList.add('active'); // Agrega la clase que el CSS usa para mostrar
                    } 
                    // Si YA está activo, el segundo clic dejará que el enlace funcione (navegar)
                }
            });
        }
    });

    /* --- 3. Cerrar menú al tocar fuera --- */
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                // También cerrar submenús
                menuItems.forEach(i => i.classList.remove('active'));
            }
        }
    });
});