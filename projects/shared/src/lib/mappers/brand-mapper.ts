import { inject, Injectable } from '@angular/core';
import { BrandDto } from '@shared/models/dtos/brand-dto';
import { Brand } from '@shared/models/brand';
import { IMAGES_BASE_URL } from '@shared/tokens/images-base-url.token';
import { ImageUtils } from '@shared/utils/image-utils';

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
      logo: ImageUtils.resolveImageUrl(brandDto.logo, this.imagesBaseUrl),
      logoAlt: brandDto.logo_alt,
      updatedAt: new Date(brandDto.updated_at),
    };
  }
}
