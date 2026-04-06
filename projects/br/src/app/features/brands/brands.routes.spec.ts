import { BrandsPage } from '@br/features/brands/pages/brands-page/brands-page';
import { routes } from '@br/features/brands/brands.routes';

describe('brandsRoutes', () => {
  it('should expose the brands page as the default feature route', () => {
    expect(routes).toEqual([
      {
        path: '',
        component: BrandsPage,
      },
    ]);
  });
});
