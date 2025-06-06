export interface IUrl {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
  clicks: number;
}

export interface IUrlCreate {
  originalUrl: string;
}

export interface IUrlStats {
  shortCode: string;
  clicks: number;
  lastAccessed: Date | null;
}
