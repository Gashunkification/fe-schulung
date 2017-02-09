import Autocomplete from 'teleport-autocomplete';

const API_KEY = '12455de28945a9185b28127600e08bc8';


const getWeatherForCityId = (query) => {
    if (!query) { return; }
    const cityId = query.geonameId;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&APPID=' + API_KEY);
    xhr.addEventListener('load', (event) => {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText);
        } else {
            console.error(xhr.statusText, xhr.responseText);
        }
    });
    xhr.send();
};

document.addEventListener("DOMContentLoaded", (event) => { 
    const autoComplete = new Autocomplete({ el: '#location-input', maxItems: 5 });
    autoComplete.on('change', getWeatherForCityId);
});
