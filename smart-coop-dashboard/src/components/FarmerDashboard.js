import React from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { HomeIcon, ShoppingBagIcon, ClipboardDocumentListIcon, CogIcon } from '@heroicons/react/24/outline';

const FarmerDashboard = () => {
  const eggProductionData = [
    { name: 'Mon', eggs: 42 },
    { name: 'Tue', eggs: 38 },
    { name: 'Wed', eggs: 45 },
    { name: 'Thu', eggs: 41 },
    { name: 'Fri', eggs: 47 },
    { name: 'Sat', eggs: 44 },
    { name: 'Sun', eggs: 39 }
  ];

  const feedData = [
    { name: 'Week 1', feed: 85 },
    { name: 'Week 2', feed: 92 },
    { name: 'Week 3', feed: 78 },
    { name: 'Week 4', feed: 88 }
  ];

  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-12 pb-12 bg-green-50 overflow-y-auto">
      {/* Top Row: Farm Metrics + Production Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-10">
        {/* Left Column - Farm Metrics */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🐔</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">50</h3>
                  <p className="text-sm opacity-90">My Chickens</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-6 rounded-2xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🥚</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">42</h3>
                  <p className="text-sm opacity-90">Today's Eggs</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ClipboardDocumentListIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">3</h3>
                  <p className="text-sm opacity-90">Pending Orders</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CogIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">100%</h3>
                  <p className="text-sm opacity-90">Equipment Status</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Production Chart */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-green-200 mt-6 lg:mt-0">
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Egg Production</h3>
              <p className="text-sm text-slate-500 mt-1">This week</p>
            </div>
          </div>
          <div className="h-48 sm:h-56 lg:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={eggProductionData}>
                <Line 
                  type="monotone" 
                  dataKey="eggs" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Row: Feed Levels + Customer Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 lg:mb-10">
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-green-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Feed & Water Levels</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700">Feed Hopper</span>
                <span className="text-sm text-slate-500">85%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700">Water Tank</span>
                <span className="text-sm text-slate-500">92%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-700">Grit Dispenser</span>
                <span className="text-sm text-slate-500">67%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full">
                <div className="h-full bg-yellow-500 rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-green-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Customer Orders</h3>
            <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium self-start">3 Pending</span>
          </div>
          <div className="space-y-4">
            {[
              { customer: 'Sarah Johnson', order: '2 dozen eggs', delivery: 'Tomorrow 9AM', amount: '$12.00' },
              { customer: 'Mike Chen', order: '1 dozen eggs', delivery: 'Today 3PM', amount: '$6.00' },
              { customer: 'Emma Davis', order: '3 dozen eggs', delivery: 'Friday 10AM', amount: '$18.00' }
            ].map((order, index) => (
              <div key={index} className="p-4 border border-green-200 rounded-xl bg-green-50">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-slate-900">{order.customer}</p>
                  <span className="text-green-600 font-semibold">{order.amount}</span>
                </div>
                <p className="text-sm text-slate-600 mb-1">{order.order}</p>
                <p className="text-xs text-slate-500">Delivery: {order.delivery}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Equipment Status + Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-green-200">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Equipment Status</h3>
          <div className="space-y-4">
            {[
              { device: 'Automatic Door', status: 'Active', lastAction: 'Opened at 6:30 AM' },
              { device: 'Feed Dispenser', status: 'Active', lastAction: 'Fed at 7:00 AM' },
              { device: 'Water System', status: 'Active', lastAction: 'Refilled 2h ago' },
              { device: 'Egg Counter', status: 'Active', lastAction: 'Counted 42 eggs today' }
            ].map((equipment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">{equipment.device}</p>
                  <p className="text-sm text-slate-500">{equipment.lastAction}</p>
                </div>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                  {equipment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-green-200">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">Weather & Alerts</h3>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6 rounded-xl text-white mb-4 sm:mb-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">☀️</span>
              <div>
                <p className="text-2xl font-bold">72°F</p>
                <p className="text-sm opacity-90">Sunny, Perfect for free-range</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <span className="text-green-500">✓</span>
              <p className="text-sm text-slate-700">All systems operational</p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
              <span className="text-yellow-500">⚠</span>
              <p className="text-sm text-slate-700">Feed level below 70% - refill soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;