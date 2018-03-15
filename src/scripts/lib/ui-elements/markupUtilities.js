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

export const getTagWithClassList = (classList = [], tagName = 'div') => {
  const elem = document.createElement(tagName);
  if (typeof classList === 'string') {
    elem.classList.add(classList);
  } else {
    elem.classList.add(...classList);
  }
  return elem;
};

export const getFormattedTemperatureString = (temperature = 0) => `${temperature.toFixed(1).toString().replace('.', ',')}°C`;

export const getCityHeading = (name) => {
  const container = getTagWithClassList('container-city-heading');
  const heading = getTagWithClassList('heading-city', 'h3');

  heading.innerHTML = name;
  container.appendChild(heading);
  return container;
};

export const getContainerTemp = (temp = '', type = 'min') => {
  const container = getTagWithClassList(`container-temp-${type}`);
  const temperature = getTagWithClassList(`temp-${type}`, 'span');
  const unit = getTagWithClassList('temp-unit', 'span');

  temperature.innerHTML = getFormattedTemperatureString(temp);
  unit.innerHTML = `${type}`;

  container.appendChild(temperature);
  container.appendChild(unit);
  return container;
};

export const showAlert = (message) => {
  const alertContainer = document.querySelector('.container-alert');
  alertContainer.innerText = message;
  alertContainer.style.opacity = 1;
  setTimeout(() => {
    alertContainer.style.opacity = 0;
  }, 3000);
};
