import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { BrandStorage } from 'shared';

import { BrandsPage } from '@br/features/brands/pages/brands-page/brands-page';

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

describe('BrandsPage', () => {
  let component: BrandsPage;
  let fixture: ComponentFixture<BrandsPage>;
  let brandStorage: { getAll: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    brandStorage = {
      getAll: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [BrandsPage],
      providers: [
        {
          provide: BrandStorage,
          useValue: brandStorage,
        },
      ],
    }).compileComponents();
  });

  async function createComponent() {
    fixture = TestBed.createComponent(BrandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('should create', async () => {
    brandStorage.getAll.mockResolvedValue([]);

    await createComponent();

    expect(component).toBeTruthy();
  });

  it('should load brands ordered by title with pt-BR collation', async () => {
    const brands = [
      {
        tid: 3,
        title: 'Zinco',
        description: null,
        brandUrl: null,
        brandTarget: null,
        logo: '/zinco.svg',
        logoAlt: 'Zinco',
        updatedAt: new Date('2026-04-06T12:00:00.000Z'),
      },
      {
        tid: 1,
        title: 'Ácido',
        description: null,
        brandUrl: null,
        brandTarget: null,
        logo: '/acido.svg',
        logoAlt: 'Ácido',
        updatedAt: new Date('2026-04-06T12:00:00.000Z'),
      },
      {
        tid: 2,
        title: 'beta',
        description: null,
        brandUrl: null,
        brandTarget: null,
        logo: '/beta.svg',
        logoAlt: 'Beta',
        updatedAt: new Date('2026-04-06T12:00:00.000Z'),
      },
    ];
    const expectedOrder = [...brands]
      .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' }))
      .map((brand) => brand.title);

    brandStorage.getAll.mockResolvedValue(brands);

    await createComponent();

    const cards = Array.from(fixture.nativeElement.querySelectorAll('lib-brand-card'));

    expect(brandStorage.getAll).toHaveBeenCalledTimes(1);
    expect(component['loading']()).toBe(false);
    expect(component['error']()).toBe(false);
    expect(component['brands']().map((brand) => brand.title)).toEqual(expectedOrder);
    expect(cards).toHaveLength(3);
  });

  it('should show the loading state while the storage request is pending', () => {
    const deferred = createDeferred<[]>();
    brandStorage.getAll.mockReturnValue(deferred.promise);

    fixture = TestBed.createComponent(BrandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(component['loading']()).toBe(true);
    expect(compiled.querySelector('mat-spinner')).not.toBeNull();
    expect(compiled.textContent).toContain('Carregando marcas');
  });

  it('should show the empty state when no brands are stored', async () => {
    brandStorage.getAll.mockResolvedValue([]);

    await createComponent();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Nenhuma marca encontrada.');
    expect(compiled.querySelector('lib-brand-card')).toBeNull();
  });

  it('should show the error state and retry loading when requested', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    brandStorage.getAll
      .mockRejectedValueOnce(new Error('storage unavailable'))
      .mockResolvedValueOnce([
        {
          tid: 9,
          title: 'Reviva',
          description: 'Linha recuperada',
          brandUrl: 'https://example.com/reviva',
          brandTarget: '_blank',
          logo: '/reviva.svg',
          logoAlt: 'Reviva',
          updatedAt: new Date('2026-04-06T12:00:00.000Z'),
        },
      ]);

    await createComponent();

    let compiled = fixture.nativeElement as HTMLElement;
    let retryButton = compiled.querySelector<HTMLButtonElement>('button');
    const errorMessage = compiled.querySelector('.brand-page__state p');

    expect(component['error']()).toBe(true);
    expect(errorMessage?.textContent).toContain('carregar as marcas');
    expect(retryButton?.textContent).toContain('Tentar novamente');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to load brands from storage',
      expect.any(Error),
    );

    retryButton?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    compiled = fixture.nativeElement as HTMLElement;

    expect(brandStorage.getAll).toHaveBeenCalledTimes(2);
    expect(component['error']()).toBe(false);
    expect(component['loading']()).toBe(false);
    expect(component['brands']()).toHaveLength(1);
    expect(compiled.querySelector('lib-brand-card')).not.toBeNull();
  });
});

