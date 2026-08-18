# Your Compass 🧭

A full-stack travel booking platform where users can browse curated tour packages, get personalized destination recommendations through a quiz, save favorites to a wishlist, and book trips. Includes a complete admin panel for managing tours and orders.

## Features

### For Users
- Browse and search tour packages with sorting and pagination
- View detailed tour information with an image slider and map
- Take a preference quiz to get personalized tour recommendations
- Save tours to a wishlist
- Book tours through a checkout flow (simulated payment)
- View and cancel past orders
- Fully responsive design (mobile, tablet, desktop)

### For Admins
- Dashboard with key statistics
- Full CRUD management for tours (create, edit, delete)
- View and update order statuses
- Role-protected routes (only admins can access the admin panel)

## Tech Stack

**Backend**
- Node.js / Express
- MongoDB / Mongoose
- JWT authentication
- bcrypt for password hashing
- Joi for request validation

**Frontend**
- React (Vite)
- React Router for navigation
- Context API for state management (Auth, Wishlist, Orders)
- Sass (CSS Modules) for styling
- Axios for API requests

## Project Structure
Your Compass/
├── Backend/
│   ├── controllers/       # Business logic for each resource
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express route definitions
│   ├── middlewares/       # Authentication, validation, error handling
│   ├── validations/       # Joi validation schemas
│   └── index.js           # Backend entry point
│
└── Frontend/
    └── src/
        ├── components/    # Reusable UI components
        ├── pages/         # Page components
        ├── context/       # Global state management
        ├── routes/        # Route definitions and route guards
        ├── services/      # API call wrappers
        └── styles/        # Global Sass variables and mixins

## Getting Started

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder:
URL=your_mongodb_connection_string
PORT=3300
JWT_SECRET=your_secret_key
SALT_ROUNDS=10


Run the server:

```bash
node index.js
```

### Frontend

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` folder:
VITE_API_URL=http://localhost:3300


Run the dev server:

```bash
npm run dev
```

## Creating an Admin Account

Admin accounts are not created through the public register form for security reasons. To create one:

1. Register a normal account through `/register`
2. In MongoDB, manually change that user's `role` field from `"user"` to `"admin"`
3. Log in again — the JWT token will now include the admin role

## API Overview

| Resource | Endpoints |
|---|---|
| Auth | `POST /users/register`, `POST /users/login` |
| Tours | `GET /tours`, `GET /tours/:id`, `POST /tours` (admin), `PUT /tours/:id` (admin), `DELETE /tours/:id` (admin) |
| Wishlist | `GET /wishlist`, `POST /wishlist`, `DELETE /wishlist/:tourId` |
| Orders | `POST /orders`, `GET /orders/my-orders`, `GET /orders` (admin), `PUT /orders/:id/status` (admin), `PUT /orders/:id/cancel` |
| Quiz | `POST /quiz` |

## Notes

- Card details entered at checkout are validated but never stored — only the last 4 digits are saved, as a security best practice.
- The quiz uses a rule-based scoring system (no external AI), matching user preferences against each tour's attributes.
