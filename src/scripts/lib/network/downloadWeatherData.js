const config = {
  API_KEY: 'c546d0b8f808baf7806efd29aa714684',
  API_URLS: {
    FORECAST: 'https://api.openweathermap.org/data/2.5/forecast/daily/',
  },
};

/*
* Downloads weekly weatjer forecast for a city
*
* @param {any} - consisting of {
*   cityId: number - the unique geoID referencing a city
*   successCallback: function - callback to be run if request successfully finished
*   errorCallback: function - callback to be run if request failes
* }
*/
const downloadWeatherForecast = ({
  cityId, successCallback, errorCallback,
}) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${config.API_URLS.FORECAST}?id=${cityId}&cnt=7&APPID=${config.API_KEY}&lang=de&units=metric`);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 300) {
      errorCallback('Es konnte kein Wetter für diese Stadt gefunden werden.');
    }

    successCallback(xhr.responseText);
  });
  xhr.send();
};


export default downloadWeatherForecast;
