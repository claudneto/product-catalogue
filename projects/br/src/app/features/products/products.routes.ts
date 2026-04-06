import { Routes } from '@angular/router';
import { ProductDetailsPage } from '@br/features/products/pages/products-details-page/products-details-page';
import { ProductSearchPage } from '@br/features/products/pages/products-search-page/products-search-page';

export const routes: Routes = [
  {
    path: '',
    component: ProductSearchPage,
  },
  {
    path: ':slug',
    component: ProductDetailsPage,
  },
];
