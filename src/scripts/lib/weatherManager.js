import MarkupGenerator from './ui-elements/weatherMarkupGenerator';
import ResponseFormatter from './network/responseFormatter';
import downloadWeatherForecast from './network/downloadWeatherData';

const handleError = (error) => {
  throw new Error(error);
};

function displayWeather(response) {
  const formatter = new ResponseFormatter(response);
  const forecastList = document.getElementById('forecast-list');
  const detailsContainer = document.getElementById('details-container').parentNode;


  const details = MarkupGenerator.getDetails(formatter.formattedResult);
  const list = MarkupGenerator.getList(formatter.formattedResult);

  forecastList.removeChild(forecastList.getElementsByClassName('container-forecast')[0]);
  forecastList.appendChild(list);

  while (detailsContainer.firstChild) {
    detailsContainer.removeChild(detailsContainer.firstChild);
  }
  detailsContainer.appendChild(details);
}

const getWeatherDataForCity = (response) => {
  if (!response) {
    return;
  }
  downloadWeatherForecast({
    cityId: response.geonameId,
    successCallback: displayWeather,
    errorCallback: handleError,
  });
};

export default getWeatherDataForCity;
