# Technical Documentation

## System Architecture

### Overview

The Smart Coop Dashboard is a modern React-based web application designed for automated chicken coop management. The system provides real-time monitoring, equipment control, and data analytics for smart farming operations.

### Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Browser   │────│  React App      │────│   REST API      │
│                 │    │  (Frontend)     │    │   (Backend)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                        │
                              │                        │
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Local Storage │    │   Database      │
                       │  (Session)      │    │   (MongoDB)     │
                       └─────────────────┘    └─────────────────┘
                                              │
                                              │
                                       ┌─────────────────┐
                                       │   IoT Devices   │
                                       │   (Sensors)     │
                                       └─────────────────┘
```

## Technology Stack

### Frontend Framework

#### React 18.2.0
- **Concurrent Features**: Automatic batching, concurrent rendering
- **Hooks API**: useState, useEffect, useContext, custom hooks
- **Functional Components**: Modern component architecture
- **Suspense**: Code splitting and lazy loading

#### React Router v6.8.0
- **Nested Routes**: Hierarchical routing structure
- **Protected Routes**: Authentication-based route guarding
- **Dynamic Routing**: Programmatic navigation
- **Route Parameters**: URL-based data passing

### Styling & UI

#### Tailwind CSS 3.2.0
- **Utility-First**: Atomic CSS classes
- **Responsive Design**: Mobile-first breakpoints
- **Custom Properties**: CSS variables for theming
- **JIT Compiler**: On-demand CSS generation

#### Heroicons 2.0.0
- **SVG Icons**: Scalable vector graphics
- **Outline/Solid Variants**: Multiple visual styles
- **Tree Shaking**: Optimized bundle size

### Data Visualization

#### Recharts 2.5.0
- **React Native**: Declarative chart components
- **Responsive Charts**: Automatic scaling
- **Customizable**: Extensive styling options
- **Performance**: Optimized rendering

### Development Tools

#### Create React App 5.0.0
- **Build Setup**: Webpack configuration
- **Development Server**: Hot reloading
- **Testing Framework**: Jest integration
- **Build Optimization**: Code splitting and minification

#### ESLint 8.0.0
- **Code Quality**: Static analysis
- **React Rules**: Framework-specific linting
- **Custom Rules**: Project-specific standards

## Component Architecture

### Component Hierarchy

```
App (Root Component)
├── AuthProvider (Context Provider)
│   ├── BrowserRouter (Routing)
│   │   ├── Routes
│   │   │   ├── Route (Login)
│   │   │   └── Route (Dashboard)
│   │   │       └── ProtectedRoute
│   │   │           └── Dashboard Layout
│   │   │               ├── RoleHeader
│   │   │               ├── Sidebar (Admin/Farmer)
│   │   │               └── Main Content
│   │   │                   └── Page Components
└── ErrorBoundary (Global Error Handling)
```

### Component Types

#### 1. Page Components
- **Purpose**: Top-level route handlers
- **State**: Local component state
- **Data**: API calls and data management
- **Layout**: Full page layouts

#### 2. Layout Components
- **Purpose**: Structural UI elements
- **Props**: Configuration and styling
- **Children**: Content composition
- **Responsive**: Adaptive layouts

#### 3. Feature Components
- **Purpose**: Business logic encapsulation
- **Hooks**: Custom logic extraction
- **Composition**: Flexible component APIs
- **Testing**: Isolated unit tests

#### 4. UI Components
- **Purpose**: Reusable design elements
- **Variants**: Multiple visual states
- **Accessibility**: ARIA compliance
- **Performance**: Optimized rendering

## State Management

### Authentication Context

```javascript
// AuthContext.js
const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
};
```

### Local Component State

```javascript
// Component with local state
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State management logic
  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await api.getData(activeTab);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};
```

## Routing Architecture

### Route Configuration

```javascript
// App.js - Route definitions
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected admin routes */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="system-overview" element={<SystemOverview />} />
            <Route path="farmer-management" element={<FarmerManagement />} />
            {/* ... other admin routes */}
          </Route>

          {/* Protected farmer routes */}
          <Route path="/farmer/*" element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerLayout />
            </ProtectedRoute>
          }>
            <Route path="farm-overview" element={<FarmOverview />} />
            <Route path="feed-water" element={<FeedWater />} />
            {/* ... other farmer routes */}
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
```

### Protected Route Implementation

```javascript
// ProtectedRoute.js
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};
```

## Data Flow Architecture

### API Integration Pattern

```javascript
// services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL;

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // HTTP methods
  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

export const apiClient = new ApiClient();
```

### Data Fetching Hook

```javascript
// hooks/useApi.js
import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';

export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await apiClient.get(endpoint);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (endpoint) {
      fetchData();
    }
  }, [endpoint, options.refresh]);

  const refetch = () => {
    setLoading(true);
    // Trigger re-fetch
  };

  return { data, loading, error, refetch };
};
```

## Performance Optimization

### Code Splitting

```javascript
// App.js - Route-based code splitting
import { lazy, Suspense } from 'react';

const AdminLayout = lazy(() => import('./components/AdminLayout'));
const FarmerLayout = lazy(() => import('./components/FarmerLayout'));
const SystemOverview = lazy(() => import('./components/SystemOverview'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="system-overview" element={<SystemOverview />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

### Memoization

```javascript
// ExpensiveComponent.js
import React, { memo, useMemo } from 'react';

const ExpensiveComponent = memo(({ data, filter }) => {
  // Memoize expensive calculations
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Expensive filtering logic
      return item.value > filter.threshold;
    });
  }, [data, filter.threshold]);

  const stats = useMemo(() => {
    return {
      total: filteredData.length,
      average: filteredData.reduce((sum, item) => sum + item.value, 0) / filteredData.length
    };
  }, [filteredData]);

  return (
    <div>
      <p>Total items: {stats.total}</p>
      <p>Average value: {stats.average}</p>
      {/* Render filtered data */}
    </div>
  );
});

export default ExpensiveComponent;
```

### Bundle Analysis

```javascript
// webpack.config.js (CRA override)
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      })
    ]
  }
};
```

## Security Implementation

### Authentication Flow

```javascript
// context/AuthContext.js
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    token: null
  });

  // Load auth state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAuthState(parsed);
      } catch (error) {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  // Save auth state to localStorage
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(authState));
  }, [authState]);

  const login = async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);

      if (response.token) {
        setAuthState({
          user: response.user,
          isAuthenticated: true,
          token: response.token
        });

        // Set authorization header for future requests
        apiClient.setAuthToken(response.token);
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      token: null
    });
    apiClient.clearAuthToken();
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Input Validation

```javascript
// utils/validation.js
export const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Invalid email format';
  },

  password: (value) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain lowercase letter';
    if (!/\d/.test(value)) return 'Password must contain number';
    return true;
  },

  required: (value) => {
    return value && value.trim() !== '' || 'This field is required';
  }
};

export const validateField = (fieldName, value) => {
  const validator = validators[fieldName];
  if (!validator) return true;
  return validator(value);
};

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach(fieldName => {
    const value = formData[fieldName];
    const fieldRules = rules[fieldName];

    for (const rule of fieldRules) {
      const result = validateField(rule, value);
      if (result !== true) {
        errors[fieldName] = result;
        break;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
```

## Error Handling

### Error Boundary

```javascript
// components/ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>Please refresh the page or contact support</p>
          {process.env.NODE_ENV === 'development' && (
            <details>
              <summary>Error Details</summary>
              <pre>{this.state.error && this.state.error.toString()}</pre>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### Global Error Handler

```javascript
// utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return 'Invalid request data';
      case 401:
        // Handle unauthorized - redirect to login
        window.location.href = '/login';
        return 'Session expired';
      case 403:
        return 'Access denied';
      case 404:
        return 'Resource not found';
      case 500:
        return 'Server error';
      default:
        return data.message || 'An error occurred';
    }
  } else if (error.request) {
    // Network error
    return 'Network error - please check your connection';
  } else {
    // Other error
    return error.message || 'An unexpected error occurred';
  }
};

export const logError = (error, context = {}) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    ...context
  };

  // Send to error monitoring service
  if (process.env.REACT_APP_ERROR_MONITORING_URL) {
    fetch(process.env.REACT_APP_ERROR_MONITORING_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorData);
  }
};
```

## Testing Strategy

### Unit Testing

```javascript
// __tests__/AuthContext.test.js
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';

const TestComponent = () => {
  const { user, isAuthenticated, login } = useAuth();
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'not-authenticated'}</div>
      <div data-testid="user-name">{user?.name || 'no-user'}</div>
      <button onClick={() => login({ username: 'test', password: 'test' })}>
        Login
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  test('provides authentication state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    expect(screen.getByTestId('user-name')).toHaveTextContent('no-user');
  });
});
```

### Integration Testing

```javascript
// __tests__/LoginForm.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Login Form', () => {
  test('submits login form successfully', async () => {
    renderWithRouter(<Login />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });
});
```

## Deployment Architecture

### Build Configuration

```javascript
// config/build.js
const buildConfig = {
  development: {
    API_URL: 'http://localhost:3001',
    ENVIRONMENT: 'development',
    DEBUG: true
  },
  staging: {
    API_URL: 'https://api-staging.smartcoop.com',
    ENVIRONMENT: 'staging',
    DEBUG: true
  },
  production: {
    API_URL: 'https://api.smartcoop.com',
    ENVIRONMENT: 'production',
    DEBUG: false
  }
};

export default buildConfig;
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npx vercel --prod
```

## Monitoring & Analytics

### Performance Monitoring

```javascript
// utils/performance.js
export const measurePerformance = (metricName, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();

  console.log(`${metricName} took ${end - start} milliseconds`);

  // Send to analytics service
  if (window.gtag) {
    window.gtag('event', 'performance', {
      event_category: 'performance',
      event_label: metricName,
      value: Math.round(end - start)
    });
  }

  return result;
};

export const measureWebVitals = () => {
  // Core Web Vitals measurement
  if ('web-vitals' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
};
```

### Error Monitoring

```javascript
// utils/monitoring.js
export const initErrorMonitoring = () => {
  // Global error handler
  window.addEventListener('error', (event) => {
    logError(event.error, {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    logError(event.reason, {
      type: 'unhandledrejection'
    });
  });
};

export const logError = (error, context = {}) => {
  const errorData = {
    message: error.message || error,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    userId: getCurrentUserId(),
    ...context
  };

  // Send to error monitoring service (Sentry, LogRocket, etc.)
  sendToMonitoringService(errorData);

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorData);
  }
};
```

## API Reference

### Authentication Endpoints

#### POST /api/auth/login
Login user with credentials.

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@smartcoop.com",
    "role": "admin"
  }
}
```

#### GET /api/auth/me
Get current user information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@smartcoop.com",
    "role": "admin"
  }
}
```

### Data Endpoints

#### GET /api/farmers
Get all farmers (Admin only).

**Response:**
```json
{
  "farmers": [
    {
      "id": 1,
      "name": "John Doe",
      "farm": "Green Valley Farm",
      "status": "Active",
      "location": "California"
    }
  ]
}
```

#### GET /api/dashboard/metrics
Get dashboard metrics.

**Response:**
```json
{
  "metrics": {
    "totalFarmers": 24,
    "activeSystems": 18,
    "totalRevenue": 12450,
    "systemHealth": 98
  }
}
```

## Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // Hashed
  role: String, // 'admin' | 'farmer'
  farmName: String,
  location: String,
  status: String, // 'active' | 'inactive'
  createdAt: Date,
  updatedAt: Date
}
```

### Equipment Collection

```javascript
{
  _id: ObjectId,
  farmerId: ObjectId,
  type: String, // 'door' | 'feeder' | 'water'
  status: String, // 'online' | 'offline' | 'maintenance'
  lastSeen: Date,
  settings: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Sensor Data Collection

```javascript
{
  _id: ObjectId,
  equipmentId: ObjectId,
  sensorType: String, // 'temperature' | 'humidity' | 'feed_level'
  value: Number,
  unit: String,
  timestamp: Date
}
```

## Security Considerations

### Frontend Security

1. **Input Validation**: Client-side validation with server-side verification
2. **XSS Prevention**: Sanitize user inputs and use React's built-in XSS protection
3. **CSRF Protection**: Include CSRF tokens in state-changing requests
4. **Secure Storage**: Use HttpOnly cookies for sensitive data
5. **Content Security Policy**: Implement CSP headers

### Authentication Security

1. **JWT Tokens**: Use short-lived access tokens with refresh tokens
2. **Password Hashing**: bcrypt with salt rounds
3. **Rate Limiting**: Prevent brute force attacks
4. **Session Management**: Secure session handling with expiration
5. **Multi-factor Authentication**: Future implementation

### API Security

1. **HTTPS Only**: Enforce SSL/TLS encryption
2. **API Keys**: Secure API key management
3. **Request Validation**: Comprehensive input validation
4. **Error Handling**: Don't expose sensitive error information
5. **CORS Configuration**: Proper cross-origin resource sharing

## Performance Benchmarks

### Core Web Vitals Targets

- **First Contentful Paint (FCP)**: < 1.5 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1

### Bundle Size Targets

- **Initial Bundle**: < 200 KB (gzipped)
- **Vendor Bundle**: < 150 KB (gzipped)
- **CSS Bundle**: < 20 KB (gzipped)

### Lighthouse Scores

- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 90

## Future Enhancements

### Planned Features

1. **Progressive Web App (PWA)**: Offline functionality and app-like experience
2. **Real-time Notifications**: WebSocket integration for live updates
3. **Advanced Analytics**: Machine learning insights and predictions
4. **Mobile Application**: React Native companion app
5. **IoT Integration**: Direct device communication and control

### Technical Improvements

1. **GraphQL API**: More efficient data fetching
2. **Micro-frontends**: Modular architecture for scalability
3. **Advanced Caching**: Service worker and intelligent caching
4. **Performance Monitoring**: Real-time performance tracking
5. **Automated Testing**: Comprehensive test coverage

---

**This technical documentation provides a comprehensive overview of the Smart Coop Dashboard's architecture, implementation details, and operational guidelines.**