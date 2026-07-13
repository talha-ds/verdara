# Verdara

A full-stack e-commerce platform for a natural and herbal products brand — built from a blank slate with the MERN stack (MongoDB, Express, React, Node.js).

**Live demo:** _add your deployed link here_
**Portfolio:** [talha-portfolio-coral-phi.vercel.app](https://talha-portfolio-coral-phi.vercel.app)

---

## Overview

Verdara is a complete online storefront covering the full customer journey — browsing products, managing a cart, checking out, and tracking orders — alongside an admin-facing product management flow. It was built end to end: schema design, REST API, authentication, and a premium dark-and-gold frontend UI, with no prior web development background going in.

## Features

- **Product catalog** — browse and view detailed product pages
- **Cart & checkout** — persistent cart state via React Context, full checkout flow
- **User accounts** — registration, login, and JWT-based authentication
- **Order management** — place orders and view order history/status
- **Admin panel** — product management for store administrators
- **Protected routes** — middleware-based auth guarding sensitive endpoints

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router
- Tailwind CSS
- Axios
- React Toastify

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for auth
- bcrypt for password hashing
- Multer for file uploads

## Project Structure

```
verdara/
├── backend/
│   ├── controllers/     # Request handlers (users, products, orders)
│   ├── middleware/       # Auth middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route definitions
│   └── server.js         # App entry point
└── frontend/
    └── src/
        ├── components/    # Reusable UI (navbar, footer, etc.)
        ├── context/       # Cart state (React Context)
        ├── pages/         # Route-level pages
        └── ...
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repo
```bash
git clone https://github.com/talha-ds/verdara.git
cd verdara
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (see `.env.example`):
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on Vite's default port (usually `http://localhost:5173`) and the backend on `http://localhost:5000`.

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List all products |
| GET/POST | `/api/users` | Auth: register / login |
| GET/POST | `/api/orders` | Create and view orders |

## Roadmap

- [ ] Image uploads via Cloudinary
- [ ] Payment gateway integration
- [ ] Product search & filtering
- [ ] Order status notifications

## License

MIT
