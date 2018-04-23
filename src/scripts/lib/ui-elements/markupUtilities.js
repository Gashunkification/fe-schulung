/**
 * This function will return a suitable weather-icon class for a respective weather-condition-id
 * which is provided by the openweatherapi.
 *
 * The mapping also was taken from there: https://openweathermap.org/weather-conditions
 *
 * It is anonymous, since it is the default export of this file.
 */
export default (weatherId) => {
  switch (true) {
    case weatherId < 300 && weatherId >= 200:
    {
      return 'wi-thunderstorm';
    }
    case weatherId < 500 && weatherId >= 300:
    {
      return 'wi-sprinkle';
    }
    case weatherId < 600 && weatherId >= 500:
    {
      return 'wi-rain';
    }
    case weatherId < 700 && weatherId >= 600:
    {
      return 'wi-snow';
    }
    case weatherId < 800 && weatherId >= 700:
    {
      return 'wi-fog';
    }
    case weatherId === 800:
    {
      return 'wi-day-sunny';
    }
    case weatherId > 800:
    {
      return 'wi-cloudy';
    }
    default:
    {
      return 'wi-na';
    }
  }
};

/**
 * This function creates and returns a DOM-Element which can be further customized
 *
 * @param {arry | string} classList - represents the class(es) to be added to the element
 * @param {string} tagName - represents the type of HTML-Tag that will be returned
 *
 * @returns {DOMElement} - the respecitve DOM-Element with all the classes provided by in the first parameter
 */
export const getTagWithClassList = (classList = [], tagName = 'div') => {
  const elem = document.createElement(tagName);
  if (typeof classList === 'string') {
    elem.classList.add(classList);
  } else {
    elem.classList.add(...classList);
  }
  return elem;
};

/**
 * This function accepts a number and returns a String-representation of it as the following: "NN,N °C"
 * @param {number} temperature - the temperature as a numeric value
 */
export const getFormattedTemperatureString = (temperature = 0) => `${temperature.toFixed(1).toString().replace('.', ',')}°C`;

/**
 * This function creates and returns a h3-tag with the respective classes to represent a city-headline
 * @param {string} name - Name of the city
 */
export const getCityHeading = (name) => {
  const container = getTagWithClassList('container-city-heading');
  const heading = getTagWithClassList('heading-city', 'h3');

  heading.innerHTML = name;
  container.appendChild(heading);
  return container;
};

/**
 * This function creates and returns a new div-tag containing a temperature and a label, defined by temp and type params
 * @param {number} temp - The temperature
 * @param {string ['min' | 'max']} type - Type of temperature, will be appended to classnames
 */
export const getContainerTemp = (temp = 0, type = 'min') => {
  const container = getTagWithClassList(`container-temp-${type}`);
  const temperature = getTagWithClassList(`temp-${type}`, 'span');
  const unit = getTagWithClassList('temp-unit', 'span');

  temperature.innerHTML = getFormattedTemperatureString(temp);
  unit.innerHTML = `${type}`;

  container.appendChild(unit);
  container.appendChild(temperature);
  return container;
};

/**
 * Shows a bootstrap-based Alert with a custom message
 *
 * @param {string} message - Message to be displayed in the alert
 * @param {number} duration - Duration the alert should be visible for
 */
export const showAlert = (message, duration = 3000) => {
  const alertContainer = document.querySelector('.container-alert');
  const alertText = getTagWithClassList('alert-content', 'span');

  alertText.innerText = message;

  alertContainer.innerHTML = '';
  alertContainer.appendChild(alertText);
  alertContainer.style.opacity = 1;
  alertContainer.style.zIndex = 5;
  setTimeout(() => {
    alertContainer.style.opacity = 0;
    alertContainer.style.zIndex = -5;
  }, duration);
};
