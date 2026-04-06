import { ProductDetailsPage } from './pages/products-details-page/products-details-page';
import { ProductSearchPage } from './pages/products-search-page/products-search-page';
import { routes } from './products.routes';

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
