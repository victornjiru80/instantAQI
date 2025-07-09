import React, { useEffect, useState } from 'react';
import { getAirQuality, getAirQualityByCoords, reverseGeocode } from '../../components/AirQuality';
import { toast } from 'react-toastify';
import { RefreshCw, CloudSun, MapPin } from 'lucide-react';
import HealthRecommendations from '../../components/HealthRecommendations';
import PreventiveStrategies from '../../components/PreventiveStrategies';

const AQI_LEVELS = [
  { level: 1, label: 'Good', color: 'bg-green-400', desc: 'Air quality is considered satisfactory.' },
  { level: 2, label: 'Fair', color: 'bg-yellow-300', desc: 'Air quality is acceptable.' },
  { level: 3, label: 'Moderate', color: 'bg-orange-300', desc: 'Sensitive groups should limit outdoor exertion.' },
  { level: 4, label: 'Poor', color: 'bg-red-400', desc: 'Everyone may begin to experience health effects.' },
  { level: 5, label: 'Very Poor', color: 'bg-purple-500', desc: 'Health warnings of emergency conditions.' },
];

const AQI = () => {
  const [city, setCity] = useState('');
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [geoAqi, setGeoAqi] = useState(null);
  const [geoLoading, setGeoLoading] = useState(true);
  const [geoError, setGeoError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [geoCity, setGeoCity] = useState('');
  const [geoState, setGeoState] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      setGeoLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setGeoLoading(true);
        setGeoError('');
        try {
          const { latitude, longitude } = pos.coords;
          const data = await getAirQualityByCoords(latitude, longitude);
          setGeoAqi(data);
          // Fetch city and state
          const { name, state } = await reverseGeocode(latitude, longitude);
          setGeoCity(name);
          setGeoState(state);
        } catch (err) {
          setGeoError('Failed to fetch AQI for your location.');
        } finally {
          setGeoLoading(false);
        }
      },
      (err) => {
        setGeoError('Location permission denied or unavailable.');
        setGeoLoading(false);
      }
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAqiData(null);
    setLoading(true);
    try {
      const data = await getAirQuality(city);
      setAqiData(data);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch AQI');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Refresh geolocation AQI
      if (geoAqi && geoAqi.lat && geoAqi.lon) {
        try {
          const data = await getAirQualityByCoords(geoAqi.lat, geoAqi.lon);
          setGeoAqi(data);
          // Refresh city name
          const cityName = await reverseGeocode(geoAqi.lat, geoAqi.lon);
          setGeoCity(cityName);
        } catch {}
      }
      // Refresh searched city AQI
      if (city) {
        try {
          const data = await getAirQuality(city);
          setAqiData(data);
        } catch {}
      }
      toast.success('AQI refreshed!');
    } catch (err) {
      toast.error('Failed to refresh AQI');
    } finally {
      setRefreshing(false);
    }
  };

  const aqiLevel = (aqi) => {
    const found = AQI_LEVELS.find(l => l.level === aqi);
    return found ? found.label : 'Unknown';
  };

  const aqiColor = (aqi) => {
    const found = AQI_LEVELS.find(l => l.level === aqi);
    return found ? found.color : 'bg-gray-300';
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-blue-50 to-green-50 py-8 px-2 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-xl p-6 relative">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-500 flex items-center gap-2">
              Air Quality Index (AQI)
        </h1>
        {/* Geolocation AQI Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-500 flex items-center gap-2">
            <MapPin className="text-blue-400" size={20} /> Your Location
            {(geoCity || geoState) && (
              <span className="ml-2 text-blue-600 font-bold">(
                {geoCity}{geoCity && geoState ? ', ' : ''}{geoState}
              )</span>
            )}
          </h2>
          {geoLoading ? (
            <div className="text-gray-500">Detecting your location...</div>
          ) : geoError ? (
            <div className="text-red-500">{geoError}</div>
          ) : geoAqi && geoAqi.list && geoAqi.list.length > 0 ? (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col gap-2 shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className={`font-bold text-lg px-3 py-1 rounded-lg ${aqiColor(geoAqi.list[0].main.aqi)} text-white`}>AQI: {geoAqi.list[0].main.aqi}</span>
                <span className="text-base font-semibold text-gray-700">({aqiLevel(geoAqi.list[0].main.aqi)})</span>
                <span className="text-xs text-gray-500">({geoAqi.lat}, {geoAqi.lon})</span>
              </div>
              <div>
                <span className="font-bold">Components:</span>
                <ul className="ml-4 list-disc">
                  {Object.entries(geoAqi.list[0].components).map(([key, value]) => (
                    <li key={key}>{key.toUpperCase()}: {value}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </section>
        {/* Search Bar for Other Locations */}
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={e => setCity(e.target.value)}
            className="border px-3 py-2 rounded-lg flex-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 active:bg-blue-700 shadow transition"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get AQI'}
          </button>
        </form>
        {/* AQI Levels Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-1">AQI Levels</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {AQI_LEVELS.map(lvl => (
              <div key={lvl.level} className={`rounded-lg p-3 text-center text-white ${lvl.color} shadow-sm`}>
                <div className="font-bold text-base">{lvl.label}</div>
                <div className="text-xs mt-1">{lvl.desc}</div>
              </div>
            ))}
          </div>
        </section>
        {/* AQI Result */}
        {aqiData && aqiData.list && aqiData.list.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8 flex flex-col gap-2 shadow">
            <h2 className="text-lg font-semibold mb-2 text-blue-800 flex items-center gap-2">
              <CloudSun className="text-yellow-400" size={22} /> Results for <span className="text-blue-600">{city}</span> <span className="text-xs text-gray-500">({aqiData.lat}, {aqiData.lon})</span>
            </h2>
            <div className="flex items-center gap-3 mb-2">
              <span className={`font-bold text-lg px-3 py-1 rounded-lg ${aqiColor(aqiData.list[0].main.aqi)} text-white`}>AQI: {aqiData.list[0].main.aqi}</span>
              <span className="text-base font-semibold text-gray-700">({aqiLevel(aqiData.list[0].main.aqi)})</span>
            </div>
            <div>
              <span className="font-bold">Components:</span>
              <ul className="ml-4 list-disc">
                {Object.entries(aqiData.list[0].components).map(([key, value]) => (
                  <li key={key}>{key.toUpperCase()}: {value}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="border-t my-6" />
        {/* Health Recommendations Section */}
        <HealthRecommendations />
        <div className="border-t my-6" />
        {/* Preventive Strategies Section */}
        <PreventiveStrategies />
        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 active:bg-blue-700 transition flex items-center z-50"
          title="Refresh AQI"
          disabled={refreshing}
        >
          {refreshing ? (
            <svg className="animate-spin h-6 w-6 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 00-10 10h4z"></path></svg>
          ) : (
            <RefreshCw size={24} className="mr-2" />
          )}
          Refresh
        </button>
      </div>
    </div>
  );
};

export default AQI; 