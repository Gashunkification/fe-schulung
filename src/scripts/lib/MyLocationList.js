import CityWeather from './CityWeather';
import WeatherDisplay from './WeatherDisplay';

const checkIndex = (index) => {
    if (index < 0 || index >= this.locationList.length) {
        throw new Error(`Index '${index}' is out of bounds! Check again`);
    }
}

export default class MyLocationList {
    constructor() {
        this.locationList = [];
    }

    addLocationToList(newLocation) {
        this
            .locationList
            .push(newLocation);
    }

    get(index) {
        checkIndex(index)
        return this.locationList[index];
    }

    update(index, updatedLocation) {
        checkIndex(index);
        this.locationList[index] = updatedLocation;
    }

    getLocationList() {
        return this.locationList;
    }

    renderList(API_KEY) {
        const currentList = this.getLocationList();
        const cw = new CityWeather(API_KEY);
        
        currentList.forEach( (current) => {
            cw.get(current, (response) => {
                const wd = new WeatherDisplay(response);
                wd.display()
            })
        })
    }
}


/*

    Before rerender of list -> .innerHTML = '';
    
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                    STADTNAME HIER + °C (evtl)
                </a>
            </h4>
        </div>
        <div id="collapse1" class="panel-collapse collapse in">
            <div class="panel-body">
                WETTER DATEN HIER
            </div>
        </div>
    </div>
*/
