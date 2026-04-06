import { TestBed } from '@angular/core/testing';
import { ProductStorage } from '@shared/services/storage/product-storage';

describe('ProductStorage', () => {
  let service: ProductStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductStorage],
    });

    service = TestBed.inject(ProductStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should configure the IndexedDB store with the products collection and nid key', () => {
    const serviceWithPrivateApi = service as unknown as { setup: () => { keyPath: string; storeName: string } };

    expect(serviceWithPrivateApi.setup()).toEqual({
      storeName: 'products',
      keyPath: 'nid',
    });
  });
});
