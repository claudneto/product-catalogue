import { routes } from './app.routes';

describe('routes', () => {
  it('should lazy load the home feature at the root path', async () => {
    const homeRoute = routes.find((route) => route.path === '');

    expect(homeRoute?.loadChildren).toBeDefined();

    const loadedRoutes = await homeRoute?.loadChildren?.();
    const expectedRoutes = await import('@br/features/home/home.routes').then((m) => m.homeRoutes);

    expect(loadedRoutes).toEqual(expectedRoutes);
  });

  it('should lazy load the brands feature at the brands path', async () => {
    const brandsRoute = routes.find((route) => route.path === 'brands');

    expect(brandsRoute?.loadChildren).toBeDefined();

    const loadedRoutes = await brandsRoute?.loadChildren?.();
    const expectedRoutes = await import('@br/features/brands/brands.routes').then(
      (m) => m.brandsRoutes,
    );

    expect(loadedRoutes).toEqual(expectedRoutes);
  });
});
