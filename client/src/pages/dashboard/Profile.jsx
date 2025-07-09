import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/context';

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
}

const Profile = () => {
  const { userData } = useContext(AppContext);
  const name = userData?.name || 'User';
  const email = userData?.email || 'unknown@email.com';
  const joinDate = userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A';
  const id = userData?.id || 'N/A';
  const avatarBg = stringToColor(name + email);
  const avatarLetter = name.charAt(0).toUpperCase();

  const [location, setLocation] = useState('Unknown');
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState('');

  const handleDetectLocation = () => {
    setLocLoading(true);
    setLocError('');
    if (!navigator.geolocation) {
      setLocError('Geolocation is not supported by your browser.');
      setLocLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Use OpenStreetMap Nominatim API (no key required, but rate-limited)
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.village || data.address?.state || 'Unknown';
          setLocation(city);
        } catch (err) {
          setLocError('Could not fetch city.');
        } finally {
          setLocLoading(false);
        }
      },
      (err) => {
        setLocError('Could not get your location.');
        setLocLoading(false);
      }
    );
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8 flex flex-col items-center gap-6">
      <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg" style={{ background: avatarBg }}>
        {avatarLetter}
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-500">{email}</p>
        <p className="text-gray-400 text-sm">User ID: <span className="font-mono">{id}</span></p>
        <p className="text-gray-400 text-sm">Joined: {joinDate}</p>
      </div>
      <div className="w-full mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">More Info</h3>
        <ul className="text-gray-600 space-y-1">
          <li><span className="font-medium">Role:</span> <span className="italic">User</span></li>
          <li className="flex items-center gap-2">
            <span className="font-medium">Location:</span>
            <span className="italic">{location}</span>
            <button
              onClick={handleDetectLocation}
              className="ml-2 px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded transition-colors duration-200"
              disabled={locLoading}
            >
              {locLoading ? 'Detecting...' : 'Detect Location'}
            </button>
          </li>
          {locError && <li className="text-red-500 text-xs">{locError}</li>}
          <li><span className="font-medium">Status:</span> <span className="italic">Active</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Profile; 