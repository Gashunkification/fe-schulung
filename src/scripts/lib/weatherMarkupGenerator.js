import Card from './ui-elements/card';
import Details from './ui-elements//details';
import { getTagWithClassList } from './ui-elements//markupUtilities';

const WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

export default class MarkupGenerator {
  static getDetails(data) {
    const { name } = data;
    const { min, max } = data.list[0].temp;

    return new Details({ cityName: name, minTemp: min, maxTemp: max }).markUp;
  }
  static getList(data) {
    const result = getTagWithClassList('container-forecast');
    const list = data.list.map((card, index) => {
      const cardParams = {
        conditionName: card.weather.description,
        humidity: card.humidity,
        conditionId: card.weather.id,
        maxTemp: card.temp.max,
        minTemp: card.temp.min,
        wind: card.wind,
        weekday: (index === 0) ? 'Heute' : WEEKDAYS[(new Date().getDay() + index) % WEEKDAYS.length],
      };
      const resultingCard = new Card(cardParams);
      return resultingCard.markUp;
    });

    result.id = 'forecast-list';
    list.forEach(item => result.appendChild(item));
    return result;
  }
}
