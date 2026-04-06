import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { BrandDto } from '@shared/models/dtos/brand-dto';
import { BrandMapper } from '@shared/mappers/brand-mapper';
import { BrandApi } from '@shared/services/api/brand-api';
import { API_BASE_URL } from '@shared/tokens/api-base-url.token';

describe('BrandApi', () => {
  let service: BrandApi;
  let httpTestingController: HttpTestingController;
  let brandMapper: { map: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    brandMapper = {
      map: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        BrandApi,
        {
          provide: API_BASE_URL,
          useValue: 'https://api.example.com',
        },
        {
          provide: BrandMapper,
          useValue: brandMapper,
        },
      ],
    });

    service = TestBed.inject(BrandApi);
    TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request the brand endpoint with POST and no body', () => {
    service.getAll().subscribe();

    const request = httpTestingController.expectOne('https://api.example.com/product/brand');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBeNull();

    request.flush({ data: [] });
  });

  it('should map every received DTO into the Brand model', () => {
    const responseData: BrandDto[] = [
      {
        tid: 1,
        title: 'Zeta',
        description: null,
        brand_url: null,
        brand_target: null,
        logo: '/zeta.svg',
        logo_alt: 'Zeta',
        updated_at: '2026-04-01T10:00:00.000Z',
      },
      {
        tid: 2,
        title: 'Alfa',
        description: 'Linha A',
        brand_url: 'https://example.com/alfa',
        brand_target: '_blank',
        logo: '/alfa.svg',
        logo_alt: 'Alfa',
        updated_at: '2026-04-02T10:00:00.000Z',
      },
    ];

    brandMapper.map
      .mockReturnValueOnce({
        tid: 1,
        title: 'Zeta',
        description: null,
        brandUrl: null,
        brandTarget: null,
        logo: 'https://cdn.example.com/zeta.svg',
        logoAlt: 'Zeta',
        updatedAt: new Date('2026-04-01T10:00:00.000Z'),
      })
      .mockReturnValueOnce({
        tid: 2,
        title: 'Alfa',
        description: 'Linha A',
        brandUrl: 'https://example.com/alfa',
        brandTarget: '_blank',
        logo: 'https://cdn.example.com/alfa.svg',
        logoAlt: 'Alfa',
        updatedAt: new Date('2026-04-02T10:00:00.000Z'),
      });

    let result: unknown;
    service.getAll().subscribe((brands) => {
      result = brands;
    });

    const request = httpTestingController.expectOne('https://api.example.com/product/brand');
    request.flush({ data: responseData });

    expect(brandMapper.map).toHaveBeenCalledTimes(2);
    expect(brandMapper.map).toHaveBeenNthCalledWith(1, responseData[0]);
    expect(brandMapper.map).toHaveBeenNthCalledWith(2, responseData[1]);
    expect(result).toEqual([
      {
        tid: 1,
        title: 'Zeta',
        description: null,
        brandUrl: null,
        brandTarget: null,
        logo: 'https://cdn.example.com/zeta.svg',
        logoAlt: 'Zeta',
        updatedAt: new Date('2026-04-01T10:00:00.000Z'),
      },
      {
        tid: 2,
        title: 'Alfa',
        description: 'Linha A',
        brandUrl: 'https://example.com/alfa',
        brandTarget: '_blank',
        logo: 'https://cdn.example.com/alfa.svg',
        logoAlt: 'Alfa',
        updatedAt: new Date('2026-04-02T10:00:00.000Z'),
      },
    ]);
  });
});
