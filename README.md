# Mini E-Commerce System

A full-stack e-commerce application with product management, shopping cart, and order processing.

## Project Overview

This project is a complete Mini E-Commerce system consisting of:
- **Backend API**: NestJS + TypeScript + SQLite
- **Frontend UI**: React + TypeScript
- **Features**: Product CRUD, Shopping Cart, Order Management, Stock Validation

## Technologies Used

### Backend
- NestJS (Node.js framework)
- TypeScript
- TypeORM
- SQLite database
- Swagger for API documentation
- class-validator for input validation

### Frontend
- React
- TypeScript
- React Router DOM
- Axios
- CSS for styling

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

### Backend API
- ✅ Product CRUD operations
- ✅ Shopping cart management
- ✅ Order creation and tracking
- ✅ Stock validation before purchase
- ✅ Price validation
- ✅ Automatic stock deduction on order
- ✅ Swagger API documentation

### Frontend UI
- ✅ Product listing with images and prices
- ✅ Add to cart functionality
- ✅ Cart management (update quantities, remove items)
- ✅ Checkout process
- ✅ Order confirmation page
- ✅ Responsive design

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

Access the interactive Swagger API documentation at: `http://localhost:3000/api`

### Key Endpoints

**Products**
- GET `/products` - List all products
- POST `/products` - Create product
- GET `/products/:id` - Get product details
- PATCH `/products/:id` - Update product
- DELETE `/products/:id` - Delete product

**Cart**
- GET `/cart` - Get cart items
- POST `/cart` - Add item to cart
- PATCH `/cart/:id` - Update cart item
- DELETE `/cart/:id` - Remove from cart

**Orders**
- POST `/orders` - Create order (checkout)
- GET `/orders` - List all orders
- GET `/orders/:id` - Get order details

## Database Schema

### Products Table
- id, name, description, price, stock, imageUrl, createdAt, updatedAt

### Cart Items Table
- id, productId, productName, price, quantity, sessionId, createdAt

### Orders Table
- id, customerName, customerEmail, customerAddress, totalAmount, status, createdAt

### Order Items Table
- id, orderId, productId, productName, price, quantity

## Screenshots

(Screenshots would be placed in the Activity Document)

## Activity Information

**Title**: Mini E-Commerce API + UI

**Description**: A simple e-commerce system with products, shopping cart, and orders. The backend provides RESTful APIs with full CRUD operations, stock validation, and price validation. The frontend displays products, allows adding to cart, and supports checkout functionality.

**Author**: [Your Name]
**Date**: December 22, 2025

## License

This project is for educational purposes.
