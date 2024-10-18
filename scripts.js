// Al cargar la página, asegurarse de que siempre se muestre el formulario
window.onload = function() {
    // Limpiar el localStorage para que siempre se muestre el formulario al recargar
    localStorage.clear();

    // Mostrar el formulario de acceso
    document.getElementById('form-section').style.display = 'block';
    document.getElementById('landing-page').style.display = 'none';
};

// Manejar el envío del formulario de acceso
document.getElementById('access-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const consent = document.getElementById('consent').checked;
    const errorMessage = document.getElementById('error-message');

    // Validación de campos: asegurarse de que no estén vacíos y que el checkbox esté marcado
    if (name && age && phone && consent) {
        errorMessage.style.display = 'none'; // Ocultar el mensaje de error

        // Guardar los datos en el localStorage
        localStorage.setItem('kimbyName', name);
        localStorage.setItem('kimbyAge', age);
        localStorage.setItem('kimbyPhone', phone);

        // Datos a enviar a la API
        const formData = {
            name: name,
            age: age,
            phone: phone
        };

        // Envío de datos a la API
        fetch('https://botai.smartdataautomation.com/api_backend_ai/dinamic-db/report/119/Kimby_Gamification', {
            method: 'POST',
            headers: {
                'Authorization': 'Token 4e15396f99ae10dd5c195d81fb6a3722c0a44a10',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                // Mostrar la landing page si la solicitud es exitosa
                document.getElementById('form-section').style.display = 'none';
                document.getElementById('landing-page').style.display = 'block';
            } else {
                errorMessage.textContent = 'Hubo un error al enviar los datos. Inténtalo de nuevo.';
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            errorMessage.textContent = 'Hubo un error al conectar con el servidor. Inténtalo de nuevo.';
            errorMessage.style.display = 'block';
        });
    } else {
        // Mostrar mensaje de error si los campos no están completos
        errorMessage.textContent = 'Por favor complete todos los campos y acepte la política de privacidad.';
        errorMessage.style.display = 'block';
    }
});
