import Autocomplete from 'teleport-autocomplete';
import CityWeather from './lib/CityWeather';
import LocationList from './lib/MyLocationList';
import WeatherDisplay from './lib/WeatherDisplay';

// Openweather API Key - needs to be generated and is unique for every attendee
const API_KEY = '12455de28945a9185b28127600e08bc8';
let cityId = '';

const myLocationList = new LocationList();

const autocompleteChangeHandler = query => {
    if (!query) { return; }

    cityId = query.geonameId;
    const targetElement = document.querySelector('#weather');

    processWeatherForId(cityId, targetElement);
};

const addLocationButtonClickHandler = event => {
    event.preventDefault();

    /*
        TODO:
        
        *   Füge ID in aktuelle Standortliste hinzu
        *   Rendere Standortliste anhand von IDs
        *   ANMERKUNG: Das wird nur im Speicher die Werte ändern
        *   Diese geänderten HTML-Bäume dann in das Collapsible einfügen!

     */

    myLocationList.addLocationToList(cityId);
    debugger;
    myLocationList.renderList(API_KEY);
}

const processWeatherForId = (cityId, targetElement) => {
    const cityWeather = new CityWeather(API_KEY);
    
    cityWeather.get(cityId, (response) => {
       renderWeather(response, targetElement);
    });
}

const renderWeather = (JSONData = {}, targetElement) => {
    // Response ist die Antwort der openWeather API
    const wd = new WeatherDisplay(JSONData);
    wd.display(targetElement);
}

const bindLocationClickHandlers = (buttons = [], action = () => {console.log('hier ist etwas passiert :)');}) => {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', action)
    }
}

document.addEventListener("DOMContentLoaded", () => { 
    const autocomplete = new Autocomplete({ el: '#location-input', maxItems: 5 });
    autocomplete.on('change', autocompleteChangeHandler);

    const addLocationButton = document.getElementById('button-add-location');
    addLocationButton.addEventListener('click', addLocationButtonClickHandler);
});
