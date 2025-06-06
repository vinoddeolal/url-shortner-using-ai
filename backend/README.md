# URL Shortener Backend

This is the backend service for the URL shortener application, built with Node.js.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- POST `/api/urls` - Create a new shortened URL
  - Body: `{ "originalUrl": "https://example.com" }`
  - Response: `{ "shortUrl": "http://localhost:3000/abc123", "originalUrl": "https://example.com", "clicks": 0 }`

- GET `/api/urls/:shortCode/stats` - Get URL statistics
  - Response: `{ "shortCode": "abc123", "clicks": 123, "lastAccessed": "2025-06-06T08:11:21.000Z" }`

- GET `/:shortCode` - Redirect to original URL
  - Automatically redirects to the original URL and increments click count

## Project Structure

```
src/
├── models/     # Database models and interfaces
├── routes/     # Express routes
└── server.ts   # Main server file
```
