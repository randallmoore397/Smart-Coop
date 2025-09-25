import React, { useState } from 'react';

const CustomerOrders = () => {
  // Mock data for orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      items: ['Eggs (12)', 'Milk (1L)'],
      total: 15.99,
      status: 'pending',
      date: '2023-10-01',
      deliveryDate: null,
      deliveryTime: null,
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      items: ['Chicken (2kg)', 'Vegetables (5kg)'],
      total: 45.50,
      status: 'accepted',
      date: '2023-09-28',
      deliveryDate: '2023-10-02',
      deliveryTime: '10:00 AM',
    },
    {
      id: 3,
      customerName: 'Bob Johnson',
      items: ['Eggs (24)', 'Cheese (500g)'],
      total: 25.00,
      status: 'delivered',
      date: '2023-09-25',
      deliveryDate: '2023-09-26',
      deliveryTime: '2:00 PM',
    },
    {
      id: 4,
      customerName: 'Alice Brown',
      items: ['Beef (1kg)', 'Eggs (6)'],
      total: 30.00,
      status: 'declined',
      date: '2023-09-20',
      deliveryDate: null,
      deliveryTime: null,
    },
  ]);

  const [activeTab, setActiveTab] = useState('incoming');
  const [schedulingOrder, setSchedulingOrder] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  const handleAcceptOrder = (orderId) => {
    setSchedulingOrder(orderId);
  };

  const handleDeclineOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'declined' } : order
    ));
  };

  const handleScheduleDelivery = () => {
    if (schedulingOrder && deliveryDate && deliveryTime) {
      setOrders(orders.map(order =>
        order.id === schedulingOrder
          ? { ...order, status: 'accepted', deliveryDate, deliveryTime }
          : order
      ));
      setSchedulingOrder(null);
      setDeliveryDate('');
      setDeliveryTime('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const incomingOrders = orders.filter(order => order.status === 'pending');
  const orderHistory = orders.filter(order => order.status !== 'pending');

  return (
    <div className="flex-1 p-8 bg-green-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Customer Orders</h1>
        <p className="text-slate-600">Manage customer orders and deliveries</p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`px-4 py-2 mr-2 rounded-lg font-medium ${
            activeTab === 'incoming' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'
          }`}
        >
          Incoming Orders ({incomingOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'history' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border'
          }`}
        >
          Order History ({orderHistory.length})
        </button>
      </div>

      {/* Incoming Orders */}
      {activeTab === 'incoming' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Incoming Customer Orders</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {incomingOrders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{order.customerName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Items:</p>
                  <ul className="text-sm">
                    {order.items.map((item, index) => (
                      <li key={index} className="mb-1">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-green-600">${order.total}</span>
                  <span className="text-sm text-gray-500">{order.date}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAcceptOrder(order.id)}
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDeclineOrder(order.id)}
                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
          {incomingOrders.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No incoming orders at the moment.</p>
          )}
        </div>
      )}

      {/* Order History */}
      {activeTab === 'history' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order History</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orderHistory.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{order.customerName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Items:</p>
                  <ul className="text-sm">
                    {order.items.map((item, index) => (
                      <li key={index} className="mb-1">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-green-600">${order.total}</span>
                  <span className="text-sm text-gray-500">{order.date}</span>
                </div>
                {order.deliveryDate && (
                  <div className="text-sm text-gray-600">
                    <p>Delivery: {order.deliveryDate} at {order.deliveryTime}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {orderHistory.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No order history available.</p>
          )}
        </div>
      )}

      {/* Delivery Scheduling Modal */}
      {schedulingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Schedule Delivery</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time</label>
              <input
                type="time"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleScheduleDelivery}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Schedule
              </button>
              <button
                onClick={() => setSchedulingOrder(null)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;