import { ProductDetailsPage } from '@br/features/products/pages/products-details-page/products-details-page';
import { ProductSearchPage } from '@br/features/products/pages/products-search-page/products-search-page';
import { routes } from '@br/features/products/products.routes';

describe('homeRoutes', () => {
  it('should expose the home page as the default feature route', () => {
    expect(routes).toEqual([
      {
        path: '',
        component: ProductSearchPage,
      },
      {
        path: ':slug',
        component: ProductDetailsPage,
      },
    ]);
  });
});
