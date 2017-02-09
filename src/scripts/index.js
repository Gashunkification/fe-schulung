import Autocomplete from 'teleport-autocomplete';
import NetworkManager from './lib/NetworkManager';

const API_KEY = '12455de28945a9185b28127600e08bc8';

const getWeatherForCityId = (query) => {
    if (!query) { return; }
    const cityId = query.geonameId;
    const networkManager = new NetworkManager(API_KEY);
    networkManager.getWeatherForCity(cityId, (event) => {
        console.log('callback from networkManager', event);
    });
};

document.addEventListener("DOMContentLoaded", (event) => { 
    const autoComplete = new Autocomplete({ el: '#location-input', maxItems: 5 });
    autoComplete.on('change', getWeatherForCityId);
    console.log(autoComplete);
});
