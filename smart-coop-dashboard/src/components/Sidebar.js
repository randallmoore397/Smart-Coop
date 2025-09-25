import React from 'react';
import { 
  HomeIcon, 
  CubeIcon, 
  ChartBarIcon, 
  ClipboardDocumentListIcon, 
  ChartPieIcon, 
  ChatBubbleLeftIcon,
  UserIcon,
  CogIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', active: true },
    { icon: CubeIcon, label: 'Product Stock' },
    { icon: ChartBarIcon, label: 'Revenue' },
    { icon: ClipboardDocumentListIcon, label: 'Orders' },
    { icon: ChartPieIcon, label: 'Statistics' },
    { icon: ChatBubbleLeftIcon, label: 'Message', badge: '7' }
  ];

  const systemItems = [
    { icon: UserIcon, label: 'Profile' },
    { icon: CogIcon, label: 'Settings' }
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-purple-500 to-purple-700 rounded-l-3xl p-8">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white text-lg font-semibold">Dashboard</h2>
        </div>
        <Bars3Icon className="w-5 h-5 text-white/80 cursor-pointer" />
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <div key={index} className={`flex items-center px-5 py-4 rounded-2xl cursor-pointer transition-all ${
            item.active 
              ? 'bg-white/15 text-white' 
              : 'text-white/70 hover:bg-white/10 hover:text-white/90'
          }`}>
            <item.icon className="w-5 h-5 mr-4" />
            <span className="text-sm font-medium">{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                {item.badge}
              </span>
            )}
          </div>
        ))}
        
        <div className="pt-10 mt-10 border-t border-white/10">
          <div className="text-white/50 text-xs font-semibold uppercase tracking-wider px-5 pb-4">
            System
          </div>
          {systemItems.map((item, index) => (
            <div key={index} className="flex items-center px-5 py-4 rounded-2xl cursor-pointer transition-all text-white/70 hover:bg-white/10 hover:text-white/90">
              <item.icon className="w-5 h-5 mr-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;