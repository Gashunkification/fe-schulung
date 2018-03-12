import TeleportAutoComplete from 'teleport-autocomplete';
import WeatherManager from './lib/weatherManager';
import intMobileController from './lib/mobileController';

document.addEventListener('DOMContentLoaded', () => {
  const weatherInput = new TeleportAutoComplete({
    el: '#input-city',
    maxItems: 5,
  });
  weatherInput.on('change', WeatherManager.getWeatherDataForCity);
  intMobileController('left', 'right');
});
