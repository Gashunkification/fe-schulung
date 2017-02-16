import Autocomplete from 'teleport-autocomplete';
import CityWeather from './lib/CityWeather';
import WeatherDisplay from './lib/WeatherDisplay';
/* Import von Netzwerk und Anzeige Klassen (prebuild) */

const API_KEY = '12455de28945a9185b28127600e08bc8';

/* Eventlistener bauen, cityID bekommen, wetter laden und anzeigen */
const autoCompleteCallback = (query) => {
    const cityId = query.geonameId;
    const cityWeather = new CityWeather(API_KEY);
    
    cityWeather.get(cityId, (weatherData) => {
        const weatherDisplay = new WeatherDisplay(weatherData);
        weatherDisplay.display('weather');
    });
}

document.addEventListener("DOMContentLoaded", (event) => { 
    const autoComplete = new Autocomplete({ el: '#location-input', maxItems: 5 });
    autoComplete.on('change', autoCompleteCallback);
});
