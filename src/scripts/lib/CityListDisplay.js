export default class CityListDisplay {
    constructor(jsonData) {
        this.jsonData = JSON.parse(jsonData);
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

    __getLocationHeadline() {
        const headline = document.createElement('div');
        headline.classList.add('location-headline');
        headline.innerHTML = this.jsonData.name;
        return headline;
    }

    __getLocationContainer() {
        const container = document.createElement('div');
        const icon = this.__getLocationIcon();
        const metaInformation = this.__getLocationMeta();
        const headline = this.__getLocationHeadline();

        container.classList.add('location', 'col-xs-6', 'col-sm-4', 'col-lg-2');

        container.appendChild(icon);
        container.appendChild(metaInformation);
        container.appendChild(headline);
    }    

    displayLocationList() {
        const location = this.__getLocationContainer();
        rootElement.appendChild(location);
    }

    /*
        <div class="location col-xs-6 col-sm-4 col-lg-2">
            <div class="location-icon">
                <div class="sun"></div>
            </div>
            <div class="location-meta">
                <span class="location-temp-max">Max 27°</span>|
                <span class="location-temp-min">Min 21°</span>
            </div>
            <div class="location-headline">Augsburg</div>
        </div>
        <div class="location col-xs-6 col-sm-4 col-lg-2">
            ...
        </div>
     */
}