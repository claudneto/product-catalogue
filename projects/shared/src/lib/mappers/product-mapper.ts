import { inject, Injectable } from '@angular/core';

import {
  Product,
  ProductDosageRow,
  ProductImage,
  ProductMetatags,
  ProductTechnicalCharacteristic,
  ProductTerm,
} from '@shared/models/product';
import {
  ProductDosageRowDto,
  ProductDto,
  ProductImageDto,
  ProductMetatagsDto,
  ProductTechnicalCharacteristicDto,
  ProductTermDto,
} from '@shared/models/dtos/product-dto';
import { IMAGES_BASE_URL } from '@shared/tokens/images-base-url.token';
import { ImageUtils } from '@shared/utils/image-utils';
import { StringUtils } from '@shared/utils/string-utils';

@Injectable({
  providedIn: 'root',
})
export class ProductMapper {
  private readonly imagesBaseUrl = inject(IMAGES_BASE_URL);

  public map(productDto: ProductDto): Product {
    return {
      nid: productDto.nid,
      catalogYearLabel: productDto.catalog_year_label,
      catalogYear: productDto.catalog_year,
      titleLabel: productDto.title_label,
      title: productDto.title,
      slug: productDto.slug,
      imagesCarousel: productDto.images_carousel.map((image) => this.mapImage(image)),
      productImage: this.resolveImage(productDto.product_image),
      productImageAlt: productDto.product_image_alt,
      productDefinitionLabel: productDto.product_definition_label,
      productDefinition: StringUtils.normalizeHtmlString(productDto.product_definition),
      indicationsLabel: productDto.indications_label,
      indications: StringUtils.normalizeHtmlString(productDto.indications),
      complementLabel: productDto.complement_label,
      complement: StringUtils.normalizeHtmlString(productDto.complement),
      brandLabelLabel: StringUtils.normalizeNullableString(productDto.brand_label_label),
      brandLabel: productDto.brand_label,
      brand: productDto.brand.map((term) => this.mapTerm(term)),
      categoryLabel: productDto.category_label,
      category: productDto.category.map((term) => this.mapTerm(term)),
      fatsLabel: productDto.fats_label,
      fats: productDto.fats,
      carbohydratesLabel: productDto.carbohydrates_label,
      carbohydrates: productDto.carbohydrates,
      proteinsLabel: productDto.proteins_label,
      proteins: productDto.proteins,
      nutritionalTableLabel: productDto.nutritional_table_label,
      nutritionalTable: productDto.nutritional_table.map((image) => this.mapImage(image)),
      nutritionTableCaptionLabel: productDto.nutrition_table_caption_label,
      nutritionTableCaption: productDto.nutrition_table_caption,
      technicalCharacteristicsLabel: productDto.technical_characteristics_label,
      technicalCharacteristics: productDto.technical_characteristics.map((item) =>
        this.mapTechnicalCharacteristic(item),
      ),
      technicalCharacteristicsComplementLabel: productDto.technical_characteristics_complement_label,
      technicalCharacteristicsComplement: StringUtils.normalizeHtmlString(
        productDto.technical_characteristics_complement,
      ),
      feedingTableLabel: productDto.feeding_table_label,
      feedingTable: productDto.feeding_table,
      methodOfPreparationLabel: productDto.method_of_preparation_label,
      methodOfPreparation: StringUtils.normalizeHtmlString(productDto.method_of_preparation),
      dosageTableTitleLabel: productDto.dosage_table_title_label,
      dosageTableTitle: productDto.dosage_table_title,
      dosageTableLabel: productDto.dosage_table_label,
      dosageTableTotalVolumeTitle: productDto.dosage_table_total_volume_title,
      dosageTableNumPowderTitle: productDto.dosage_table_num_powder_title,
      dosageTableWaterVolumeTitle: productDto.dosage_table_water_volume_title,
      dosageTableExtraInformation: StringUtils.normalizeHtmlString(productDto.dosage_table_extra_information),
      dosageTable: productDto.dosage_table.map((item) => this.mapDosageRow(item)),
      consumptionSuggestionLabel: productDto.consumption_suggestion_label,
      consumptionSuggestion: StringUtils.normalizeHtmlString(productDto.consumption_suggestion),
      advertenceLabel: productDto.advertence_label,
      advertence: StringUtils.normalizeHtmlString(productDto.advertence),
      patientsLabel: productDto.patients_label,
      patients: StringUtils.normalizeHtmlString(productDto.patients),
      dietaLabel: productDto.dieta_label,
      dieta: StringUtils.normalizeHtmlString(productDto.dieta),
      acessoLabel: StringUtils.normalizeNullableString(productDto.acesso_label),
      acesso: StringUtils.normalizeNullableHtmlString(productDto.acesso),
      alergenosLabel: StringUtils.normalizeNullableString(productDto.alergenos_label),
      alergenos: StringUtils.normalizeNullableHtmlString(productDto.alergenos),
      carNutriLabel: StringUtils.normalizeNullableString(productDto.car_nutri_label),
      carNutri: StringUtils.normalizeNullableHtmlString(productDto.car_nutri),
      contentLabel: productDto.content_label,
      content: StringUtils.normalizeHtmlString(productDto.content),
      nutrients: productDto.nutrients,
      metatags: this.mapMetatags(productDto.metatags),
    };
  }

  private mapImage(imageDto: ProductImageDto): ProductImage {
    return {
      imageUrl: this.resolveImage(imageDto.image_url),
      imageUrlAlt: imageDto.image_url_alt,
    };
  }

  private mapTerm(termDto: ProductTermDto): ProductTerm {
    return {
      tid: termDto.tid,
      title: termDto.title,
    };
  }

  private mapTechnicalCharacteristic(
    technicalCharacteristicDto: ProductTechnicalCharacteristicDto,
  ): ProductTechnicalCharacteristic {
    return {
      title: technicalCharacteristicDto.title,
      content: StringUtils.normalizeHtmlString(technicalCharacteristicDto.content),
    };
  }

  private mapDosageRow(dosageRowDto: ProductDosageRowDto): ProductDosageRow {
    return {
      totalVolume: dosageRowDto.total_volume,
      measure: dosageRowDto.measure,
      waterVolume: dosageRowDto.water_volume,
    };
  }

  private mapMetatags(metatagsDto: ProductMetatagsDto): ProductMetatags {
    return {
      canonicalUrl: metatagsDto.canonical_url,
      googleSiteVerification: metatagsDto.google_site_verification,
      hreflangXdefault: metatagsDto.hreflang_xdefault,
      ogImage: metatagsDto.og_image,
      title: metatagsDto.title,
      twitterCardsImage: metatagsDto.twitter_cards_image,
      description: metatagsDto.description,
      ogDescription: metatagsDto.og_description,
      ogImageUrl: metatagsDto.og_image_url,
      ogSiteName: metatagsDto.og_site_name,
      ogTitle: metatagsDto.og_title,
      ogType: metatagsDto.og_type,
      ogUrl: metatagsDto.og_url,
      twitterCardsDescription: metatagsDto.twitter_cards_description,
      twitterCardsTitle: metatagsDto.twitter_cards_title,
      twitterCardsType: metatagsDto.twitter_cards_type,
    };
  }

  private resolveImage(imageUrl: string): string {
    return ImageUtils.resolveImageUrl(imageUrl, this.imagesBaseUrl);
  }
}
