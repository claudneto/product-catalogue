import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBar } from './nav-bar';

@Component({
  standalone: true,
  imports: [NavBar],
  template: `
    <shared-nav-bar>
      <a navBarLogo href="/inicio" aria-label="Pagina inicial">
        <img src="/logo-header.svg" alt="Nestle Saude" />
      </a>
    </shared-nav-bar>
  `,
})
class HostComponent {}

describe('NavBar', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the projected logo content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logoLink = compiled.querySelector<HTMLAnchorElement>('[navBarLogo]');
    const logoImage = compiled.querySelector<HTMLImageElement>('[navBarLogo] img');

    expect(logoLink?.getAttribute('href')).toBe('/inicio');
    expect(logoLink?.getAttribute('aria-label')).toBe('Pagina inicial');
    expect(logoImage?.getAttribute('src')).toBe('/logo-header.svg');
    expect(logoImage?.getAttribute('alt')).toBe('Nestle Saude');
  });

  it('should render all menu items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(compiled.querySelectorAll<HTMLAnchorElement>('.nav-bar__menu a'));

    expect(links).toHaveLength(4);
    expect(links.map((link) => link.textContent?.trim())).toEqual([
      'Home',
      'Produtos',
      'Sobre',
      'Contato',
    ]);
    expect(links.map((link) => link.getAttribute('href'))).toEqual(['#', '#', '#', '#']);
  });

  it('should render the social links with accessible labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = Array.from(
      compiled.querySelectorAll<HTMLAnchorElement>('.nav-bar__social-link'),
    );

    expect(links).toHaveLength(3);
    expect(links.map((link) => link.getAttribute('aria-label'))).toEqual([
      'Instagram',
      'LinkedIn',
      'YouTube',
    ]);
    expect(links.map((link) => link.getAttribute('target'))).toEqual([
      '_blank',
      '_blank',
      '_blank',
    ]);
    expect(links.map((link) => link.getAttribute('rel'))).toEqual([
      'noreferrer',
      'noreferrer',
      'noreferrer',
    ]);
  });

  it('should render navigation landmarks for the menu and social links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const toolbar = compiled.querySelector('mat-toolbar');
    const menu = compiled.querySelector('.nav-bar__menu');
    const social = compiled.querySelector('.nav-bar__social');

    expect(toolbar?.getAttribute('aria-label')).toBe('Navegacao principal');
    expect(menu?.getAttribute('aria-label')).toBe('Menu principal');
    expect(social?.getAttribute('aria-label')).toBe('Redes sociais');
  });
});
