export default class CityDataLoader {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.weatherUrl = 'http://api.openweathermap.org/data/2.5/weather';
        this.imageUrl = 'https://api.teleport.org/api/urban_areas/slug:';
        this.defaultLocationImageResponse = JSON.stringify({
            photos: [{
                image: {
                    web: 'dist/img/slide2.jpg',
                    mobile: 'dist/img/slide2sm.jpg'
                },
                attribution: {
                    source: 'http://www.google.de',
                    photographer: 'Unknown Photographer'
                }
            }]
        });
    }

    __sendRequest(baseUrl, urlParams, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', baseUrl + urlParams, false);
        xhr.addEventListener('load', (event) => {
            try {
                if (xhr.status === 404) {
                    callback(this.defaultLocationImageResponse);
                } else if (xhr.status >= 300) {
                    throw Error('[NETWORKMANAGER]: ' + xhr.statusText + ', ' + xhr.responseText);
                }
            } catch (error) {
                console.error(error);
                return;
            }

            callback(xhr.responseText);
        });
        xhr.send();
    }

    getWeatherForCity(cityId, callback) {
        const urlParams = '?id=' + cityId + '&APPID=' + this.apiKey;
        this.__sendRequest(this.weatherUrl, urlParams, callback);
    }

    getLocationImageForCity(cityName, callback) {
        const urlParams = cityName + '/images';
        this.__sendRequest(this.imageUrl, urlParams, callback);
    }
}