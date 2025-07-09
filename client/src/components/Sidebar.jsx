import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Home, Gauge, MessageCircle, UserPlus, User, Settings, LogOut } from 'lucide-react';

const navLinks = [
  { to: '/dashboard/home', label: 'Home', icon: <Home size={20} /> },
  { to: '/dashboard/aqi', label: 'AQI', icon: <Gauge size={20} /> },
  { to: '/dashboard/chat', label: 'Chat', icon: <MessageCircle size={20} /> },
  { to: '/dashboard/invite', label: 'Invite', icon: <UserPlus size={20} /> },
  { to: '/dashboard/profile', label: 'Profile', icon: <User size={20} /> },
  { to: '/dashboard/settings', label: 'Settings', icon: <Settings size={20} /> },
];

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
    <aside className="h-full bg-white text-gray-800 flex flex-col p-2 border-r border-gray-200 justify-between transition-all duration-300
      w-16 sm:w-44
      ">
      <div>
        <h2 className="text-lg font-bold text-muted-foreground mb-8">
          <span className="hidden sm:inline">InstantAQI</span>
          <span className="inline sm:hidden">IA</span>
        </h2>
        <nav className="flex flex-col gap-4">
          {navLinks.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-100
                ${isActive ? 'font-bold text-blue-500 bg-gray-100' : 'text-gray-700'}
                `
              }
            >
              <span>{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-2 rounded-lg font-medium transition-colors duration-200 mb-2 shadow-sm w-full justify-center sm:justify-start"
      >
        <LogOut size={20} />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar; 