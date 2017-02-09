export default class NetworkManager {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
    }

    getWeatherForCity(cityId, callback) {
        const urlParams = '?id=' + cityId + '&APPID=' + this.apiKey;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.apiUrl + urlParams);
        xhr.addEventListener('load', callback);
        xhr.send();
    }
}