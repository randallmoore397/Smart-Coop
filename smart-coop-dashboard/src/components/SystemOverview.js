import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { ServerIcon, UsersIcon, ChartBarIcon, ExclamationTriangleIcon, CogIcon, ShieldCheckIcon, ArrowUpIcon, ArrowDownIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const SystemOverview = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const systemMetrics = [
    { title: 'Total Farmers', value: '24', change: '+12%', trend: 'up', icon: UsersIcon, color: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { title: 'Active Systems', value: '18', change: '+8%', trend: 'up', icon: ServerIcon, color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { title: 'Total Revenue', value: '$12,450', change: '+15%', trend: 'up', icon: ChartBarIcon, color: 'bg-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { title: 'System Health', value: '98%', change: '+2%', trend: 'up', icon: ShieldCheckIcon, color: 'bg-emerald-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' }
  ];

  const systemStatus = [
    { name: 'Online', value: 85, color: '#10b981' },
    { name: 'Maintenance', value: 10, color: '#f59e0b' },
    { name: 'Offline', value: 5, color: '#ef4444' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 8500, farmers: 18 },
    { month: 'Feb', revenue: 9200, farmers: 20 },
    { month: 'Mar', revenue: 10100, farmers: 22 },
    { month: 'Apr', revenue: 11800, farmers: 23 },
    { month: 'May', revenue: 12450, farmers: 24 },
    { month: 'Jun', revenue: 13200, farmers: 24 }
  ];

  const alerts = [
    { type: 'warning', message: '3 systems require maintenance', time: '2 hours ago' },
    { type: 'info', message: 'New farmer registered', time: '4 hours ago' },
    { type: 'error', message: 'System backup failed', time: '1 day ago' }
  ];

  const recentActivity = [
    { action: 'New farmer registration', user: 'Green Valley Farm', time: '2 hours ago' },
    { action: 'System maintenance completed', user: 'System', time: '4 hours ago' },
    { action: 'Revenue report generated', user: 'Admin', time: '6 hours ago' },
    { action: 'Equipment assigned', user: 'Sunny Acres', time: '8 hours ago' }
  ];

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">System Overview</h1>
        <p className="text-sm sm:text-base text-slate-600">Monitor and manage the entire smart coop ecosystem</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                  <metric.icon className={`w-5 h-5 ${metric.textColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</h3>
                <p className="text-sm text-slate-600 mb-2">{metric.title}</p>
                <div className="flex items-center gap-1">
                  {metric.trend === 'up' ? (
                    <ArrowUpIcon className="w-3 h-3 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change} from last month
                  </span>
                </div>
              </div>
              <div className={`w-16 h-16 ${metric.color} rounded-full flex items-center justify-center opacity-10`}>
                <metric.icon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="bg-white p-1 rounded-lg border border-slate-200 inline-flex shadow-sm overflow-x-auto">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 sm:px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                timeRange === range
                  ? 'bg-primary-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-primary-blue hover:bg-blue-50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Revenue & Growth</h3>
              <p className="text-sm text-slate-500 mt-1">Monthly performance trends</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-slate-500">Revenue</span>
              <div className="w-3 h-3 bg-green-500 rounded-full ml-2"></div>
              <span className="text-xs text-slate-500">Farmers</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="farmersGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#revenueGradient)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="farmers"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#farmersGradient)"
                  name="Farmers"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">System Status</h3>
              <p className="text-sm text-slate-500 mt-1">Current system distribution</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900">18</p>
              <p className="text-xs text-slate-500">Active Systems</p>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={systemStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {systemStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold text-slate-900">
                  18
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {systemStatus.map((status, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                <span className="text-xs text-slate-600">{status.name}</span>
                <span className="text-xs font-medium text-slate-900">{status.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-4 sm:p-6 shadow-sm border border-slate-200 mb-6 sm:mb-8">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-gold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md">
            <UsersIcon className="w-4 h-4" />
            Add New Farmer
          </button>
          <button className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-gold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md">
            <ChartBarIcon className="w-4 h-4" />
            Generate Report
          </button>
          <button className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-gold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md">
            <CogIcon className="w-4 h-4" />
            System Settings
          </button>
          <button className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-gold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md">
            <ExclamationTriangleIcon className="w-4 h-4" />
            View Alerts
          </button>
        </div>
      </div>

      {/* Bottom Row: Alerts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">System Alerts</h3>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto">
              {alerts.filter(a => a.type === 'error').length} Critical
            </span>
          </div>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 border-l-4 rounded-r-lg flex items-start gap-3 ${
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                alert.type === 'error' ? 'bg-red-50 border-red-400' :
                'bg-blue-50 border-blue-400'
              }`}>
                <ExclamationTriangleIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  alert.type === 'warning' ? 'text-yellow-600' :
                  alert.type === 'error' ? 'text-red-600' :
                  'text-blue-600'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <ClockIcon className="w-3 h-3 text-slate-400" />
                    <p className="text-xs text-slate-500">{alert.time}</p>
                  </div>
                </div>
                {alert.type === 'error' && (
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Resolve
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 lg:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Recent Activity</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium self-start sm:self-auto">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-4 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 text-sm">{activity.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-slate-600">{activity.user}</p>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;