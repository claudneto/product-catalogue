import { TestBed } from '@angular/core/testing';

import { BrandDto } from '@shared/models/dtos/brand-dto';
import { BrandMapper } from '@shared/mappers/brand-mapper';
import { IMAGES_BASE_URL } from '@shared/tokens/images-base-url.token';

describe('BrandMapper', () => {
  let service: BrandMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BrandMapper,
        {
          provide: IMAGES_BASE_URL,
          useValue: 'https://cdn.example.com',
        },
      ],
    });

    service = TestBed.inject(BrandMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map API fields to the Brand model', () => {
    const dto: BrandDto = {
      tid: 27,
      title: 'Solaris',
      description: 'Linha premium',
      brand_url: 'https://example.com/solaris',
      brand_target: '_blank',
      logo: '/brands/solaris.svg',
      logo_alt: 'Logo Solaris',
      updated_at: '2026-04-06T12:00:00.000Z',
    };

    const brand = service.map(dto);

    expect(brand).toEqual({
      tid: 27,
      title: 'Solaris',
      description: 'Linha premium',
      brandUrl: 'https://example.com/solaris',
      brandTarget: '_blank',
      logo: 'https://cdn.example.com/brands/solaris.svg',
      logoAlt: 'Logo Solaris',
      updatedAt: new Date('2026-04-06T12:00:00.000Z'),
    });
  });

  it('should preserve nullable values while still prefixing the logo URL', () => {
    const dto: BrandDto = {
      tid: 8,
      title: 'Essencial',
      description: null,
      brand_url: null,
      brand_target: null,
      logo: '/brands/essencial.png',
      logo_alt: 'Logo Essencial',
      updated_at: '2026-01-15T08:30:00.000Z',
    };

    const brand = service.map(dto);

    expect(brand.description).toBeNull();
    expect(brand.brandUrl).toBeNull();
    expect(brand.brandTarget).toBeNull();
    expect(brand.logo).toBe('https://cdn.example.com/brands/essencial.png');
    expect(brand.updatedAt.toISOString()).toBe('2026-01-15T08:30:00.000Z');
  });

  it('should preserve absolute image URLs', () => {
    const dto: BrandDto = {
      tid: 11,
      title: 'Global',
      description: null,
      brand_url: null,
      brand_target: null,
      logo: 'https://images.example.com/brands/global.png',
      logo_alt: 'Logo Global',
      updated_at: '2026-04-06T12:00:00.000Z',
    };

    const brand = service.map(dto);

    expect(brand.logo).toBe('https://images.example.com/brands/global.png');
  });
});
