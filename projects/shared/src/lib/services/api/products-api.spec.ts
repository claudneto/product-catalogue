import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ProductDto } from '@shared/models/dtos/product-dto';
import { ProductMapper } from '@shared/mappers/product-mapper';
import { ProductsApi } from '@shared/services/api/products-api';
import { API_BASE_URL } from '@shared/tokens/api-base-url.token';

describe('ProductsApi', () => {
  let service: ProductsApi;
  let httpTestingController: HttpTestingController;
  let productMapper: { map: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    productMapper = {
      map: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductsApi,
        {
          provide: API_BASE_URL,
          useValue: 'https://api.example.com',
        },
        {
          provide: ProductMapper,
          useValue: productMapper,
        },
      ],
    });

    service = TestBed.inject(ProductsApi);
    TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request the products endpoint with POST and no body', () => {
    service.getAll().subscribe();

    const request = httpTestingController.expectOne('https://api.example.com/product');

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toBeNull();

    request.flush({ data: [] });
  });

  it('should map every received DTO into the Product model', () => {
    const responseData: ProductDto[] = [
      {
        nid: 1,
        catalog_year_label: 'Catalog year',
        catalog_year: '2026',
        title_label: 'Product name',
        title: 'Alpha',
        slug: 'alpha',
        images_carousel: [],
        product_image: '/alpha.png',
        product_image_alt: 'Alpha',
        product_definition_label: 'Definition',
        product_definition: '<p>Definition</p>\r\n',
        indications_label: 'Indications',
        indications: '<p>Indications</p>\r\n',
        complement_label: 'Complement',
        complement: '<p>Complement</p>\r\n',
        brand_label_label: null,
        brand_label: 'Brand',
        brand: [],
        category_label: 'Category',
        category: [],
        fats_label: 'Fats',
        fats: '28',
        carbohydrates_label: 'Carbohydrates',
        carbohydrates: '55',
        proteins_label: 'Proteins',
        proteins: '17',
        nutritional_table_label: 'Nutritional table',
        nutritional_table: [],
        nutrition_table_caption_label: 'Caption',
        nutrition_table_caption: '',
        technical_characteristics_label: 'Technical characteristics',
        technical_characteristics: [],
        technical_characteristics_complement_label: 'Complement label',
        technical_characteristics_complement: '',
        feeding_table_label: 'Feeding table',
        feeding_table: null,
        method_of_preparation_label: 'Method of preparation',
        method_of_preparation: '<ol><li>Prepare</li></ol>\r\n',
        dosage_table_title_label: 'Dosage table title label',
        dosage_table_title: 'Dosage table',
        dosage_table_label: 'Dosage table label',
        dosage_table_total_volume_title: 'Total volume',
        dosage_table_num_powder_title: 'Measure',
        dosage_table_water_volume_title: 'Water volume',
        dosage_table_extra_information: '<p>Info</p>\r\n',
        dosage_table: [],
        consumption_suggestion_label: 'Consumption suggestion',
        consumption_suggestion: '<p>Suggestion</p>\r\n',
        advertence_label: 'Advertence',
        advertence: '',
        patients_label: '',
        patients: '',
        dieta_label: '',
        dieta: '',
        acesso_label: null,
        acesso: null,
        alergenos_label: null,
        alergenos: null,
        car_nutri_label: null,
        car_nutri: null,
        content_label: '',
        content: '',
        nutrients: null,
        metatags: {
          canonical_url: 'https://example.com/alpha',
          google_site_verification: [],
          hreflang_xdefault: 'https://example.com/api/product',
          og_image: [],
          title: 'Alpha',
          twitter_cards_image: 'https://example.com/alpha-twitter.jpg',
          description: 'Alpha',
          og_description: 'Alpha',
          og_image_url: [],
          og_site_name: 'Site',
          og_title: 'Alpha',
          og_type: 'website',
          og_url: 'https://example.com/alpha',
          twitter_cards_description: 'Alpha',
          twitter_cards_title: 'Alpha',
          twitter_cards_type: 'summary',
        },
      },
    ];

    productMapper.map.mockReturnValueOnce({
      nid: 1,
      catalogYearLabel: 'Catalog year',
      catalogYear: '2026',
      titleLabel: 'Product name',
      title: 'Alpha',
      slug: 'alpha',
      imagesCarousel: [],
      productImage: 'https://cdn.example.com/alpha.png',
      productImageAlt: 'Alpha',
      productDefinitionLabel: 'Definition',
      productDefinition: '<p>Definition</p><br />',
      indicationsLabel: 'Indications',
      indications: '<p>Indications</p><br />',
      complementLabel: 'Complement',
      complement: '<p>Complement</p><br />',
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
      nutritionalTable: [],
      nutritionTableCaptionLabel: 'Caption',
      nutritionTableCaption: '',
      technicalCharacteristicsLabel: 'Technical characteristics',
      technicalCharacteristics: [],
      technicalCharacteristicsComplementLabel: 'Complement label',
      technicalCharacteristicsComplement: '',
      feedingTableLabel: 'Feeding table',
      feedingTable: null,
      methodOfPreparationLabel: 'Method of preparation',
      methodOfPreparation: '<ol><li>Prepare</li></ol><br />',
      dosageTableTitleLabel: 'Dosage table title label',
      dosageTableTitle: 'Dosage table',
      dosageTableLabel: 'Dosage table label',
      dosageTableTotalVolumeTitle: 'Total volume',
      dosageTableNumPowderTitle: 'Measure',
      dosageTableWaterVolumeTitle: 'Water volume',
      dosageTableExtraInformation: '<p>Info</p><br />',
      dosageTable: [],
      consumptionSuggestionLabel: 'Consumption suggestion',
      consumptionSuggestion: '<p>Suggestion</p><br />',
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
        ogImage: [],
        title: 'Alpha',
        twitterCardsImage: 'https://example.com/alpha-twitter.jpg',
        description: 'Alpha',
        ogDescription: 'Alpha',
        ogImageUrl: [],
        ogSiteName: 'Site',
        ogTitle: 'Alpha',
        ogType: 'website',
        ogUrl: 'https://example.com/alpha',
        twitterCardsDescription: 'Alpha',
        twitterCardsTitle: 'Alpha',
        twitterCardsType: 'summary',
      },
    });

    let result: unknown;
    service.getAll().subscribe((products) => {
      result = products;
    });

    const request = httpTestingController.expectOne('https://api.example.com/product');
    request.flush({ data: responseData });

    expect(productMapper.map).toHaveBeenCalledTimes(1);
    expect(productMapper.map).toHaveBeenCalledWith(responseData[0]);
    expect(result).toEqual([
      {
        nid: 1,
        catalogYearLabel: 'Catalog year',
        catalogYear: '2026',
        titleLabel: 'Product name',
        title: 'Alpha',
        slug: 'alpha',
        imagesCarousel: [],
        productImage: 'https://cdn.example.com/alpha.png',
        productImageAlt: 'Alpha',
        productDefinitionLabel: 'Definition',
        productDefinition: '<p>Definition</p><br />',
        indicationsLabel: 'Indications',
        indications: '<p>Indications</p><br />',
        complementLabel: 'Complement',
        complement: '<p>Complement</p><br />',
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
        nutritionalTable: [],
        nutritionTableCaptionLabel: 'Caption',
        nutritionTableCaption: '',
        technicalCharacteristicsLabel: 'Technical characteristics',
        technicalCharacteristics: [],
        technicalCharacteristicsComplementLabel: 'Complement label',
        technicalCharacteristicsComplement: '',
        feedingTableLabel: 'Feeding table',
        feedingTable: null,
        methodOfPreparationLabel: 'Method of preparation',
        methodOfPreparation: '<ol><li>Prepare</li></ol><br />',
        dosageTableTitleLabel: 'Dosage table title label',
        dosageTableTitle: 'Dosage table',
        dosageTableLabel: 'Dosage table label',
        dosageTableTotalVolumeTitle: 'Total volume',
        dosageTableNumPowderTitle: 'Measure',
        dosageTableWaterVolumeTitle: 'Water volume',
        dosageTableExtraInformation: '<p>Info</p><br />',
        dosageTable: [],
        consumptionSuggestionLabel: 'Consumption suggestion',
        consumptionSuggestion: '<p>Suggestion</p><br />',
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
          ogImage: [],
          title: 'Alpha',
          twitterCardsImage: 'https://example.com/alpha-twitter.jpg',
          description: 'Alpha',
          ogDescription: 'Alpha',
          ogImageUrl: [],
          ogSiteName: 'Site',
          ogTitle: 'Alpha',
          ogType: 'website',
          ogUrl: 'https://example.com/alpha',
          twitterCardsDescription: 'Alpha',
          twitterCardsTitle: 'Alpha',
          twitterCardsType: 'summary',
        },
      },
    ]);
  });
});
