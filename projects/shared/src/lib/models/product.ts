export interface Product {
  nid: number;
  catalogYearLabel: string;
  catalogYear: string;
  titleLabel: string;
  title: string;
  slug: string;
  imagesCarousel: ProductImage[];
  productImage: string;
  productImageAlt: string;
  productDefinitionLabel: string;
  productDefinition: string;
  indicationsLabel: string;
  indications: string;
  complementLabel: string;
  complement: string;
  brandLabelLabel: string | null;
  brandLabel: string;
  brand: ProductTerm[];
  categoryLabel: string;
  category: ProductTerm[];
  fatsLabel: string;
  fats: string;
  carbohydratesLabel: string;
  carbohydrates: string;
  proteinsLabel: string;
  proteins: string;
  nutritionalTableLabel: string;
  nutritionalTable: ProductImage[];
  nutritionTableCaptionLabel: string;
  nutritionTableCaption: string;
  technicalCharacteristicsLabel: string;
  technicalCharacteristics: ProductTechnicalCharacteristic[];
  technicalCharacteristicsComplementLabel: string;
  technicalCharacteristicsComplement: string;
  feedingTableLabel: string;
  feedingTable: unknown | null;
  methodOfPreparationLabel: string;
  methodOfPreparation: string;
  dosageTableTitleLabel: string;
  dosageTableTitle: string;
  dosageTableLabel: string;
  dosageTableTotalVolumeTitle: string;
  dosageTableNumPowderTitle: string;
  dosageTableWaterVolumeTitle: string;
  dosageTableExtraInformation: string;
  dosageTable: ProductDosageRow[];
  consumptionSuggestionLabel: string;
  consumptionSuggestion: string;
  advertenceLabel: string;
  advertence: string;
  patientsLabel: string;
  patients: string;
  dietaLabel: string;
  dieta: string;
  acessoLabel: string | null;
  acesso: string | null;
  alergenosLabel: string | null;
  alergenos: string | null;
  carNutriLabel: string | null;
  carNutri: string | null;
  contentLabel: string;
  content: string;
  nutrients: unknown | null;
  metatags: ProductMetatags;
}

export interface ProductImage {
  imageUrl: string;
  imageUrlAlt: string;
}

export interface ProductTerm {
  tid: string;
  title: string;
}

export interface ProductTechnicalCharacteristic {
  content: string;
  title: string;
}

export interface ProductDosageRow {
  totalVolume: string;
  measure: string;
  waterVolume: string;
}

export interface ProductMetatags {
  canonicalUrl: string;
  googleSiteVerification: string[];
  hreflangXdefault: string;
  ogImage: string[];
  title: string;
  twitterCardsImage: string;
  description: string;
  ogDescription: string;
  ogImageUrl: string[];
  ogSiteName: string;
  ogTitle: string;
  ogType: string;
  ogUrl: string;
  twitterCardsDescription: string;
  twitterCardsTitle: string;
  twitterCardsType: string;
}
