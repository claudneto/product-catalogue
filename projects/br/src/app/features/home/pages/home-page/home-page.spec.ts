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

    expect(title?.textContent?.trim()).toBe('Catálogo de Produtos');
  });

  it('should render the main hero content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');
    const subheading = compiled.querySelector('h2 strong');
    const paragraphs = Array.from(compiled.querySelectorAll('[mainContent] p'));

    expect(heading?.textContent?.trim()).toBe('Portfólio de Produtos');
    expect(subheading?.textContent).toContain('Pioneirismo e filosofia inovadora.');
    expect(paragraphs).toHaveLength(3);
    expect(paragraphs.at(0)?.textContent).toContain('Nestlé Health Science');
    expect(paragraphs.at(2)?.textContent).toContain('Conteúdo disponível sem acesso a internet');
  });

  it('should render all navigation buttons for the catalog entry points', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('[buttonsContent] a'));

    expect(buttons.map((button) => button.textContent?.trim())).toEqual([
      'Condição Clínica',
      'Marca',
      'Produtos',
      'Referência Bibliográfica',
    ]);
    expect(buttons.map((button) => button.getAttribute('href'))).toEqual([
      '/',
      '/',
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
