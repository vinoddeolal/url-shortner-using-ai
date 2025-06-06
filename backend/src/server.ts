import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes';
import { urlStorage, urlModel } from './routes/urlRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());
app.use(express.json());

// Root-level redirect route must come before API routes
app.get('/:shortCode', async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const url = await urlModel.getByShortCode(shortCode);
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    
    // Increment click count
    await urlModel.incrementClicks(shortCode);
    
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({ error: 'Failed to redirect URL' });
  }
});

// Routes for API endpoints
app.use('/api/urls', urlRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'healthy' });
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
