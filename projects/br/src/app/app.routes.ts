import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@br/features/home/home.routes').then((m) => m.routes),
  },
  {
    path: 'brands',
    loadChildren: () => import('@br/features/brands/brands.routes').then((m) => m.routes),
  },
  {
    path: 'products',
    loadChildren: () => import('@br/features/products/products.routes').then((m) => m.routes),
  },
];
