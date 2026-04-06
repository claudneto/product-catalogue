import { Routes } from '@angular/router';
import { ProductSearchPage } from './pages/products-search-page/products-search-page';
import { ProductDetailsPage } from './pages/products-details-page/products-details-page';

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
