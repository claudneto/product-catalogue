export interface ProductDto {
  nid: number;
  catalog_year_label: string;
  catalog_year: string;
  title_label: string;
  title: string;
  slug: string;
  images_carousel: ProductImageDto[];
  product_image: string;
  product_image_alt: string;
  product_definition_label: string;
  product_definition: string;
  indications_label: string;
  indications: string;
  complement_label: string;
  complement: string;
  brand_label_label: string | null;
  brand_label: string;
  brand: ProductTermDto[];
  category_label: string;
  category: ProductTermDto[];
  fats_label: string;
  fats: string;
  carbohydrates_label: string;
  carbohydrates: string;
  proteins_label: string;
  proteins: string;
  nutritional_table_label: string;
  nutritional_table: ProductImageDto[];
  nutrition_table_caption_label: string;
  nutrition_table_caption: string;
  technical_characteristics_label: string;
  technical_characteristics: ProductTechnicalCharacteristicDto[];
  technical_characteristics_complement_label: string;
  technical_characteristics_complement: string;
  feeding_table_label: string;
  feeding_table: unknown | null;
  method_of_preparation_label: string;
  method_of_preparation: string;
  dosage_table_title_label: string;
  dosage_table_title: string;
  dosage_table_label: string;
  dosage_table_total_volume_title: string;
  dosage_table_num_powder_title: string;
  dosage_table_water_volume_title: string;
  dosage_table_extra_information: string;
  dosage_table: ProductDosageRowDto[];
  consumption_suggestion_label: string;
  consumption_suggestion: string;
  advertence_label: string;
  advertence: string;
  patients_label: string;
  patients: string;
  dieta_label: string;
  dieta: string;
  acesso_label: string | null;
  acesso: string | null;
  alergenos_label: string | null;
  alergenos: string | null;
  car_nutri_label: string | null;
  car_nutri: string | null;
  content_label: string;
  content: string;
  nutrients: unknown | null;
  metatags: ProductMetatagsDto;
}

export interface ProductImageDto {
  image_url: string;
  image_url_alt: string;
}

export interface ProductTermDto {
  tid: string;
  title: string;
}

export interface ProductTechnicalCharacteristicDto {
  content: string;
  title: string;
}

export interface ProductDosageRowDto {
  total_volume: string;
  measure: string;
  water_volume: string;
}

export interface ProductMetatagsDto {
  canonical_url: string;
  google_site_verification: string[];
  hreflang_xdefault: string;
  og_image: string[];
  title: string;
  twitter_cards_image: string;
  description: string;
  og_description: string;
  og_image_url: string[];
  og_site_name: string;
  og_title: string;
  og_type: string;
  og_url: string;
  twitter_cards_description: string;
  twitter_cards_title: string;
  twitter_cards_type: string;
}
