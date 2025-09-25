import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CogIcon, ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const EquipmentMonitoring = () => {
  const [selectedEquipment, setSelectedEquipment] = useState('all');

  const equipmentData = [
    {
      id: 1,
      name: 'Door Controller v1.0',
      type: 'Door Automation',
      farm: 'Green Valley Farm',
      status: 'online',
      uptime: 98.5,
      lastMaintenance: '2024-08-15',
      battery: 85,
      temperature: 22
    },
    {
      id: 2,
      name: 'Auto Feeder Pro',
      type: 'Feed System',
      farm: 'Sunny Acres',
      status: 'maintenance',
      uptime: 92.1,
      lastMaintenance: '2024-09-01',
      battery: 45,
      temperature: 25
    },
    {
      id: 3,
      name: 'Aqua Monitor',
      type: 'Water System',
      farm: 'Hilltop Coop',
      status: 'online',
      uptime: 99.2,
      lastMaintenance: '2024-07-20',
      battery: 78,
      temperature: 20
    },
    {
      id: 4,
      name: 'Smart Hopper',
      type: 'Feed System',
      farm: 'River Bend Farm',
      status: 'offline',
      uptime: 0,
      lastMaintenance: '2024-09-10',
      battery: 0,
      temperature: 0
    }
  ];

  const performanceData = [
    { time: '00:00', uptime: 98, efficiency: 95 },
    { time: '04:00', uptime: 98, efficiency: 96 },
    { time: '08:00', uptime: 97, efficiency: 94 },
    { time: '12:00', uptime: 98, efficiency: 95 },
    { time: '16:00', uptime: 96, efficiency: 92 },
    { time: '20:00', uptime: 98, efficiency: 96 }
  ];

  const alerts = [
    { id: 1, equipment: 'Auto Feeder Pro', message: 'Low battery - 45%', severity: 'warning', time: '2 hours ago' },
    { id: 2, equipment: 'Smart Hopper', message: 'Device offline', severity: 'error', time: '5 hours ago' },
    { id: 3, equipment: 'Door Controller v1.0', message: 'Maintenance due in 7 days', severity: 'info', time: '1 day ago' }
  ];

  const maintenanceSchedule = [
    { equipment: 'Door Controller v1.0', dueDate: '2024-09-22', type: 'Routine Check', priority: 'Low' },
    { equipment: 'Auto Feeder Pro', dueDate: '2024-09-18', type: 'Battery Replacement', priority: 'High' },
    { equipment: 'Aqua Monitor', dueDate: '2024-10-01', type: 'Sensor Calibration', priority: 'Medium' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'maintenance': return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'offline': return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const filteredEquipment = selectedEquipment === 'all'
    ? equipmentData
    : equipmentData.filter(eq => eq.type.toLowerCase().includes(selectedEquipment.toLowerCase()));

  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Equipment Monitoring</h1>
        <p className="text-slate-600">Monitor and manage all smart coop equipment</p>
      </div>

      {/* Filter and Stats */}
      <div className="flex gap-4 mb-8">
        <select
          value={selectedEquipment}
          onChange={(e) => setSelectedEquipment(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option value="all">All Equipment</option>
          <option value="door">Door Automation</option>
          <option value="feed">Feed Systems</option>
          <option value="water">Water Systems</option>
        </select>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {filteredEquipment.map((equipment) => (
          <div key={equipment.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <CogIcon className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{equipment.name}</h3>
                  <p className="text-sm text-slate-500">{equipment.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(equipment.status)}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(equipment.status)}`}>
                  {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Farm:</span>
                <span className="font-medium">{equipment.farm}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Uptime:</span>
                <span className="font-medium">{equipment.uptime}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Battery:</span>
                <span className="font-medium">{equipment.battery}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Temperature:</span>
                <span className="font-medium">{equipment.temperature}°C</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Last Maintenance:</span>
                <span className="font-medium">{equipment.lastMaintenance}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-slate-600 text-white px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm">
                View Details
              </button>
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Schedule Maintenance
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">System Performance</h3>
            <p className="text-sm text-slate-500 mt-1">24-hour performance metrics</p>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <Line type="monotone" dataKey="uptime" stroke="#10b981" strokeWidth={2} name="Uptime %" />
              <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} name="Efficiency %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts and Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">System Alerts</h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-xl flex items-start gap-3 ${
                alert.severity === 'error' ? 'bg-red-50 border border-red-200' :
                alert.severity === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                <ExclamationTriangleIcon className={`w-5 h-5 mt-0.5 ${
                  alert.severity === 'error' ? 'text-red-500' :
                  alert.severity === 'warning' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{alert.equipment}: {alert.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">Maintenance Schedule</h3>
          <div className="space-y-4">
            {maintenanceSchedule.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <WrenchScrewdriverIcon className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="font-medium text-slate-900">{item.equipment}</p>
                    <p className="text-sm text-slate-600">{item.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">{item.dueDate}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'High' ? 'bg-red-100 text-red-800' :
                    item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentMonitoring;