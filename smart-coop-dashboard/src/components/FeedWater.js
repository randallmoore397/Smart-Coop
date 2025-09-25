import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ExclamationTriangleIcon, ClockIcon, CogIcon, BellIcon } from '@heroicons/react/24/outline';

const FeedWater = () => {
  const [feedSchedule, setFeedSchedule] = useState([
    { time: '06:00', amount: '200g', enabled: true },
    { time: '12:00', amount: '150g', enabled: true },
    { time: '18:00', amount: '200g', enabled: true }
  ]);

  const [waterSchedule, setWaterSchedule] = useState([
    { time: '07:00', amount: '2L', enabled: true },
    { time: '15:00', amount: '1.5L', enabled: true }
  ]);

  const consumptionData = [
    { name: 'Mon', feed: 450, water: 8 },
    { name: 'Tue', feed: 520, water: 9 },
    { name: 'Wed', feed: 480, water: 7.5 },
    { name: 'Thu', feed: 510, water: 8.5 },
    { name: 'Fri', feed: 490, water: 8 },
    { name: 'Sat', feed: 460, water: 7 },
    { name: 'Sun', feed: 430, water: 6.5 }
  ];

  const weeklyData = [
    { name: 'Week 1', feed: 3200, water: 56 },
    { name: 'Week 2', feed: 3400, water: 58 },
    { name: 'Week 3', feed: 3100, water: 52 },
    { name: 'Week 4', feed: 3300, water: 55 }
  ];

  const levelData = [
    { name: 'Feed Hopper', level: 75, capacity: 100, color: '#10b981' },
    { name: 'Water Tank', level: 85, capacity: 200, color: '#3b82f6' },
    { name: 'Grit Dispenser', level: 45, capacity: 50, color: '#f59e0b' }
  ];

  const alerts = [
    { type: 'warning', message: 'Feed level below 80%', time: '2 hours ago' },
    { type: 'info', message: 'Water tank refilled automatically', time: '5 hours ago' }
  ];

  const toggleSchedule = (type, index) => {
    if (type === 'feed') {
      const newSchedule = [...feedSchedule];
      newSchedule[index].enabled = !newSchedule[index].enabled;
      setFeedSchedule(newSchedule);
    } else {
      const newSchedule = [...waterSchedule];
      newSchedule[index].enabled = !newSchedule[index].enabled;
      setWaterSchedule(newSchedule);
    }
  };

  return (
    <div className="flex-1 p-8 bg-green-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Feed & Water Management</h1>
        <p className="text-slate-600">Monitor and control feed and water systems</p>
      </div>

        {/* Level Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                📊
              </span>
              Current Levels
            </h2>
            <div className="space-y-6">
              {levelData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-700">{item.name}</span>
                    <span className="text-sm text-slate-500">{item.level}{item.capacity === 100 ? '%' : 'L'}</span>
                  </div>
                  <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(item.level / item.capacity) * 100}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>0{item.capacity === 100 ? '%' : 'L'}</span>
                    <span>{item.capacity}{item.capacity === 100 ? '%' : 'L'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refill Alerts */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <BellIcon className="w-6 h-6 text-orange-500" />
              Refill Alerts
            </h2>
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

        {/* Consumption Tracking */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Daily Consumption</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={consumptionData}>
                  <Line
                    type="monotone"
                    dataKey="feed"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Feed (g)"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="water"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Water (L)"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Weekly Overview</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <Bar dataKey="feed" fill="#10b981" name="Feed (g)" />
                  <Bar dataKey="water" fill="#3b82f6" name="Water (L)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Schedule Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feed Schedule */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <ClockIcon className="w-6 h-6 text-green-500" />
              Feed Schedule
            </h2>
            <div className="space-y-4">
              {feedSchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <ClockIcon className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{schedule.time}</p>
                      <p className="text-sm text-slate-600">{schedule.amount}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSchedule('feed', index)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      schedule.enabled ? 'bg-green-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        schedule.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition-colors">
              Add Feed Time
            </button>
          </div>

          {/* Water Schedule */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <CogIcon className="w-6 h-6 text-blue-500" />
              Water Schedule
            </h2>
            <div className="space-y-4">
              {waterSchedule.map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <ClockIcon className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="font-medium text-slate-900">{schedule.time}</p>
                      <p className="text-sm text-slate-600">{schedule.amount}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSchedule('water', index)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      schedule.enabled ? 'bg-blue-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        schedule.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors">
              Add Water Time
            </button>
          </div>
      </div>
    </div>
  );
};

export default FeedWater;