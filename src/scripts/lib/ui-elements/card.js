import getWeatherIconForId, { getCityHeading, getFormattedTemperatureString, getTagWithClassList } from './markupUtilities';

/**
 * Class representation of a forecast-card.
 * It contains information about the weekday and weather-conditions such as
 * description, minimum and maximum temperature, humidity and windspeed
 * @export default
 * @class Card
 */
export default class Card {
  /**
   * Creates an instance of Card.
   * @param {any} {
   *     conditionName, conditionId, maxTemp, minTemp, humidity, wind, weekday,
   *}
   * @memberof Card
   */
  constructor({
    conditionName, conditionId, maxTemp, minTemp, humidity, wind, weekday,
  }) {
    this.conditionName = conditionName;
    this.conditionId = conditionId;
    this.maxTemp = maxTemp;
    this.minTemp = minTemp;
    this.humidity = humidity;
    this.wind = wind;
    this.weekday = weekday;
  }

  /**
   * Getter for the markup of one card.
   * It generates a div with the classname 'forecast',
   * containing all weather information ready to be rendered.
   *
   * @readonly
   * @memberof Card
   */
  get markUp() {
    const container = getTagWithClassList('forecast');
    const heading = getCityHeading(this.weekday);
    const weekdayWeatherContainer = getTagWithClassList('container-weekday-weather');
    const weekdayWeatherIconContainer = getTagWithClassList('container-weather-icon');

    const conditionName = getTagWithClassList('heading-condition-name', 'span');
    const tempMax = getTagWithClassList('forecast-temp-max', 'span');
    const tempMin = getTagWithClassList('forecast-temp-min', 'span');
    const humidity = getTagWithClassList('forecast-humidity', 'span');
    const wind = getTagWithClassList('forecast-wind', 'span');

    const icon = getTagWithClassList(['wi', getWeatherIconForId(this.conditionId)], 'i');

    conditionName.innerHTML = this.conditionName;
    tempMax.innerHTML = `Max: ${getFormattedTemperatureString(this.maxTemp)}`;
    tempMin.innerHTML = `Min: ${getFormattedTemperatureString(this.minTemp)}`;
    humidity.innerHTML = `Feuchtigkeit: ${this.humidity}%`;
    wind.innerHTML = `Wind: ${this.wind}km/h`;

    weekdayWeatherContainer.appendChild(conditionName);
    weekdayWeatherContainer.appendChild(tempMax);
    weekdayWeatherContainer.appendChild(tempMin);
    weekdayWeatherContainer.appendChild(humidity);
    weekdayWeatherContainer.appendChild(wind);

    weekdayWeatherIconContainer.appendChild(icon);

    container.appendChild(heading);
    container.appendChild(weekdayWeatherContainer);
    container.appendChild(weekdayWeatherIconContainer);

    return container;
  }
}
