export default class WeatherDisplay {
    constructor(jsonData) {
        this.jsonData = JSON.parse(jsonData);
    }

    __getDegreesCelcius(tempInKelvin) {
        return (tempInKelvin - 273.15).toFixed(1) + '°C';
    }

    __clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
        return node;
    }

    __getCityHeadline() {
        const headline = document.createElement('h3');
        headline.classList.add('results-headline');
        headline.innerHTML = this.jsonData.name;
        return headline;
    }

    __getResultButtonContainer() {
        const outerContainer = document.createElement('div');
        const innerContainer = document.createElement('div');
        const locationHeadline = document.createElement('div');

        const locationIcon = this.__getLocationIcon();
        const locationMeta = this.__getLocationMeta();

        locationHeadline.innerHTML = this.jsonData.weather[0].description;

        outerContainer.classList.add('button', 'button--quad', 'results-more');
        innerContainer.classList.add('location', 'results-location');
        locationHeadline.classList.add('location-headline');

        innerContainer.appendChild(locationHeadline);
        innerContainer.appendChild(locationIcon);
        innerContainer.appendChild(locationMeta);

        outerContainer.appendChild(innerContainer);
        
        return outerContainer;
    }

    __getLocationIcon() {
        const container = document.createElement('div');
        const icon = document.createElement('div');

        container.classList.add('location-icon');
        // TODO: Hier muss irgendwie ne API für die Icon-Klassen hin :D
        icon.classList.add('sun');
        container.appendChild(icon);
        return container;
    }

    __getLocationMeta() {
        const container = document.createElement('div');
        const wind = document.createElement('span');
        const tempMax = document.createElement('span');
        const tempMin = document.createElement('span');
        const tempTotal = document.createElement('span');

        container.classList.add('location-meta');
        wind.classList.add('location-wind');
        tempMax.classList.add('location-temp-max');
        tempMin.classList.add('location-temp-min');
        tempTotal.classList.add('location-temp-total');

        wind.innerHTML = 'Wind:' + this.jsonData.wind.deg + '°, ' + this.jsonData.wind.speed + 'km/h';
        tempMax.innerHTML = this.__getDegreesCelcius(this.jsonData.main.temp_max);
        tempMin.innerHTML = this.__getDegreesCelcius(this.jsonData.main.temp_min);
        tempTotal.innerHTML = this.__getDegreesCelcius(this.jsonData.main.temp);

        container.appendChild(wind);
        container.appendChild(tempMax);
        container.appendChild(tempMin);
        container.appendChild(tempTotal);

        return container;
    }

    __getAddToListButton() {
        const element = document.createElement('div');
        element.classList.add('button', 'button--quad', 'results-add');
        element.innerHTML = '+';

        return element;
    }

    display(rootElement) {
        try {
            if (!rootElement) {
                throw Error('No element found to render to. Please check!');
            }
        } catch (error) {
            console.error(error);
        }

        this.__clearNode(rootElement);

        const cityHeadline = this.__getCityHeadline();
        const resultButtonContainer = this.__getResultButtonContainer();
        const addToListButton = this.__getAddToListButton();

        rootElement.appendChild(cityHeadline);
        rootElement.appendChild(resultButtonContainer);
        rootElement.appendChild(addToListButton);

        return rootElement;

        /*
            <div id="weathercontainer" class="results-container">  <----- Entrypoint
                <h3 class="results-headline">Karlsruhe</h3>
                <div class="button button--quad results-more">
                    <div class="location results-location">
                        <div class="location-headline">Durchgängig Sonnenschein</div>
                        <div class="location-icon">
                            <div class="sun"></div>
                        </div>
                        <div class="location-meta">
                            <span>Wind: 290°, 1.30km/h</span>
                            <span class="location-temp-max">Max 27°</span>
                            <span class="location-temp-min">Min 21°</span>
                            <span>Ø 13.0 °C</span>
                        </div>
                    </div>
                </div>
                <div class="button button--quad results-add">+</div>
            </div>
        */
    }
}