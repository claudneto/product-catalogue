import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from '@shared/components/footer/footer';

@Component({
  standalone: true,
  imports: [Footer],
  template: `
    <shared-footer>
      <img footerLogo src="/logo-footer.svg" alt="Nestle Saude" />
    </shared-footer>
  `,
})
class HostComponent {}

describe('Footer', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should render the projected logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('img[footerLogo]');

    expect(logo).not.toBeNull();
    expect(logo?.getAttribute('src')).toBe('/logo-footer.svg');
    expect(logo?.getAttribute('alt')).toBe('Nestle Saude');
  });

  it('should render the institutional links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('.footer__link'));

    expect(links).toHaveLength(3);
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Privacidade',
      'Termos de uso',
      'Fale conosco',
    ]);
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['#', '#', '#']);
  });

  it('should render the footer description and current year', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const description = compiled.querySelector('.footer__description');
    const meta = compiled.querySelector('.footer__meta');

    expect(description?.textContent).toContain('Solucoes em nutricao e cuidado');
    expect(meta?.textContent).toContain(new Date().getFullYear().toString());
    expect(meta?.textContent).toContain('Nestle Saude');
  });

  it('should expose footer landmarks for accessibility', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('footer');
    const nav = compiled.querySelector('.footer__nav');

    expect(footer?.getAttribute('aria-label')).toBe('Rodape institucional');
    expect(nav?.getAttribute('aria-label')).toBe('Links institucionais');
  });
});
