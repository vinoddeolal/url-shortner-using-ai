import { IUrl, IUrlCreate, IUrlStats } from './url';

export interface IUrlStorage {
  create(urlData: IUrlCreate): Promise<IUrl>;
  getByShortCode(shortCode: string): Promise<IUrl | null>;
  incrementClicks(shortCode: string): Promise<IUrl>;
  getStats(shortCode: string): Promise<IUrlStats | null>;
  getAll(): Promise<IUrl[]>;
  delete(shortCode: string): Promise<void>;
  generateShortCode(): string;
}
