# API Documentation

## Overview

The Smart Coop Dashboard API provides programmatic access to farm management data, equipment control, and system monitoring capabilities. This document describes the available endpoints, request/response formats, and authentication requirements.

## Base URL

```
https://api.smartcoop.com/v1
```

## Authentication

### Bearer Token Authentication

All API requests require authentication using Bearer tokens in the Authorization header.

```
Authorization: Bearer <jwt-token>
```

### Obtaining Tokens

#### POST /auth/login

Authenticate user and receive access token.

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
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "name": "Admin User",
    "email": "admin@smartcoop.com",
    "role": "admin"
  },
  "expiresIn": 86400
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid credentials",
  "code": "AUTH_INVALID_CREDENTIALS"
}
```

#### GET /auth/me

Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "name": "Admin User",
    "email": "admin@smartcoop.com",
    "role": "admin",
    "permissions": ["read", "write", "admin"],
    "lastLogin": "2024-01-15T10:30:00Z"
  }
}
```

#### POST /auth/refresh

Refresh access token using refresh token.

**Request:**
```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response:**
```json
{
  "success": true,
  "token": "new_jwt_token",
  "refreshToken": "new_refresh_token",
  "expiresIn": 86400
}
```

## Rate Limiting

API requests are rate limited to prevent abuse:

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour
- **Burst limit**: 50 requests per minute

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## Error Handling

### HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request parameters
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

### Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "specific_field_error"
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "requestId": "req_123456"
}
```

## Core API Endpoints

### Dashboard Data

#### GET /dashboard/overview

Get dashboard overview data for authenticated user.

**Query Parameters:**
- `timeRange` (optional): `7d`, `30d`, `90d`, `1y` (default: `30d`)

**Response:**
```json
{
  "metrics": {
    "totalFarmers": 24,
    "activeSystems": 18,
    "totalRevenue": 12450.00,
    "systemHealth": 98.5
  },
  "charts": {
    "revenue": [
      { "month": "Jan", "revenue": 8500, "farmers": 18 },
      { "month": "Feb", "revenue": 9200, "farmers": 20 }
    ],
    "systemStatus": [
      { "name": "Online", "value": 85, "color": "#10b981" },
      { "name": "Maintenance", "value": 10, "color": "#f59e0b" },
      { "name": "Offline", "value": 5, "color": "#ef4444" }
    ]
  },
  "alerts": [
    {
      "id": "alert_123",
      "type": "warning",
      "message": "Feed level below 80%",
      "timestamp": "2024-01-15T09:00:00Z",
      "resolved": false
    }
  ]
}
```

### Farmer Management

#### GET /farmers

Get list of farmers (Admin only).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `status` (optional): Filter by status (`active`, `inactive`)
- `search` (optional): Search by name or email

**Response:**
```json
{
  "farmers": [
    {
      "id": "farmer_123",
      "name": "John Doe",
      "email": "john@farm.com",
      "farmName": "Green Valley Farm",
      "location": "California, USA",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z",
      "lastLogin": "2024-01-15T08:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 24,
    "totalPages": 2
  }
}
```

#### POST /farmers

Create new farmer account (Admin only).

**Request:**
```json
{
  "name": "Jane Smith",
  "email": "jane@farm.com",
  "farmName": "Sunny Acres",
  "location": "Texas, USA",
  "phone": "+1-555-0123",
  "password": "temporary_password"
}
```

**Response:**
```json
{
  "success": true,
  "farmer": {
    "id": "farmer_124",
    "name": "Jane Smith",
    "email": "jane@farm.com",
    "farmName": "Sunny Acres",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### GET /farmers/{id}

Get specific farmer details.

**Response:**
```json
{
  "farmer": {
    "id": "farmer_123",
    "name": "John Doe",
    "email": "john@farm.com",
    "farmName": "Green Valley Farm",
    "location": "California, USA",
    "phone": "+1-555-0123",
    "status": "active",
    "equipment": [
      {
        "id": "equip_123",
        "type": "door_automation",
        "status": "online",
        "lastSeen": "2024-01-15T10:25:00Z"
      }
    ],
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T09:00:00Z"
  }
}
```

#### PUT /farmers/{id}

Update farmer information.

**Request:**
```json
{
  "name": "John Smith",
  "location": "California, USA",
  "phone": "+1-555-0124"
}
```

**Response:**
```json
{
  "success": true,
  "farmer": {
    "id": "farmer_123",
    "name": "John Smith",
    "location": "California, USA",
    "phone": "+1-555-0124",
    "updatedAt": "2024-01-15T10:35:00Z"
  }
}
```

#### DELETE /farmers/{id}

Deactivate farmer account (Admin only).

**Response:**
```json
{
  "success": true,
  "message": "Farmer account deactivated"
}
```

### Equipment Management

#### GET /equipment

Get equipment list.

**Query Parameters:**
- `farmerId` (optional): Filter by farmer
- `type` (optional): Filter by equipment type
- `status` (optional): Filter by status (`online`, `offline`, `maintenance`)

**Response:**
```json
{
  "equipment": [
    {
      "id": "equip_123",
      "farmerId": "farmer_123",
      "type": "door_automation",
      "model": "SmartDoor Pro v2.0",
      "status": "online",
      "location": "Coop A",
      "lastSeen": "2024-01-15T10:25:00Z",
      "batteryLevel": 85,
      "firmwareVersion": "2.1.3",
      "settings": {
        "sunriseOffset": 30,
        "sunsetOffset": 15,
        "manualOverride": false
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

#### POST /equipment

Register new equipment.

**Request:**
```json
{
  "farmerId": "farmer_123",
  "type": "feed_dispenser",
  "model": "AutoFeeder Pro",
  "location": "Feed Station 1",
  "serialNumber": "AF123456"
}
```

**Response:**
```json
{
  "success": true,
  "equipment": {
    "id": "equip_124",
    "farmerId": "farmer_123",
    "type": "feed_dispenser",
    "status": "offline",
    "createdAt": "2024-01-15T10:40:00Z"
  }
}
```

#### PUT /equipment/{id}

Update equipment settings.

**Request:**
```json
{
  "settings": {
    "feedAmount": 200,
    "schedule": [
      { "time": "06:00", "amount": 150 },
      { "time": "18:00", "amount": 200 }
    ]
  }
}
```

**Response:**
```json
{
  "success": true,
  "equipment": {
    "id": "equip_124",
    "settings": {
      "feedAmount": 200,
      "schedule": [
        { "time": "06:00", "amount": 150 },
        { "time": "18:00", "amount": 200 }
      ]
    },
    "updatedAt": "2024-01-15T10:45:00Z"
  }
}
```

#### POST /equipment/{id}/command

Send command to equipment.

**Request:**
```json
{
  "command": "open_door",
  "parameters": {
    "duration": 300
  }
}
```

**Response:**
```json
{
  "success": true,
  "commandId": "cmd_123",
  "status": "queued",
  "estimatedCompletion": "2024-01-15T10:46:00Z"
}
```

### Sensor Data

#### GET /sensors/data

Get sensor readings.

**Query Parameters:**
- `equipmentId` (optional): Filter by equipment
- `sensorType` (optional): Filter by sensor type
- `startDate` (optional): Start date (ISO 8601)
- `endDate` (optional): End date (ISO 8601)
- `limit` (optional): Maximum records (default: 100)

**Response:**
```json
{
  "data": [
    {
      "id": "sensor_123",
      "equipmentId": "equip_123",
      "sensorType": "temperature",
      "value": 22.5,
      "unit": "celsius",
      "timestamp": "2024-01-15T10:30:00Z",
      "quality": "good"
    },
    {
      "id": "sensor_124",
      "equipmentId": "equip_123",
      "sensorType": "humidity",
      "value": 65.0,
      "unit": "percent",
      "timestamp": "2024-01-15T10:30:00Z",
      "quality": "good"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 100,
    "total": 1440,
    "totalPages": 15
  }
}
```

#### GET /sensors/aggregated

Get aggregated sensor data.

**Query Parameters:**
- `equipmentId`: Equipment ID
- `sensorType`: Sensor type
- `interval`: Aggregation interval (`1h`, `1d`, `1w`)
- `startDate`: Start date
- `endDate`: End date

**Response:**
```json
{
  "data": [
    {
      "timestamp": "2024-01-15T00:00:00Z",
      "average": 22.3,
      "minimum": 20.1,
      "maximum": 24.8,
      "count": 24
    }
  ]
}
```

### Customer Orders

#### GET /orders

Get customer orders (Farmer only).

**Query Parameters:**
- `status` (optional): Filter by status (`pending`, `accepted`, `delivered`)
- `startDate` (optional): Start date
- `endDate` (optional): End date

**Response:**
```json
{
  "orders": [
    {
      "id": "order_123",
      "customerName": "Sarah Johnson",
      "customerEmail": "sarah@email.com",
      "items": [
        { "name": "Large Eggs", "quantity": 2, "price": 5.50 }
      ],
      "total": 11.00,
      "status": "pending",
      "deliveryDate": null,
      "deliveryTime": null,
      "notes": "Please deliver to front door",
      "createdAt": "2024-01-15T08:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalPages": 1
  }
}
```

#### PUT /orders/{id}

Update order status.

**Request:**
```json
{
  "status": "accepted",
  "deliveryDate": "2024-01-16",
  "deliveryTime": "10:00"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "order_123",
    "status": "accepted",
    "deliveryDate": "2024-01-16",
    "deliveryTime": "10:00",
    "updatedAt": "2024-01-15T10:50:00Z"
  }
}
```

### Reports & Analytics

#### GET /reports/farmer-performance

Generate farmer performance report.

**Query Parameters:**
- `farmerId` (optional): Specific farmer
- `startDate`: Report start date
- `endDate`: Report end date
- `format`: Report format (`json`, `pdf`, `csv`)

**Response:**
```json
{
  "report": {
    "farmerId": "farmer_123",
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-15"
    },
    "metrics": {
      "totalEggs": 1240,
      "averageDaily": 83,
      "feedConsumption": 45.2,
      "revenue": 682.0,
      "efficiency": 92.5
    },
    "charts": {
      "production": [...],
      "consumption": [...]
    }
  }
}
```

#### GET /reports/system-health

Generate system health report.

**Query Parameters:**
- `startDate`: Report start date
- `endDate`: Report end date
- `format`: Report format

**Response:**
```json
{
  "report": {
    "period": {
      "startDate": "2024-01-01",
      "endDate": "2024-01-15"
    },
    "metrics": {
      "uptime": 98.7,
      "activeEquipment": 42,
      "totalAlerts": 15,
      "resolvedAlerts": 12,
      "averageResponseTime": 45
    },
    "equipment": [
      {
        "id": "equip_123",
        "uptime": 99.2,
        "alerts": 2,
        "maintenance": 0
      }
    ]
  }
}
```

### System Settings

#### GET /settings

Get system settings.

**Response:**
```json
{
  "settings": {
    "general": {
      "siteName": "Smart Coop Dashboard",
      "timezone": "America/New_York",
      "language": "en"
    },
    "security": {
      "sessionTimeout": 3600,
      "passwordPolicy": {
        "minLength": 8,
        "requireUppercase": true,
        "requireNumbers": true
      },
      "twoFactorEnabled": false
    },
    "notifications": {
      "emailEnabled": true,
      "smsEnabled": false,
      "alertThresholds": {
        "feedLevel": 80,
        "waterLevel": 75,
        "batteryLevel": 20
      }
    }
  }
}
```

#### PUT /settings

Update system settings (Admin only).

**Request:**
```json
{
  "notifications": {
    "alertThresholds": {
      "feedLevel": 75,
      "waterLevel": 70
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "settings": {
    "notifications": {
      "alertThresholds": {
        "feedLevel": 75,
        "waterLevel": 70
      }
    },
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

### WebSocket API

#### Real-time Data Streaming

Connect to WebSocket for real-time updates:

```javascript
const ws = new WebSocket('wss://api.smartcoop.com/v1/ws');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    token: 'jwt_token',
    channels: ['equipment_status', 'sensor_data']
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-time update:', data);
};
```

#### WebSocket Message Types

**Equipment Status Update:**
```json
{
  "type": "equipment_status",
  "equipmentId": "equip_123",
  "status": "online",
  "timestamp": "2024-01-15T11:05:00Z"
}
```

**Sensor Data Update:**
```json
{
  "type": "sensor_data",
  "equipmentId": "equip_123",
  "sensorType": "temperature",
  "value": 22.8,
  "timestamp": "2024-01-15T11:05:00Z"
}
```

**Alert Notification:**
```json
{
  "type": "alert",
  "alertId": "alert_123",
  "level": "warning",
  "message": "Feed level low",
  "equipmentId": "equip_123",
  "timestamp": "2024-01-15T11:05:00Z"
}
```

## SDKs and Libraries

### JavaScript SDK

```javascript
import { SmartCoopAPI } from 'smart-coop-sdk';

const api = new SmartCoopAPI({
  baseURL: 'https://api.smartcoop.com/v1',
  token: 'your_jwt_token'
});

// Get dashboard data
const dashboard = await api.dashboard.getOverview();

// Update equipment settings
await api.equipment.update('equip_123', {
  settings: { feedAmount: 200 }
});

// Listen for real-time updates
api.on('equipment_status', (data) => {
  console.log('Equipment update:', data);
});
```

### Mobile SDKs

#### React Native
```bash
npm install @smartcoop/react-native-sdk
```

#### iOS (Swift)
```swift
import SmartCoopSDK

let api = SmartCoopAPI(token: "jwt_token")
api.getDashboard { result in
    switch result {
    case .success(let dashboard):
        print("Dashboard:", dashboard)
    case .failure(let error):
        print("Error:", error)
    }
}
```

#### Android (Kotlin)
```kotlin
import com.smartcoop.sdk.SmartCoopAPI

val api = SmartCoopAPI("jwt_token")
api.getDashboard { dashboard, error ->
    dashboard?.let { println("Dashboard: $it") }
    error?.let { println("Error: $it") }
}
```

## Changelog

### Version 1.0.0 (Current)

- Initial API release
- Authentication endpoints
- Farmer and equipment management
- Sensor data access
- Real-time WebSocket support
- Report generation
- System settings management

### Version 0.9.0 (Beta)

- Core functionality implementation
- Basic CRUD operations
- Authentication system
- Rate limiting
- Error handling

## Support

### Getting Help

- **Documentation**: Full API reference and guides
- **Support Portal**: support.smartcoop.com
- **Community Forum**: forum.smartcoop.com
- **Email Support**: api-support@smartcoop.com

### Service Level Agreement

- **Uptime**: 99.9% availability
- **Response Time**: < 200ms for API calls
- **Support Hours**: 24/7 for critical issues
- **Updates**: Monthly API updates with backward compatibility

---

**This API documentation provides comprehensive information for integrating with the Smart Coop Dashboard. For additional support, contact our developer support team.**