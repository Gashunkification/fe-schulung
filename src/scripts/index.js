import Autocomplete from 'teleport-autocomplete';
/* Import von Netzwerk und Anzeige Klassen (prebuild) */

/* API Key generieren und hier eintragen */
const API_KEY = '';

/* Eventlistener bauen, cityID bekommen, wetter laden und anzeigen */

document.addEventListener("DOMContentLoaded", (event) => { 
    const autoComplete = new Autocomplete({ el: '#location-input', maxItems: 5 });
    autoComplete.on('querychange', (query) => {
        console.log(query);
    });
});
