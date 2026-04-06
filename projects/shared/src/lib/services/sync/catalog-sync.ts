import { Injectable, inject } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { BrandApi } from '@shared/services/api/brand-api';
// import { CategoryApi } from '@shared/services/api/category-api';
import { ProductsApi } from '@shared/services/api/products-api';

import { BrandStorage } from '@shared/services/storage/brand-storage';
// import { CategoryStorage } from '@shared/services/storage/category-storage';
import { ProductStorage } from '@shared/services/storage/product-storage';

@Injectable({
  providedIn: 'root',
})
export class CatalogSync {
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
    ]).pipe(map(() => void 0));
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
}
