import { getCityHeading, getContainerTemp, getTagWithClassList } from './markupUtilities';

/**
 * Class representation of weather-details.
 * It contains information about today's weather such as the citys name,
 * minimum and maximum Temperature
 * @export
 * @class Details
 */
export default class Details {
  /**
   * Creates an instance of Details.
   * @param {any} {
   *     cityName, minTemp, maxTemp,
   *   }
   * @memberof Details
   */
  constructor({
    cityName, minTemp, maxTemp,
  }) {
    this.cityName = cityName;
    this.minTemp = minTemp;
    this.maxTemp = maxTemp;
  }

  /**
   * Getter for the markup of one card.
   * It generates a div with the classname 'content',
   * containing all weather information ready to be rendered.
   *
   * @readonly
   * @memberof Details
   */
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
