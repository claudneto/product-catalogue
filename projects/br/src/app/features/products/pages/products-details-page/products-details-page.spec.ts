import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsPage } from '@br/features/products/pages/products-details-page/products-details-page';

describe('ProductDetailsPage', () => {
  let component: ProductDetailsPage;
  let fixture: ComponentFixture<ProductDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
