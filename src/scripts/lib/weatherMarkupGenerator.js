import getWeatherIconForId from './weatherIconMapper';

const WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

const getTagWithClassList = (classList = [], tagName = 'div') => {
  const elem = document.createElement(tagName);
  if (typeof classList === 'string') {
    elem.classList.add(classList);
  } else {
    elem.classList.add(...classList);
  }
  return elem;
};

const getFormattedTemperatureString = (temperature = 0) => `${temperature.toFixed(1).toString().replace('.', ',')}°C`;

const getCityHeading = (name) => {
  const container = getTagWithClassList('container-city-heading');
  const heading = getTagWithClassList('heading-city', 'h3');

  heading.innerHTML = name;
  container.appendChild(heading);
  return container;
};

const getContainerTemp = (temp = '', type = 'min') => {
  const container = getTagWithClassList(`container-temp-${type}`);
  const temperature = getTagWithClassList(`temp-${type}`, 'span');
  const unit = getTagWithClassList('temp-unit', 'span');

  temperature.innerHTML = getFormattedTemperatureString(temp);
  unit.innerHTML = `${type}`;

  container.appendChild(temperature);
  container.appendChild(unit);
  return container;
};

export default class MarkupGenerator {
  static getDetails(data) {
    const result = getTagWithClassList('content');
    const headingContainer = getTagWithClassList('heading-container', 'h2');
    const headingCity = getCityHeading(data.name);
    const maxTemp = getContainerTemp(data.list[0].temp.max, 'max');
    const minTemp = getContainerTemp(data.list[0].temp.min);

    result.id = 'details-container';
    headingContainer.innerHTML = 'Aktuell';

    result.appendChild(headingContainer);
    result.appendChild(headingCity);
    result.appendChild(maxTemp);
    result.appendChild(minTemp);

    return result;
  }
  static getList(data) {
    const result = getTagWithClassList('container-forecast');
    const list = data.list.map((card, index) => {
      const container = getTagWithClassList('forecast');
      const heading = getCityHeading((index === 0) ? 'Heute' : WEEKDAYS[(new Date().getDay() + index) % WEEKDAYS.length]);
      const weekdayWeatherContainer = getTagWithClassList('container-weekday-weather');
      const weekdayWeatherIconContainer = getTagWithClassList('container-weather-icon');

      const conditionName = getTagWithClassList('heading-condition-name', 'span');
      const tempMax = getTagWithClassList('forecast-temp-max', 'span');
      const tempMin = getTagWithClassList('forecast-temp-min', 'span');
      const humidity = getTagWithClassList('forecast-humidity', 'span');
      const wind = getTagWithClassList('forecast-wind', 'span');

      const icon = getTagWithClassList(['wi', getWeatherIconForId(card.weather.id)], 'i');

      conditionName.innerHTML = card.weather.description;
      tempMax.innerHTML = `Max: ${getFormattedTemperatureString(card.temp.max)}`;
      tempMin.innerHTML = `Min: ${getFormattedTemperatureString(card.temp.min)}`;
      humidity.innerHTML = `Feuchtigkeit: ${card.humidity}%`;
      wind.innerHTML = `Wind: ${card.wind}km/h`;

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
    });

    result.id = 'forecast-list';
    list.forEach(item => result.appendChild(item));
    return result;
  }
}
