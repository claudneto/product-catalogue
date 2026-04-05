import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiResponse } from '@shared/models/api-response';
import { BrandDto } from '@shared/models/dtos/brand-dto';
import { Brand } from '@shared/models/brand';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const IMAGES_BASE_URL = new InjectionToken<string>('IMAGES_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class BrandApi {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly imagesBaseUrl = inject(IMAGES_BASE_URL);

  public getAll(): Observable<Brand[]> {
    return this.http
      .post<ApiResponse<BrandDto>>(`${this.apiBaseUrl}/product/brand`, null)
      .pipe(map((response) => response.data.map((brand) => this.mapBrand(brand))));
  }

  private mapBrand(brand: BrandDto): Brand {
    return {
      tid: brand.tid,
      title: brand.title,
      description: brand.description,
      brandUrl: brand.brand_url,
      brandTarget: brand.brand_target,
      logo: `${this.imagesBaseUrl}${brand.logo}`,
      logoAlt: brand.logo_alt,
      updatedAt: new Date(brand.updated_at),
    };
  }
}
