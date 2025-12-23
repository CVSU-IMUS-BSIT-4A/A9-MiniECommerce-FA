# User & Admin Folder Structure

## Inilikha kong mga Folder at Files

### Backend Structure

```
backend/src/
├── modules/
│   ├── user/                    # User Module - Para sa mga regular users
│   │   ├── user.module.ts       # User module configuration
│   │   ├── user.controller.ts   # User endpoints
│   │   └── user.service.ts      # User business logic
│   │
│   ├── admin/                   # Admin Module - Para sa mga administrators
│   │   ├── admin.module.ts      # Admin module configuration
│   │   ├── admin.controller.ts  # Admin endpoints (protected)
│   │   └── admin.service.ts     # Admin business logic
│   │
│   └── auth.module.ts           # Authentication module
```

### Frontend Structure

```
frontend/src/
├── pages/
│   ├── user/                    # User Pages - Mga page para sa users
│   │   ├── UserDashboard.tsx    # User dashboard component
│   │   └── UserDashboard.css    # User dashboard styles
│   │
│   └── admin/                   # Admin Pages - Mga page para sa admins
│       ├── AdminDashboard.tsx   # Admin dashboard component
│       └── AdminDashboard.css   # Admin dashboard styles
```

## Features

### User Features (User Folder)
✅ **User Dashboard** - Personal dashboard ng user
- Makikita ang kanilang account information
- Makikita ang lahat ng kanilang orders
- Filtered na sa kanilang email lang

✅ **User API Endpoints** (`/user/*`)
- `GET /user/profile` - Get user profile
- `GET /user/orders` - Get user's orders
- `PATCH /user/profile` - Update user profile

### Admin Features (Admin Folder)
✅ **Admin Dashboard** - Comprehensive admin panel
- **Overview Tab**
  - Total Revenue
  - Total Products
  - Total Orders
  - Low Stock Alerts
- **Products Tab**
  - View all products
  - Check stock levels
- **Orders Tab**
  - View all orders
  - Update order status
  - See customer details

✅ **Admin API Endpoints** (`/admin/*`) - Protected by Admin Role
- `GET /admin/dashboard/stats` - Dashboard statistics
- `GET /admin/users` - Get all users
- `GET /admin/orders` - Get all orders
- `PATCH /admin/orders/:id/status` - Update order status

## Paano Gamitin

### Para sa Users:
1. Mag-register bilang "User"
2. Mag-login
3. Access ang User Dashboard: `/user/dashboard`
4. Makikita ang:
   - Account info
   - Personal orders

### Para sa Admins:
1. Mag-register bilang "Admin"
2. Mag-login
3. Access ang Admin Dashboard: `/admin/dashboard`
4. Makikita ang:
   - Overview ng buong system
   - Lahat ng products
   - Lahat ng orders
   - Pwedeng i-update ang order status

## Routes

### Frontend Routes
```typescript
/user/dashboard      -> User Dashboard (Protected - Login required)
/admin/dashboard     -> Admin Dashboard (Protected - Admin role required)
```

### Backend API Routes
```typescript
// User Routes (Authenticated users)
GET    /user/profile
GET    /user/orders
PATCH  /user/profile

// Admin Routes (Admin role only)
GET    /admin/dashboard/stats
GET    /admin/users
GET    /admin/orders
PATCH  /admin/orders/:id/status
```

## Security

### User Module
- Kailangan ng JWT token
- Pwede lang makita ang sariling data

### Admin Module
- Kailangan ng JWT token
- Kailangan ng Admin role
- May RolesGuard protection
- Access sa lahat ng data

## Testing

### Test User Accounts
```
User Account:
Email: user@techhub.com
Password: user123
Access: /user/dashboard

Admin Account:
Email: admin@techhub.com
Password: admin123
Access: /admin/dashboard
```

## Differences

| Feature | User Folder | Admin Folder |
|---------|------------|--------------|
| Access | All authenticated users | Admin role only |
| View Orders | Own orders only | All orders |
| View Products | Public list | Manage all products |
| Update Status | Cannot | Can update orders |
| Dashboard | Personal info | System-wide stats |

## Header Navigation

Ang header ay automatically nagpapakita ng:
- **Kung User ka**: "My Dashboard" button -> `/user/dashboard`
- **Kung Admin ka**: "Admin Dashboard" button -> `/admin/dashboard`

## Auto-redirect

- Kung hindi ka admin at sinubukan mong i-access ang `/admin/dashboard`, mare-redirect ka sa `/user/dashboard`
- Kung hindi ka naka-login at sinubukan mong i-access kahit alin, mare-redirect ka sa `/login`
