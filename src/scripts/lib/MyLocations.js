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
}
