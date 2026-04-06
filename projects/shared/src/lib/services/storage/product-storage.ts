import { Injectable } from '@angular/core';

import { Product } from '@shared/models/product';
import {
  IndexedDbStorage,
  IndexedDbStorageConfig,
} from '@shared/services/storage/indexed-db-storage';

@Injectable({
  providedIn: 'root',
})
export class ProductStorage extends IndexedDbStorage<Product> {
  protected override setup(): IndexedDbStorageConfig {
    return {
      storeName: 'products',
      keyPath: 'nid',
    };
  }
}
