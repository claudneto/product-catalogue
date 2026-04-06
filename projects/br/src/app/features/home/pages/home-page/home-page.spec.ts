import { provideLocationMocks } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomePage } from './home-page';

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideLocationMocks(), provideRouter([{ path: '', component: HomePage }])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the page title in the shared title bar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.title-bar__title');

    expect(title?.textContent?.trim()).toContain('Produtos');
    expect(title?.textContent?.trim()).toMatch(/^Cat.+ de Produtos$/);
  });

  it('should render the main hero content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    const subheading = compiled.querySelector('h2 strong');
    const paragraphs = Array.from(compiled.querySelectorAll('[mainContent] p'));

    expect(heading?.textContent?.trim()).toContain('Produtos');
    expect(heading?.textContent?.trim()).toMatch(/^Port.+ de Produtos$/);
    expect(subheading?.textContent).toContain('Pioneirismo e filosofia inovadora.');
    expect(paragraphs).toHaveLength(3);
    expect(paragraphs.at(0)?.textContent).toContain('Nestl');
    expect(paragraphs.at(2)?.textContent).toContain('internet');
  });

  it('should render all navigation buttons for the catalog entry points', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('[buttonsContent] a'));
    const labels = buttons.map((button) => button.textContent?.trim() ?? '');

    expect(labels).toHaveLength(4);
    expect(labels[0]).toContain('Cl');
    expect(labels).toContain('Marcas');
    expect(labels).toContain('Produtos');
    expect(labels[3]).toContain('Bibliogr');
    expect(buttons.map((button) => button.getAttribute('href'))).toEqual([
      '/',
      '/brands',
      '/',
      '/',
    ]);
  });

  it('should compose the feature content inside the shared home layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const home = compiled.querySelector('shared-home');

    expect(home).not.toBeNull();
    expect(home?.querySelector('[mainContent]')).not.toBeNull();
    expect(home?.querySelector('[buttonsContent]')).not.toBeNull();
  });
});
