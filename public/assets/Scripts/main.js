/* public/assets/Scripts/main.js */

// Función para validar el Login
function validateLogin(event) {
    event.preventDefault(); // Evitar envío automático
    const form = event.target;
    const email = form.querySelector('input[name="email"]');
    const password = form.querySelector('input[name="contraseña"]');
    let isValid = true;

    // Limpiar errores previos
    clearErrors(form);

    // Validar Email
    if (!email.value || !email.value.includes('@')) {
        showError(email, "Por favor, ingresa un correo válido.");
        isValid = false;
    }

    // Validar Contraseña
    if (!password.value) {
        showError(password, "La contraseña es obligatoria.");
        isValid = false;
    }

    if (isValid) {
        // Simular éxito (Problema #1: Visibilidad del estado)
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

// Función para validar el Registro
function validateRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    clearErrors(form);

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, "Este campo es obligatorio.");
            isValid = false;
        }
    });

    if (isValid) {
        alert("Cuenta creada exitosamente. Por favor inicia sesión.");
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

// Función para limpiar filtros (Problema #2: Control del usuario)
function limpiarFiltros() {
    const inputBusqueda = document.querySelector('.busqueda-container input');
    if (inputBusqueda) inputBusqueda.value = '';
    alert("Filtros limpiados.");
}