import { HomePage } from '@br/features/home/pages/home-page/home-page';
import { routes } from '@br/features/home/home.routes';

describe('homeRoutes', () => {
  it('should expose the home page as the default feature route', () => {
    expect(routes).toEqual([
      {
        path: '',
        component: HomePage,
      },
    ]);
  });
});
