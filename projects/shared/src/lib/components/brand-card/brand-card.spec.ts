import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Brand } from '@shared/models/brand';
import { BrandCard } from '@shared/components/brand-card/brand-card';

@Component({
  standalone: true,
  imports: [BrandCard],
  template: `<lib-brand-card [brand]="brand"></lib-brand-card>`,
})
class HostComponent {
  protected readonly brand: Brand = {
    tid: 7,
    title: 'Solaris',
    description: '<p>Linha premium</p>',
    brandUrl: 'https://example.com/solaris',
    brandTarget: '_blank',
    logo: '/solaris.svg',
    logoAlt: 'Logo Solaris',
    updatedAt: new Date('2026-04-06T12:00:00.000Z'),
  };
}

describe('BrandCard', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should render the brand content passed through the required input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('mat-card-title');
    const image = compiled.querySelector<HTMLImageElement>('img[mat-card-image]');
    const description = compiled.querySelector('.brand-card__meta-item');
    const action = compiled.querySelector<HTMLAnchorElement>('a[mat-stroked-button]');

    expect(title?.textContent?.trim()).toBe('Solaris');
    expect(image?.getAttribute('src')).toBe('/solaris.svg');
    expect(image?.getAttribute('alt')).toBe('Logo Solaris');
    expect(description?.innerHTML).toContain('Linha premium');
    expect(action?.getAttribute('href')).toBe('https://example.com/solaris');
    expect(action?.textContent).toContain('Acessar marca');
  });
});
