import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { UserPlusIcon, UsersIcon, CogIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const FarmerManagement = () => {
  const [activeTab, setActiveTab] = useState('registration');
  const [farmers, setFarmers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', farm: 'Green Valley Farm', location: 'California', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', farm: 'Sunny Acres', location: 'Texas', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', farm: 'Hilltop Coop', location: 'New York', status: 'Inactive' },
  ]);
  const [newFarmer, setNewFarmer] = useState({ name: '', email: '', farm: '', location: '', phone: '' });
  const [editingFarmer, setEditingFarmer] = useState(null);

  const tabs = [
    { id: 'registration', name: 'Farm Registration', icon: UserPlusIcon },
    { id: 'management', name: 'Account Management', icon: UsersIcon },
    { id: 'equipment', name: 'Equipment Assignment', icon: CogIcon },
    { id: 'monitoring', name: 'Performance Monitoring', icon: ChartBarIcon },
  ];

  const handleRegisterFarmer = (e) => {
    e.preventDefault();
    if (newFarmer.name && newFarmer.email && newFarmer.farm) {
      setFarmers([...farmers, { ...newFarmer, id: farmers.length + 1, status: 'Active' }]);
      setNewFarmer({ name: '', email: '', farm: '', location: '', phone: '' });
    }
  };

  const handleEditFarmer = (farmer) => {
    setEditingFarmer(farmer);
  };

  const handleUpdateFarmer = (e) => {
    e.preventDefault();
    setFarmers(farmers.map(f => f.id === editingFarmer.id ? editingFarmer : f));
    setEditingFarmer(null);
  };

  const handleDeleteFarmer = (id) => {
    setFarmers(farmers.filter(f => f.id !== id));
  };

  // Mock data for charts
  const productionData = [
    { month: 'Jan', eggs: 1200, feed: 500 },
    { month: 'Feb', eggs: 1350, feed: 520 },
    { month: 'Mar', eggs: 1100, feed: 480 },
    { month: 'Apr', eggs: 1400, feed: 550 },
    { month: 'May', eggs: 1600, feed: 600 },
    { month: 'Jun', eggs: 1500, feed: 580 },
  ];

  const statusData = [
    { name: 'Active', value: 75, color: '#10B981' },
    { name: 'Inactive', value: 15, color: '#F59E0B' },
    { name: 'Pending', value: 10, color: '#EF4444' },
  ];

  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Farmer Management</h1>
        <p className="text-slate-600">Manage farmer registrations, accounts, and equipment assignments</p>
      </div>

      {/* Modern Tabs */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1 inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary-blue text-white shadow-md'
                  : 'text-slate-600 hover:text-primary-blue hover:bg-blue-50'
              }`}
            >
              <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-white' : 'text-primary-blue'}`} />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'registration' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Register New Farmer</h2>
          <form onSubmit={handleRegisterFarmer} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={newFarmer.name}
                  onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                  className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-primary-blue focus:border-primary-blue px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newFarmer.email}
                  onChange={(e) => setNewFarmer({ ...newFarmer, email: e.target.value })}
                  className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-primary-blue focus:border-primary-blue px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Farm Name</label>
                <input
                  type="text"
                  value={newFarmer.farm}
                  onChange={(e) => setNewFarmer({ ...newFarmer, farm: e.target.value })}
                  className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-primary-blue focus:border-primary-blue px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={newFarmer.location}
                  onChange={(e) => setNewFarmer({ ...newFarmer, location: e.target.value })}
                  className="mt-1 block w-full border-slate-300 rounded-lg shadow-sm focus:ring-primary-blue focus:border-primary-blue px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={newFarmer.phone}
                  onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-gold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 shadow-sm hover:shadow-md"
            >
              Register Farmer
            </button>
          </form>
        </div>
      )}

      {activeTab === 'management' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Farmer Accounts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {farmers.map((farmer) => (
                  <tr key={farmer.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{farmer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.farm}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{farmer.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        farmer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {farmer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditFarmer(farmer)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFarmer(farmer.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {editingFarmer && (
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Edit Farmer</h3>
              <form onSubmit={handleUpdateFarmer} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={editingFarmer.name}
                      onChange={(e) => setEditingFarmer({ ...editingFarmer, name: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={editingFarmer.email}
                      onChange={(e) => setEditingFarmer({ ...editingFarmer, email: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Farm Name</label>
                    <input
                      type="text"
                      value={editingFarmer.farm}
                      onChange={(e) => setEditingFarmer({ ...editingFarmer, farm: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={editingFarmer.location}
                      onChange={(e) => setEditingFarmer({ ...editingFarmer, location: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingFarmer(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === 'equipment' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Equipment Assignment</h2>
          <div className="space-y-6">
            {farmers.map((farmer) => (
              <div key={farmer.id} className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">{farmer.farm} - {farmer.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Door Automation</label>
                    <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                      <option>Unassigned</option>
                      <option>Door Controller v1.0</option>
                      <option>Door Controller v2.0</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Feed System</label>
                    <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                      <option>Unassigned</option>
                      <option>Auto Feeder Pro</option>
                      <option>Smart Hopper</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Water System</label>
                    <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                      <option>Unassigned</option>
                      <option>Aqua Monitor</option>
                      <option>Water Station XL</option>
                    </select>
                  </div>
                </div>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Assign Equipment
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'monitoring' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Farm Performance Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Egg Production Trends</h3>
                <LineChart width={400} height={300} data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="eggs" stroke="#8884d8" />
                </LineChart>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Feed Consumption</h3>
                <BarChart width={400} height={300} data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="feed" fill="#82ca9d" />
                </BarChart>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Farmer Status Distribution</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={statusData}
                cx={200}
                cy={150}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerManagement;