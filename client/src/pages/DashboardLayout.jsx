import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const { isLoggedIn, authLoading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, authLoading, navigate]);

  if (authLoading) {
    return <div className="flex h-screen items-center justify-center w-full"><div className="text-gray-500 text-lg">Loading...</div></div>;
  }

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 bg-gray-100 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 