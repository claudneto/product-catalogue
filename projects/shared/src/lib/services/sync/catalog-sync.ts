import { Injectable, inject } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Brand } from '@shared/models/brand';
import { Product } from '@shared/models/product';
import { BrandApi } from '@shared/services/api/brand-api';
// import { CategoryApi } from '@shared/services/api/category-api';
import { ProductsApi } from '@shared/services/api/products-api';

import { BrandStorage } from '@shared/services/storage/brand-storage';
// import { CategoryStorage } from '@shared/services/storage/category-storage';
import { ProductStorage } from '@shared/services/storage/product-storage';
import { ImagePrefetchService } from '@shared/services/cache/image-prefetch';

@Injectable({
  providedIn: 'root',
})
export class CatalogSync {
  private readonly prefetch = inject(ImagePrefetchService);

  private readonly brandApi = inject(BrandApi);
  // private readonly categoryApi = inject(CategoryApi);
  private readonly productsApi = inject(ProductsApi);

  private readonly brandStorage = inject(BrandStorage);
  // private readonly categoryStorage = inject(CategoryStorage);
  private readonly productStorage = inject(ProductStorage);

  public run(): Observable<void> {
    return forkJoin([
      this.syncCollection('brands', this.brandApi.getAll(), (brands) =>
        this.brandStorage.replaceAll(brands),
      ),
      // this.syncCollection(
      //   'categories',
      //   this.categoryApi.getAll(),
      //   (categories) => this.categoryStorage.replaceAll(categories)
      // ),
      this.syncCollection('products', this.productsApi.getAll(), (products) =>
        this.productStorage.replaceAll(products),
      ),
    ]).pipe(
      switchMap(() => from(this.cacheImages())),
      map(() => void 0),
    );
  }

  private syncCollection<T>(
    label: string,
    source$: Observable<T[]>,
    save: (items: T[]) => Promise<void>,
  ): Observable<void> {
    return source$.pipe(
      switchMap((items) => from(save(items))),
      map(() => void 0),
      catchError((error) => {
        console.error(`Failed to sync ${label}`, error);
        return of(void 0);
      }),
    );
  }

  private cacheImages(): Promise<void> {
    return Promise.all([this.brandStorage.getAll(), this.productStorage.getAll()])
      .then(([brands, products]) => {
        const imageUrls = [
          ...this.collectBrandImages(brands),
          ...this.collectProductImages(products),
        ];

        return this.prefetch.prefetch(imageUrls);
      })
      .catch((error) => {
        console.error('Failed to cache catalog images', error);
      });
  }

  private collectBrandImages(brands: Brand[]): string[] {
    return brands.map((brand) => brand.logo);
  }

  private collectProductImages(products: Product[]): string[] {
    return products.flatMap((product) => [
      product.productImage,
      ...product.imagesCarousel.map((image) => image.imageUrl),
      ...product.nutritionalTable.map((image) => image.imageUrl),
      product.metatags.twitterCardsImage,
      ...product.metatags.ogImage,
      ...product.metatags.ogImageUrl,
    ]);
  }
}
