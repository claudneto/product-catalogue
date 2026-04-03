import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@br/features/home/home.routes').then((m) => m.homeRoutes),
  },
];
