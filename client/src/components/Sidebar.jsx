import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import axios from 'axios';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const { backendUrl, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post(`${backendUrl}/api/logout`);
      setIsLoggedIn(false);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoggedIn(false);
      navigate('/');
    }
  };

  return (
    <aside className="w-44 h-full bg-white text-gray-800 flex flex-col p-4 border-r border-gray-200 justify-between">
      <div>
        <h2 className="text-lg font-bold text-muted-foreground mb-8">InstantAQI</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="/dashboard/home" className={({isActive}) => isActive ? 'font-bold text-blue-500' : ''}>Home</NavLink>
          <NavLink to="/dashboard/profile" className={({isActive}) => isActive ? 'font-bold text-blue-500' : ''}>Profile</NavLink>
          <NavLink to="/dashboard/settings" className={({isActive}) => isActive ? 'font-bold text-blue-500' : ''}>Settings</NavLink>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 mb-2 shadow-sm"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar; 