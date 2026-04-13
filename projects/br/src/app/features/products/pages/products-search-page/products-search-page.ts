import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { map, startWith } from 'rxjs';

import { Product, ProductList, ProductStorage, StringUtils, TitleBar } from 'shared';

@Component({
  selector: 'app-products-search-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatProgressSpinnerModule,
    TitleBar,
    ProductList,
  ],
  standalone: true,
  templateUrl: './products-search-page.html',
  styleUrl: './products-search-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchPage {
  protected readonly products = signal<Product[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);
  protected readonly searchControl = new FormControl('', { nonNullable: true });
  protected readonly title = 'Produtos';
  protected readonly filteredProducts = computed(() => {
    const normalizedQuery = StringUtils.normalizeSearchText(this.searchTerm());
    const { brand, category } = this.routeFilters();
    const products = this.products();

    return products.filter((product) => {
      const matchesBrand =
        !brand ||
        StringUtils.normalizeSearchText(product.brandLabel) === brand ||
        product.brand.some(
          (productBrand) => StringUtils.normalizeSearchText(productBrand.title) === brand,
        );
      const matchesCategory =
        !category ||
        product.category.some(
          (productCategory) => StringUtils.normalizeSearchText(productCategory.title) === category,
        );
      const matchesQuery =
        !normalizedQuery || this.buildSearchIndex(product).includes(normalizedQuery);

      return matchesBrand && matchesCategory && matchesQuery;
    });
  });
  protected readonly hasRouteFilters = computed(() => {
    const { brand, category } = this.routeFilters();
    return Boolean(brand || category);
  });

  private readonly productStorage = inject(ProductStorage);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(startWith(this.searchControl.value)),
    { initialValue: this.searchControl.value },
  );

  private readonly routeFilters = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map((params) => ({
        brand: StringUtils.normalizeSearchText(params.get('brand') ?? ''),
        category: StringUtils.normalizeSearchText(params.get('category') ?? ''),
      })),
    ),
    {
      initialValue: {
        brand: StringUtils.normalizeSearchText(
          this.activatedRoute.snapshot.queryParamMap.get('brand') ?? '',
        ),
        category: StringUtils.normalizeSearchText(
          this.activatedRoute.snapshot.queryParamMap.get('category') ?? '',
        ),
      },
    },
  );

  public constructor() {
    void this.loadProducts();
  }

  protected async reload(): Promise<void> {
    await this.loadProducts();
  }

  protected clearSearch(): void {
    this.searchControl.setValue('');
  }

  private async loadProducts(): Promise<void> {
    this.loading.set(true);
    this.error.set(false);

    try {
      const products = await this.productStorage.getAll();

      const sortedProducts = [...products].sort((a, b) =>
        a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' }),
      );

      this.products.set(sortedProducts);
    } catch (error) {
      console.error('Failed to load products from storage', error);
      this.error.set(true);
      this.products.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  private buildSearchIndex(product: Product): string {
    return StringUtils.normalizeSearchText(
      [
        product.title,
        ...product.brand.map((brand) => brand.title),
        ...product.category.map((category) => category.title),
      ].join(' '),
    );
  }
}
