

export const elements = {
    cityInput: document.querySelector('#city-input'),
    cityName: document.querySelector("#city-name"),
    weatherImg: document.querySelector("#weather-img"),
    temperature: document.querySelector("#temperatura"),
    status: document.querySelector("#weather-status"),
    windSpeed: document.querySelector("#viteza-vantului"),
    pressure: document.querySelector("#presiunea"),
    visibility: document.querySelector("#vizibilitate"),
    humidity: document.querySelector("#umiditatea"),
    sunrise: document.querySelector("#rasarit"),
    sunset: document.querySelector("#apus"),
    airQuality: document.querySelector("#air-quality"),

}

export function displayWeather(elements, data) {
    const { name, weather, main, wind, visibility, sys, airQuality} = data;

    elements.cityName.textContent = name;
    elements.weatherImg.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    elements.temperature.textContent = `${main.temp}`;
    elements.status.textContent = weather[0].description;
    elements.windSpeed.textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;
    elements.pressure.textContent = `${main.pressure} hPa`;
    elements.visibility.textContent = `${visibility} m`;
    elements.humidity.textContent = `${main.humidity}%`;
    elements.sunrise.textContent = new Date(sys.sunrise * 1000).toLocaleTimeString();
    elements.sunset.textContent = new Date(sys.sunset * 1000).toLocaleTimeString();

    if(airQuality <= 50)
      elements.airQuality.textContent = `${airQuality} (Buna)`;
    else if (airQuality <= 100)
      elements.airQuality.textContent = `${airQuality} (Acceptabila)`;
    else if (airQuality <= 150)
      elements.airQuality.textContent = `${airQuality} (Moderata)`;
    else if (airQuality <= 200)
      elements.airQuality.textContent = `${airQuality} (Nesănătoasă pentru grupuri sensibile)`;
    else elements.airQuality.textContent = `${airQuality} (Nesănătoasă)`;
}
export const showError = (mesaj) => {
  const errorBox = elements.errors;
  if (!errorBox) return;

  errorBox.textContent = mesaj;
  errorBox.style.color = "red";
  errorBox.style.fontWeight = "bold";
  errorBox.style.marginTop = "10px";
  errorBox.style.display = "block";
};


export function clearError() {
  const errorDiv = document.getElementById('errors');
  errorDiv.textContent = '';
  errorDiv.style.display = 'none';
}

export const getElements = () => ({
  cityInput: document.querySelector('#city-input'),
  cityName: document.querySelector("#city-name"),
  weatherImg: document.querySelector("#weather-img"),
  temperature: document.querySelector("#temperatura"),
  status: document.querySelector("#weather-status"),
  windSpeed: document.querySelector("#viteza-vantului"),
  pressure: document.querySelector("#presiunea"),
  visibility: document.querySelector("#vizibilitate"),
  humidity: document.querySelector("#umiditatea"),
  sunrise: document.querySelector("#rasarit"),
  sunset: document.querySelector("#apus"),
  airQuality: document.querySelector("#air-quality"),

  unitSelect: document.querySelector("#unit-select"),
  langSelect: document.querySelector("#lang-select"),

  errors: document.querySelector("#errors")
})

export const updateTemperatureDisplay = (elements, temperature, units) => {
if(units === 'metric')
  {const symbol = '°C';
    elements.temperature.textContent = `${temperature}${symbol}`;}
else {const symbol = 'F';
elements.temperature.textContent = `${temperature * 9/5 + 32}${symbol}`;
}}


export const saveUserPreferences = (unit, lang) => {
  localStorage.setItem("weatherPreferences", JSON.stringify({unit, lang}));
};

export const loadUserPreferences = () => {
  const prefs = localStorage.getItem('weatherPreferences');
  if(prefs){
    const {unit, lang} = JSON.parse(prefs);
    return {
      unit: unit || 'metric',
      lang: lang || "ro"
    };
  }
  return {
    unit:"metric",
    lang: "ro"
  };
};