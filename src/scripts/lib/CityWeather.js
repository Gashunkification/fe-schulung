
export default class CityWeather {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
    }

    get(cityId, callback) {
        const urlParams = '?id=' + cityId + '&APPID=' + this.apiKey;
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.apiUrl + urlParams);
        xhr.addEventListener('load', (event) => {
            try {
                if (xhr.status >= 300) {
                    throw Error('[NETWORKMANAGER]: ' + xhr.statusText + ', ' + xhr.responseText);
                }
            } catch (error) {
                callback(error);
                return;
            }

            callback(xhr.responseText);
        });
        xhr.send();
    }
}