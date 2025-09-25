import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon, UserIcon } from '@heroicons/react/24/outline';

const CustomerSupport = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const supportTickets = [
    {
      id: 1,
      customer: 'John Doe',
      farm: 'Green Valley Farm',
      subject: 'Door automation not responding',
      status: 'open',
      priority: 'high',
      category: 'Technical Issue',
      created: '2024-09-20 10:30',
      lastUpdate: '2024-09-20 14:15',
      messages: [
        { from: 'John Doe', message: 'My door automation system stopped responding this morning. The chickens are still inside.', time: '2024-09-20 10:30' },
        { from: 'Support Team', message: 'We\'re investigating the issue. Can you check if the device has power?', time: '2024-09-20 11:00' },
        { from: 'John Doe', message: 'Power is on, but the control panel shows "Connection Error".', time: '2024-09-20 14:15' }
      ]
    },
    {
      id: 2,
      customer: 'Jane Smith',
      farm: 'Sunny Acres',
      subject: 'Feed dispenser calibration',
      status: 'in-progress',
      priority: 'medium',
      category: 'Configuration',
      created: '2024-09-19 09:15',
      lastUpdate: '2024-09-20 16:45',
      messages: [
        { from: 'Jane Smith', message: 'The feed dispenser is giving too much feed. How can I recalibrate it?', time: '2024-09-19 09:15' },
        { from: 'Support Team', message: 'You can recalibrate through the device settings menu. Go to Settings > Feed > Calibration.', time: '2024-09-19 10:30' }
      ]
    },
    {
      id: 3,
      customer: 'Bob Johnson',
      farm: 'Hilltop Coop',
      subject: 'Billing question',
      status: 'resolved',
      priority: 'low',
      category: 'Billing',
      created: '2024-09-18 14:20',
      lastUpdate: '2024-09-19 11:00',
      messages: [
        { from: 'Bob Johnson', message: 'I was charged twice for last month. Can you refund the duplicate charge?', time: '2024-09-18 14:20' },
        { from: 'Support Team', message: 'I\'ve processed the refund. It should appear in your account within 3-5 business days.', time: '2024-09-19 11:00' }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I reset my device?',
      answer: 'To reset your device, hold the power button for 10 seconds until the light flashes red, then release.'
    },
    {
      question: 'Why is my device offline?',
      answer: 'Check your internet connection and ensure the device is within WiFi range. Try power cycling the device.'
    },
    {
      question: 'How to update device firmware?',
      answer: 'Firmware updates are automatic. You can check the current version in the device settings.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTickets = activeTab === 'tickets' ? supportTickets :
    activeTab === 'open' ? supportTickets.filter(t => t.status === 'open') :
    activeTab === 'resolved' ? supportTickets.filter(t => t.status === 'resolved') :
    supportTickets;

  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Customer Support</h1>
        <p className="text-slate-600">Manage support tickets and help farmers</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('tickets')}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === 'tickets' ? 'bg-slate-600 text-white' : 'bg-white text-slate-700 border'
          }`}
        >
          All Tickets ({supportTickets.length})
        </button>
        <button
          onClick={() => setActiveTab('open')}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === 'open' ? 'bg-slate-600 text-white' : 'bg-white text-slate-700 border'
          }`}
        >
          Open ({supportTickets.filter(t => t.status === 'open').length})
        </button>
        <button
          onClick={() => setActiveTab('resolved')}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === 'resolved' ? 'bg-slate-600 text-white' : 'bg-white text-slate-700 border'
          }`}
        >
          Resolved ({supportTickets.filter(t => t.status === 'resolved').length})
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`px-6 py-2 rounded-lg font-medium ${
            activeTab === 'faqs' ? 'bg-slate-600 text-white' : 'bg-white text-slate-700 border'
          }`}
        >
          FAQs
        </button>
      </div>

      {/* Tickets List */}
      {activeTab !== 'faqs' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-6 bg-white rounded-2xl shadow-sm border cursor-pointer transition-all ${
                  selectedTicket?.id === ticket.id ? 'border-slate-400 ring-2 ring-slate-200' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{ticket.customer}</h3>
                      <p className="text-sm text-slate-500">{ticket.farm}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </div>
                </div>

                <h4 className="font-medium text-slate-900 mb-2">{ticket.subject}</h4>
                <p className="text-sm text-slate-600 mb-3">{ticket.category}</p>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Created: {ticket.created}</span>
                  <span>Last update: {ticket.lastUpdate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Ticket Detail */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            {selectedTicket ? (
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{selectedTicket.subject}</h2>
                    <p className="text-slate-600">{selectedTicket.customer} - {selectedTicket.farm}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {selectedTicket.messages.map((msg, index) => (
                    <div key={index} className={`p-4 rounded-xl ${
                      msg.from === 'Support Team' ? 'bg-blue-50 ml-4' : 'bg-slate-50 mr-4'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-slate-900">{msg.from}</span>
                        <span className="text-xs text-slate-500">{msg.time}</span>
                      </div>
                      <p className="text-slate-700">{msg.message}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <textarea
                    placeholder="Type your response..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                    rows={3}
                  />
                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Reply
                    </button>
                    <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm">
                      <option>Change Status</option>
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 py-12">
                <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>Select a ticket to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAQs */}
      {activeTab === 'faqs' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-medium text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSupport;