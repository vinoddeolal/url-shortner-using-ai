# URL Shortener Service

> **Note:** This is an AI-generated application

A full-stack URL shortening service built with Node.js.

## Project Structure

```
url-shortener/
├── backend/        # Node.js backend service
│   ├── src/       # Source code
│   ├── package.json
│   └── README.md
├── frontend/       # React frontend application
│   ├── src/       # Source code
│   ├── package.json
│   └── README.md
└── README.md       # Project documentation
```

## Getting Started

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```
3. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
4. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

The backend API will be available at http://localhost:3000
The frontend application will be available at http://localhost:3001

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/url_shortener
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Features

- URL Shortening
- URL Statistics Tracking
- Modern React UI
- RESTful API Endpoints
- PostgreSQL Database
- TypeScript Support
