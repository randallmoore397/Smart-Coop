import React, { useState } from 'react';
import { MagnifyingGlassIcon, BellIcon, ChevronDownIcon, ArrowPathIcon, UserIcon, CogIcon, ArrowRightOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const RoleHeader = ({ onMenuClick }) => {
  const { user, switchRole, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getSettingsPath = () => {
    return user.role === 'admin' ? '/admin/system-settings' : '/farmer/settings';
  };

  const getProfilePath = () => {
    return user.role === 'admin' ? '/admin/user-management' : '/farmer/farm-profile';
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8 bg-white border-b border-slate-200">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Bars3Icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
        </button>

        <h1 className="hidden sm:block text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
          {user.role === 'admin' ? 'System Overview' : 'Farm Overview'}
        </h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
        <div className="relative hidden sm:block">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 lg:w-80 pl-12 pr-5 py-3 bg-slate-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:bg-white transition-all"
          />
        </div>

        <button className="relative w-11 h-11 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-center transition-colors">
          <BellIcon className="w-5 h-5 text-slate-600" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 rounded-xl px-3 py-2 transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-900 text-sm">{user.name}</p>
              <p className="text-xs text-slate-500">
                {user.role === 'admin' ? 'System Administrator' : user.farmName}
              </p>
            </div>
            <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
              <Link
                to={getProfilePath()}
                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <UserIcon className="w-4 h-4" />
                Profile
              </Link>
              <Link
                to={getSettingsPath()}
                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <CogIcon className="w-4 h-4" />
                Settings
              </Link>
              <hr className="my-2 border-slate-200" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default RoleHeader;