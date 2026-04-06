import { TestBed } from '@angular/core/testing';

import { ProductDto } from '@shared/models/dtos/product-dto';
import { ProductMapper } from '@shared/mappers/product-mapper';
import { IMAGES_BASE_URL } from '@shared/tokens/images-base-url.token';

describe('ProductMapper', () => {
  let service: ProductMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductMapper,
        {
          provide: IMAGES_BASE_URL,
          useValue: 'https://cdn.example.com',
        },
      ],
    });

    service = TestBed.inject(ProductMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map API fields to the Product model', () => {
    const dto: ProductDto = {
      nid: 36,
      catalog_year_label: 'Catalog year',
      catalog_year: '2020',
      title_label: 'Product name',
      title: 'Peptamen Po',
      slug: 'peptamen-po',
      images_carousel: [
        {
          image_url: '/carousel/image-1.png',
          image_url_alt: 'Carousel image',
        },
      ],
      product_image: '/products/peptamen-po.jpg',
      product_image_alt: 'Peptamen Po',
      product_definition_label: 'Definition',
      product_definition: '<p>Definition</p>\r\n',
      indications_label: 'Indications',
      indications: '<p>Indication 1</p>\r\n<p>Indication 2</p>\r\n',
      complement_label: 'Complement',
      complement: '<p>Does not contain gluten</p>\r\n',
      brand_label_label: 'Brand label',
      brand_label: 'Brand',
      brand: [{ tid: '25', title: 'Peptamen' }],
      category_label: 'Category',
      category: [{ tid: '32', title: 'Critical Care' }],
      fats_label: 'Fats',
      fats: '28',
      carbohydrates_label: 'Carbohydrates',
      carbohydrates: '55',
      proteins_label: 'Proteins',
      proteins: '17',
      nutritional_table_label: 'Nutritional table',
      nutritional_table: [
        {
          image_url: 'https://images.example.com/table-1.png',
          image_url_alt: 'Table image',
        },
      ],
      nutrition_table_caption_label: 'Caption',
      nutrition_table_caption: '',
      technical_characteristics_label: 'Technical characteristics',
      technical_characteristics: [
        {
          title: 'Protein source',
          content: '<p>Hydrolyzed whey protein</p>\r\n',
        },
      ],
      technical_characteristics_complement_label: 'Complement label',
      technical_characteristics_complement: '<p>Complement info</p>\r\n',
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
      dosage_table_extra_information: '<p>Yield 1.8 liters</p>\r\n',
      dosage_table: [
        {
          total_volume: '250 mL',
          measure: '56 g',
          water_volume: '210 mL',
        },
      ],
      consumption_suggestion_label: 'Consumption suggestion',
      consumption_suggestion: '<p>Use under supervision</p>\r\n',
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
        canonical_url: 'https://example.com/products/peptamen-po',
        google_site_verification: ['verification'],
        hreflang_xdefault: 'https://example.com/api/product',
        og_image: ['https://example.com/og-image.jpg'],
        title: 'Peptamen Po',
        twitter_cards_image: 'https://example.com/twitter-image.jpg',
        description: 'Product description',
        og_description: 'OG description',
        og_image_url: ['https://example.com/og-image.jpg'],
        og_site_name: 'Site name',
        og_title: 'OG title',
        og_type: 'website',
        og_url: 'https://example.com/products/peptamen-po',
        twitter_cards_description: 'Twitter description',
        twitter_cards_title: 'Twitter title',
        twitter_cards_type: 'summary',
      },
    };

    const product = service.map(dto);

    expect(product).toEqual({
      nid: 36,
      catalogYearLabel: 'Catalog year',
      catalogYear: '2020',
      titleLabel: 'Product name',
      title: 'Peptamen Po',
      slug: 'peptamen-po',
      imagesCarousel: [
        {
          imageUrl: 'https://cdn.example.com/carousel/image-1.png',
          imageUrlAlt: 'Carousel image',
        },
      ],
      productImage: 'https://cdn.example.com/products/peptamen-po.jpg',
      productImageAlt: 'Peptamen Po',
      productDefinitionLabel: 'Definition',
      productDefinition: '<p>Definition</p><br />',
      indicationsLabel: 'Indications',
      indications: '<p>Indication 1</p><br /><p>Indication 2</p><br />',
      complementLabel: 'Complement',
      complement: '<p>Does not contain gluten</p><br />',
      brandLabelLabel: 'Brand label',
      brandLabel: 'Brand',
      brand: [{ tid: '25', title: 'Peptamen' }],
      categoryLabel: 'Category',
      category: [{ tid: '32', title: 'Critical Care' }],
      fatsLabel: 'Fats',
      fats: '28',
      carbohydratesLabel: 'Carbohydrates',
      carbohydrates: '55',
      proteinsLabel: 'Proteins',
      proteins: '17',
      nutritionalTableLabel: 'Nutritional table',
      nutritionalTable: [
        {
          imageUrl: 'https://images.example.com/table-1.png',
          imageUrlAlt: 'Table image',
        },
      ],
      nutritionTableCaptionLabel: 'Caption',
      nutritionTableCaption: '',
      technicalCharacteristicsLabel: 'Technical characteristics',
      technicalCharacteristics: [
        {
          title: 'Protein source',
          content: '<p>Hydrolyzed whey protein</p><br />',
        },
      ],
      technicalCharacteristicsComplementLabel: 'Complement label',
      technicalCharacteristicsComplement: '<p>Complement info</p><br />',
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
      dosageTableExtraInformation: '<p>Yield 1.8 liters</p><br />',
      dosageTable: [
        {
          totalVolume: '250 mL',
          measure: '56 g',
          waterVolume: '210 mL',
        },
      ],
      consumptionSuggestionLabel: 'Consumption suggestion',
      consumptionSuggestion: '<p>Use under supervision</p><br />',
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
        canonicalUrl: 'https://example.com/products/peptamen-po',
        googleSiteVerification: ['verification'],
        hreflangXdefault: 'https://example.com/api/product',
        ogImage: ['https://example.com/og-image.jpg'],
        title: 'Peptamen Po',
        twitterCardsImage: 'https://example.com/twitter-image.jpg',
        description: 'Product description',
        ogDescription: 'OG description',
        ogImageUrl: ['https://example.com/og-image.jpg'],
        ogSiteName: 'Site name',
        ogTitle: 'OG title',
        ogType: 'website',
        ogUrl: 'https://example.com/products/peptamen-po',
        twitterCardsDescription: 'Twitter description',
        twitterCardsTitle: 'Twitter title',
        twitterCardsType: 'summary',
      },
    });
  });
});
