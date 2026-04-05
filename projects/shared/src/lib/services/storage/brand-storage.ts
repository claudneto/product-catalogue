import { Injectable } from '@angular/core';
import { Brand } from '@shared/models/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandStorage {
  private readonly dbName = 'catalog-db';
  private readonly storeName = 'brands';
  private readonly version = 1;

  private openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'tid' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  public async getAll(): Promise<Brand[]> {
    const db = await this.openDb();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        db.close();
        resolve(request.result as Brand[]);
      };

      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  }

  public async replaceAll(brands: Brand[]): Promise<void> {
    const db = await this.openDb();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);

      store.clear();

      for (const brand of brands) {
        store.put(brand);
      }

      transaction.oncomplete = () => {
        db.close();
        resolve();
      };

      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };

      transaction.onabort = () => {
        db.close();
        reject(transaction.error);
      };
    });
  }

  public async clear(): Promise<void> {
    const db = await this.openDb();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.storeName, 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.clear();

      request.onsuccess = () => {
        db.close();
        resolve();
      };

      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  }
}
