import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { BrandApi } from '@shared/services/api/brand-api';
import { BrandStorage } from '@shared/services/storage/brand-storage';

import { CatalogSync } from './catalog-sync';

describe('CatalogSync', () => {
  let service: CatalogSync;
  let brandApi: { getAll: ReturnType<typeof vi.fn> };
  let brandStorage: { replaceAll: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    brandApi = {
      getAll: vi.fn(),
    };
    brandStorage = {
      replaceAll: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CatalogSync,
        {
          provide: BrandApi,
          useValue: brandApi,
        },
        {
          provide: BrandStorage,
          useValue: brandStorage,
        },
      ],
    });

    service = TestBed.inject(CatalogSync);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch brands and persist them into storage', async () => {
    const brands = [
      {
        tid: 1,
        title: 'Solaris',
        description: null,
        brandUrl: null,
        brandTarget: null,
        logo: '/solaris.svg',
        logoAlt: 'Solaris',
        updatedAt: new Date('2026-04-06T12:00:00.000Z'),
      },
    ];

    brandApi.getAll.mockReturnValue(of(brands));
    brandStorage.replaceAll.mockResolvedValue(undefined);

    await expect(firstValueFrom(service.run())).resolves.toBeUndefined();

    expect(brandApi.getAll).toHaveBeenCalledTimes(1);
    expect(brandStorage.replaceAll).toHaveBeenCalledTimes(1);
    expect(brandStorage.replaceAll).toHaveBeenCalledWith(brands);
  });

  it('should swallow API errors and log the failed collection', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const apiError = new Error('network down');

    brandApi.getAll.mockReturnValue(throwError(() => apiError));

    await expect(firstValueFrom(service.run())).resolves.toBeUndefined();

    expect(brandStorage.replaceAll).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to sync brands', apiError);
  });

  it('should swallow storage errors and keep the sync observable completed', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const brands = [
      {
        tid: 3,
        title: 'Aurora',
        description: 'Linha premium',
        brandUrl: 'https://example.com/aurora',
        brandTarget: '_blank',
        logo: '/aurora.svg',
        logoAlt: 'Aurora',
        updatedAt: new Date('2026-03-30T12:00:00.000Z'),
      },
    ];
    const storageError = new Error('write failed');

    brandApi.getAll.mockReturnValue(of(brands));
    brandStorage.replaceAll.mockRejectedValue(storageError);

    await expect(firstValueFrom(service.run())).resolves.toBeUndefined();

    expect(brandStorage.replaceAll).toHaveBeenCalledWith(brands);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to sync brands', storageError);
  });
});
