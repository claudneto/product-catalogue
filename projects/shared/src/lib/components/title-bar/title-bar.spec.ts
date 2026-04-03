import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';

import { TitleBar } from './title-bar';

@Component({
  standalone: true,
  selector: 'shared-home-page-stub',
  template: '',
})
class HomePageStub {}

@Component({
  standalone: true,
  selector: 'shared-details-page-stub',
  template: '',
})
class DetailsPageStub {}

@Component({
  standalone: true,
  imports: [TitleBar],
  template: `<shared-title-bar [title]="title"></shared-title-bar>`,
})
class HostComponent {
  protected readonly title = 'Catalogo de Produtos';
}

describe('TitleBar', () => {
  let fixture: ComponentFixture<HostComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideLocationMocks(),
        provideRouter([
          { path: '', component: HomePageStub },
          { path: 'produtos', component: DetailsPageStub },
        ]),
      ],
    }).compileComponents();

    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    vi.spyOn(location, 'back').mockImplementation(() => undefined);
  });

  it('should create', () => {
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the provided title centered inside the toolbar', async () => {
    await router.navigateByUrl('/');

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.title-bar__title');

    expect(title?.textContent?.trim()).toBe('Catalogo de Produtos');
    expect(compiled.querySelector('.title-bar__back-button')).toBeNull();
    expect(compiled.querySelectorAll('.title-bar__placeholder')).toHaveLength(2);
  });

  it('should render the back button outside the home route', async () => {
    await router.navigateByUrl('/produtos');

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const backButton = compiled.querySelector<HTMLButtonElement>('.title-bar__back-button');

    expect(backButton).not.toBeNull();
    expect(backButton?.getAttribute('aria-label')).toBe('Voltar para a página anterior');
    expect(backButton?.querySelector('mat-icon')?.textContent?.trim()).toBe('chevron_left');
  });

  it('should keep the back button visible for child routes with query params', async () => {
    await router.navigateByUrl('/produtos?categoria=oral');

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.title-bar__back-button')).not.toBeNull();
  });

  it('should go back when the back button is clicked', async () => {
    await router.navigateByUrl('/produtos');

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const backButton = compiled.querySelector<HTMLButtonElement>('.title-bar__back-button');

    backButton?.click();

    expect(location.back).toHaveBeenCalledTimes(1);
  });
});
