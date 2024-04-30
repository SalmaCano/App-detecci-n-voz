let recognition; // Variable para almacenar el objeto de reconocimiento de voz
let restartInterval; 
const usuarios = [
    { nombre: 'salma', clave: 'vela 131217' },
    { nombre: 'luz', clave: 'vela 1415' },
    { nombre: 'ana', clave: 'vela 1416' },
];

function startRecording() {
    const mensajeInicio = new SpeechSynthesisUtterance("Hola, identifícate con tu clave");
    mensajeInicio.onend = function() {
        // Inicializar el reconocimiento de voz después de que se haya completado la síntesis del habla
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = 'es-ES';
        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            console.log(transcript);
            const usuario = usuarios.find(u => transcript.toLowerCase().endsWith(u.clave));
            if (usuario) {
                usuarioNombre = usuario.nombre;
                const mensajeInicio = new SpeechSynthesisUtterance("Bienvenida " + usuario.nombre);
                console.log("Bienvenida" + usuario.nombre);
                window.speechSynthesis.speak(mensajeInicio);
                stopRecording();
                ejecutarComando(usuario.nombre);
            } else {
                const mensajeInicio = new SpeechSynthesisUtterance("Usuario no reconocido");
                window.speechSynthesis.speak(mensajeInicio);
                stopRecording();
            }
        };

        recognition.onerror = function (event) {
            console.error('Error en el reconocimiento de voz: ', event.error);
        }

        // Iniciar el reconocimiento de voz después de inicializarlo
        restartInterval = setInterval(function () {
            recognition.start();
        }, 2000);
    };
    window.speechSynthesis.speak(mensajeInicio);


function ejecutarComando(usuarioNombre) {
    
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'es-ES';
    const ordenIdentificada = document.getElementById('ordenIdentificada');
    recognition.onresult = function (event) {
        // Trae la información de todo lo que estuve hablando
        const transcript = event.results[0][0].transcript;
        console.log(transcript);
        if (transcript.toLowerCase().includes('vela')) {
            switch (true) {
                case transcript.toLowerCase().includes('enciende la luz de la recámara'):
                    actualizarAPI("focorecamara","1");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende la luz de la recámara', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('apaga la luz de la recámara'):
                    actualizarAPI("focorecamara","0");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga la luz de la recámara', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('enciende la luz de la sala'):
                    actualizarAPI("focosala","1");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende la luz de la sala', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('apaga la luz de la sala'):
                    actualizarAPI("focosala","0");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga la luz de la sala', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('enciende las luces del jardín'):
                    actualizarAPI("focojardin","1");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende las luces del jardín', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('apaga las luces del jardín'):
                    actualizarAPI("focojardin","0");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga las luces del jardín', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('enciende el ventilador'):
                    actualizarAPI("ventilador","1");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende el ventilador', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('apaga el ventilador'):
                    actualizarAPI("ventilador","0");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga el ventilador', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('abre las cortinas'):
                    actualizarAPI("cortinas","1");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('abre las cortinas', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('cierra las cortinas'):
                    actualizarAPI("cortinas","0");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('cierra las cortinas', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('enciende las cámaras de seguridad'):
                    actualizarAPI("camaras","1");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende las cámaras de seguridad', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('apaga las cámaras de seguridad'):
                    actualizarAPI("camaras","0");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga las cámaras de seguridad', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('desactiva la alarma de la casa'):
                    actualizarAPI("alarma","0");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('apaga la alarma', usuarioNombre);
                break;
                case transcript.toLowerCase().includes('activa la alarma de la casa'):
                    actualizarAPI("alarma","1");
                    ordenIdentificada.textContent = "Orden Identificada: " + transcript;
                    enviarDatosAMockAPI('enciende la alarma', usuarioNombre);
                break;    
                default:
                    console.log('Instrucción no reconocida');
            }
        }
    };

    recognition.onerror = function (event) {
        console.error('Error en el reconocimiento de voz: ', event.error);
    }

    recognition.start();

    // Reinicia la grabación
    restartInterval = setInterval(function () {
        recognition.start();
    }, 2000);
}
// Verificar si el reconocimiento de voz está disponible en el navegador
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // Crear una instancia de SpeechRecognition
    const recognition = new window.SpeechRecognition();

    // Iniciar el reconocimiento de voz
    recognition.start();

    // Manejar el evento de resultado (cuando se detecta una transcripción)
    recognition.onresult = (event) => {
        // Procesar los resultados aquí
        console.log(event.results);
    };

    // Manejar otros eventos y lógica aquí...

    // Detener el reconocimiento de voz cuando sea necesario
    // Por ejemplo, cuando el usuario haga clic en un botón "Detener"
    function detenerReconocimiento() {
        recognition.stop();
    }
} else {
    // El reconocimiento de voz no está disponible en este navegador
    console.log('El reconocimiento de voz no está disponible en este navegador.');
}


function stopRecording() {
    if (recognition) {
        
        const ordenIdentificada = document.getElementById('ordenIdentificada');
        ordenIdentificada.textContent="Orden identificada:";
        enviarDatosAMockAPI('Sesión cerrada', usuarioNombre);
        recognition.stop();
        clearInterval(restartInterval); 
    }
}

function obtenerFechaHoraActual() {
    return new Date().toLocaleString();
}

// Función para enviar datos a MockAPI
function enviarDatosAMockAPI(instruccion,nombreUsuario) {
    const fechaHoraActual = obtenerFechaHoraActual();
    const usuario=usuarios.nombre;
    // Datos a enviar en la solicitud POST
    const datos = {
        orden: instruccion,
        usuario: nombreUsuario,
        fechaHora: fechaHoraActual
    };

    // Opciones de la solicitud
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    // URL de MockAPI
    const urlMockAPI = 'https://662f2a4143b6a7dce30e8d09.mockapi.io/ordenes_por_voz_remotas';

    // Enviar la solicitud POST
    return fetch(urlMockAPI, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud POST a MockAPI');
            }
            return response.json();
        })
        .then(data => {
            console.log('Registro exitoso en MockAPI:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function actualizarAPI(instruccion, valor) {
    const datos = {
        [instruccion]: valor
    };

    const opciones = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    };

    const urlMockAPI = 'https://66305f52c92f351c03d9aaa6.mockapi.io/identificacionOrden';

    return fetch(urlMockAPI, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud PUT a MockAPI');
            }
            return response.json();
        })
        .then(data => {
            console.log('Actualización exitosa en MockAPI:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}



}