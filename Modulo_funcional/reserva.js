document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera tradicional

    // Obtiene los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const personas = document.getElementById('personas').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const zona = document.getElementById('zona').value;
    const comentarios = document.getElementById('comentarios').value;

    // Crea un objeto con los datos de la reserva
    const reservaData = {
        nombre,
        email,
        telefono,
        personas,
        fecha,
        hora,
        zona,
        comentarios
    };

    // Enviar los datos al servidor
    fetch('http://localhost:3000/reservar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservaData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); // Mensaje de éxito
            document.getElementById('reservationForm').reset(); // Limpiar el formulario
        } else {
            alert(data.error); // Mensaje de error (si ya hay una reserva en la misma hora)
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al realizar la reserva. Intenta de nuevo más tarde.');
    });
});
