import { MOCK_DATA } from './config.js';
export const getCurrentWeather = async (city) => {
  // Simulează delay API (~1 secundă)
  // Returnează MOCK_DATA cu numele orașului actualizat
  // Gestionează erorile
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!city || city.length === 0)
      throw new Error("Orașul nu există");
    const data = { ...MOCK_DATA, name: city };
    return data;
  } catch (error) {
    console.error("Eroare:", error.message);
    return null;
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  // Similar, dar pentru coordonate
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (lat === undefined || lon === undefined)
      throw new Error("Coordonatele nu există");
   const data = {
  ...MOCK_DATA,
  coord: { lon, lat }
};
    return data;
  } catch (error) {
    console.error("Eroare:", error.message);
  }
};  


