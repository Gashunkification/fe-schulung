import MarkupGenerator from './weatherMarkupGenerator';
import ResponseFormatter from './network/responseFormatter';
import downloadWeatherForecast from './network/downloadWeatherData';
import { showAlert } from './ui-elements/markupUtilities';

const handleError = (error) => {
  showAlert(error);
  throw new Error(error);
};

/**
 * This function takes the weatherdata downloaded from openweatherapi and
 * renders the UI according to those data
 *
 * @param {any} response
 */
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

/**
 * This function takes the data for the city chosen by the user, downloads the respective
 * weather data.
 *
 * @param {any} response
 */
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
