import TeleportAutoComplete from 'teleport-autocomplete';
import getWeatherDataForCity from './lib/weatherManager';
import initMobileController from './lib/mobileController';

document.addEventListener('DOMContentLoaded', () => {
  const weatherInput = new TeleportAutoComplete({
    el: '#input-city',
    maxItems: 5,
  });
  weatherInput.on('change', getWeatherDataForCity);
  initMobileController('left', 'right');
});
