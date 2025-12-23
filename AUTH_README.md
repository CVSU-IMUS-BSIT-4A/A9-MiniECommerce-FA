# Authentication System Documentation

## Overview
This application now includes a complete authentication system for both users and admins.

## Features

### Backend (NestJS)
- **User Entity**: Email, password (hashed), role (user/admin), and name
- **JWT Authentication**: Token-based authentication with 7-day expiration
- **Password Security**: bcrypt hashing with 10 salt rounds
- **Role-Based Access**: Support for user and admin roles
- **Protected Routes**: JWT guards and role guards for secure endpoints

### Frontend (React)
- **Login Page**: User authentication with email and password
- **Registration Page**: New user registration with optional admin role
- **Auth Context**: Global authentication state management
- **Protected Routes**: Checkout and order confirmation require authentication
- **Header Integration**: Shows login/logout and user info

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "user" // or "admin"
  }
  ```

- `POST /auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `GET /auth/profile` - Get current user profile (Protected)
  - Requires: `Authorization: Bearer <token>`

## Frontend Routes

- `/login` - Login page
- `/register` - Registration page
- `/` - Product list (public)
- `/cart` - Shopping cart (public)
- `/checkout` - Checkout (protected)
- `/order-confirmation/:orderId` - Order confirmation (protected)

## Usage

### Creating an Admin Account
When registering, select "Admin" from the Account Type dropdown.

### Testing the Authentication
1. Start the backend: `cd backend && npm run start:dev`
2. Start the frontend: `cd frontend && npm start`
3. Navigate to `http://localhost:3000/register`
4. Create an account (choose user or admin)
5. You'll be automatically logged in and redirected to the home page

### Using Protected Routes
- Try accessing `/checkout` without logging in - you'll be redirected to `/login`
- After logging in, you can access all protected routes
- The Header shows your email/name and role
- Click "Logout" to sign out

## Security Notes

⚠️ **IMPORTANT**: The JWT secret key is hardcoded for development. In production:
1. Move the secret to environment variables
2. Use a strong, random secret key
3. Consider shorter token expiration times
4. Implement refresh tokens for better security

## Adding Protection to Existing Routes

To protect a route with authentication:
```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Get('protected-route')
async protectedRoute(@Request() req) {
  // req.user contains: { userId, email, role }
  return 'Protected data';
}
```

To require admin role:
```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Get('admin-only')
async adminRoute() {
  return 'Admin only data';
}
```

## Token Storage
- Tokens are stored in `localStorage`
- User data is cached in `localStorage`
- Automatically included in API requests via axios interceptor
