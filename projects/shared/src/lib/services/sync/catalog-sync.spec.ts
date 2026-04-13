import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { BrandApi } from '@shared/services/api/brand-api';
import { ProductsApi } from '@shared/services/api/products-api';
import { ImagePrefetchService } from '@shared/services/cache/image-prefetch';
import { BrandStorage } from '@shared/services/storage/brand-storage';
import { ProductStorage } from '@shared/services/storage/product-storage';
import { CatalogSync } from '@shared/services/sync/catalog-sync';

describe('CatalogSync', () => {
  let service: CatalogSync;
  let brandApi: { getAll: ReturnType<typeof vi.fn> };
  let productsApi: { getAll: ReturnType<typeof vi.fn> };
  let brandStorage: { getAll: ReturnType<typeof vi.fn>; replaceAll: ReturnType<typeof vi.fn> };
  let productStorage: { getAll: ReturnType<typeof vi.fn>; replaceAll: ReturnType<typeof vi.fn> };
  let prefetch: { prefetch: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    brandApi = {
      getAll: vi.fn(),
    };
    productsApi = {
      getAll: vi.fn(),
    };
    brandStorage = {
      getAll: vi.fn(),
      replaceAll: vi.fn(),
    };
    productStorage = {
      getAll: vi.fn(),
      replaceAll: vi.fn(),
    };
    prefetch = {
      prefetch: vi.fn(),
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
        {
          provide: ProductsApi,
          useValue: productsApi,
        },
        {
          provide: ProductStorage,
          useValue: productStorage,
        },
        {
          provide: ImagePrefetchService,
          useValue: prefetch,
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
    productsApi.getAll.mockReturnValue(of([]));
    brandStorage.getAll.mockResolvedValue(brands);
    productStorage.getAll.mockResolvedValue([]);
    brandStorage.replaceAll.mockResolvedValue(undefined);
    productStorage.replaceAll.mockResolvedValue(undefined);
    prefetch.prefetch.mockResolvedValue(undefined);

    await expect(firstValueFrom(service.run())).resolves.toBeUndefined();

    expect(brandApi.getAll).toHaveBeenCalledTimes(1);
    expect(productsApi.getAll).toHaveBeenCalledTimes(1);
    expect(brandStorage.replaceAll).toHaveBeenCalledTimes(1);
    expect(brandStorage.replaceAll).toHaveBeenCalledWith(brands);
    expect(productStorage.replaceAll).toHaveBeenCalledWith([]);
    expect(prefetch.prefetch).toHaveBeenCalledWith(['/solaris.svg']);
  });

  it('should swallow API errors and log the failed collection', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    const apiError = new Error('network down');

    brandApi.getAll.mockReturnValue(throwError(() => apiError));
    productsApi.getAll.mockReturnValue(of([]));
    brandStorage.getAll.mockResolvedValue([]);
    productStorage.getAll.mockResolvedValue([]);
    productStorage.replaceAll.mockResolvedValue(undefined);
    prefetch.prefetch.mockResolvedValue(undefined);

    await expect(firstValueFrom(service.run())).resolves.toBeUndefined();

    expect(brandStorage.replaceAll).not.toHaveBeenCalled();
    expect(productStorage.replaceAll).toHaveBeenCalledWith([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to sync brands', apiError);
    expect(prefetch.prefetch).toHaveBeenCalledWith([]);
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
    productsApi.getAll.mockReturnValue(of([]));
    brandStorage.getAll.mockResolvedValue([]);
    productStorage.getAll.mockResolvedValue([]);
    brandStorage.replaceAll.mockRejectedValue(storageError);
    productStorage.replaceAll.mockResolvedValue(undefined);
    prefetch.prefetch.mockResolvedValue(undefined);

    await expect(firstValueFrom(service.run())).resolves.toBeUndefined();

    expect(brandStorage.replaceAll).toHaveBeenCalledWith(brands);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to sync brands', storageError);
  });

  it('should fetch products and persist them into storage', async () => {
    const products = [
      {
        nid: 1,
        catalogYearLabel: 'Catalog year',
        catalogYear: '2026',
        titleLabel: 'Product name',
        title: 'Alpha',
        slug: 'alpha',
        imagesCarousel: [
          {
            imageUrl: '/alpha-carousel.png',
            imageUrlAlt: 'Alpha carousel',
          },
        ],
        productImage: '/alpha.png',
        productImageAlt: 'Alpha',
        productDefinitionLabel: 'Definition',
        productDefinition: '<p>Definition</p>',
        indicationsLabel: 'Indications',
        indications: '<p>Indications</p>',
        complementLabel: 'Complement',
        complement: '<p>Complement</p>',
        brandLabelLabel: null,
        brandLabel: 'Brand',
        brand: [],
        categoryLabel: 'Category',
        category: [],
        fatsLabel: 'Fats',
        fats: '28',
        carbohydratesLabel: 'Carbohydrates',
        carbohydrates: '55',
        proteinsLabel: 'Proteins',
        proteins: '17',
        nutritionalTableLabel: 'Nutritional table',
        nutritionalTable: [
          {
            imageUrl: '/alpha-table.png',
            imageUrlAlt: 'Alpha table',
          },
        ],
        nutritionTableCaptionLabel: 'Caption',
        nutritionTableCaption: '',
        technicalCharacteristicsLabel: 'Technical characteristics',
        technicalCharacteristics: [],
        technicalCharacteristicsComplementLabel: 'Complement label',
        technicalCharacteristicsComplement: '',
        feedingTableLabel: 'Feeding table',
        feedingTable: null,
        methodOfPreparationLabel: 'Method of preparation',
        methodOfPreparation: '<ol><li>Prepare</li></ol>',
        dosageTableTitleLabel: 'Dosage table title label',
        dosageTableTitle: 'Dosage table',
        dosageTableLabel: 'Dosage table label',
        dosageTableTotalVolumeTitle: 'Total volume',
        dosageTableNumPowderTitle: 'Measure',
        dosageTableWaterVolumeTitle: 'Water volume',
        dosageTableExtraInformation: '',
        dosageTable: [],
        consumptionSuggestionLabel: 'Consumption suggestion',
        consumptionSuggestion: '',
        advertenceLabel: 'Advertence',
        advertence: '',
        patientsLabel: '',
        patients: '',
        dietaLabel: '',
        dieta: '',
        acessoLabel: null,
        acesso: null,
        alergenosLabel: null,
        alergenos: null,
        carNutriLabel: null,
        carNutri: null,
        contentLabel: '',
        content: '',
        nutrients: null,
        metatags: {
          canonicalUrl: 'https://example.com/alpha',
          googleSiteVerification: [],
          hreflangXdefault: 'https://example.com/api/product',
          ogImage: ['https://example.com/alpha-og.jpg'],
          title: 'Alpha',
          twitterCardsImage: 'https://example.com/alpha-twitter.jpg',
          description: 'Alpha',
          ogDescription: 'Alpha',
          ogImageUrl: ['https://example.com/alpha-og-url.jpg'],
          ogSiteName: 'Site',
          ogTitle: 'Alpha',
          ogType: 'website',
          ogUrl: 'https://example.com/alpha',
          twitterCardsDescription: 'Alpha',
          twitterCardsTitle: 'Alpha',
          twitterCardsType: 'summary',
        },
      },
    ];

    brandApi.getAll.mockReturnValue(of([]));
    productsApi.getAll.mockReturnValue(of(products));
    brandStorage.getAll.mockResolvedValue([]);
    productStorage.getAll.mockResolvedValue(products);
    brandStorage.replaceAll.mockResolvedValue(undefined);
    productStorage.replaceAll.mockResolvedValue(undefined);
    prefetch.prefetch.mockResolvedValue(undefined);

    await expect(firstValueFrom(service.run())).resolves.toBeUndefined();

    expect(productsApi.getAll).toHaveBeenCalledTimes(1);
    expect(productStorage.replaceAll).toHaveBeenCalledWith(products);
    expect(prefetch.prefetch).toHaveBeenCalledWith([
      '/alpha.png',
      '/alpha-carousel.png',
      '/alpha-table.png',
      'https://example.com/alpha-twitter.jpg',
      'https://example.com/alpha-og.jpg',
      'https://example.com/alpha-og-url.jpg',
    ]);
  });
});
