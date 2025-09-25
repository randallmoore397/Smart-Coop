import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(credentials.username, credentials.password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-blue to-primary-gold rounded-xl flex items-center justify-center">
              <span className="text-white text-lg sm:text-xl">🐔</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Smart Coop</h1>
              <p className="text-xs sm:text-sm text-slate-500">Farm Management System</p>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              className="w-full px-3 sm:px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm sm:text-base"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm sm:text-base"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                ) : (
                  <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-primary-blue text-white py-2.5 sm:py-2 rounded-lg hover:bg-primary-gold transition-colors text-sm sm:text-base font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-xs sm:text-sm text-slate-500 space-y-1">
          <p className="font-medium">Demo Credentials:</p>
          <p>Admin: admin / admin123</p>
          <p>Farmer: farmer / farmer123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;