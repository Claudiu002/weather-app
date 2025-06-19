let ui, service;

async function init() {
  ui = await import('./modules/ui-controller.js');
  service = await import('./modules/weather-service.js');
  const config = await import('./modules/config.js');

  ui.displayWeather(config.MOCK_DATA);

  const data = await service.getCurrentWeather('Bucuresti');
  if (data) {
    ui.displayWeather(data);
  } else {
    ui.showError("Nu s-au putut obține datele meteo.");
  }

  ui.showError("Test");

  setupEventListeners();
}

const setupEventListeners = () => {
  const button = document.querySelector("#search-btn");
  const input = document.querySelector("#city-input");

  button.addEventListener('click', handleSearch);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
};

const handleSearch = async () => {
  ui.clearError();
  const input = document.querySelector('#city-input');
  const loading = document.querySelector('#loading');
  const city = input.value.trim();

  if (!isValidCity(city)) {
    ui.showError("Te rugăm introdu un nume de oraș valid.");
    return;
  }

  loading.textContent = "Se încarcă...";
  loading.style.display = 'block';

  try {
    const data = await service.getCurrentWeather(city);
    ui.displayWeather(data);
  } catch (error) {
    ui.showError("Nu s-au putut obține datele meteo.");
  } finally {
    loading.style.display = 'none';
  }
};

const isValidCity = (city) => {
  return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);
};

init().catch(console.error);
