import React, { useContext } from 'react';
import { AppContext } from '../context/context';

const TopBar = () => {
  const { userData } = useContext(AppContext);

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-white shadow-sm border-b border-gray-200 flex items-center px-4 sm:px-8">
      <div className="flex-1" />
      <div className="flex items-center gap-3 ml-auto">
        <span className="text-blue-500 font-medium">
          {userData ? userData.name : 'User'}
        </span>
      </div>
    </header>
  );
};

export default TopBar; 