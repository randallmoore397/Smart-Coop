import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DocumentTextIcon, ChartBarIcon, ArrowDownTrayIcon, CalendarIcon, FilterIcon } from '@heroicons/react/24/outline';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');

  const reportTypes = [
    { id: 'overview', name: 'System Overview', icon: ChartBarIcon },
    { id: 'farmer', name: 'Farmer Performance', icon: DocumentTextIcon },
    { id: 'equipment', name: 'Equipment Usage', icon: ChartBarIcon },
    { id: 'revenue', name: 'Revenue Reports', icon: DocumentTextIcon }
  ];

  const overviewData = {
    totalFarmers: 24,
    activeSystems: 18,
    totalRevenue: 12450,
    avgUptime: 97.2,
    monthlyGrowth: 12.5,
    systemHealth: 98.5
  };

  const farmerPerformanceData = [
    { farmer: 'Green Valley Farm', eggs: 420, revenue: 2100, uptime: 98, efficiency: 95 },
    { farmer: 'Sunny Acres', eggs: 380, revenue: 1900, uptime: 96, efficiency: 92 },
    { farmer: 'Hilltop Coop', eggs: 450, revenue: 2250, uptime: 99, efficiency: 97 },
    { farmer: 'River Bend Farm', eggs: 410, revenue: 2050, uptime: 95, efficiency: 90 }
  ];

  const equipmentUsageData = [
    { equipment: 'Door Controllers', usage: 85, maintenance: 3, failures: 1 },
    { equipment: 'Feed Systems', usage: 92, maintenance: 5, failures: 2 },
    { equipment: 'Water Systems', usage: 88, maintenance: 2, failures: 0 },
    { equipment: 'Sensors', usage: 95, maintenance: 1, failures: 1 }
  ];

  const revenueData = [
    { month: 'Jan', subscription: 3200, equipment: 1800, support: 400 },
    { month: 'Feb', subscription: 3400, equipment: 1900, support: 450 },
    { month: 'Mar', subscription: 3600, equipment: 2100, support: 500 },
    { month: 'Apr', subscription: 3800, equipment: 2200, support: 550 },
    { month: 'May', subscription: 4000, equipment: 2400, support: 600 },
    { month: 'Jun', subscription: 4200, equipment: 2500, support: 650 }
  ];

  const exportReport = (format) => {
    // Mock export functionality
    alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}`);
  };

  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports & Analytics</h1>
        <p className="text-slate-600">Generate and view comprehensive system reports</p>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-8">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
          <option value="1year">Last year</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => exportReport('pdf')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => exportReport('csv')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="flex gap-4 mb-8">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedReport === report.id
                ? 'bg-slate-600 text-white shadow-lg'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <report.icon className="w-5 h-5" />
            {report.name}
          </button>
        ))}
      </div>

      {/* Report Content */}
      <div className="space-y-8">
        {/* System Overview Report */}
        {selectedReport === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {Object.entries(overviewData).map(([key, value]) => (
                <div key={key} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
                  <h3 className="text-2xl font-bold text-slate-900">{value}{typeof value === 'number' && value < 100 ? '%' : ''}</h3>
                  <p className="text-sm text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">System Performance Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <Line type="monotone" dataKey="subscription" stroke="#10b981" strokeWidth={2} name="Subscriptions" />
                    <Line type="monotone" dataKey="equipment" stroke="#3b82f6" strokeWidth={2} name="Equipment" />
                    <Line type="monotone" dataKey="support" stroke="#f59e0b" strokeWidth={2} name="Support" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Farmer Performance Report */}
        {selectedReport === 'farmer' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900">Farmer Performance Summary</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Farm</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Eggs Produced</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Uptime</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {farmerPerformanceData.map((farmer, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{farmer.farmer}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{farmer.eggs}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">${farmer.revenue}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{farmer.uptime}%</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{farmer.efficiency}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Production vs Revenue</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={farmerPerformanceData}>
                    <Bar dataKey="eggs" fill="#10b981" name="Eggs" />
                    <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Equipment Usage Report */}
        {selectedReport === 'equipment' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900">Equipment Usage Statistics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Equipment Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Usage %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Maintenance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Failures</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {equipmentUsageData.map((equipment, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{equipment.equipment}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{equipment.usage}%</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{equipment.maintenance}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{equipment.failures}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Equipment Performance</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={equipmentUsageData}>
                    <Bar dataKey="usage" fill="#10b981" name="Usage %" />
                    <Bar dataKey="maintenance" fill="#f59e0b" name="Maintenance Count" />
                    <Bar dataKey="failures" fill="#ef4444" name="Failures" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Reports */}
        {selectedReport === 'revenue' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
                <h3 className="text-2xl font-bold text-slate-900">$42,200</h3>
                <p className="text-sm text-slate-500">Total Revenue</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
                <h3 className="text-2xl font-bold text-slate-900">$18,200</h3>
                <p className="text-sm text-slate-500">Equipment Sales</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-center">
                <h3 className="text-2xl font-bold text-slate-900">$24,000</h3>
                <p className="text-sm text-slate-500">Subscriptions</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Revenue Breakdown</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <Line type="monotone" dataKey="subscription" stroke="#10b981" strokeWidth={3} name="Subscriptions" />
                    <Line type="monotone" dataKey="equipment" stroke="#3b82f6" strokeWidth={3} name="Equipment" />
                    <Line type="monotone" dataKey="support" stroke="#f59e0b" strokeWidth={3} name="Support" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;