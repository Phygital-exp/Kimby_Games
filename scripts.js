// Al cargar la página, eliminar cualquier dato previamente guardado en el localStorage
window.onload = function() {
    // Limpia el localStorage para asegurar que siempre se muestre el formulario de acceso
    localStorage.removeItem('kimbyName');
    localStorage.removeItem('kimbyAge');
    localStorage.removeItem('kimbyPhone');

    // Mostrar el formulario de acceso
    document.getElementById('form-section').style.display = 'block';
    document.getElementById('landing-page').style.display = 'none';
};

// Manejar el envío del formulario de acceso
document.getElementById('access-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const consent = document.getElementById('consent').checked;
    const errorMessage = document.getElementById('error-message');

    // Validación de campos
    if (name && age && phone && consent) {
        errorMessage.style.display = 'none'; // Oculta el mensaje de error

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
        errorMessage.style.display = 'block';
    }
});
