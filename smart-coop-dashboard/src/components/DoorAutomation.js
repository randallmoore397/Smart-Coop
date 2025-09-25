import React, { useState, useEffect } from 'react';

const DoorAutomation = () => {
  const [doorStatus, setDoorStatus] = useState('closed'); // 'open' or 'closed'
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [sunriseTime, setSunriseTime] = useState('06:00');
  const [sunsetTime, setSunsetTime] = useState('18:00');
  const [batteryLevel, setBatteryLevel] = useState(85); // percentage
  const [alerts, setAlerts] = useState([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate door position changes (for demo)
      if (Math.random() > 0.95) {
        setDoorStatus(prev => prev === 'open' ? 'closed' : 'open');
      }
      // Simulate battery drain
      setBatteryLevel(prev => Math.max(0, prev - Math.random() * 0.5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Check for battery alerts
  useEffect(() => {
    if (batteryLevel < 20 && !alerts.includes('Low Battery')) {
      setAlerts(prev => [...prev, 'Low Battery']);
    } else if (batteryLevel >= 20 && alerts.includes('Low Battery')) {
      setAlerts(prev => prev.filter(alert => alert !== 'Low Battery'));
    }
  }, [batteryLevel, alerts]);

  const handleOpenDoor = () => {
    setDoorStatus('open');
  };

  const handleCloseDoor = () => {
    setDoorStatus('closed');
  };

  const handleScheduleChange = (type, value) => {
    if (type === 'sunrise') setSunriseTime(value);
    if (type === 'sunset') setSunsetTime(value);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Door Automation</h1>

      {/* Manual Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Manual Controls</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleOpenDoor}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Open Door
          </button>
          <button
            onClick={handleCloseDoor}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Close Door
          </button>
          <div className="flex items-center">
            <span className="mr-2">Status:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              doorStatus === 'open' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {doorStatus.charAt(0).toUpperCase() + doorStatus.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Schedule Management */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Schedule Management</h2>
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAutoMode}
              onChange={() => setIsAutoMode(!isAutoMode)}
              className="mr-2"
            />
            Auto Mode (Sunrise/Sunset)
          </label>
        </div>
        {isAutoMode && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sunrise Time</label>
              <input
                type="time"
                value={sunriseTime}
                onChange={(e) => handleScheduleChange('sunrise', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sunset Time</label>
              <input
                type="time"
                value={sunsetTime}
                onChange={(e) => handleScheduleChange('sunset', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Status Monitoring */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Status Monitoring</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Door Position</p>
            <p className={`text-lg font-bold ${
              doorStatus === 'open' ? 'text-green-600' : 'text-red-600'
            }`}>
              {doorStatus.charAt(0).toUpperCase() + doorStatus.slice(1)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Last Updated</p>
            <p className="text-lg font-bold text-gray-600">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Battery Alerts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Battery Status</h2>
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Battery Level</span>
            <span className="text-sm font-medium">{batteryLevel.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${
                batteryLevel > 50 ? 'bg-green-500' : batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${batteryLevel}%` }}
            ></div>
          </div>
        </div>
        {alerts.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong className="font-bold">Alerts:</strong>
            <ul className="mt-2">
              {alerts.map((alert, index) => (
                <li key={index} className="text-sm">{alert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoorAutomation;