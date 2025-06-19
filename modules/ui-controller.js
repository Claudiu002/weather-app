

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

}

export function displayWeather(data) {
    const { name, weather, main, wind, visibility, sys,} = data;

    elements.cityName.textContent = name;
    elements.weatherImg.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    elements.temperature.textContent = `${main.temp}°C`;
    elements.status.textContent = weather[0].description;
    elements.windSpeed.textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;
    elements.pressure.textContent = `${main.pressure} hPa`;
    elements.visibility.textContent = `${visibility} m`;
    elements.humidity.textContent = `${main.humidity}%`;
    elements.sunrise.textContent = new Date(sys.sunrise * 1000).toLocaleTimeString();
    elements.sunset.textContent = new Date(sys.sunset * 1000).toLocaleTimeString();
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
