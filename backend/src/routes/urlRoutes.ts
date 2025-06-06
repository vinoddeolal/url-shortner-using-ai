import express, { Request, Response } from 'express';
import { IUrl, IUrlCreate, IUrlStats } from '../models/url';
import { UrlModel } from '../models/urlModel';
import { InMemoryUrlStorage } from '../models/inMemoryUrlStorage';

// Export UrlModel instance for use in server
const urlStorage = new InMemoryUrlStorage();
const urlModel = new UrlModel(urlStorage);

// Export the router and storage instances
export { urlStorage, urlModel };

const router = express.Router();

// Create a new shortened URL
router.post('/', async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    const url = await urlModel.create({ originalUrl });
    res.status(201).json({ 
      shortUrl: `${req.protocol}://${req.get('host')}${req.get('x-forwarded-prefix') || ''}/${url.shortCode}`,
      originalUrl: url.originalUrl,
      clicks: url.clicks
    });
  } catch (error) {
    console.error('Error creating URL:', error);
    res.status(500).json({ error: 'Failed to create URL' });
  }
});

// Get URL statistics
router.get('/:shortCode/stats', async (req: Request, res: Response) => {
  try {
    const url = await urlModel.getByShortCode(req.params.shortCode);
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    const stats = await urlModel.getStats(req.params.shortCode);
    res.json({
      ...stats,
      originalUrl: url.originalUrl
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get URL statistics' });
  }
});

// Redirect to original URL
router.get('/:shortCode', async (req: Request, res: Response) => {
  try {
    const url = await urlModel.getByShortCode(req.params.shortCode);
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment click count
    await urlModel.incrementClicks(req.params.shortCode);
    
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({ error: 'Failed to redirect URL' });
  }
});

export default router;
