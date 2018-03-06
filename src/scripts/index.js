import TeleportAutoComplete from 'teleport-autocomplete';
import WeatherManager from './lib/weatherManager';

document.addEventListener('DOMContentLoaded', () => {
  const weatherInput = new TeleportAutoComplete({
    el: '#input-city',
    maxItems: 5,
  });
  weatherInput.on('change', WeatherManager.getWeatherDataForCity);
});
