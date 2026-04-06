import { HomePage } from './pages/home-page/home-page';
import { homeRoutes } from './home.routes';

describe('homeRoutes', () => {
  it('should expose the home page as the default feature route', () => {
    expect(homeRoutes).toEqual([
      {
        path: '',
        component: HomePage,
      },
    ]);
  });
});
