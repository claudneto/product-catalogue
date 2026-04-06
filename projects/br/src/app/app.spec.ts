import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from '@br/app/app';
import { routes } from '@br/app/app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render the shared navigation shell with the projected logo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const navBar = compiled.querySelector('shared-nav-bar');
    const logoLink = compiled.querySelector<HTMLAnchorElement>('a[navBarLogo]');
    const logoImage = compiled.querySelector<HTMLImageElement>('a[navBarLogo] img');

    expect(navBar).not.toBeNull();
    expect(logoLink?.getAttribute('aria-label')).toBe('Ir para a página inicial');
    expect(logoImage?.getAttribute('src')).toBe('/logo-header.svg');
    expect(logoImage?.getAttribute('alt')).toBe('Nestlé Saúde');
  });

  it('should render the router outlet host', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should wrap the routed content area in the main app container', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const content = compiled.querySelector('main.app-content');

    expect(content).not.toBeNull();
    expect(content?.querySelector('router-outlet')).not.toBeNull();
  });

  it('should render the shared footer with the footer logo', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('shared-footer')).not.toBeNull();
    expect(compiled.querySelector('img[footerLogo]')?.getAttribute('src')).toBe(
      '/logo-footer.svg',
    );
    expect(compiled.querySelector('img[footerLogo]')?.getAttribute('alt')).toBe('Nestlé Saúde');
  });
});
