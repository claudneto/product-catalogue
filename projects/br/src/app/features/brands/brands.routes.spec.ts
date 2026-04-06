import { BrandsPage } from './pages/brands-page/brands-page';
import { brandsRoutes } from './brands.routes';

describe('brandsRoutes', () => {
  it('should expose the brands page as the default feature route', () => {
    expect(brandsRoutes).toEqual([
      {
        path: '',
        component: BrandsPage,
      },
    ]);
  });
});
