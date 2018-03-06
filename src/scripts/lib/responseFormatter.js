export default class ResponseFormattersx {
  constructor() {
    this.cityName = '';
    this.forecastList = [];
  }

  format(responseString) {
    const response = JSON.parse(responseString);

    this.cityName = response.city.name;
    this.forecastList = response.list.map(item => ({
      temp: {
        min: item.temp.min,
        max: item.temp.max,
      },
      humidity: item.humidity,
      weather: {
        id: item.weather[0].id,
        description: item.weather[0].description,
      },
      wind: item.speed,
    }));
  }

  get formattedResult() {
    return {
      name: this.cityName,
      list: this.forecastList,
    };
  }
}
