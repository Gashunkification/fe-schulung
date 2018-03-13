export default class ResponseFormattersx {
  constructor(responseString) {
    const response = JSON.parse(responseString);

    this.cityName = response.city.name;
    this.forecastList = response.list.map(item => ({
      temp: item.temp,
      humidity: item.humidity,
      weather: item.weather[0],
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
