import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList } from '@shared/components/product-list/product-list';
import { Product } from '@shared/models/product';

@Component({
  standalone: true,
  imports: [ProductList],
  template: `<lib-product-list [products]="products"></lib-product-list>`,
})
class HostComponent {
  public products: Product[] = [
    {
      nid: 1,
      catalogYearLabel: 'Catalog year',
      catalogYear: '2026',
      titleLabel: 'Product name',
      title: 'Alpha',
      slug: 'alpha',
      imagesCarousel: [],
      productImage: '/products/alpha.jpg',
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
    {
      nid: 2,
      catalogYearLabel: 'Catalog year',
      catalogYear: '2026',
      titleLabel: 'Product name',
      title: 'Beta',
      slug: 'beta',
      imagesCarousel: [],
      productImage: '/products/beta.jpg',
      productImageAlt: 'Beta',
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
        canonicalUrl: 'https://example.com/beta',
        googleSiteVerification: [],
        hreflangXdefault: 'https://example.com/api/product',
        ogImage: [],
        title: 'Beta',
        twitterCardsImage: 'https://example.com/beta-twitter.jpg',
        description: 'Beta',
        ogDescription: 'Beta',
        ogImageUrl: [],
        ogSiteName: 'Site',
        ogTitle: 'Beta',
        ogType: 'website',
        ogUrl: 'https://example.com/beta',
        twitterCardsDescription: 'Beta',
        twitterCardsTitle: 'Beta',
        twitterCardsType: 'summary',
      },
    },
  ];
}

@Component({
  standalone: true,
  imports: [ProductList],
  template: `<lib-product-list [products]="products"></lib-product-list>`,
})
class EmptyHostComponent {
  public readonly products: Product[] = [];
}

describe('ProductList', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should render one product card per product', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('lib-product-card');

    expect(cards).toHaveLength(2);
    expect(compiled.textContent).toContain('Alpha');
    expect(compiled.textContent).toContain('Beta');
  });

  it('should render the empty state when the product list is empty', async () => {
    const emptyFixture = TestBed.createComponent(EmptyHostComponent);
    emptyFixture.detectChanges();
    await emptyFixture.whenStable();
    emptyFixture.detectChanges();

    const compiled = emptyFixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('lib-product-card')).toHaveLength(0);
    expect(compiled.textContent).toContain('Nenhum produto encontrado.');
  });
});
