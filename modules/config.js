export const mockWeatherData = {
  coord: {
    lon: 26.1025,
    lat: 44.4268
  },
  weather: [
    {
      id: 800,
      main: "Senin",
      description: "Cer senin",
      icon: "01d"
    }
  ],
  main: {
    temp: 20,
    feels_like: 21,
    pressure: 1012,
    humidity: 50
  },
  visibility: 10000,
  wind: {
    speed: 3.09,
    deg: 180
  },
  clouds: {
    all: 0
  },
  dt: 1698528000,
  sys: {
    type: 1,
    id: 6834,
    country: "RO",
    sunrise: 1698500000,
    sunset: 1698543600
  },
  airQuality: 45,
  timezone: 7200,
  id: 683506,
  name: "București",
  cod: 200
};

export const CONFIG = {
  API_KEY: "caf94981d3d1652e0c821c8586c57b05",
  API_BASE_URL: "https://api.openweathermap.org/data/2.5",
  DEFAULT_UNITS: "metric",
  DEFAULT_LANG: "ro",
}

export const API_ENDPOINTS = {
  CURRENT_WEATHER: `${CONFIG.API_BASE_URL}/weather`,
  FORECAST: `${CONFIG.API_BASE_URL}/forecast`,
  AIR_QUALITY: `${CONFIG.API_BASE_URL}/air_pollution`,
}

export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: "Orasul nu a fost gasit",
  NETWORK_ERROR: "Probleme cu internetul",
}