import { getCityHeading, getContainerTemp, getTagWithClassList } from './markupUtilities';

export default class Details {
  constructor({
    cityName, minTemp, maxTemp,
  }) {
    this.cityName = cityName;
    this.minTemp = minTemp;
    this.maxTemp = maxTemp;
  }

  get markUp() {
    const { cityName, minTemp, maxTemp } = this;
    const result = getTagWithClassList('content');
    const headingContainer = getTagWithClassList(['heading-container', 'rotate'], 'h2');
    const headingCity = getCityHeading(cityName);
    const maxTempContainer = getContainerTemp(maxTemp, 'max');
    const minTempContainer = getContainerTemp(minTemp);

    result.id = 'details-container';
    headingContainer.innerHTML = 'Aktuell';

    result.appendChild(headingContainer);
    result.appendChild(headingCity);
    result.appendChild(maxTempContainer);
    result.appendChild(minTempContainer);

    return result;
  }
}
