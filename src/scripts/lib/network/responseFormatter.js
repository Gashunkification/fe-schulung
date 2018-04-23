/**
 * This class is responsible for formatting the JSON-Response from openweatherapi
 * into a more usable format
 *
 * @export
 * @class ResponseFormatters
 */
export default class ResponseFormatters {
  /**
   * Creates an instance of ResponseFormatters.
   * @param {string} responseString - JSON-fromatted String
   * @memberof ResponseFormatters
   */
  constructor(responseString) {
    const response = JSON.parse(responseString);

    this.cityName = response.city.name;
    this.forecastList = response.list.map(item => ({
      temp: item.temp,
      humidity: item.humidity,
      weather: item.weather[0],
      wind: item.speed,
    }));
  }

  /**
   * Returns the formatted result
   *
   * @readonly
   * @memberof ResponseFormatters
   */
  get formattedResult() {
    return {
      name: this.cityName,
      list: this.forecastList,
    };
  }
}
