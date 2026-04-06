import { ApplicationInitStatus } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { environment } from '@br/environments/environment';
import { appConfig } from '@br/app/app.config';
import { API_BASE_URL, IMAGES_BASE_URL, CatalogSync } from 'shared';

describe('appConfig', () => {
  it('should provide the API and image base URLs from the environment', () => {
    TestBed.configureTestingModule({
      providers: [
        ...appConfig.providers,
        {
          provide: CatalogSync,
          useValue: { run: () => of(void 0) },
        },
      ],
    });

    expect(TestBed.inject(API_BASE_URL)).toBe(environment.api.baseUrl);
    expect(TestBed.inject(IMAGES_BASE_URL)).toBe(environment.images.baseUrl);
  });

  it('should run the catalog sync during app initialization', async () => {
    const catalogSync = {
      run: vi.fn().mockReturnValue(of(void 0)),
    };

    TestBed.configureTestingModule({
      providers: [
        ...appConfig.providers,
        {
          provide: CatalogSync,
          useValue: catalogSync,
        },
      ],
    });

    await TestBed.inject(ApplicationInitStatus).donePromise;

    expect(catalogSync.run).toHaveBeenCalledTimes(1);
  });

  it('should log catalog sync failures raised by the initializer subscription', async () => {
    const error = new Error('sync failed');
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const catalogSync = {
      run: vi.fn().mockReturnValue(throwError(() => error)),
    };

    TestBed.configureTestingModule({
      providers: [
        ...appConfig.providers,
        {
          provide: CatalogSync,
          useValue: catalogSync,
        },
      ],
    });

    await TestBed.inject(ApplicationInitStatus).donePromise;

    expect(consoleErrorSpy).toHaveBeenCalledWith('Catalog sync failed', error);
  });
});
