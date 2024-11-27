console.log("Script app.js cargado"); // Verificación de que el archivo se está cargando

const API_URL = 'https://api.gameofthronesquotes.xyz/v1/random';
// Usamos un proxy para evitar problemas de CSP
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

async function fetchQuote() {
    console.log("Intentando obtener una cita..."); // Verificación de que se llama a la función

    try {
        const response = await fetch(PROXY_URL + API_URL);
        console.log("Respuesta recibida:", response); // Mostrar la respuesta en consola

        if (!response.ok) {
            throw new Error(`Error en la respuesta: ${response.status}`);
        }

        const data = await response.json();
        console.log("Datos obtenidos:", data); // Mostrar datos obtenidos en consola

        displayQuote(data);
    } catch (error) {
        console.error("Error al obtener la cita:", error);
    }
}

function displayQuote(quoteData) {
    const container = document.getElementById('quote-container');

    if (!container) {
        console.error("No se encontró el elemento con ID 'quote-container'");
        return;
    }

    container.innerHTML = `
        <p><strong>${quoteData.character?.name || "Personaje desconocido"}:</strong> 
        "${quoteData.sentence || "Cita no disponible"}"</p>
    `;
    console.log("Cita mostrada correctamente");
}

// Llamar a la función al cargar la página
document.addEventListener('DOMContentLoaded', fetchQuote);

