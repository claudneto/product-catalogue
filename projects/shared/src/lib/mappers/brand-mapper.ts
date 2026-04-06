import { inject, Injectable, InjectionToken } from '@angular/core';
import { BrandDto } from '@shared/models/dtos/brand-dto';
import { Brand } from 'shared';

export const IMAGES_BASE_URL = new InjectionToken<string>('IMAGES_BASE_URL');

@Injectable({
  providedIn: 'root',
})
export class BrandMapper {
  private readonly imagesBaseUrl = inject(IMAGES_BASE_URL);

  public map(brandDto: BrandDto): Brand {
    return {
      tid: brandDto.tid,
      title: brandDto.title,
      description: brandDto.description,
      brandUrl: brandDto.brand_url,
      brandTarget: brandDto.brand_target,
      logo: `${this.imagesBaseUrl}${brandDto.logo}`,
      logoAlt: brandDto.logo_alt,
      updatedAt: new Date(brandDto.updated_at),
    };
  }
}
