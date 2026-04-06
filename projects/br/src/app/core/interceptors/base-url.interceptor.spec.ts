import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from 'shared';
import { baseUrlInterceptor } from '@br/app/core/interceptors/base-url.interceptor';

describe('baseUrlInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
        provideHttpClientTesting(),
        {
          provide: API_BASE_URL,
          useValue: 'https://api.example.com',
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should prepend the base URL to relative requests', () => {
    httpClient.get('products').subscribe();

    const request = httpTestingController.expectOne(
      'https://api.example.com/products',
    );

    expect(request.request.method).toBe('GET');
    request.flush({});
  });

  it('should preserve relative requests that already start with a slash', () => {
    httpClient.get('/products').subscribe();

    const request = httpTestingController.expectOne(
      'https://api.example.com/products',
    );

    expect(request.request.url).toBe('https://api.example.com/products');
    request.flush({});
  });

  it('should not change absolute requests', () => {
    httpClient.get('https://cdn.example.com/products').subscribe();

    const request = httpTestingController.expectOne(
      'https://cdn.example.com/products',
    );

    expect(request.request.url).toBe('https://cdn.example.com/products');
    request.flush({});
  });
});
