import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

@Component({
  standalone: true,
  imports: [Home],
  template: `
    <shared-home>
      <div mainContent>Conteudo principal</div>
      <button buttonsContent type="button">Saiba mais</button>
    </shared-home>
  `,
})
class HostComponent {}

describe('Home', () => {
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

  it('should project the main content slot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section');
    const mainContent = compiled.querySelector('[mainContent]');

    expect(section).not.toBeNull();
    expect(mainContent?.textContent?.trim()).toBe('Conteudo principal');
  });

  it('should project the buttons content slot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const action = compiled.querySelector('[buttonsContent]');

    expect(action?.textContent?.trim()).toBe('Saiba mais');
  });

  it('should keep the projected slots in the expected order', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section');

    expect(section?.children.item(0)?.getAttribute('mainContent')).toBe('');
    expect(section?.children.item(1)?.getAttribute('buttonsContent')).toBe('');
  });
});
