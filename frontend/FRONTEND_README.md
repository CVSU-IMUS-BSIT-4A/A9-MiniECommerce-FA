# Mini E-Commerce Frontend

This is the frontend application for a Mini E-Commerce system built with React and TypeScript.

## Features

- **Product Catalog**: Browse available products with images, prices, and stock information
- **Shopping Cart**: Add/remove products, adjust quantities, view cart total
- **Checkout**: Complete purchase with customer information
- **Order Confirmation**: View order details after successful checkout
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: CSS

## Installation

```bash
npm install
```

## Running the Application

```bash
# Development mode
npm start

# Build for production
npm run build
```

The application will be available at `http://localhost:3000`

**Note**: Make sure the backend API is running at `http://localhost:3000` before starting the frontend.

## Project Structure

```
src/
├── components/       # React components
│   ├── ProductList.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── OrderConfirmation.tsx
│   └── Header.tsx
├── api.ts           # API client and types
├── App.tsx          # Main app component with routing
└── App.css          # Global styles
```

## Available Routes

- `/` - Product listing page
- `/cart` - Shopping cart page
- `/checkout` - Checkout page
- `/order-confirmation/:orderId` - Order confirmation page

## API Integration

The frontend communicates with the backend API at `http://localhost:3000`. The API client is configured in `src/api.ts`.

If your backend is running on a different port or URL, update the `API_URL` constant in `src/api.ts`.
