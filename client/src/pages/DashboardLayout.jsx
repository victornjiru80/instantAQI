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
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <Sidebar />
      <div className="flex flex-col min-h-screen pl-16 sm:pl-44 lg:pl-0">
        <TopBar />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 