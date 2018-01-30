import Autocomplete from 'teleport-autocomplete';
import CityDataLoader from './lib/CityDataLoader';
import WeatherDisplay from './lib/WeatherDisplay';
import CityImageDisplay from './lib/CityImageDisplay';
import CityListDisplay from './lib/CityListDisplay';

// Openweather API Key - needs to be generated and is unique for every attendee
const API_KEY = 'c546d0b8f808baf7806efd29aa714684';
const cityWeather = new CityDataLoader(API_KEY);

const ARITHNEA_CITY_IDS = [2825297, 2938913, 2935517, 2925533, 2911298, 2895044, 2886242, 2866174, 2825297];

let cityId = '';

const autocompleteChangeHandler = query => {
    if (!query) {
        return;
    }
    cityId = query.geonameId;
    const weatherContentTarget = document.querySelector('#weathercontainer');
    const imageContentTarget = document.querySelector('#results');
    const locationListTarget = document.querySelector('#locationlist');

    cityWeather.getLocationImageForCity(query.uaSlug, (response) => {
        renderCityImage(response, imageContentTarget)
    });

    cityWeather.getWeatherForCity(cityId, (response) => {
        renderWeather(response, weatherContentTarget);
    });

    ARITHNEA_CITY_IDS.forEach((id) => {
        
        const listData = [];
        cityWeather.getWeatherForCity(id, (response) => {
            listData.push(response);
        })
        renderLocationList(listData);
    });
};

const renderWeather = (responseData = {}, targetElement) => {
    const weatherDisplayer = new WeatherDisplay(responseData);
    weatherDisplayer.display(targetElement);
}

const renderCityImage = (responseData = {}, targetElement) => {
    const cityImageDisplayer = new CityImageDisplay(responseData);
    cityImageDisplayer.display(targetElement)
}

const renderLocationList = (listData = {}) => {
    const locationListDisplayer = new CityListDisplay();
    // listData.forEach((data) => {
    //     locationListDisplayer.displayLocationList();
    // });

    // TODO: 
    /* Change displayLocationlist so, dass sie nur einmal mit dem Array aufgerufen wird und dann intern iteriert. 
        Dann kannst du das Löschen selbst bestimmen!
     */
}

document.addEventListener("DOMContentLoaded", () => {
    const autocomplete = new Autocomplete({
        el: '#location-input',
        maxItems: 5
    });
    autocomplete.on('change', autocompleteChangeHandler);
});