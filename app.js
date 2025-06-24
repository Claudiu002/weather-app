// Ce module noi trebuie importate?
import { getCoords } from './modules/location-service.js'
import {
  getCurrentWeather,
  getWeatherByCoords,
  getCurrentWeatherWithFallback,
} from './modules/weather-service.js'
import {
  saveUserPreferences,
  loadUserPreferences,
  updateTemperatureDisplay,
  displayWeather,
  showError,
  clearError,
  getElements,
} from './modules/ui-controller.js'
import { CONFIG } from './modules/config.js';

const elements = getElements();
async function init() {
  try {
    const city = document.querySelector("#city-input").value.trim();

    if (city === '') {
      await handleLocationSearch();
    } else {
      setupEventListeners(elements);
    }

    elements.unitSelect.addEventListener('change', async (e) => {
      const newUnit = e.target.value;
      CONFIG.DEFAULT_UNITS = newUnit;

      const currentPrefs = loadUserPreferences();
      saveUserPreferences(newUnit, currentPrefs.lang);

      if (elements.cityName.textContent.trim() !== '') {
        const city = document.querySelector('#city-input').value.trim();
        const data = await getCurrentWeather(city);
        updateTemperatureDisplay(elements, data.temp, newUnit);
        if (data) {
          displayWeather(elements, data);
        }
      }
    });

    elements.langSelect.addEventListener('change', async (e) => {
      const newLang = e.target.value;
      CONFIG.DEFAULT_LANG = newLang;

      const currentPrefs = loadUserPreferences();
      saveUserPreferences(currentPrefs.unit, newLang);

      if (elements.cityName.textContent.trim() !== '') {
        const city = document.querySelector('#city-input').value.trim();
        const data = await getCurrentWeather(city);
        if (data) {
          displayWeather(elements, data);
        }
      }
    });

    const returnButton = document.querySelector("#currentLocation-btn");
returnButton.addEventListener('click', async () => {
  const city = document.querySelector("#city-input").value.trim();
  if(city !== "")
    await handleLocationSearch();

})
  } catch (error) {
    console.error("Eroare", error.message);
  }
}
getElements().langSelect.addEventListener('change', async (e) => {
  const newLang = e.target.value;
  CONFIG.DEFAULT_LANG = newLang;


  const currentPrefs = loadUserPreferences();
  saveUserPreferences(newUnit, currentPrefs.lang)

  if (getElements().cityName.textContent.trim() !== '') {
    const city = document.querySelector('#city-input').value.trim();
    const data = await getCurrentWeather(city);
    if (data) {
      displayWeather(elements, data);
    }
  }
})
  

const setupEventListeners = () => {
  const button = document.querySelector("#search-btn");
  const input = document.querySelector("#city-input");

button.addEventListener('click', async () => {
  const city = input.value.trim();
  const data = await getCurrentWeatherWithFallback(city);
  if (data) {
    displayWeather(data);
  }
});
 input.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const city = input.value.trim();
    const data = await getCurrentWeatherWithFallback(city);
    if(data) displayWeather(data);
  }
});
};





const handleLocationSearch = async () => {
  try {
    // Cum folosești noul location service?
    showLoading(elements, 'Detectez locația...')

    const coords = await getCoords()

    // Cum afișezi diferit pentru GPS vs IP location?
    if (coords.source === 'ip') {
      showMessage(elements, 'Locație aproximativă bazată pe IP', 'warning')
    }

    showLoading(elements, 'Încarc vremea...')
    const weather = await getWeatherByCoords(coords.latitude, coords.longitude)

    displayWeather(elements, weather)
  } catch (error) {
    // Cum gestionezi când nici un serviciu de locație nu funcționează?
    showError(elements, `Locația nu a putut fi determinată: ${error.message}`)
  }

}


document.addEventListener("DOMContentLoaded", () => {
  init();
});
