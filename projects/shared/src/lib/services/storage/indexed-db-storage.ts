export interface IndexedDbStorageConfig {
  keyPath: string;
  storeName: string;
}

export abstract class IndexedDbStorage<T> {
  private readonly dbName = 'catalog-db';
  private readonly version = new Date().getTime();

  protected abstract setup(): IndexedDbStorageConfig;

  protected openDb(): Promise<IDBDatabase> {
    const { keyPath, storeName } = this.setup();

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath });
        }
      };

      request.onsuccess = async () => {
        const db = request.result;

        if (db.objectStoreNames.contains(storeName)) {
          resolve(db);
          return;
        }

        db.close();

        try {
          const upgradedDb = await this.createMissingStore(storeName, keyPath);
          resolve(upgradedDb);
        } catch (error) {
          reject(error);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  private createMissingStore(storeName: string, keyPath: string): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const versionRequest = indexedDB.open(this.dbName);

      versionRequest.onsuccess = () => {
        const currentDb = versionRequest.result;
        const nextVersion = currentDb.version + 1;

        currentDb.close();

        const upgradeRequest = indexedDB.open(this.dbName, nextVersion);

        upgradeRequest.onupgradeneeded = () => {
          const upgradeDb = upgradeRequest.result;

          if (!upgradeDb.objectStoreNames.contains(storeName)) {
            upgradeDb.createObjectStore(storeName, { keyPath });
          }
        };

        upgradeRequest.onsuccess = () => resolve(upgradeRequest.result);
        upgradeRequest.onerror = () => reject(upgradeRequest.error);
        upgradeRequest.onblocked = () => reject(upgradeRequest.error);
      };

      versionRequest.onerror = () => reject(versionRequest.error);
      versionRequest.onblocked = () => reject(versionRequest.error);
    });
  }

  public async getAll(): Promise<T[]> {
    const { storeName } = this.setup();
    const db = await this.openDb();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        db.close();
        resolve(request.result as T[]);
      };

      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  }

  public async replaceAll(items: T[]): Promise<void> {
    const { storeName } = this.setup();
    const db = await this.openDb();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      store.clear();

      for (const item of items) {
        store.put(item);
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
    const { storeName } = this.setup();
    const db = await this.openDb();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
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
