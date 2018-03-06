import MarkupGenerator from './weatherMarkupGenerator';
import ResponseFormatter from './responseFormatter';

const config = {
  API_KEY: 'c546d0b8f808baf7806efd29aa714684',
  API_URLS: {
    FORECAST: 'http://api.openweathermap.org/data/2.5/forecast/daily/',
  },
};

const ErrorHandler = {
  handle(error) {
    throw new Error(error);
  },
};

const downloadWeatherForecast = (cityId, successCallback, errorCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${config.API_URLS.FORECAST}?id=${cityId}&cnt=7&APPID=${config.API_KEY}&lang=de&units=metric`);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 300) {
      errorCallback(xhr.responseText);
    }

    successCallback(xhr.responseText);
  });
  xhr.send();
};

function displayWeather(response) {
  const formatter = new ResponseFormatter();
  const forecastList = document.getElementById('forecast-list');
  const detailsContainer = document.getElementById('details-container').parentNode;


  formatter.format(response);
  const details = MarkupGenerator.getDetails(formatter.formattedResult);
  const list = MarkupGenerator.getList(formatter.formattedResult);

  forecastList.removeChild(forecastList.getElementsByClassName('container-forecast')[0]);
  forecastList.appendChild(list);

  while (detailsContainer.firstChild) {
    detailsContainer.removeChild(detailsContainer.firstChild);
  }
  detailsContainer.appendChild(details);
}


class WeatherManager {
  static getWeatherDataForCity(response) {
    if (!response) {
      return;
    }
    downloadWeatherForecast(response.geonameId, displayWeather, ErrorHandler.handle);
  }
}

export default WeatherManager;
