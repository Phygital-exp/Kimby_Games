// Al cargar la página, verifica si ya existen datos en el localStorage
window.onload = function() {
    if (localStorage.getItem('kimbyName') && localStorage.getItem('kimbyEmail')) {
        // Si los datos existen, mostrar la landing page directamente
        document.getElementById('form-section').style.display = 'none';
        document.getElementById('landing-page').style.display = 'block';
    }
};

document.getElementById('access-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const age = document.getElementById('age').value.trim();
    const consent = document.getElementById('consent').checked;
    const errorMessage = document.getElementById('error-message');

    // Validación de campos
    if (name && email && phone && age && consent) {
        errorMessage.style.display = 'none'; // Oculta el mensaje de error

        // Guardar los datos en el localStorage
        localStorage.setItem('kimbyName', name);
        localStorage.setItem('kimbyEmail', email);
        localStorage.setItem('kimbyPhone', phone);
        localStorage.setItem('kimbyAge', age);

        // Datos a enviar a la API
        const formData = {
            name: name,
            email: email,
            phone: phone,
            age: age
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
