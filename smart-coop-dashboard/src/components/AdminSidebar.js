import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  DocumentChartBarIcon,
  ExclamationTriangleIcon,
  BuildingOfficeIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const AdminSidebar = ({ onClose }) => {
  const location = useLocation();

  const menuItems = [
    { icon: ChartBarIcon, label: 'System Overview', path: '/admin/system-overview' },
    { icon: BuildingOfficeIcon, label: 'Farmer Management', path: '/admin/farmer-management' },
    { icon: CogIcon, label: 'Equipment Monitoring', path: '/admin/equipment-monitoring' },
    { icon: DocumentChartBarIcon, label: 'Sales Analytics', path: '/admin/sales-analytics' },
    { icon: ExclamationTriangleIcon, label: 'Customer Support', path: '/admin/customer-support', badge: '12' },
    { icon: UsersIcon, label: 'Reports', path: '/admin/reports' }
  ];

  const systemItems = [
    { icon: CogIcon, label: 'System Settings', path: '/admin/system-settings' },
    { icon: UsersIcon, label: 'User Management', path: '/admin/user-management' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-72 h-full bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <span className="text-emerald-400 text-xl">🐔</span>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">Smart Coop</h2>
            <p className="text-slate-400 text-xs">Admin Portal</p>
          </div>
        </div>
        <Bars3Icon className="w-5 h-5 text-slate-400 cursor-pointer" />
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path} onClick={onClose} className={`flex items-center px-4 py-3 rounded-xl transition-all ${
            isActive(item.path)
              ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10'
              : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
          }`}>
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
        
        <div className="pt-8 mt-8 border-t border-slate-700">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-4 pb-3">
            System
          </div>
          {systemItems.map((item, index) => (
            <Link key={index} to={item.path} onClick={onClose} className={`flex items-center px-4 py-3 rounded-xl transition-all ${
              isActive(item.path)
                ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
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

export default AdminSidebar;