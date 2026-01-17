# TechHub PH - Mini E-Commerce System

## 📋 System Description

**TechHub PH** is a comprehensive full-stack e-commerce web application designed for selling tech products online. The system provides a complete shopping experience with dual user interfaces - one for customers to browse and purchase products, and another for administrators to manage the entire store operations.

### System Overview

This is a modern e-commerce platform built with cutting-edge technologies, featuring real-time inventory management, secure user authentication, shopping cart functionality, and a complete order processing workflow. The system handles everything from product browsing to order fulfillment, with separate dashboards for customers and administrators.

### 🌟 Key Features

- **🔐 Dual Authentication System** - Separate login portals for customers and administrators with role-based access control using JWT tokens
- **🛒 Smart Shopping Cart** - Session-based cart management with real-time stock validation and automatic price calculations
- **📦 Complete Order Lifecycle** - Full order workflow from placement to completion with status tracking (Pending → Processing → Receiving → Completed)
- **🔔 Real-time Notifications** - Automatic notification badges for orders ready for delivery with 30-second polling updates
- **📸 Image Upload System** - Direct product image upload with Base64 encoding, eliminating the need for external image hosting
- **❌ Order Cancellation** - Flexible order cancellation with multiple reason options including custom text input for pending/processing orders
- **📊 Admin Dashboard** - Comprehensive business overview with revenue tracking, inventory monitoring, and low-stock alerts
- **🔍 Smart Search** - Real-time product search functionality with instant filtering by name and description
- **✅ Success Feedback** - Elegant confirmation modals for all CRUD operations providing clear user feedback
- **🔄 Auto-refresh** - Automatic updates every 10 seconds for orders and 30 seconds for notifications ensuring real-time data
- **📱 Responsive Design** - Mobile-friendly interface with modern CSS3 animations and gradient effects
- **🔒 Secure Backend** - Input validation, error handling, and protected endpoints with comprehensive Swagger API documentation

### Key Capabilities

**Authentication & Registration Features:**
- **User Registration with Verification Modal** - New users can create accounts by providing email, password, and full name. Upon successful registration, an elegant verification modal appears with a success message and checkmark animation, prompting users to check their email for verification. The system does not auto-login after registration, ensuring proper email verification workflow.
- **Secure Login System** - Both customers and administrators log in through a unified authentication interface. The system validates credentials against the database, checking hashed passwords using bcrypt encryption. Upon successful authentication, users receive a JWT token stored in localStorage for session persistence.
- **Role-Based Authentication** - The system distinguishes between two user roles: "user" (customers) and "admin" (administrators). During registration, users are automatically assigned the "user" role, while admin accounts must be created through database seeding or direct database manipulation for security purposes.
- **JWT Token Management** - After login, users receive a JSON Web Token (JWT) that contains their user ID and role information. This token is automatically included in all subsequent API requests via the Authorization header, enabling stateless authentication and role-based access control across the platform.
- **Auth Persistence on Refresh** - The authentication context implements a loading state that prevents premature redirects when users refresh the page. The system checks localStorage for existing tokens and validates them with the backend before determining the user's authentication state, ensuring seamless session continuity.
- **Protected Routes** - The application uses React Router's protected route pattern to guard dashboard pages. Unauthenticated users attempting to access protected routes are automatically redirected to the login page, while authenticated users are prevented from accessing login/register pages and redirected to their appropriate dashboard.
- **Logout Functionality** - Users can securely log out at any time by clicking the logout button in the header. This action clears the JWT token from localStorage, resets the authentication context, and redirects users to the login page, ensuring complete session termination.
- **Password Security** - User passwords are never stored in plain text. The backend uses bcrypt hashing with salt rounds to encrypt passwords before database storage. During login, the system compares the provided password against the hashed version using bcrypt's secure comparison method.
- **Email Validation** - The registration form validates email format in real-time, ensuring users provide valid email addresses. The backend also checks for duplicate emails, preventing multiple accounts with the same email address and displaying appropriate error messages.
- **Form Error Handling** - Both login and registration forms provide clear, user-friendly error messages for various scenarios: invalid credentials, duplicate emails, missing required fields, weak passwords, and server errors. This feedback helps users quickly identify and resolve issues.

**Customer Features:**
- **Browse and search through a catalog of tech products** - Users can explore the complete product inventory with a responsive grid layout. The search functionality allows real-time filtering of products by name or description, making it easy to find specific items quickly.
- **View detailed product information with images and pricing** - Each product displays comprehensive details including high-quality Base64 encoded images, accurate pricing, stock availability, and detailed descriptions to help customers make informed purchasing decisions.
- **Add products to shopping cart with quantity management** - Customers can add multiple items to their cart and specify desired quantities. The system validates stock availability in real-time and prevents adding more items than available in inventory.
- **Proceed through a streamlined checkout process** - A user-friendly checkout flow guides customers through entering their delivery information (name, email, address) and reviewing their order before final confirmation, with automatic cart total calculation.
- **Track order status in real-time** - Orders progress through a well-defined lifecycle: Pending (just placed) → Processing (admin preparing) → Receiving (ready for delivery) → Completed (customer confirmed). Each status is clearly indicated with color-coded badges.
- **Receive orders and confirm delivery** - When an order reaches "Receiving" status, customers see a dedicated "Order Received" button in their dashboard, allowing them to confirm successful delivery and automatically update the order to "Completed" status.
- **Cancel orders with specified reasons** - For orders in "Pending" or "Processing" status, customers can cancel with a reason selection modal offering options like "Changed my mind", "Found a better price", "Ordered by mistake", "Delivery time too long", or a custom "Other" option with free-text input.
- **Get notifications for orders in receiving status** - A notification badge appears on the user profile icon in the header, displaying the count of orders ready for pickup/delivery. This badge updates automatically every 30 seconds and clears once the user views their dashboard.
- **View complete order history with details** - The user dashboard displays all past and current orders in ascending chronological order, numbered sequentially (Order #1, #2, #3), showing order date, total amount, status, and a detailed list of all items purchased with quantities.

**Administrator Features:**
- **Comprehensive admin dashboard with business overview** - The Overview tab displays key performance metrics at a glance, including total revenue from all orders, total number of products in inventory, current order count, and alerts for low-stock items (products with fewer than 10 units remaining).
- **Full product management (Create, Read, Update, Delete)** - Admins have complete control over the product catalog through an intuitive tabbed interface. They can add new products, edit existing ones, delete discontinued items, and view the entire inventory in a sortable table format with Edit and Delete action buttons.
- **Image upload functionality for products (Base64 encoding)** - Instead of requiring external image hosting, the system allows admins to upload product images directly through a file input. Images are automatically converted to Base64 format and stored in the database, with a live preview shown during the upload process.
- **Order management with status updates** - The Orders tab shows all customer orders in a comprehensive table with customer details, email, total amount, current status, and order date. Admins can update order statuses through an intuitive dropdown menu to move orders through the fulfillment workflow.
- **View all customer orders and order details** - By clicking the "View" button on any order, admins can open a detailed modal showing complete customer information, delivery address, individual items ordered with quantities and prices, and the order's complete lifecycle from creation to current status.
- **Monitor total revenue, product count, and low stock items** - The dashboard provides real-time business intelligence with automatic calculations of total revenue across all orders, current product inventory count, total order volume, and critical alerts for products requiring restocking.
- **Track order statuses across the platform** - Color-coded status badges (yellow for Pending, blue for Processing, purple for Receiving, green for Completed, red for Cancelled) provide instant visual feedback on order states, helping admins prioritize fulfillment tasks.
- **Success modals for product operations** - After creating, updating, or deleting products, admins receive elegant success confirmation modals with animated checkmarks, providing clear feedback that operations completed successfully before automatically closing.
- **Tabbed interface (Overview, Products, Orders)** - The admin dashboard uses a clean tab-based navigation system allowing quick switching between business metrics overview, product inventory management, and order processing sections without page reloads.
- **View-only mode for completed orders** - Orders with "Completed" status are locked from further modifications and display a read-only message ("This order has been completed and cannot be modified"), preventing accidental status changes and maintaining data integrity.

**System Features:**
- Dual authentication system (User & Admin roles)
- Session-based shopping cart
- Real-time stock validation before checkout
- Automatic stock deduction on successful orders
- Order status notifications with badge indicators
- Responsive design for mobile and desktop
- Search functionality for products
- Auto-refresh mechanisms for real-time updates

### User Workflows

**Customer Journey:**
1. Register/Login to the system
2. Browse products or search for specific items
3. Add desired products to cart
4. Review cart and proceed to checkout
5. Provide delivery information and confirm order
6. Track order status in user dashboard
7. Receive notifications when order is ready for delivery
8. Confirm receipt or cancel order (if needed)

**Admin Workflow:**
1. Login with admin credentials
2. View dashboard with business metrics
3. Manage product inventory (add/edit/delete products)
4. Monitor incoming orders
5. Update order statuses based on fulfillment progress
6. Track completed and cancelled orders

A full-stack e-commerce application with product management, shopping cart, and order processing.

## Project Overview

This project is a complete Mini E-Commerce system consisting of:
- **Backend API**: NestJS + TypeScript + SQLite
- **Frontend UI**: React + TypeScript
- **Features**: Product CRUD, Shopping Cart, Order Management, Stock Validation

## Technologies Used

### Backend
- **NestJS** - Progressive Node.js framework for building efficient server-side applications
- **TypeScript** - Typed superset of JavaScript for better code quality
- **TypeORM** - Object-Relational Mapping for database operations
- **SQLite** - Lightweight embedded database
- **Swagger** - Interactive API documentation
- **class-validator** - Decorator-based validation for DTOs
- **JWT** - JSON Web Tokens for authentication
- **Passport** - Authentication middleware

### Frontend
- **React** - Component-based UI library
- **TypeScript** - Type-safe frontend development
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Context API** - State management for authentication
- **CSS3** - Modern styling with animations and gradients

## Project Structure

```
A9-MiniECommerce-FA/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── entities/     # Database entities
│   │   ├── dto/          # Data transfer objects
│   │   ├── services/     # Business logic
│   │   ├── controllers/  # API endpoints
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   └── seed.ts       # Database seeding
│   ├── package.json
│   └── README.md
└── frontend/         # React application
    ├── src/
    │   ├── components/   # React components
    │   ├── api.ts       # API client
    │   ├── App.tsx
    │   └── App.css
    ├── package.json
    └── README.md
```

## Features

### 🛍️ Customer Features
- ✅ User registration with verification modal
- ✅ Secure login/logout functionality
- ✅ Product browsing with search capability
- ✅ Product details with images and pricing
- ✅ Shopping cart with add/update/remove items
- ✅ Real-time cart total calculation
- ✅ Checkout process with customer information
- ✅ Order confirmation page
- ✅ User dashboard with order history
- ✅ Order tracking with status badges (Pending, Processing, Receiving, Completed, Cancelled)
- ✅ Order cancellation with reason selection
- ✅ Order receive confirmation button
- ✅ Notification badges for orders in receiving status
- ✅ Auto-refresh for real-time order updates
- ✅ Responsive mobile-friendly design

### 👨‍💼 Admin Features
- ✅ Admin dashboard with business overview
- ✅ Total revenue tracking
- ✅ Product count monitoring
- ✅ Low stock alerts (products < 10 units)
- ✅ Complete product management (CRUD operations)
- ✅ Image upload for products with preview
- ✅ Order management system
- ✅ Order status updates (Pending → Processing → Receiving → Completed)
- ✅ View order details with customer information
- ✅ Success modals for product operations
- ✅ Tabbed interface (Overview, Products, Orders)
- ✅ View-only mode for completed orders

### 🔧 Backend API Features
- ✅ RESTful API architecture
- ✅ Stock validation before purchase
- ✅ Automatic stock deduction on order creation
- ✅ Price validation and calculation
- ✅ Session-based cart management
- ✅ Order status workflow management
- ✅ Role-based authentication (User/Admin)
- ✅ JWT token-based authorization
- ✅ Swagger API documentation
- ✅ Input validation and error handling
- ✅ Base64 image storage support

## How to Run the Project

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Seed database with sample products
npm run seed

# Start the backend server
npm run start:dev
```

The API will be available at `http://localhost:3000`
Swagger documentation at `http://localhost:3000/api`

### Frontend Setup

**Important**: Make sure the backend is running first!

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the frontend application
npm start
```

The frontend will be available at `http://localhost:3001` (if port 3000 is already used by backend)

## API Documentation

The TechHub PH system provides a comprehensive RESTful API built with NestJS and documented using Swagger/OpenAPI 3.0. The API handles all backend operations including authentication, product management, shopping cart functionality, and order processing. This robust backend infrastructure ensures seamless communication between the frontend application and the database, implementing proper validation, error handling, and security measures throughout all operations.

### 📖 Interactive Swagger Documentation

Access the interactive Swagger API documentation at `http://localhost:3000/api` to explore the complete API reference. The Swagger UI provides a user-friendly interface with the following capabilities:

- **Explore all available endpoints** - The documentation organizes all API endpoints by category including Authentication, Products, Shopping Cart, and Orders. Each endpoint is clearly labeled with its HTTP method (GET, POST, PATCH, DELETE) and path, making it easy to navigate and understand the API structure.

- **View detailed request/response schemas** - Every endpoint includes comprehensive schema definitions showing data types, validation rules, required fields, and example values. This helps developers understand exactly what data to send and what responses to expect.

- **Test API endpoints directly** - The "Try it out" feature allows you to send actual HTTP requests directly from the browser without needing external tools like Postman. You can input request parameters, view the exact request being sent, and see real-time responses from the server.

- **Authenticate with JWT tokens** - Protected endpoints requiring authorization can be tested by including your Bearer token. Simply authenticate once, and the token is automatically included in subsequent requests, allowing you to test user-specific and admin-only endpoints.

- **View response status codes** - Each endpoint documentation displays all possible HTTP status codes (200, 201, 400, 401, 404, 500) with explanations of when each occurs. This helps developers implement proper error handling in their applications.

- **Access schema definitions** - The Schemas section at the bottom provides a complete reference of all data models, DTOs (Data Transfer Objects), and entities used throughout the API, showing the structure and relationships between different data types.

### 🔗 API Categories

The API is organized into four main categories, each serving a specific domain of the e-commerce system:

- **Authentication Endpoints (`/auth`)** - This category handles all user-related security operations including user registration with email and password validation, user login with credential verification against hashed passwords stored in the database, profile retrieval for authenticated users to access their account information, and JWT token generation and validation for maintaining secure stateless sessions across the platform. All passwords are encrypted using bcrypt before storage, and JWT tokens contain user ID and role information for authorization purposes.

- **Product Management Endpoints (`/products`)** - These endpoints provide complete CRUD (Create, Read, Update, Delete) functionality for managing the product catalog. Public endpoints allow retrieving all products in the inventory or fetching specific product details by ID for customer browsing. Administrative users have exclusive access to create new products with full details including name, description, price, stock quantity, and Base64-encoded images, update existing product information such as adjusting prices or restocking inventory, and delete discontinued products from the system. The Base64 image upload support eliminates the need for external image hosting services by storing images directly in the database as encoded text.

- **Shopping Cart Endpoints (`/cart`)** - This category manages the session-based shopping cart functionality that allows customers to build their orders before checkout. These endpoints enable adding products to the cart with specified quantities while validating stock availability in real-time, viewing all cart items associated with a particular session ID, calculating the total cart amount by summing the price multiplied by quantity for all items, updating item quantities with automatic stock validation to prevent over-ordering, and removing individual items from the cart or clearing the entire cart after successful checkout. The cart system uses session-based persistence where each unique session ID maintains its own separate cart, allowing multiple users to shop simultaneously without interference.

- **Order Management Endpoints (`/orders`)** - These endpoints handle the complete order lifecycle from creation through completion or cancellation. The checkout process creates new orders by validating stock availability for all items, calculating the total amount, automatically deducting inventory levels, and setting the initial status to "pending". Users can view all orders in the system (filtered by customer email on the frontend for privacy) or retrieve specific order details including all items, quantities, prices, customer information, and delivery addresses. Administrative users have the ability to update order statuses through the workflow progression of pending → processing → receiving → completed, while customers can mark orders as received when they take delivery, automatically updating the status from "receiving" to "completed". The system also supports order cancellation with specified reasons for orders in pending or processing status, maintaining data integrity and providing valuable feedback for business analytics.

### API Endpoints Overview

#### 🔐 Authentication Endpoints

**POST `/auth/register`**
- **Description**: Register a new user account in the system
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe",
    "role": "user"  // optional: "user" or "admin" (default: "user")
  }
  ```
- **Response**: Returns JWT access token and user object
- **Success (201)**:
  ```json
  {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    }
  }
  ```
- **Errors**: 400 (Invalid input or email already exists)

**POST `/auth/login`**
- **Description**: Authenticate user with email and password
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns JWT access token and user object
- **Success (200)**: Same structure as register response
- **Errors**: 401 (Invalid credentials)

**GET `/auth/profile`**
- **Description**: Get current authenticated user's profile information
- **Access**: Requires JWT Bearer Token
- **Headers**: `Authorization: Bearer <token>`
- **Response**: User profile with all details
- **Success (200)**:
  ```json
  {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "user",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  }
  ```
- **Errors**: 401 (Unauthorized - Invalid or missing token)

#### 📦 Product Endpoints

**GET `/products`**
- **Description**: Retrieve list of all available products
- **Access**: Public (no authentication required)
- **Query Parameters**: None
- **Response**: Array of all products
- **Success (200)**:
  ```json
  [
    {
      "id": 1,
      "name": "Laptop Pro 15\"",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1299.99,
      "stock": 50,
      "imageUrl": "data:image/jpeg;base64,...",
      "createdAt": "2026-01-16T00:00:00.000Z",
      "updatedAt": "2026-01-16T00:00:00.000Z"
    }
  ]
  ```

**GET `/products/:id`**
- **Description**: Get detailed information about a specific product
- **Access**: Public
- **Path Parameters**: `id` - Product ID (number)
- **Response**: Single product object
- **Success (200)**: Same structure as single product in GET all
- **Errors**: 404 (Product not found)

**POST `/products`**
- **Description**: Create a new product (Admin only)
- **Access**: Admin only
- **Request Body**:
  ```json
  {
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse",
    "price": 29.99,
    "stock": 100,
    "imageUrl": "data:image/jpeg;base64,..." // optional, Base64 encoded
  }
  ```
- **Response**: Created product object
- **Success (201)**: Returns the created product
- **Errors**: 400 (Invalid input data)

**PATCH `/products/:id`**
- **Description**: Update existing product information (Admin only)
- **Access**: Admin only
- **Path Parameters**: `id` - Product ID
- **Request Body**: Partial product object (only fields to update)
  ```json
  {
    "price": 24.99,
    "stock": 150
  }
  ```
- **Response**: Updated product object
- **Success (200)**: Returns updated product
- **Errors**: 404 (Product not found), 400 (Invalid data)

**DELETE `/products/:id`**
- **Description**: Permanently delete a product from inventory (Admin only)
- **Access**: Admin only
- **Path Parameters**: `id` - Product ID
- **Response**: Success message
- **Success (200)**:
  ```json
  {
    "message": "Product deleted successfully"
  }
  ```
- **Errors**: 404 (Product not found)

#### 🛒 Shopping Cart Endpoints

**POST `/cart`**
- **Description**: Add a product to shopping cart with specified quantity
- **Access**: Public (session-based)
- **Request Body**:
  ```json
  {
    "productId": 5,
    "quantity": 2,
    "sessionId": "abc123xyz" // unique session identifier
  }
  ```
- **Functionality**: 
  - Validates product exists
  - Checks stock availability
  - Creates or updates cart item
- **Success (201)**:
  ```json
  {
    "id": 1,
    "productId": 5,
    "productName": "Laptop Pro 15\"",
    "price": 1299.99,
    "quantity": 2,
    "sessionId": "abc123xyz",
    "createdAt": "2026-01-16T00:00:00.000Z"
  }
  ```
- **Errors**: 400 (Insufficient stock or invalid product)

**GET `/cart?sessionId=xyz`**
- **Description**: Retrieve all items in the shopping cart for a session
- **Access**: Public
- **Query Parameters**: 
  - `sessionId` (optional) - Session identifier
- **Response**: Array of cart items
- **Success (200)**: Array of cart item objects

**GET `/cart/total?sessionId=xyz`**
- **Description**: Calculate total amount of all items in cart
- **Access**: Public
- **Query Parameters**: `sessionId` (optional)
- **Response**: Total cart amount
- **Success (200)**:
  ```json
  {
    "total": 2599.98
  }
  ```
- **Calculation**: Sum of (price × quantity) for all items

**PATCH `/cart/:id`**
- **Description**: Update quantity of a specific cart item
- **Access**: Public
- **Path Parameters**: `id` - Cart item ID
- **Request Body**:
  ```json
  {
    "quantity": 3
  }
  ```
- **Functionality**: Validates stock for new quantity
- **Success (200)**: Updated cart item object
- **Errors**: 404 (Cart item not found), 400 (Insufficient stock)

**DELETE `/cart/:id`**
- **Description**: Remove a specific item from cart
- **Access**: Public
- **Path Parameters**: `id` - Cart item ID
- **Success (200)**:
  ```json
  {
    "message": "Cart item removed successfully"
  }
  ```
- **Errors**: 404 (Cart item not found)

**DELETE `/cart?sessionId=xyz`**
- **Description**: Clear all items from cart (useful after checkout)
- **Access**: Public
- **Query Parameters**: `sessionId` (optional)
- **Success (200)**:
  ```json
  {
    "message": "Cart cleared successfully"
  }
  ```

#### 📋 Order Endpoints

**POST `/orders`**
- **Description**: Create a new order (Checkout process)
- **Access**: Public
- **Request Body**:
  ```json
  {
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerAddress": "123 Main St, City, Country",
    "items": [
      {
        "productId": 5,
        "quantity": 2
      },
      {
        "productId": 3,
        "quantity": 1
      }
    ]
  }
  ```
- **Functionality**:
  - Validates all products exist
  - Checks stock availability for each item
  - Calculates total amount
  - Creates order with status "pending"
  - Creates order items
  - Reduces product stock automatically
- **Success (201)**:
  ```json
  {
    "id": 1,
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerAddress": "123 Main St, City, Country",
    "totalAmount": 2599.98,
    "status": "pending",
    "items": [
      {
        "id": 1,
        "productId": 5,
        "productName": "Laptop Pro 15\"",
        "price": 1299.99,
        "quantity": 2
      }
    ],
    "createdAt": "2026-01-16T00:00:00.000Z"
  }
  ```
- **Errors**: 400 (Insufficient stock, invalid items, or missing fields)

**GET `/orders`**
- **Description**: Get all orders in the system
- **Access**: Public (typically filtered by user on frontend)
- **Response**: Array of all orders with their items
- **Success (200)**: Array of order objects
- **Use Case**: Admin dashboard shows all, user dashboard filters by email

**GET `/orders/:id`**
- **Description**: Get detailed information about a specific order
- **Access**: Public
- **Path Parameters**: `id` - Order ID
- **Response**: Complete order object with items
- **Success (200)**: Single order object with nested items array
- **Errors**: 404 (Order not found)

**PATCH `/orders/:id/status`**
- **Description**: Update the status of an order (Admin action)
- **Access**: Admin only
- **Path Parameters**: `id` - Order ID
- **Request Body**:
  ```json
  {
    "status": "processing"
  }
  ```
- **Valid Statuses**: 
  - `pending` - Order placed, awaiting processing
  - `processing` - Admin preparing the order
  - `receiving` - Ready for customer pickup/delivery
  - `completed` - Customer confirmed receipt
  - `cancelled` - Order cancelled
- **Workflow**: `pending` → `processing` → `receiving` → `completed`
- **Success (200)**: Updated order object
- **Errors**: 404 (Order not found)

**PATCH `/orders/:id/receive`**
- **Description**: Mark order as received by customer
- **Access**: User action (customer confirms delivery)
- **Path Parameters**: `id` - Order ID
- **Functionality**: Updates order status from "receiving" to "completed"
- **Success (200)**: Updated order object with status "completed"
- **Errors**: 404 (Order not found)
- **Use Case**: Customer clicks "Order Received" button in their dashboard

### Authentication & Authorization

**JWT Token Usage:**
- Tokens are returned on successful login/registration
- Include token in requests: `Authorization: Bearer <your_token>`
- Tokens contain user ID and role information
- Protected endpoints validate token and check user role

**Role-Based Access:**
- **Public**: Products (read), Cart operations, Order creation
- **User**: View own orders, receive orders, cancel orders
- **Admin**: All product operations, view all orders, update order status

### Error Responses

All endpoints follow standard HTTP error codes:
- **400 Bad Request**: Invalid input data or business logic violation
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions for the action
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Unexpected server error

Error response format:
```json
{
  "statusCode": 400,
  "message": "Insufficient stock for product ID 5",
  "error": "Bad Request"
}
```

## Database Schema

### Users Table
- id, email, password (hashed), name, role (user/admin), createdAt, updatedAt

### Products Table
- id, name, description, price, stock, imageUrl (text/base64), createdAt, updatedAt

### Cart Items Table
- id, productId, productName, price, quantity, sessionId, createdAt

### Orders Table
- id, customerName, customerEmail, customerAddress, totalAmount, status, createdAt

### Order Items Table
- id, orderId, productId, productName, price, quantity

## Order Status Workflow

```
Pending → Processing → Receiving → Completed
                ↓
           Cancelled (can be cancelled during Pending/Processing)
```

**Status Descriptions:**
- **Pending**: Order placed, awaiting admin processing
- **Processing**: Admin has started preparing the order
- **Receiving**: Order is ready for customer pickup/delivery
- **Completed**: Customer has confirmed receipt
- **Cancelled**: Order cancelled by customer with reason

## Default Test Accounts

After running `npm run seed` in the backend:

**Admin Account:**
- Email: `admin@techhub.com`
- Password: `admin123`

**User Account:**
- Email: `user@techhub.com`
- Password: `user123`

## Screenshots

(Screenshots would be placed in the Activity Document)

## Testing the System

### Using Postman
A complete Postman collection is included in the project root:
- File: `TechHub_API_Collection.postman_collection.json`
- Import this file into Postman for ready-to-use API testing
- Includes all endpoints with sample requests
- Automated tests for response validation
- Environment variables for easy configuration

See `POSTMAN_DOCUMENTATION.md` for detailed API usage examples.

## Activity Information

**Project Name**: TechHub PH - Mini E-Commerce System

**Description**: A full-featured e-commerce platform for selling tech products. The system includes customer-facing features for browsing and purchasing products, as well as an administrative dashboard for managing inventory and orders. Built with modern technologies including NestJS backend with TypeORM and SQLite database, and React frontend with TypeScript. Features include user authentication, role-based access control, real-time order tracking, shopping cart management, product search, order cancellation with reasons, and notification system for order status updates.

**Key Highlights:**
- Dual-interface design (Customer & Admin)
- Complete order lifecycle management
- Real-time notifications and updates
- Image upload with Base64 encoding
- Responsive and modern UI design
- RESTful API with Swagger documentation
- Session-based cart persistence
- Role-based authentication and authorization



## License

This project is for educational purposes.
