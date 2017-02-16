export default class WeatherDisplay {
    constructor(jsonData) {
        this.jsonData = JSON.parse(jsonData);
    }

    __getDegreesCelcius(tempInKelvin) {
        return (tempInKelvin - 273.15).toFixed(1);
    }

    __getWeather() {
        return this.jsonData.weather[0];
    }

    __getIcon() {
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('icon');
        
        const img = document.createElement('img');
        img.setAttribute('src', 'http://openweathermap.org/img/w/' + this.__getWeather().icon + '.png');
        iconContainer.appendChild(img);
        return iconContainer;
    }

    __getWeatherName() {
        return this.__getWeather().description;
    }

    __getCurrentTemp() {
        return this.__getDegreesCelcius(this.jsonData.main.temp) + ' °C';
    }

    __getWind() {
        return 'Wind: ' + this.jsonData.wind.deg + '°, ' + (this.jsonData.wind.speed / 1.60934).toFixed(2) + 'km/h'; 
    }

    __getHumidity() {
        return 'Humidity: ' + this.jsonData.main.humidity + '%';
    }

    __getTempMin() {
        return this.__getDegreesCelcius(this.jsonData.main.temp_min) + ' °C';
    }
    __getTempMax() {
        return this.__getDegreesCelcius(this.jsonData.main.temp_max) + ' °C';
    }

    __getDataContainer() {
        const dataContainer = document.createElement('div');
        const windContainer = document.createElement('div');
        const humidityContainer = document.createElement('div');
        const tempMinMaxContainer = document.createElement('div');

        windContainer.innerText = this.__getWind();
        humidityContainer.innerText = this.__getHumidity();
        tempMinMaxContainer.innerText = this.__getTempMin() + ' / ' + this.__getTempMax();
        
        dataContainer.classList.add('data');
        dataContainer.appendChild(windContainer);
        dataContainer.appendChild(humidityContainer);
        dataContainer.appendChild(tempMinMaxContainer);

        return dataContainer;
    }

    __clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return node;
    }

    __displayIcon(rootElement) {
        const icon = this.__getIcon();
        rootElement = this.__clearNode(rootElement);
        rootElement.appendChild(icon);
        return rootElement;
    }

    __displayContent(rootElement) {
        const contentContainer = document.createElement('div');
        const weatherName = document.createElement('h3');
        const degrees = document.createElement('div');
    

        weatherName.innerText = this.__getWeatherName();

        degrees.classList.add('degrees');
        degrees.innerText = this.__getCurrentTemp();

        contentContainer.classList.add('content');
        contentContainer.appendChild(weatherName);
        contentContainer.appendChild(degrees);
        contentContainer.appendChild(this.__getDataContainer());

        rootElement.appendChild(contentContainer);

        return rootElement;
    }

    display(rootElementId) {
        let rootElement = document.getElementById(rootElementId);
        try {
            if (!rootElement) {
                throw Error('Element with ID: ' + rootElementId + ' was not found!');
            }
        } catch (error) {
            console.error(error);
        }

        rootElement = this.__displayIcon(rootElement);
        rootElement = this.__displayContent(rootElement);

    }
}