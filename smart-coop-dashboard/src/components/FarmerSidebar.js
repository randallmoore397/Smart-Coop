import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  CogIcon,
  ChartBarIcon,
  ShoppingBagIcon,
  CameraIcon,
  ClipboardDocumentListIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const FarmerSidebar = ({ onClose }) => {
  const location = useLocation();

  const menuItems = [
    { icon: HomeIcon, label: 'Farm Overview', path: '/farmer/farm-overview' },
    { icon: CogIcon, label: 'Door Automation', path: '/farmer/door-automation' },
    { icon: ChartBarIcon, label: 'Feed & Water', path: '/farmer/feed-water' },
    { icon: ShoppingBagIcon, label: 'Egg Production', path: '/farmer/egg-production' },
    { icon: ClipboardDocumentListIcon, label: 'Customer Orders', path: '/farmer/customer-orders', badge: '3' },
    { icon: CameraIcon, label: 'My Products', path: '/farmer/my-products' }
  ];

  const farmItems = [
    { icon: CogIcon, label: 'Settings', path: '/farmer/settings' },
    { icon: HomeIcon, label: 'Farm Profile', path: '/farmer/farm-profile' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-72 h-full bg-gradient-to-b from-green-600 to-green-700 p-8">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">🌾</span>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">Smart Coop</h2>
            <p className="text-green-100 text-xs">Green Valley Farm</p>
          </div>
        </div>
        <Bars3Icon className="w-5 h-5 text-green-200 cursor-pointer" />
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} onClick={onClose} className={`flex items-center px-4 py-3 rounded-xl transition-all ${
            isActive(item.path)
              ? 'bg-white/20 text-white shadow-lg shadow-black/10'
              : 'text-green-100 hover:bg-white/10 hover:text-white'
          }`}>
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
        
        <div className="pt-8 mt-8 border-t border-green-500">
          <div className="text-green-300 text-xs font-semibold uppercase tracking-wider px-4 pb-3">
            Farm
          </div>
          {farmItems.map((item, index) => (
            <Link key={index} to={item.path} onClick={onClose} className={`flex items-center px-4 py-3 rounded-xl transition-all ${
              isActive(item.path)
                ? 'bg-white/20 text-white shadow-lg shadow-black/10'
                : 'text-green-100 hover:bg-white/10 hover:text-white'
            }`}>
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default FarmerSidebar;