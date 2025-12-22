# Mini E-Commerce Backend API

This is the backend API for a Mini E-Commerce system built with NestJS, TypeScript, TypeORM, and SQLite.

## Features

- **Product Management**: Full CRUD operations for products
- **Shopping Cart**: Add/remove items, update quantities with stock validation
- **Order System**: Checkout process with automatic stock deduction
- **Stock Validation**: Prevents overselling by validating available inventory
- **Price Validation**: Ensures accurate pricing during checkout
- **Swagger Documentation**: Interactive API documentation at `/api`

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: SQLite
- **ORM**: TypeORM
- **Validation**: class-validator
- **API Documentation**: Swagger/OpenAPI

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Seed database with sample products
npm run seed
```

The API will be available at `http://localhost:3000`

Swagger documentation will be available at `http://localhost:3000/api`

## API Endpoints

### Products

- `GET /products` - Get all products
- `GET /products/:id` - Get a product by ID
- `POST /products` - Create a new product
- `PATCH /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

### Cart

- `GET /cart?sessionId=xxx` - Get cart items
- `POST /cart` - Add item to cart
- `PATCH /cart/:id` - Update cart item quantity
- `DELETE /cart/:id` - Remove item from cart
- `DELETE /cart?sessionId=xxx` - Clear cart
- `GET /cart/total?sessionId=xxx` - Get cart total

### Orders

- `GET /orders` - Get all orders
- `GET /orders/:id` - Get an order by ID
- `POST /orders` - Create a new order (checkout)
- `PATCH /orders/:id/status` - Update order status

## Database

The application uses SQLite with the database file stored as `ecommerce.db` in the root directory.

The database schema includes:
- `products` - Product information
- `cart_items` - Shopping cart items
- `orders` - Order information
- `order_items` - Items in each order

## Environment Variables

No environment variables are required for basic operation. The default port is 3000.

To change the port, set the `PORT` environment variable.

