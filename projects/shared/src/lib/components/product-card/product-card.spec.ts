import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCard } from '@shared/components/product-card/product-card';
import { Product } from '@shared/models/product';

@Component({
  standalone: true,
  imports: [ProductCard],
  template: `<lib-product-card [product]="product"></lib-product-card>`,
})
class HostComponent {
  protected readonly product: Product = {
    nid: 36,
    catalogYearLabel: 'Catalog year',
    catalogYear: '2020',
    titleLabel: 'Product name',
    title: 'Peptamen Po',
    slug: 'peptamen-po',
    imagesCarousel: [],
    productImage: '/products/peptamen-po.jpg',
    productImageAlt: 'Peptamen Po',
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
      canonicalUrl: 'https://example.com/products/peptamen-po',
      googleSiteVerification: [],
      hreflangXdefault: 'https://example.com/api/product',
      ogImage: [],
      title: 'Peptamen Po',
      twitterCardsImage: 'https://example.com/twitter-image.jpg',
      description: 'Product description',
      ogDescription: 'OG description',
      ogImageUrl: [],
      ogSiteName: 'Site name',
      ogTitle: 'OG title',
      ogType: 'website',
      ogUrl: 'https://example.com/products/peptamen-po',
      twitterCardsDescription: 'Twitter description',
      twitterCardsTitle: 'Twitter title',
      twitterCardsType: 'summary',
    },
  };
}

describe('ProductCard', () => {
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

  it('should render the product image and title passed through the required input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('mat-card-title');
    const image = compiled.querySelector<HTMLImageElement>('img[mat-card-image]');

    expect(title?.textContent?.trim()).toBe('Peptamen Po');
    expect(image?.getAttribute('src')).toBe('/products/peptamen-po.jpg');
    expect(image?.getAttribute('alt')).toBe('Peptamen Po');
  });
});
