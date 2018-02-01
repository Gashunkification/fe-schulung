const map = weatherId => {
    switch (true) {
        case weatherId < 300 && weatherId >= 200: {
            return 'wi-thunderstorm';
        }
        case weatherId < 500 && weatherId >= 300: {
            return 'wi-sprinkle';                
        }
        case weatherId < 600 && weatherId >= 500: {
            
            return 'wi-rain';
        }
        case weatherId < 700 && weatherId >= 600: {
            
            return 'wi-snow';
        }
        case weatherId < 800 && weatherId >= 700: {
            return 'wi-fog';
        }            
        case weatherId == 800: {
            
            return 'wi-day-sunny';
        }
        case weatherId > 800: {
            return 'wi-cloudy';
        }
        default: {
            console.log(weatherId)
            return 'wi-na';                
        }
    }
};

export default map;