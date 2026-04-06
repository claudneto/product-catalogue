import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '@shared/models/api-response';
import { BrandDto } from '@shared/models/dtos/brand-dto';
import { Brand } from '@shared/models/brand';
import { BrandMapper } from '@shared/mappers/brand-mapper';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class BrandApi {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly brandMapper = inject(BrandMapper);

  public getAll(): Observable<Brand[]> {
    return this.http
      .post<ApiResponse<BrandDto>>(`${this.apiBaseUrl}/product/brand`, null)
      .pipe(map((response) => response.data.map((brand) => this.brandMapper.map(brand))));
  }
}
