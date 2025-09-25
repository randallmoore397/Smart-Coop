import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartBarIcon, CalendarIcon, ArrowTrendingUpIcon, EggIcon } from '@heroicons/react/24/outline';

const EggProduction = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const weeklyData = [
    { day: 'Mon', small: 12, medium: 15, large: 10, extraLarge: 5 },
    { day: 'Tue', small: 14, medium: 18, large: 12, extraLarge: 6 },
    { day: 'Wed', small: 16, medium: 20, large: 14, extraLarge: 7 },
    { day: 'Thu', small: 13, medium: 16, large: 11, extraLarge: 4 },
    { day: 'Fri', small: 15, medium: 19, large: 13, extraLarge: 6 },
    { day: 'Sat', small: 17, medium: 22, large: 15, extraLarge: 8 },
    { day: 'Sun', small: 11, medium: 14, large: 9, extraLarge: 3 }
  ];

  const monthlyData = [
    { month: 'Jan', total: 420 },
    { month: 'Feb', total: 380 },
    { month: 'Mar', total: 450 },
    { month: 'Apr', total: 410 },
    { month: 'May', total: 470 },
    { month: 'Jun', total: 440 }
  ];

  const sizeDistribution = [
    { name: 'Small', value: 25, color: '#10b981' },
    { name: 'Medium', value: 35, color: '#3b82f6' },
    { name: 'Large', value: 25, color: '#f59e0b' },
    { name: 'Extra Large', value: 15, color: '#ef4444' }
  ];

  const productionGoals = [
    { period: 'Daily', current: 42, target: 50, unit: 'eggs' },
    { period: 'Weekly', current: 280, target: 300, unit: 'eggs' },
    { period: 'Monthly', current: 1200, target: 1300, unit: 'eggs' }
  ];

  const recentProduction = [
    { date: '2024-09-25', total: 42, small: 10, medium: 18, large: 10, extraLarge: 4 },
    { date: '2024-09-24', total: 38, small: 9, medium: 16, large: 9, extraLarge: 4 },
    { date: '2024-09-23', total: 45, small: 11, medium: 20, large: 11, extraLarge: 3 },
    { date: '2024-09-22', total: 41, small: 10, medium: 17, large: 10, extraLarge: 4 },
    { date: '2024-09-21', total: 47, small: 12, medium: 21, large: 12, extraLarge: 2 }
  ];

  const getCurrentData = () => {
    return selectedPeriod === 'week' ? weeklyData : monthlyData;
  };

  const getTotalProduction = () => {
    if (selectedPeriod === 'week') {
      return weeklyData.reduce((sum, day) => sum + day.small + day.medium + day.large + day.extraLarge, 0);
    }
    return monthlyData.reduce((sum, month) => sum + month.total, 0);
  };

  return (
    <div className="flex-1 p-8 bg-green-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Egg Production</h1>
        <p className="text-slate-600">Monitor and analyze your egg production metrics</p>
      </div>

      {/* Production Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🥚</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">{getTotalProduction()}</h3>
              <p className="text-sm text-slate-500">Total Eggs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <ArrowTrendingUpIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">+12%</h3>
              <p className="text-sm text-slate-500">vs Last Period</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">42</h3>
              <p className="text-sm text-slate-500">Avg Daily</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">95%</h3>
              <p className="text-sm text-slate-500">Efficiency</p>
            </div>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setSelectedPeriod('week')}
          className={`px-6 py-2 rounded-lg font-medium ${
            selectedPeriod === 'week' ? 'bg-green-600 text-white' : 'bg-white text-slate-700 border'
          }`}
        >
          Weekly View
        </button>
        <button
          onClick={() => setSelectedPeriod('month')}
          className={`px-6 py-2 rounded-lg font-medium ${
            selectedPeriod === 'month' ? 'bg-green-600 text-white' : 'bg-white text-slate-700 border'
          }`}
        >
          Monthly View
        </button>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Production Trend</h3>
              <p className="text-sm text-slate-500 mt-1">Egg count over time</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              {selectedPeriod === 'week' ? (
                <LineChart data={weeklyData}>
                  <Line type="monotone" dataKey="small" stroke="#10b981" strokeWidth={2} name="Small" />
                  <Line type="monotone" dataKey="medium" stroke="#3b82f6" strokeWidth={2} name="Medium" />
                  <Line type="monotone" dataKey="large" stroke="#f59e0b" strokeWidth={2} name="Large" />
                  <Line type="monotone" dataKey="extraLarge" stroke="#ef4444" strokeWidth={2} name="Extra Large" />
                </LineChart>
              ) : (
                <BarChart data={monthlyData}>
                  <Bar dataKey="total" fill="#10b981" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Size Distribution</h3>
              <p className="text-sm text-slate-500 mt-1">Egg sizes breakdown</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sizeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sizeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Goals and Recent Production */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Production Goals</h3>
          <div className="space-y-6">
            {productionGoals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-700">{goal.period} Goal</span>
                  <span className="text-sm text-slate-500">{goal.current}/{goal.target} {goal.unit}</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{width: `${Math.min((goal.current / goal.target) * 100, 100)}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>0</span>
                  <span>{goal.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Recent Production</h3>
          <div className="space-y-4">
            {recentProduction.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div>
                  <p className="font-medium text-slate-900">{day.date}</p>
                  <p className="text-sm text-slate-600">Total: {day.total} eggs</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">S:{day.small} M:{day.medium}</p>
                  <p className="text-sm text-slate-500">L:{day.large} XL:{day.extraLarge}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EggProduction;