import { mockWeatherData, CONFIG} from './config.js';
export const getCurrentWeather = async (city) => {
  // Simulează delay API (~1 secundă)
  // Returnează MOCK_DATA cu numele orașului actualizat
  // Gestionează erorile
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!city || city.length === 0)
      throw new Error("Orașul nu există");
    
    const url = buildUrl("/weather", {q: city});
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error(`Eroare la preluarea datelor: ${response.statusText}`);
  }
    const data = await response.json();

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
   const url = buildUrl("/weather", {lat: lat, lon: lon});
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error(`Eroare la preluarea datelor: ${response.statusText}`);
  }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Eroare:", error.message);
  }
};  


const buildUrl = (endpoint, params = {}) => {
  const url = new URL(endpoint, CONFIG.API_BASE_URL);

  url.searchParams.set('appid', CONFIG.API_KEY);
  url.searchParams.set('units', CONFIG.DEFAULT_UNITS);
  url.searchParams.set('lang', CONFIG.DEFAULT_LANG);

  Object.entries(params).forEach(([key, value]) => {
    if(value !== undefined && value !== null && value !== '')
      url.searchParams.set(key, value);
  })

return url.toString();
}

const makeRequest = async (url) => {
  try{
    const response = await fetch(url);

    if(!response.ok){
  if (response.status === 404) {
    // Resursa nu a fost găsită
    throw new Error('Eroare 404: Resursa nu a fost găsită.');
  } else if (response.status === 401) {
    // Autentificare necesară sau neautorizat
    throw new Error('Eroare 401: Neautorizat.');
  } else if (response.status === 500) {
    // Eroare pe server
    throw new Error('Eroare 500: Eroare internă pe server.');
  } else {
    // Alte erori
    throw new Error(`Eroare: Status ${response.status}`);
  }
  return await response.json(); 
 }
  } catch(error){
    if(error.name === "TyoeError"){
      throw new Error("Eroare la internet. Verifica conexiunea");
    }
    else throw new Error('A aparut o problema:', error.message);
  }
}

 export const getCurrentWeatherWithFallback = async (city) => {
  try {
    // Încearcă API-ul real
    return await getCurrentWeather(city)
  } catch (error) {
    // Când folosești fallback?
    // Cum marchezi că datele sunt simulate?
    console.warn('Using fallback data due to:', error.message)
    return {
      ...mockWeatherData,
      isFallback: true,
      fallbackReason: error.message,
    }
  }
}



