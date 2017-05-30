import Autocomplete from 'teleport-autocomplete';
import CityWeather from './lib/CityWeather';
import LocationList from './lib/MyLocations';
import WeatherDisplay from './lib/WeatherDisplay';

// Openweather API Key - needs to be generated and is unique for every attendee
const API_KEY = '12455de28945a9185b28127600e08bc8';

const getWeatherForCityId = (query) => {
    if (!query) { return; }

    const cityId = query.geonameId;
    const cityWeather = new CityWeather(API_KEY);

    cityWeather.get(cityId, (response) => {
        // Response ist die Antwort der openWeather API
       const wd = new WeatherDisplay(response);
       wd.display('weather')
    });
};

const bindLocationClickHandlers = (buttons = [], action = () => {}) => {
    for (let i = 0; i < buttons.lenght; i++) {
        buttons[i].on('click', action);
    }
}

document.addEventListener("DOMContentLoaded", () => { 
    const autoComplete = new Autocomplete({ el: '#location-input', maxItems: 5 });
    autoComplete.on('change', getWeatherForCityId);

    const myLocationList = new LocationList();

    const addWeatherButtons = document.getElementsByClassName('js-add-location');
    bindLocationClickHandlers(addWeatherButtons, myLocationList.addLocationToList)
});
