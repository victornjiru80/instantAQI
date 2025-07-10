import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const OWM_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const CITIES = [
  { name: 'Delhi', country: 'IN', lat: 28.6139, lon: 77.2090 },
  { name: 'Beijing', country: 'CN', lat: 39.9042, lon: 116.4074 },
  { name: 'Lahore', country: 'PK', lat: 31.5497, lon: 74.3436 },
  { name: 'Los Angeles', country: 'US', lat: 34.0522, lon: -118.2437 },
  { name: 'Mexico City', country: 'MX', lat: 19.4326, lon: -99.1332 },
  { name: 'Istanbul', country: 'TR', lat: 41.0082, lon: 28.9784 },
  { name: 'Helsinki', country: 'FI', lat: 60.1699, lon: 24.9384 },
  { name: 'Wellington', country: 'NZ', lat: -41.2865, lon: 174.7762 },
  { name: 'Vancouver', country: 'CA', lat: 49.2827, lon: -123.1207 },
];

const FACTS = [
  'Air pollution kills an estimated 7 million people worldwide every year. (WHO)',
  '9 out of 10 people worldwide breathe polluted air every day.',
  'Children, elderly, and those with pre-existing conditions are most at risk from air pollution.',
  'Air pollution can travel long distances and affect regions far from its source.',
  'Switching to public transport and clean energy can significantly reduce air pollution.',
  'Indoor air pollution is also a major health risk, especially from cooking with solid fuels.',
  'Planting trees and green spaces helps absorb air pollutants and improve air quality.',
];

const AQI_LEVELS = [
  { level: 1, label: 'Good', color: 'bg-green-400' },
  { level: 2, label: 'Fair', color: 'bg-yellow-300' },
  { level: 3, label: 'Moderate', color: 'bg-orange-300' },
  { level: 4, label: 'Poor', color: 'bg-red-400' },
  { level: 5, label: 'Very Poor', color: 'bg-purple-500' },
];

const getAqiLevel = (aqi) => {
  const found = AQI_LEVELS.find(l => l.level === aqi);
  return found ? found.label : 'Unknown';
};

const getAqiColor = (aqi) => {
  const found = AQI_LEVELS.find(l => l.level === aqi);
  return found ? found.color : 'bg-gray-300';
};

const AirPollutionExtras = () => {
  // Facts carousel
  const [factIdx, setFactIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setFactIdx(idx => (idx + 1) % FACTS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  // AQI data for cities
  const [aqiData, setAqiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAqi = async () => {
      setLoading(true);
      const results = await Promise.all(CITIES.map(async city => {
        try {
          const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${OWM_API_KEY}`);
          const data = await res.json();
          return { ...city, aqi: data.list?.[0]?.main?.aqi || null };
        } catch {
          return { ...city, aqi: null };
        }
      }));
      setAqiData(results);
      setLoading(false);
    };
    fetchAqi();
  }, []);

  // Custom marker icon
  const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  // Leaderboard sort
  const sortedAqi = [...aqiData].filter(c => c.aqi).sort((a, b) => a.aqi - b.aqi);

  return (
    <div className="w-full flex flex-col items-center mt-16">
      {/* Facts Carousel */}
      <div className="w-full max-w-2xl mb-6">
        <div className="bg-blue-100 text-blue-800 rounded-lg px-4 py-3 font-semibold shadow text-center text-lg transition-all min-h-[56px]">
          {FACTS[factIdx]}
        </div>
      </div>
      {/* Live AQI Map */}
      <div className="w-full max-w-2xl h-72 mb-10 rounded-xl overflow-hidden shadow-lg bg-white">
        <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {aqiData.map(city => city.aqi && (
            <Marker key={city.name} position={[city.lat, city.lon]} icon={markerIcon}>
              <Popup>
                <div className="font-bold">{city.name}, {city.country}</div>
                <div className={`inline-block px-2 py-1 rounded text-white text-sm ${getAqiColor(city.aqi)}`}>AQI: {city.aqi} ({getAqiLevel(city.aqi)})</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {/* AQI Leaderboard */}
      <div className="w-full max-w-2xl mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Global AQI Leaderboard</h2>
        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">City</th>
                <th className="py-2">Country</th>
                <th className="py-2">AQI</th>
                <th className="py-2">Level</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
              ) : sortedAqi.map(city => (
                <tr key={city.name} className="border-b last:border-0">
                  <td className="py-2 font-semibold">{city.name}</td>
                  <td className="py-2">{city.country}</td>
                  <td className={`py-2 font-bold ${getAqiColor(city.aqi)} text-white text-center rounded`}>{city.aqi}</td>
                  <td className="py-2">{getAqiLevel(city.aqi)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AirPollutionExtras; 