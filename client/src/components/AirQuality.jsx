import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getAirQuality(city) {
  // Get coordinates from city name
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
  const geoRes = await axios.get(geoUrl, { withCredentials: false });
  if (!geoRes.data || geoRes.data.length === 0) {
    throw new Error('City not found');
  }
  const { lat, lon } = geoRes.data[0];

  // Get AQI data
  return getAirQualityByCoords(lat, lon);
}

export async function getAirQualityByCoords(lat, lon) {
  const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const aqiRes = await axios.get(aqiUrl, { withCredentials: false });
  return { ...aqiRes.data, lat, lon };
}

export async function reverseGeocode(lat, lon) {
  const revGeoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
  const res = await axios.get(revGeoUrl, { withCredentials: false });
  if (res.data && res.data.length > 0) {
    return {
      name: res.data[0].name || '',
      state: res.data[0].state || ''
    };
  }
  return { name: '', state: '' };
}