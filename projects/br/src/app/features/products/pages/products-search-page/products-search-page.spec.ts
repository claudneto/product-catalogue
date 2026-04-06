import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchPage } from './products-search-page';

describe('ProductSearchPage', () => {
  let component: ProductSearchPage;
  let fixture: ComponentFixture<ProductSearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSearchPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSearchPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
