import Dexie, { type Table } from 'dexie';

export interface ImageCache {
  srcUrl: string;
  blb: unknown;
}

export class LocalDbDexie extends Dexie {
  imageCache!: Table<ImageCache>;
  constructor() {
    super('imageCacheDatabase');
    this.version(1).stores({
        imageCache: '++id, srcUrl, blb' // Primary key and indexed props
    });
  }
}

export const db = new LocalDbDexie();
