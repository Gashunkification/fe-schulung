import Card from './ui-elements/card';
import Details from './ui-elements//details';
import { getTagWithClassList } from './ui-elements//markupUtilities';

const WEEKDAYS = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
];

/**
 * Class representation of the MarkupGenerator.
 * This generator exposes static functions to render the UI of the app based on the data provided.
 *
 * @export
 * @class MarkupGenerator
 */
export default class MarkupGenerator {
  /**
   * getDetails returns the markup for todays weather-details
   *
   * @static
   * @param {any} data - consisting of {
   *  name: string,
   *  list: array({
   *    temp: object {
   *      min: number,
   *      max: number
   *    }
   *  })
   * }
   * @returns HTML for Details as a HTMLNode
   * @memberof MarkupGenerator
   */
  static getDetails(data) {
    const { name } = data;
    const { min, max } = data.list[0].temp;
    const { id } = data.list[0].weather;
    return new Details({
      cityName: name, minTemp: min, maxTemp: max, conditionId: id,
    }).markUp;
  }

  /**
   * getList returns the markup for this weeks forecast
   *
   * @static
   * @param {any} data - consisting of {
   *  humidity: number,
   *  temp: object {
   *    min: number,
   *    max: number
   *  },
   *  weather: object {
   *    description: string,
   *    id: number,
   *  },
   *  wind: number
   * }
   * @returns HTML for List as a HTMLNode
   * @memberof MarkupGenerator
   */
  static getList(data) {
    const result = getTagWithClassList('container-forecast');
    const list = data
      .list
      .map((card, index) => {
        const cardParams = {
          conditionName: card.weather.description,
          humidity: card.humidity,
          conditionId: card.weather.id,
          maxTemp: card.temp.max,
          minTemp: card.temp.min,
          wind: card.wind,
          weekday: (index === 0)
            ? 'Heute'
            : WEEKDAYS[(new Date().getDay() + index) % WEEKDAYS.length],
        };
        const resultingCard = new Card(cardParams);
        return resultingCard.markUp;
      });

    result.id = 'forecast-list';
    list.forEach(item => result.appendChild(item));
    return result;
  }
}
