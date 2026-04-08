import { convertToParamMap, ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { ProductSearchPage } from '@br/features/products/pages/products-search-page/products-search-page';
import { Product } from 'shared';
import { ProductStorage } from 'shared';

const createProduct = (
  nid: number,
  title: string,
  brand: string,
  category: string,
): Product => ({
  nid,
  catalogYearLabel: 'Catalog year',
  catalogYear: '2026',
  titleLabel: 'Product name',
  title,
  slug: title.toLowerCase(),
  imagesCarousel: [],
  productImage: `/products/${title.toLowerCase()}.jpg`,
  productImageAlt: title,
  productDefinitionLabel: 'Definition',
  productDefinition: `${title} definition`,
  indicationsLabel: 'Indications',
  indications: `${title} indications`,
  complementLabel: 'Complement',
  complement: `${title} complement`,
  brandLabelLabel: null,
  brandLabel: brand,
  brand: [{ tid: `${nid}`, title: brand }],
  categoryLabel: 'Category',
  category: [{ tid: `${nid}`, title: category }],
  fatsLabel: 'Fats',
  fats: '0',
  carbohydratesLabel: 'Carbohydrates',
  carbohydrates: '0',
  proteinsLabel: 'Proteins',
  proteins: '0',
  nutritionalTableLabel: 'Nutritional table',
  nutritionalTable: [],
  nutritionTableCaptionLabel: 'Caption',
  nutritionTableCaption: '',
  technicalCharacteristicsLabel: 'Technical characteristics',
  technicalCharacteristics: [],
  technicalCharacteristicsComplementLabel: 'Technical characteristics complement',
  technicalCharacteristicsComplement: '',
  feedingTableLabel: 'Feeding table',
  feedingTable: null,
  methodOfPreparationLabel: 'Method of preparation',
  methodOfPreparation: '',
  dosageTableTitleLabel: 'Dosage table title',
  dosageTableTitle: '',
  dosageTableLabel: 'Dosage table',
  dosageTableTotalVolumeTitle: '',
  dosageTableNumPowderTitle: '',
  dosageTableWaterVolumeTitle: '',
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
    canonicalUrl: `https://example.com/${title.toLowerCase()}`,
    googleSiteVerification: [],
    hreflangXdefault: 'https://example.com',
    ogImage: [],
    title,
    twitterCardsImage: '',
    description: title,
    ogDescription: title,
    ogImageUrl: [],
    ogSiteName: 'Site',
    ogTitle: title,
    ogType: 'website',
    ogUrl: `https://example.com/${title.toLowerCase()}`,
    twitterCardsDescription: title,
    twitterCardsTitle: title,
    twitterCardsType: 'summary',
  },
});

describe('ProductSearchPage', () => {
  let component: ProductSearchPage;
  let fixture: ComponentFixture<ProductSearchPage>;
  let productStorage: { getAll: ReturnType<typeof vi.fn> };
  let queryParamMapSubject: BehaviorSubject<ReturnType<typeof convertToParamMap>>;

  beforeEach(async () => {
    productStorage = {
      getAll: vi.fn().mockResolvedValue([
        createProduct(1, 'Alpha', 'Peptamen', 'Enteral'),
        createProduct(2, 'Beta', 'Nutren', 'Imunidade'),
        createProduct(3, 'Gama', 'Peptamen', 'Imunidade'),
      ]),
    };
    queryParamMapSubject = new BehaviorSubject(convertToParamMap({}));

    await TestBed.configureTestingModule({
      imports: [ProductSearchPage],
      providers: [
        { provide: ProductStorage, useValue: productStorage },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: queryParamMapSubject.asObservable(),
            snapshot: {
              queryParamMap: queryParamMapSubject.value,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a reactive search field and the loaded products', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(productStorage.getAll).toHaveBeenCalledTimes(1);
    expect(compiled.querySelector<HTMLInputElement>('#product-search')).not.toBeNull();
    expect(compiled.querySelectorAll('lib-product-card')).toHaveLength(3);
    expect(compiled.textContent).toContain('Alpha');
    expect(compiled.textContent).toContain('Beta');
    expect(compiled.textContent).toContain('Gama');
  });

  it('should filter products by the entered search term', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector<HTMLInputElement>('#product-search');

    searchInput!.value = 'nutren';
    searchInput!.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('lib-product-card')).toHaveLength(1);
    expect(compiled.textContent).toContain('Beta');
    expect(compiled.textContent).not.toContain('Alpha');
  });

  it('should pre-filter products by brand from the route query parameter', async () => {
    queryParamMapSubject.next(convertToParamMap({ brand: 'Peptamen' }));

    fixture = TestBed.createComponent(ProductSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const allProductsLink = compiled.querySelector<HTMLAnchorElement>('a.product-page__all-products');

    expect(compiled.querySelectorAll('lib-product-card')).toHaveLength(2);
    expect(compiled.textContent).toContain('Alpha');
    expect(compiled.textContent).toContain('Gama');
    expect(compiled.textContent).not.toContain('Beta');
    expect(allProductsLink?.getAttribute('href')).toBe('/products');
    expect(allProductsLink?.textContent).toContain('Ver todos os produtos');
  });

  it('should combine brand and category query parameters when filtering products', async () => {
    queryParamMapSubject.next(convertToParamMap({ brand: 'Peptamen', category: 'Imunidade' }));

    fixture = TestBed.createComponent(ProductSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('lib-product-card')).toHaveLength(1);
    expect(compiled.textContent).toContain('Gama');
    expect(compiled.textContent).not.toContain('Alpha');
    expect(compiled.textContent).not.toContain('Beta');
  });

  it('should render an empty search state when no product matches', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector<HTMLInputElement>('#product-search');

    searchInput!.value = 'inexistente';
    searchInput!.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('lib-product-card')).toHaveLength(0);
    expect(compiled.textContent).toContain('Nenhum produto corresponde a busca.');
  });
});
