# TechHub E-Commerce API - Postman Documentation

## 📋 Overview
Complete API testing documentation for the TechHub E-Commerce platform using Postman. Updated with all available endpoints including Admin and User features.

## 🔧 Setup Instructions

### 1. Import Collection
1. Open Postman
2. Click **Import** button
3. Select `TechHub_API_Collection.postman_collection.json`
4. Collection will be imported with all requests and tests

### 2. Configure Variables
The collection uses the following variables:
- `baseUrl`: http://localhost:3000 (Backend API URL)
- `token`: Auto-populated after login
- `userId`: Auto-populated from user responses
- `productId`: Auto-populated from product responses
- `orderId`: Auto-populated from order responses
- `cartItemId`: Auto-populated from cart responses
- `sessionId`: Session identifier for cart (default: session-123-abc)

### 3. Start the Backend
```bash
cd backend
npm run start:dev
```

---

## 📊 Complete API Endpoints Summary

### 🔐 AUTHENTICATION (4 endpoints)
1. **POST** `/auth/register` - Register new user
2. **POST** `/auth/login` - Login user/admin
3. **GET** `/auth/profile` - Get authenticated user profile (requires token)

### 📦 PRODUCTS (5 endpoints)
4. **GET** `/products` - Get all products (public)
5. **GET** `/products/:id` - Get product by ID (public)
6. **POST** `/products` - Create product (admin only, requires token)
7. **PATCH** `/products/:id` - Update product (admin only, requires token)
8. **DELETE** `/products/:id` - Delete product (admin only, requires token)

### 🛒 CART (6 endpoints)
9. **POST** `/cart` - Add item to cart
10. **GET** `/cart?sessionId=xxx` - Get cart items by session
11. **GET** `/cart/total?sessionId=xxx` - Get cart total amount
12. **PATCH** `/cart/:id` - Update cart item quantity
13. **DELETE** `/cart/:id` - Remove single cart item
14. **DELETE** `/cart?sessionId=xxx` - Clear entire cart

### 📋 ORDERS (5 endpoints)
15. **POST** `/orders` - Create order (checkout)
16. **GET** `/orders` - Get all orders
17. **GET** `/orders/:id` - Get order by ID
18. **PATCH** `/orders/:id/status` - Update order status (admin)
19. **PATCH** `/orders/:id/receive` - Mark order as received (user)

### 👑 ADMIN (4 endpoints - requires admin token)
20. **GET** `/admin/dashboard/stats` - Get dashboard statistics
21. **GET** `/admin/users` - Get all users
22. **GET** `/admin/orders` - Get all orders
23. **PATCH** `/admin/orders/:id/status` - Update order status

### 👤 USER (3 endpoints - requires user token)
24. **GET** `/user/profile` - Get user profile
25. **GET** `/user/orders` - Get user's orders
26. **PATCH** `/user/profile` - Update user profile

**Total: 27 API Endpoints**

---

## 📊 Detailed API Endpoints Documentation

### 🔐 AUTHENTICATION

#### 1. Register User
- **Method:** POST
- **Endpoint:** `/auth/register`
- **Authorization:** None
- **Headers:** 
  - Content-Type: application/json

**Request Body:**
```json
{
    "email": "newuser@techhub.com",
    "password": "password123",
    "name": "John Doe"
}
```

**Expected Response:**
- **Response Code:** 201 Created
- **Response Time:** < 500ms
- **Response Size:** ~250-300 bytes

**Response Body Example:**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 1,
        "email": "newuser@techhub.com",
        "name": "John Doe",
        "role": "user"
    }
}
```

**Tests Included:**
- ✅ Status code is 201 Created
- ✅ Response time < 500ms
- ✅ Response contains access_token
- ✅ User object exists with email and role
- ✅ Auto-saves token to collection variables

---

#### 2. Login User
- **Method:** POST
- **Endpoint:** `/auth/login`
- **Authorization:** None
- **Headers:** 
  - Content-Type: application/json

**Request Body:**
```json
{
    "email": "user@techhub.com",
    "password": "user123"
}
```

**Expected Response:**
- **Response Code:** 200 OK
- **Response Time:** < 1000ms
- **Response Size:** ~240-280 bytes

**Response Example:**
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": 2,
        "email": "user@techhub.com",
        "name": "Regular User",
        "role": "user"
    }
}
```

**Tests Included:**
- ✅ Status code is 200 OK
- ✅ Response time < 1000ms
- ✅ JWT token exists and is valid string
- ✅ Token auto-saved to variables
- ✅ Logs response metrics

---

#### 3. Login Admin
- **Method:** POST
- **Endpoint:** `/auth/login`
- **Authorization:** None

**Request Body:**
```json
{
    "email": "admin@techhub.com",
    "password": "admin123"
}
```

**Expected Response:**
- **Response Code:** 200 OK
- **Response Time:** < 1000ms

**Tests Included:**
- ✅ Status code is 200
- ✅ User role is 'admin'
- ✅ Admin token auto-saved

---

#### 4. Get User Profile
- **Method:** GET
- **Endpoint:** `/auth/profile`
- **Authorization:** Bearer Token
- **Headers:**
  - Authorization: Bearer {{token}}

**Expected Response:**
- **Response Code:** 200 OK
- **Response Time:** < 300ms

**Response Example:**
```json
{
    "id": 2,
    "email": "user@techhub.com",
    "name": "Regular User",
    "role": "user"
}
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Response has id, email, role
- ✅ Response time < 300ms

---

### 📦 PRODUCTS

#### 1. Get All Products
- **Method:** GET
- **Endpoint:** `/products`
- **Authorization:** None (Public)
- **Params:** None

**Expected Response:**
- **Response Code:** 200 OK
- **Response Time:** < 500ms
- **Response Size:** Varies (depends on product count)

**Response Example:**
```json
[
    {
        "id": 1,
        "name": "Laptop Pro 15\"",
        "description": "High-performance laptop with 16GB RAM",
        "price": 1299.99,
        "stock": 15,
        "imageUrl": "https://example.com/laptop.jpg"
    },
    {
        "id": 2,
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse",
        "price": 29.99,
        "stock": 50,
        "imageUrl": "https://example.com/mouse.jpg"
    }
]
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Response is array
- ✅ Products have id, name, price, stock
- ✅ Auto-saves first product ID
- ✅ Logs total product count

---

#### 2. Create Product (Admin)
- **Method:** POST
- **Endpoint:** `/products`
- **Authorization:** Bearer Token (Admin role required)
- **Headers:**
  - Content-Type: application/json
  - Authorization: Bearer {{token}}

**Request Body:**
```json
{
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with precision tracking",
    "price": 29.99,
    "stock": 50,
    "imageUrl": "https://example.com/mouse.jpg"
}
```

**Expected Response:**
- **Response Code:** 201 Created
- **Response Time:** < 500ms

**Response Example:**
```json
{
    "id": 3,
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with precision tracking",
    "price": 29.99,
    "stock": 50,
    "imageUrl": "https://example.com/mouse.jpg"
}
```

**Tests Included:**
- ✅ Status code is 201
- ✅ Product created with ID
- ✅ Auto-saves product ID

---

#### 3. Update Product (Admin)
- **Method:** PATCH
- **Endpoint:** `/products/:id`
- **Authorization:** Bearer Token (Admin)
- **Params:** 
  - id: Product ID (using {{productId}} variable)

**Request Body:**
```json
{
    "name": "Wireless Mouse Pro",
    "price": 34.99,
    "stock": 45
}
```

**Expected Response:**
- **Response Code:** 200 OK
- **Response Time:** < 400ms

**Tests Included:**
- ✅ Status code is 200
- ✅ Product updated successfully

---

#### 4. Delete Product (Admin)
- **Method:** DELETE
- **Endpoint:** `/products/:id`
- **Authorization:** Bearer Token (Admin)
- **Params:**
  - id: Product ID to delete

**Expected Response:**
- **Response Code:** 200 OK or 204 No Content
- **Response Time:** < 300ms

**Tests Included:**
- ✅ Status code is 200 or 204
- ✅ Delete operation successful

---

### 🛒 CART

#### 1. Add to Cart
- **Method:** POST
- **Endpoint:** `/cart`
- **Authorization:** Bearer Token (User)
- **Headers:**
  - Content-Type: application/json
  - Authorization: Bearer {{token}}

**Request Body:**
```json
{
    "productId": 1,
    "quantity": 2
}
```

**Expected Response:**
- **Response Code:** 201 Created
- **Response Time:** < 500ms

**Response Example:**
```json
{
    "id": 1,
    "productId": 1,
    "quantity": 2,
    "userId": 2
}
```

**Tests Included:**
- ✅ Status code is 201
- ✅ Item has id and quantity
- ✅ Response time < 500ms

---

#### 2. Get Cart
- **Method:** GET
- **Endpoint:** `/cart`
- **Authorization:** Bearer Token

**Expected Response:**
- **Response Code:** 200 OK
- **Response Time:** < 300ms

**Response Example:**
```json
[
    {
        "id": 1,
        "productId": 1,
        "productName": "Laptop Pro 15\"",
        "price": 1299.99,
        "quantity": 2,
        "imageUrl": "https://example.com/laptop.jpg"
    }
]
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Cart is an array

---

### 📋 ORDERS

#### 1. Create Order (Checkout)
- **Method:** POST
- **Endpoint:** `/orders`
- **Authorization:** Bearer Token
- **Headers:**
  - Content-Type: application/json
  - Authorization: Bearer {{token}}

**Request Body:**
```json
{
    "customerName": "John Doe",
    "customerEmail": "user@techhub.com",
    "customerAddress": "123 Main St, Manila",
    "items": [
        {
            "productId": 1,
            "quantity": 2
        }
    ]
}
```

**Expected Response:**
- **Response Code:** 201 Created
- **Response Time:** < 800ms
- **Response Size:** ~400-500 bytes

**Response Example:**
```json
{
    "id": 1,
    "customerName": "John Doe",
    "customerEmail": "user@techhub.com",
    "customerAddress": "123 Main St, Manila",
    "totalAmount": 2599.98,
    "status": "pending",
    "createdAt": "2025-12-23T10:30:00.000Z",
    "items": [
        {
            "id": 1,
            "productName": "Laptop Pro 15\"",
            "price": 1299.99,
            "quantity": 2
        }
    ]
}
```

**Tests Included:**
- ✅ Status code is 201
- ✅ Order has id, totalAmount, status
- ✅ Items array exists
- ✅ Auto-saves order ID
- ✅ Logs order total

---

#### 2. Get All Orders
- **Method:** GET
- **Endpoint:** `/orders`
- **Authorization:** Bearer Token

**Expected Response:**
- **Response Code:** 200 OK
- **Response Time:** < 400ms

**Tests Included:**
- ✅ Status code is 200
- ✅ Returns array
- ✅ Logs total orders count

---

#### 3. Get Order by ID
- **Method:** GET
- **Endpoint:** `/orders/:id`
- **Authorization:** Bearer Token
- **Params:**
  - id: Order ID ({{orderId}})

**Expected Response:**
- **Response Code:** 200 OK
- **Response Time:** < 300ms

**Tests Included:**
- ✅ Status code is 200
- ✅ Order has id, customerName, items

---

#### 4. Update Order Status (Admin)
- **Method:** PATCH
- **Endpoint:** `/orders/:id/status`
- **Authorization:** Bearer Token (Admin)
- **Params:**
  - id: Order ID

**Request Body:**
```json
{
    "status": "processing"
}
```

**Valid Status Values:**
- `pending`
- `processing`
- `receiving`
- `completed`
- `cancelled`

**Expected Response:**
- **Response Code:** 200 OK
- **Response Time:** < 500ms

**Response Example:**
```json
{
    "id": 1,
    "status": "processing",
    "customerName": "John Doe",
    "totalAmount": 2599.98
}
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Status updated successfully
- ✅ Response time < 500ms

---

#### 5. Receive Order (User)
- **Method:** PATCH
- **Endpoint:** `/orders/:id/receive`
- **Authorization:** Bearer Token (User)
- **Params:**
  - id: Order ID

**Expected Response:**
- **Response Code:** 200 OK
- **Response Time:** < 400ms

**Response Example:**
```json
{
    "id": 1,
    "status": "completed",
    "customerName": "John Doe"
}
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Order status is 'completed'
- ✅ Logs completion message

---

### 🛒 CART (Additional Endpoints)

#### 3. Get Cart Total
- **Method:** GET
- **Endpoint:** `/cart/total?sessionId={{sessionId}}`
- **Authorization:** None
- **Query Params:**
  - sessionId: Session identifier (optional)

**Expected Response:**
```json
{
    "total": 2599.98
}
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Total is a number
- ✅ Logs cart total

---

#### 4. Update Cart Item Quantity
- **Method:** PATCH
- **Endpoint:** `/cart/:id`
- **Headers:** 
  - Content-Type: application/json

**Request Body:**
```json
{
    "quantity": 5
}
```

**Expected Response:**
- **Response Code:** 200 OK

**Tests Included:**
- ✅ Status code is 200
- ✅ Quantity updated

---

#### 5. Remove Cart Item
- **Method:** DELETE
- **Endpoint:** `/cart/:id`
- **Params:**
  - id: Cart item ID ({{cartItemId}})

**Expected Response:**
```json
{
    "message": "Cart item removed successfully"
}
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Message exists

---

#### 6. Clear Entire Cart
- **Method:** DELETE
- **Endpoint:** `/cart?sessionId={{sessionId}}`
- **Query Params:**
  - sessionId: Session identifier

**Expected Response:**
```json
{
    "message": "Cart cleared successfully"
}
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Cart cleared message

---

### 👑 ADMIN ENDPOINTS

#### 1. Get Dashboard Statistics
- **Method:** GET
- **Endpoint:** `/admin/dashboard/stats`
- **Authorization:** Bearer Token (Admin role required)

**Expected Response:**
- **Response Code:** 200 OK

**Response Body Example:**
```json
{
    "totalUsers": 15,
    "totalOrders": 42,
    "totalRevenue": 125000.50,
    "pendingOrders": 8
}
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Has dashboard statistics
- ✅ Logs statistics

---

#### 2. Get All Users (Admin)
- **Method:** GET
- **Endpoint:** `/admin/users`
- **Authorization:** Bearer Token (Admin role required)

**Expected Response:**
- **Response Code:** 200 OK

**Response Body Example:**
```json
[
    {
        "id": 1,
        "email": "user@techhub.com",
        "name": "John Doe",
        "role": "user",
        "createdAt": "2026-01-15T00:00:00.000Z"
    }
]
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Users array returned
- ✅ Logs total users count

---

#### 3. Get All Orders (Admin)
- **Method:** GET
- **Endpoint:** `/admin/orders`
- **Authorization:** Bearer Token (Admin role required)

**Expected Response:**
- **Response Code:** 200 OK

**Tests Included:**
- ✅ Status code is 200
- ✅ Orders array returned
- ✅ Logs total orders count

---

#### 4. Update Order Status (Admin Endpoint)
- **Method:** PATCH
- **Endpoint:** `/admin/orders/:id/status`
- **Authorization:** Bearer Token (Admin role required)
- **Headers:** 
  - Content-Type: application/json

**Request Body:**
```json
{
    "status": "processing"
}
```

**Valid Status Values:**
- pending
- processing
- receiving
- completed
- cancelled

**Expected Response:**
- **Response Code:** 200 OK

**Tests Included:**
- ✅ Status code is 200
- ✅ Status updated successfully
- ✅ Logs new status

---

### 👤 USER ENDPOINTS

#### 1. Get User Profile
- **Method:** GET
- **Endpoint:** `/user/profile`
- **Authorization:** Bearer Token (User required)

**Expected Response:**
- **Response Code:** 200 OK

**Response Body Example:**
```json
{
    "id": 2,
    "email": "user@techhub.com",
    "name": "John Doe",
    "role": "user",
    "createdAt": "2026-01-15T00:00:00.000Z"
}
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Profile has user data (id, email, name)
- ✅ Logs user name

---

#### 2. Get My Orders
- **Method:** GET
- **Endpoint:** `/user/orders`
- **Authorization:** Bearer Token (User required)

**Expected Response:**
- **Response Code:** 200 OK

**Response Body Example:**
```json
[
    {
        "id": 1,
        "customerName": "John Doe",
        "customerEmail": "user@techhub.com",
        "totalAmount": 2599.98,
        "status": "processing",
        "createdAt": "2026-01-16T00:00:00.000Z"
    }
]
```

**Tests Included:**
- ✅ Status code is 200
- ✅ Orders array returned
- ✅ Logs order count

---

#### 3. Update User Profile
- **Method:** PATCH
- **Endpoint:** `/user/profile`
- **Authorization:** Bearer Token (User required)
- **Headers:** 
  - Content-Type: application/json

**Request Body:**
```json
{
    "name": "Updated Name"
}
```

**Expected Response:**
- **Response Code:** 200 OK

**Tests Included:**
- ✅ Status code is 200
- ✅ Profile updated
- ✅ Logs success message

---

## 🧪 Running Tests

### Run All Tests
1. Open Postman
2. Select the collection
3. Click **Run** button
4. Click **Run TechHub E-Commerce API**
5. View test results

### Test Workflow
Recommended order to run requests:

**Basic User Flow:**
1. **Register User** or **Login User** (get user token)
2. **Get All Products** (get product IDs)
3. **Get Product by ID** (test specific product)
4. **Add to Cart** (with sessionId)
5. **Get Cart** (view cart items)
6. **Get Cart Total** (calculate total)
7. **Update Cart Item** (change quantity)
8. **Create Order** (checkout)
9. **Get My Orders** (user's orders)
10. **Get User Profile** (view profile)
11. **Update User Profile** (change name)

**Admin Flow:**
1. **Login Admin** (get admin token)
2. **Get Dashboard Stats** (view statistics)
3. **Get All Users** (admin view)
4. **Get All Orders** (admin view)
5. **Create Product** (add new product)
6. **Update Product** (modify product)
7. **Update Order Status** (to "processing")
8. **Update Order Status** (to "receiving")

**Order Completion Flow:**
1. **Login User** (get user token)
2. **Receive Order** (mark as completed)

**Cart Management Flow:**
1. **Add to Cart** (multiple items)
2. **Get Cart Total** (view total)
3. **Update Cart Item** (adjust quantity)
4. **Remove Cart Item** (delete one item)
5. **Clear Cart** (remove all items)

---

## 📊 Response Metrics Summary

| Endpoint | Method | Expected Code | Avg Response Time | Avg Size |
|----------|--------|--------------|-------------------|----------|
| Register | POST | 201 | < 500ms | ~280 bytes |
| Login | POST | 200 | < 1000ms | ~260 bytes |
| Get Profile | GET | 200 | < 300ms | ~150 bytes |
| Get Products | GET | 200 | < 500ms | Varies |
| Get Product by ID | GET | 200 | < 300ms | ~200 bytes |
| Create Product | POST | 201 | < 500ms | ~200 bytes |
| Update Product | PATCH | 200 | < 400ms | ~200 bytes |
| Delete Product | DELETE | 200/204 | < 300ms | Minimal |
| Add to Cart | POST | 201 | < 500ms | ~180 bytes |
| Get Cart | GET | 200 | < 300ms | Varies |
| Get Cart Total | GET | 200 | < 300ms | ~50 bytes |
| Update Cart Item | PATCH | 200 | < 400ms | ~180 bytes |
| Remove Cart Item | DELETE | 200 | < 300ms | ~80 bytes |
| Clear Cart | DELETE | 200 | < 300ms | ~80 bytes |
| Create Order | POST | 201 | < 800ms | ~450 bytes |
| Get Orders | GET | 200 | < 400ms | Varies |
| Get Order by ID | GET | 200 | < 300ms | ~400 bytes |
| Update Status | PATCH | 200 | < 500ms | ~250 bytes |
| Receive Order | PATCH | 200 | < 400ms | ~200 bytes |
| Admin Dashboard | GET | 200 | < 400ms | ~200 bytes |
| Admin Get Users | GET | 200 | < 400ms | Varies |
| Admin Get Orders | GET | 200 | < 400ms | Varies |
| Admin Update Status | PATCH | 200 | < 500ms | ~250 bytes |
| User Profile | GET | 200 | < 300ms | ~150 bytes |
| User Orders | GET | 200 | < 400ms | Varies |
| User Update Profile | PATCH | 200 | < 400ms | ~150 bytes |

---

## 🔐 Authorization Flow

### 1. Public Endpoints (No Auth Required)
- GET /products
- GET /products/:id
- POST /auth/register
- POST /auth/login
- POST /cart
- GET /cart
- GET /cart/total
- PATCH /cart/:id
- DELETE /cart/:id
- DELETE /cart

### 2. User Endpoints (Bearer Token Required)
- GET /auth/profile
- POST /orders
- GET /orders
- GET /orders/:id
- PATCH /orders/:id/receive
- GET /user/profile
- GET /user/orders
- PATCH /user/profile

### 3. Admin Endpoints (Admin Token Required)
- POST /products
- PATCH /products/:id
- DELETE /products/:id
- PATCH /orders/:id/status
- GET /admin/dashboard/stats
- GET /admin/users
- GET /admin/orders
- PATCH /admin/orders/:id/status

---

## 📝 Variables Reference

### Collection Variables
```
baseUrl = http://localhost:3000
token = (auto-populated from login)
productId = (auto-populated from product responses)
orderId = (auto-populated from order responses)
userId = (auto-populated from registration)
cartItemId = (auto-populated from cart responses)
sessionId = session-123-abc (default value)
```

### Using Variables in Requests
- URL: `{{baseUrl}}/products/{{productId}}`
- Authorization: `Bearer {{token}}`
- Body: `"productId": {{productId}}`

---

## ✅ Test Coverage

### Automated Tests Include:
- ✅ Response status codes validation
- ✅ Response time performance checks
- ✅ Response body structure validation
- ✅ Required fields existence checks
- ✅ Data type validation
- ✅ Auto-variable population
- ✅ Console logging for debugging
- ✅ Role-based authorization checks

### Sample Test Script:
```javascript
// Status code validation
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Response time check
pm.test("Response time < 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Data validation
pm.test("Response has required fields", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('name');
});

// Auto-save variables
if (pm.response.code === 200) {
    pm.collectionVariables.set("token", jsonData.access_token);
}
```

---

## 🐛 Troubleshooting

### Common Issues:

1. **401 Unauthorized**
   - Solution: Login first to get token
   - Check if token variable is set

2. **404 Not Found**
   - Solution: Verify backend is running on port 3001
   - Check endpoint URL is correct

3. **500 Internal Server Error**
   - Solution: Check backend logs
   - Verify database is seeded with data

4. **Test Failures**
   - Solution: Run requests in recommended order
   - Clear variables and start fresh

---

## 📚 Additional Resources

- **Backend Repository:** A9-MiniECommerce-FA/backend
- **Frontend Repository:** A9-MiniECommerce-FA/frontend
- **Postman Collection:** TechHub_API_Collection.postman_collection.json

---

## 👨‍💻 Created By
Emmhan Russell D.
TechHub E-Commerce Platform
January 2026
