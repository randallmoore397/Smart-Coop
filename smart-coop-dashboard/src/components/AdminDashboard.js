import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { BuildingOfficeIcon, CogIcon, CurrencyDollarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const revenueData = [
    { name: 'Jan', value: 45000 },
    { name: 'Feb', value: 52000 },
    { name: 'Mar', value: 48000 },
    { name: 'Apr', value: 61000 },
    { name: 'May', value: 55000 },
    { name: 'Jun', value: 67000 }
  ];

  const farmGrowthData = [
    { name: 'Q1', farms: 12 },
    { name: 'Q2', farms: 19 },
    { name: 'Q3', farms: 28 },
    { name: 'Q4', farms: 45 }
  ];

  return (
    <div className="flex-1 px-12 pb-12 bg-slate-50 overflow-y-auto">
      {/* Top Row: System Metrics + Revenue Chart */}
      <div className="grid grid-cols-3 gap-8 mb-10">
        {/* Left Column - System Metrics */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <BuildingOfficeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">45</h3>
                  <p className="text-sm opacity-90">Total Farms</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CogIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">180</h3>
                  <p className="text-sm opacity-90">Active Devices</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CurrencyDollarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">$67K</h3>
                  <p className="text-sm opacity-90">Monthly Revenue</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ExclamationTriangleIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">98%</h3>
                  <p className="text-sm opacity-90">System Health</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Revenue Chart */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Platform Revenue</h3>
              <p className="text-sm text-slate-500 mt-1">Last 6 months</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Row: Farm Growth + Top Farms */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Farm Growth</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={farmGrowthData}>
                <Bar dataKey="farms" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-semibold text-slate-900">Top Performing Farms</h3>
            <div className="text-slate-400">⋯</div>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Green Valley Farm', revenue: '$12,450', growth: '+15%' },
              { name: 'Sunrise Poultry', revenue: '$9,800', growth: '+12%' },
              { name: 'Happy Hens Co.', revenue: '$8,200', growth: '+8%' },
              { name: 'Farm Fresh Eggs', revenue: '$7,650', growth: '+5%' }
            ].map((farm, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">{farm.name}</p>
                  <p className="text-sm text-slate-500">{farm.revenue}</p>
                </div>
                <span className="text-emerald-600 text-sm font-semibold">{farm.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Support Tickets + System Status */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-semibold text-slate-900">Recent Support Tickets</h3>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">12 Active</span>
          </div>
          <div className="space-y-4">
            {[
              { farmer: 'John Smith', issue: 'Door automation not working', priority: 'High', time: '2h ago' },
              { farmer: 'Sarah Johnson', issue: 'Feed sensor calibration', priority: 'Medium', time: '4h ago' },
              { farmer: 'Mike Wilson', issue: 'Egg counter accuracy', priority: 'Low', time: '1d ago' }
            ].map((ticket, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-slate-900">{ticket.farmer}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.priority === 'High' ? 'bg-red-100 text-red-600' :
                    ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{ticket.issue}</p>
                <p className="text-xs text-slate-400">{ticket.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">System Status</h3>
          <div className="space-y-4">
            {[
              { service: 'IoT Device Network', status: 'Operational', uptime: '99.9%' },
              { service: 'Data Processing', status: 'Operational', uptime: '99.8%' },
              { service: 'Mobile App API', status: 'Operational', uptime: '99.7%' },
              { service: 'Payment System', status: 'Maintenance', uptime: '98.2%' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">{service.service}</p>
                  <p className="text-sm text-slate-500">Uptime: {service.uptime}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  service.status === 'Operational' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {service.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;