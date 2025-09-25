import React from 'react';
import { MagnifyingGlassIcon, BellIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-12 py-10 bg-white">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <div className="flex items-center gap-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-72 pl-12 pr-5 py-3 bg-gray-50 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
          <span>EN</span>
          <ChevronDownIcon className="w-4 h-4" />
        </button>
        <button className="relative w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
          <BellIcon className="w-5 h-5 text-gray-600" />
          <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>
      </div>
    </header>
  );
};

export default Header;