import Autocomplete from 'teleport-autocomplete';
import CityWeather from './lib/CityWeather';
import WeatherDisplay from './lib/WeatherDisplay';

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

document.addEventListener("DOMContentLoaded", (event) => { 
    const autoComplete = new Autocomplete({ el: '#location-input', maxItems: 5 });
    autoComplete.on('change', getWeatherForCityId);
});
