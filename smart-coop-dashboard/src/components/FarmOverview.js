import React from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { HomeIcon, ShoppingBagIcon, ClipboardDocumentListIcon, CogIcon, ChartBarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const FarmOverview = () => {
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

  const revenueData = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1100 },
    { month: 'Mar', revenue: 1300 },
    { month: 'Apr', revenue: 1400 },
    { month: 'May', revenue: 1250 },
    { month: 'Jun', revenue: 1350 }
  ];

  const alerts = [
    { type: 'warning', message: 'Feed level below 80%', time: '2 hours ago' },
    { type: 'info', message: 'New order received', time: '1 hour ago' }
  ];

  return (
    <div className="flex-1 p-8 bg-green-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Farm Overview</h1>
        <p className="text-slate-600">Welcome to your smart coop dashboard</p>
      </div>

      {/* Top Row: Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🥚</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">42</h3>
              <p className="text-sm text-slate-500">Today's Eggs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">$1,350</h3>
              <p className="text-sm text-slate-500">Monthly Revenue</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <ClipboardDocumentListIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">3</h3>
              <p className="text-sm text-slate-500">Pending Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CogIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">98%</h3>
              <p className="text-sm text-slate-500">System Health</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Egg Production</h3>
              <p className="text-sm text-slate-500 mt-1">This week</p>
            </div>
          </div>
          <div className="h-64">
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

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Revenue Trend</h3>
              <p className="text-sm text-slate-500 mt-1">Last 6 months</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Feed Levels + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
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
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">System Alerts</h3>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-xl flex items-start gap-3 ${
                alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'
              }`}>
                <ExclamationTriangleIcon className={`w-5 h-5 mt-0.5 ${
                  alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm font-medium text-green-800">All systems operational</p>
              <p className="text-xs text-green-600 mt-1">Last checked: 5 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmOverview;