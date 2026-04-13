import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '@br/environments/environment';
import { routes } from '@br/app/app.routes';
import { baseUrlInterceptor } from '@br/app/core/interceptors/base-url.interceptor';
import { API_BASE_URL, CatalogSync, IMAGES_BASE_URL } from 'shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    {
      provide: API_BASE_URL,
      useValue: environment.api.baseUrl,
    },
    {
      provide: IMAGES_BASE_URL,
      useValue: environment.images.baseUrl,
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: true,
      registrationStrategy: 'registerImmediately',
    }),
    provideAppInitializer(() => {
      const catalogSync = inject(CatalogSync);

      catalogSync.run().subscribe({
        error: (error) => console.error('Catalog sync failed', error),
      });
    }),
  ],
};
