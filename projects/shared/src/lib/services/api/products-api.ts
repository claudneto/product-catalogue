import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '@shared/models/api-response';
import { ProductDto } from '@shared/models/dtos/product-dto';
import { Product } from '@shared/models/product';
import { ProductMapper } from '@shared/mappers/product-mapper';
import { API_BASE_URL } from '@shared/tokens/api-base-url.token';

@Injectable({
  providedIn: 'root',
})
export class ProductsApi {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly productMapper = inject(ProductMapper);

  public getAll(): Observable<Product[]> {
    return this.http
      .post<ApiResponse<ProductDto>>(`${this.apiBaseUrl}/product`, null)
      .pipe(map((response) => response.data.map((product) => this.productMapper.map(product))));
  }
}
