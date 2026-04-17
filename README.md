# MERN Demo Project

A full-stack MERN (MongoDB, Express, React, Node.js) application demonstrating JWT-based authentication, user management, and protected routes.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Running the Projects](#running-the-projects)
- [API Endpoints](#api-endpoints)
- [Features](#features)

---

## Project Overview

This is a complete MERN stack application with:
- **Backend**: Express.js REST API with JWT authentication
- **Frontend**: React application with Redux state management
- **Database**: MongoDB for data persistence
- **Authentication**: JWT-based token authentication with refresh tokens

---

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and development server
- **Redux Toolkit** - State management
- **Redux-Persist** - State persistence
- **React Router v7** - Client-side routing
- **Axios** - HTTP client

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - Either:
  - Local MongoDB installation
  - MongoDB Atlas cloud service: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - For version control (optional)

---

## Project Structure

```
MERNDemo/
├── nodedemo/                 # Backend project
│   ├── index.js             # Application entry point
│   ├── package.json         # Backend dependencies
│   └── src/
│       ├── controllers/     # Business logic for routes
│       │   ├── auth.js      # Authentication logic
│       │   └── user.js      # User management logic
│       ├── database/
│       │   └── db.js        # MongoDB connection
│       ├── middlewares/
│       │   └── auth.js      # JWT verification middleware
│       ├── routes/          # API route definitions
│       │   ├── auth.js      # Auth endpoints
│       │   └── user.js      # User endpoints
│       ├── schema/          # Mongoose schemas
│       │   ├── User.js      # User model
│       │   └── RefreshToken.js # Refresh token model
│       └── utils/
│           └── index.js     # Utility functions
│
├── reactdemo/               # Frontend project
│   ├── index.html           # HTML entry point
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── eslint.config.js     # ESLint configuration
│   ├── public/              # Static assets
│   └── src/
│       ├── main.jsx         # React app entry point
│       ├── App.jsx          # Main app component
│       ├── api/
│       │   └── axiosInstance.jsx # Axios interceptors
│       ├── components/      # Reusable UI components
│       │   ├── BaseLayout/  # Main layout wrapper
│       │   ├── Button/      # Custom button component
│       │   ├── Card/        # Card component
│       │   ├── Dropdown/    # Dropdown component
│       │   ├── Header/      # Header/navigation
│       │   ├── Input/       # Input field component
│       │   ├── Modal/       # Modal component
│       │   └── ProtectedRoute/ # Route protection
│       ├── pages/           # Page components
│       │   ├── Dashboard/   # Dashboard page
│       │   ├── Login/       # Login page
│       │   └── Users/       # User management pages
│       ├── redux/           # State management
│       │   ├── store.ts     # Redux store configuration
│       │   ├── hooks.ts     # Redux hooks
│       │   ├── slices/      # Redux slices
│       │   └── actions/     # Redux thunks/actions
│       ├── styles/          # Global styles
│       ├── utils/           # Utility functions
│       │   ├── constants.jsx # App constants
│       │   └── regex.jsx    # Regex patterns
│       └── main.css         # Global stylesheets
│
└── README.md                # This file
```

---

## Installation & Setup

### Backend Setup

#### Step 1: Navigate to backend directory

```bash
cd nodedemo
```

#### Step 2: Install dependencies

```bash
npm install
```

#### Step 3: Create environment file

Create a `.env` file in the `nodedemo` directory with the following variables:

```env
MONGODB_URL=mongodb://localhost:27017/mern_demo
# OR for MongoDB Atlas:
# MONGODB_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/mern_demo

PORT=8000
ALLOWED_ORIGINS=http://localhost:3000

# JWT Secrets (generate secure random strings)
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
```

#### Step 4: Verify MongoDB Connection

- **Local MongoDB**: Ensure MongoDB is running:
  ```bash
  # On macOS with Homebrew
  brew services start mongodb-community
  ```
  
- **MongoDB Atlas**: Ensure your connection string is correct in `.env`

### Frontend Setup

#### Step 1: Navigate to frontend directory

```bash
cd reactdemo
```

#### Step 2: Install dependencies

```bash
npm install
```

#### Step 3: Create environment file (if needed)

Create a `.env` file in the `reactdemo` directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## Environment Variables

### Backend (`nodedemo/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/mern_demo` |
| `PORT` | Server port | `8000` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `http://localhost:3000` |
| `ACCESS_TOKEN_SECRET` | JWT access token secret | Any secure random string |
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret | Any secure random string |

### Frontend (`reactdemo/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api` |

---

## Running the Projects

### Option 1: Run Backend and Frontend Separately

#### Terminal 1 - Run Backend

```bash
cd nodedemo
npm start
```

Expected output:
```
Server started on port 8000
Connected to MongoDB
```

#### Terminal 2 - Run Frontend

```bash
cd reactdemo
npm run dev
```

Expected output:
```
VITE v8.0.1 running at:

  ➜  Local:   http://localhost:3000/
```

### Option 2: Run Both Concurrently (from project root)

```bash
# Terminal 1
cd nodedemo && npm start

# Terminal 2 (in a new terminal window)
cd reactdemo && npm run dev
```

---

## Access the Application

After both servers are running:

1. Open your browser and navigate to: `http://localhost:3000`
2. You will be redirected to the login page
3. Use the credentials to log in (or register a new account)
4. Once authenticated, you'll access the protected dashboard

---

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | User login (returns JWT tokens) |
| POST | `/refresh-token` | Refresh access token |

### User Routes (`/api/users`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all users (protected) |
| GET | `/:id` | Get user by ID (protected) |
| POST | `/createUser` | Create user (protected) |
| PUT | `/:id` | Update user (protected) |
| DELETE | `/:id` | Delete user (protected) |

---

## Features

- ✅ User Login
- ✅ JWT-based Authentication with Access & Refresh Tokens
- ✅ Protected Routes (Frontend & Backend)
- ✅ Password Hashing with bcrypt
- ✅ User Management (CRUD operations)
- ✅ Redux State Management
- ✅ Redux Persist for State Persistence
- ✅ Responsive UI Components
- ✅ Form Validation
- ✅ CORS Configuration
- ✅ Error Handling

---

## Troubleshooting

### Backend Issues

**Issue**: "Cannot connect to MongoDB"
- **Solution**: 
  - Check if MongoDB is running
  - Verify `MONGODB_URL` in `.env`
  - For MongoDB Atlas, ensure IP whitelist includes your machine

**Issue**: "PORT already in use"
- **Solution**: 
  - Change `PORT` in `.env` to another port (e.g., 8001)
  - Or kill the process using the port

### Frontend Issues

**Issue**: "CORS error when calling API"
- **Solution**: 
  - Ensure backend is running on the correct port
  - Check `ALLOWED_ORIGINS` in backend `.env`
  - Verify `VITE_API_BASE_URL` in frontend `.env`

**Issue**: "Module not found" errors
- **Solution**: 
  - Clear `node_modules` and `.package-lock.json`, then reinstall
  - Run `npm install` in the affected directory

---

## Development Commands

### Backend

```bash
npm start          # Start the server
npm test           # Run tests
```

### Frontend

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Redux Documentation](https://redux.js.org/)
- [JWT.io](https://jwt.io/)

---

## Notes

- Keep your JWT secrets secure and never commit them to version control
- Use strong passwords for your database and accounts
- Consider using environment variable validation in production
- Implement proper error handling and logging in production
- Set up HTTPS in production environments
- Configure rate limiting for API endpoints
- Use database indexes for frequently queried fields

---

## License

ISC

---

## Support

For issues or questions, please check:
1. The API endpoint documentation above
2. Browser console for frontend errors
3. Server console for backend errors
4. MongoDB connection string format
