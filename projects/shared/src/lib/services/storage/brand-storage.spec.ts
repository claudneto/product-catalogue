import { TestBed } from '@angular/core/testing';
import { BrandStorage } from '@shared/services/storage/brand-storage';
import { vi } from 'vitest';

type MockRequest<T = unknown> = {
  error: Error | null;
  onsuccess: (() => void) | null;
  onerror: (() => void) | null;
  result: T;
};

type MockTransaction = {
  error: Error | null;
  objectStore: ReturnType<typeof vi.fn>;
  oncomplete: (() => void) | null;
  onerror: (() => void) | null;
  onabort: (() => void) | null;
};

function createRequest<T>(result: T, error: Error | null = null): MockRequest<T> {
  return {
    result,
    error,
    onsuccess: null,
    onerror: null,
  };
}

function createTransaction(
  store: { getAll?: ReturnType<typeof vi.fn>; clear?: ReturnType<typeof vi.fn>; put?: ReturnType<typeof vi.fn> },
): MockTransaction {
  return {
    error: null,
    objectStore: vi.fn().mockReturnValue(store),
    oncomplete: null,
    onerror: null,
    onabort: null,
  };
}

describe('BrandStorage', () => {
  let service: BrandStorage;
  let serviceWithPrivateApi: Record<string, ReturnType<typeof vi.fn>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandStorage],
    });

    service = TestBed.inject(BrandStorage);
    serviceWithPrivateApi = service as unknown as Record<string, ReturnType<typeof vi.fn>>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all brands from the object store and close the database', async () => {
    const brands = [
      {
        tid: 2,
        title: 'Beta',
        description: null,
        brandUrl: null,
        brandTarget: null,
        logo: '/beta.svg',
        logoAlt: 'Beta',
        updatedAt: new Date('2026-04-01T10:00:00.000Z'),
      },
    ];
    const request = createRequest(brands);
    const store = {
      getAll: vi.fn().mockReturnValue(request),
    };
    const transaction = createTransaction(store);
    const db = {
      close: vi.fn(),
      transaction: vi.fn().mockReturnValue(transaction),
    };

    serviceWithPrivateApi['openDb'] = vi.fn().mockResolvedValue(db);

    const resultPromise = service.getAll();
    await Promise.resolve();
    request.onsuccess?.();

    await expect(resultPromise).resolves.toEqual(brands);
    expect(db.transaction).toHaveBeenCalledWith('brands', 'readonly');
    expect(transaction.objectStore).toHaveBeenCalledWith('brands');
    expect(store.getAll).toHaveBeenCalledTimes(1);
    expect(db.close).toHaveBeenCalledTimes(1);
  });

  it('should reject when reading brands fails', async () => {
    const request = createRequest([], new Error('read failed'));
    const store = {
      getAll: vi.fn().mockReturnValue(request),
    };
    const transaction = createTransaction(store);
    const db = {
      close: vi.fn(),
      transaction: vi.fn().mockReturnValue(transaction),
    };

    serviceWithPrivateApi['openDb'] = vi.fn().mockResolvedValue(db);

    const resultPromise = service.getAll();
    await Promise.resolve();
    request.onerror?.();

    await expect(resultPromise).rejects.toThrow('read failed');
    expect(db.close).toHaveBeenCalledTimes(1);
  });

  it('should replace all brands inside the write transaction', async () => {
    const brands = [
      {
        tid: 1,
        title: 'Alfa',
        description: null,
        brandUrl: null,
        brandTarget: null,
        logo: '/alfa.svg',
        logoAlt: 'Alfa',
        updatedAt: new Date('2026-04-01T10:00:00.000Z'),
      },
      {
        tid: 4,
        title: 'Delta',
        description: 'Nova linha',
        brandUrl: 'https://example.com/delta',
        brandTarget: '_blank',
        logo: '/delta.svg',
        logoAlt: 'Delta',
        updatedAt: new Date('2026-04-02T10:00:00.000Z'),
      },
    ];
    const store = {
      clear: vi.fn(),
      put: vi.fn(),
    };
    const transaction = createTransaction(store);
    const db = {
      close: vi.fn(),
      transaction: vi.fn().mockReturnValue(transaction),
    };

    serviceWithPrivateApi['openDb'] = vi.fn().mockResolvedValue(db);

    const resultPromise = service.replaceAll(brands);
    await Promise.resolve();
    transaction.oncomplete?.();

    await expect(resultPromise).resolves.toBeUndefined();
    expect(db.transaction).toHaveBeenCalledWith('brands', 'readwrite');
    expect(store.clear).toHaveBeenCalledTimes(1);
    expect(store.put).toHaveBeenCalledTimes(2);
    expect(store.put).toHaveBeenNthCalledWith(1, brands[0]);
    expect(store.put).toHaveBeenNthCalledWith(2, brands[1]);
    expect(db.close).toHaveBeenCalledTimes(1);
  });

  it('should reject when replacing brands aborts the transaction', async () => {
    const store = {
      clear: vi.fn(),
      put: vi.fn(),
    };
    const transaction = createTransaction(store);
    transaction.error = new Error('transaction aborted');
    const db = {
      close: vi.fn(),
      transaction: vi.fn().mockReturnValue(transaction),
    };

    serviceWithPrivateApi['openDb'] = vi.fn().mockResolvedValue(db);

    const resultPromise = service.replaceAll([]);
    await Promise.resolve();
    transaction.onabort?.();

    await expect(resultPromise).rejects.toThrow('transaction aborted');
    expect(db.close).toHaveBeenCalledTimes(1);
  });

  it('should clear the object store and close the database', async () => {
    const request = createRequest(undefined);
    const store = {
      clear: vi.fn().mockReturnValue(request),
    };
    const transaction = createTransaction(store);
    const db = {
      close: vi.fn(),
      transaction: vi.fn().mockReturnValue(transaction),
    };

    serviceWithPrivateApi['openDb'] = vi.fn().mockResolvedValue(db);

    const resultPromise = service.clear();
    await Promise.resolve();
    request.onsuccess?.();

    await expect(resultPromise).resolves.toBeUndefined();
    expect(db.transaction).toHaveBeenCalledWith('brands', 'readwrite');
    expect(store.clear).toHaveBeenCalledTimes(1);
    expect(db.close).toHaveBeenCalledTimes(1);
  });

  it('should reject when clearing the object store fails', async () => {
    const request = createRequest(undefined, new Error('clear failed'));
    const store = {
      clear: vi.fn().mockReturnValue(request),
    };
    const transaction = createTransaction(store);
    const db = {
      close: vi.fn(),
      transaction: vi.fn().mockReturnValue(transaction),
    };

    serviceWithPrivateApi['openDb'] = vi.fn().mockResolvedValue(db);

    const resultPromise = service.clear();
    await Promise.resolve();
    request.onerror?.();

    await expect(resultPromise).rejects.toThrow('clear failed');
    expect(db.close).toHaveBeenCalledTimes(1);
  });
});
