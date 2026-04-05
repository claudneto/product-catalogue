import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Brand } from 'shared';
import { BrandStorage } from 'shared';
import { BrandCard } from 'shared';
import { TitleBar } from 'shared';

@Component({
  selector: 'app-brand-page',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule, BrandCard, TitleBar],
  templateUrl: './brands-page.html',
  styleUrl: './brands-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsPage implements OnInit {
  private readonly brandStorage = inject(BrandStorage);

  protected readonly brands = signal<Brand[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal(false);

  public title: string = 'Marcas';

  public ngOnInit(): void {
    void this.loadBrands();
  }

  protected async reload(): Promise<void> {
    await this.loadBrands();
  }

  private async loadBrands(): Promise<void> {
    this.loading.set(true);
    this.error.set(false);

    try {
      const brands = await this.brandStorage.getAll();

      const sortedBrands = [...brands].sort((a, b) =>
        a.title.localeCompare(b.title, 'pt-BR', { sensitivity: 'base' }),
      );

      this.brands.set(sortedBrands);
    } catch (error) {
      console.error('Failed to load brands from storage', error);
      this.error.set(true);
      this.brands.set([]);
    } finally {
      this.loading.set(false);
    }
  }
}
