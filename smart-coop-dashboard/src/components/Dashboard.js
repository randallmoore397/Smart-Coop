import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartBarIcon, UsersIcon, ClipboardDocumentListIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
  const pieData = [
    { name: 'Mobiles', value: 20, color: '#8b5cf6' },
    { name: 'Tablets', value: 20, color: '#fb923c' },
    { name: 'Laptops', value: 20, color: '#06b6d4' },
    { name: 'Televisions', value: 20, color: '#ec4899' },
  ];

  const lineData = [
    { name: 'Jan', value: 40 },
    { name: 'Feb', value: 30 },
    { name: 'Mar', value: 60 },
    { name: 'Apr', value: 45 },
    { name: 'May', value: 80 },
    { name: 'Jun', value: 70 },
    { name: 'Jul', value: 85 },
    { name: 'Aug', value: 75 },
  ];

  const barData = [
    { name: 'A', newOrders: 70, visits: 0, bounceRate: 0 },
    { name: 'B', newOrders: 0, visits: 40, bounceRate: 0 },
    { name: 'C', newOrders: 0, visits: 85, bounceRate: 0 },
    { name: 'D', newOrders: 0, visits: 55, bounceRate: 0 },
    { name: 'E', newOrders: 0, visits: 30, bounceRate: 0 },
    { name: 'F', newOrders: 0, visits: 0, bounceRate: 65 },
    { name: 'G', newOrders: 0, visits: 0, bounceRate: 80 },
    { name: 'H', newOrders: 0, visits: 0, bounceRate: 45 },
  ];

  return (
    <div className="flex-1 px-12 pb-12 bg-white overflow-y-auto">
      {/* Top Row: Stats Cards (left) and Revenue Chart (right) */}
      <div className="grid grid-cols-3 gap-8 mb-10">
        {/* Left Column - 4 Stats Cards in 2x2 grid */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-3xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ChartBarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">18090</h3>
                  <p className="text-sm opacity-90">Visits Today</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-400 to-yellow-500 p-6 rounded-3xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <UsersIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">562</h3>
                  <p className="text-sm opacity-90">New Users</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-6 rounded-3xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <ClipboardDocumentListIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">7514</h3>
                  <p className="text-sm opacity-90">New Orders</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-3xl text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <CurrencyDollarIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">$32874</h3>
                  <p className="text-sm opacity-90">Total Sales</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Revenue Chart */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Revenue</h3>
              <p className="text-sm text-gray-500 mt-1">Month</p>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl relative p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8b5cf6" 
                  strokeWidth={3} 
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#8b5cf6' }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              52%
            </div>
          </div>
        </div>
      </div>

      {/* Product Stock Section */}
      <div className="grid grid-cols-2 gap-8 mb-10">

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Product Stock</h3>
            <div className="text-gray-400">⋯</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="relative w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">73%</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span className="text-sm text-gray-600">20% Mobiles</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-sm text-gray-600">20% Tablets</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span className="text-sm text-gray-600">20% Laptops</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span className="text-sm text-gray-600">20% Televisions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Order Status and Profile */}
      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Order Status</h3>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">Todays Performance</p>
              <span className="text-2xl font-bold text-gray-900">52%</span>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-purple-600">Delivered</span>
                <span className="text-xs text-gray-500">80% Complete</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-purple-600 rounded-full" style={{width: '80%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-pink-500">Shipped</span>
                <span className="text-xs text-gray-500">65% Complete</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-pink-500 rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-orange-400">Pending</span>
                <span className="text-xs text-gray-500">30% Complete</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div className="h-full bg-orange-400 rounded-full" style={{width: '30%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-cyan-500">On Time</span>
                <span className="text-xs text-red-500">Late</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Profile</h3>
            <div className="text-gray-400">⋯</div>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Najmur Rahman</h4>
            <button className="bg-cyan-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-cyan-600 transition-colors">
              Follow
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Statistics</h3>
        <div className="h-40 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barCategoryGap="20%">
              <Bar dataKey="newOrders" fill="#ec4899" radius={[4, 4, 0, 0]} />
              <Bar dataKey="visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="bounceRate" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            <span className="text-sm text-gray-600">New Orders</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Visits</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Bounce Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;