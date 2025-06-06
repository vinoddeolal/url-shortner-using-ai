import { IUrlStorage } from './urlStorage';
import { IUrl, IUrlCreate, IUrlStats } from './url';

export class UrlModel {
  private storage: IUrlStorage;

  constructor(storage: IUrlStorage) {
    this.storage = storage;
  }

  // Create a new URL entry
  async create(urlData: IUrlCreate): Promise<IUrl> {
    return this.storage.create(urlData);
  }

  // Get URL by short code
  async getByShortCode(shortCode: string): Promise<IUrl | null> {
    return this.storage.getByShortCode(shortCode);
  }

  // Update click count
  async incrementClicks(shortCode: string): Promise<IUrl> {
    return this.storage.incrementClicks(shortCode);
  }

  // Generate URL statistics
  async getStats(shortCode: string): Promise<IUrlStats | null> {
    return this.storage.getStats(shortCode);
  }

  // Generate a unique short code
  private generateShortCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
}
