import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminSidebar from './components/AdminSidebar';
import FarmerSidebar from './components/FarmerSidebar';
import RoleHeader from './components/RoleHeader';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import SystemOverview from './components/SystemOverview';
import FarmerManagement from './components/FarmerManagement';
import EquipmentMonitoring from './components/EquipmentMonitoring';
import SalesAnalytics from './components/SalesAnalytics';
import CustomerSupport from './components/CustomerSupport';
import Reports from './components/Reports';
import SystemSettings from './components/SystemSettings';
import UserManagement from './components/UserManagement';
import FarmOverview from './components/FarmOverview';
import DoorAutomation from './components/DoorAutomation';
import FeedWater from './components/FeedWater';
import EggProduction from './components/EggProduction';
import CustomerOrders from './components/CustomerOrders';
import MyProducts from './components/MyProducts';
import FarmerSettings from './components/FarmerSettings';
import FarmProfile from './components/FarmProfile';
import './App.css';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  if (!isAuthenticated) {
    return <Login />;
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
      <div className="flex h-full bg-white overflow-hidden w-full">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className={`fixed lg:static inset-y-0 left-0 z-50 h-full transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
          {user.role === 'admin' ? (
            <AdminSidebar onClose={closeSidebar} />
          ) : (
            <FarmerSidebar onClose={closeSidebar} />
          )}
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          <RoleHeader onMenuClick={toggleSidebar} />
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
            <Routes>
              <Route path="/admin/system-overview" element={<ProtectedRoute allowedRoles={['admin']}><SystemOverview /></ProtectedRoute>} />
              <Route path="/admin/farmer-management" element={<ProtectedRoute allowedRoles={['admin']}><FarmerManagement /></ProtectedRoute>} />
              <Route path="/admin/equipment-monitoring" element={<ProtectedRoute allowedRoles={['admin']}><EquipmentMonitoring /></ProtectedRoute>} />
              <Route path="/admin/sales-analytics" element={<ProtectedRoute allowedRoles={['admin']}><SalesAnalytics /></ProtectedRoute>} />
              <Route path="/admin/customer-support" element={<ProtectedRoute allowedRoles={['admin']}><CustomerSupport /></ProtectedRoute>} />
              <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><Reports /></ProtectedRoute>} />
              <Route path="/admin/system-settings" element={<ProtectedRoute allowedRoles={['admin']}><SystemSettings /></ProtectedRoute>} />
              <Route path="/admin/user-management" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
              <Route path="/farmer/farm-overview" element={<ProtectedRoute allowedRoles={['farmer']}><FarmOverview /></ProtectedRoute>} />
              <Route path="/farmer/door-automation" element={<ProtectedRoute allowedRoles={['farmer']}><DoorAutomation /></ProtectedRoute>} />
              <Route path="/farmer/feed-water" element={<ProtectedRoute allowedRoles={['farmer']}><FeedWater /></ProtectedRoute>} />
              <Route path="/farmer/egg-production" element={<ProtectedRoute allowedRoles={['farmer']}><EggProduction /></ProtectedRoute>} />
              <Route path="/farmer/customer-orders" element={<ProtectedRoute allowedRoles={['farmer']}><CustomerOrders /></ProtectedRoute>} />
              <Route path="/farmer/my-products" element={<ProtectedRoute allowedRoles={['farmer']}><MyProducts /></ProtectedRoute>} />
              <Route path="/farmer/settings" element={<ProtectedRoute allowedRoles={['farmer']}><FarmerSettings /></ProtectedRoute>} />
              <Route path="/farmer/farm-profile" element={<ProtectedRoute allowedRoles={['farmer']}><FarmProfile /></ProtectedRoute>} />
              <Route path="/" element={<Navigate to={user.role === 'admin' ? '/admin/system-overview' : '/farmer/farm-overview'} replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;