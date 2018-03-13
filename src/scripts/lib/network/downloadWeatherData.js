const config = {
  API_KEY: 'c546d0b8f808baf7806efd29aa714684',
  API_URLS: {
    FORECAST: 'https://api.openweathermap.org/data/2.5/forecast/daily/',
  },
};

const downloadWeatherForecast = ({
  cityId, successCallback, errorCallback,
}) => {
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


export default downloadWeatherForecast;