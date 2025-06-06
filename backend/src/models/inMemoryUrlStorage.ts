import { IUrlStorage } from './urlStorage';
import { IUrl, IUrlCreate, IUrlStats } from './url';
import crypto from 'crypto';

export class InMemoryUrlStorage implements IUrlStorage {
  private urls: { [key: string]: IUrl } = {};
  private idCounter = 1;

  generateShortCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  async create(urlData: IUrlCreate): Promise<IUrl> {
    const shortCode = this.generateShortCode();
    // Normalize URL: remove trailing slash, ensure proper protocol
    let normalizedUrl = urlData.originalUrl.trim();
    if (normalizedUrl.endsWith('/')) {
      normalizedUrl = normalizedUrl.slice(0, -1);
    }
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const url: IUrl = {
      id: this.idCounter++,
      originalUrl: normalizedUrl,
      shortCode,
      createdAt: new Date(),
      updatedAt: new Date(),
      clicks: 0
    };

    // Store with both formats to handle requests with/without leading slash
    this.urls[shortCode] = url;
    this.urls[`/${shortCode}`] = url;
    return url;
  }

  async getByShortCode(shortCode: string): Promise<IUrl | null> {
    console.log('Looking up URL with short code:', shortCode);
    console.log('Current stored URLs:', Object.keys(this.urls));
    
    // Check if the short code exists with or without leading slash
    const url = this.urls[shortCode] || this.urls[`/${shortCode}`];
    console.log('Found URL:', url);
    return url || null;
  }

  async incrementClicks(shortCode: string): Promise<IUrl> {
    console.log('Incrementing clicks for URL with short code:', shortCode);
    const url = this.urls[shortCode];
    if (!url) {
      throw new Error('URL not found');
    }

    url.clicks++;
    url.updatedAt = new Date();
    return url;
  }

  async getStats(shortCode: string): Promise<IUrlStats | null> {
    const url = this.urls[shortCode];
    if (!url) {
      return null;
    }

    return {
      shortCode: url.shortCode,
      clicks: url.clicks,
      lastAccessed: url.updatedAt
    };
  }

  async getAll(): Promise<IUrl[]> {
    return Object.values(this.urls);
  }

  async delete(shortCode: string): Promise<void> {
    delete this.urls[shortCode];
    delete this.urls[`/${shortCode}`];
  }
}
