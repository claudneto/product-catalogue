import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { Brand } from '@shared/models/brand';

@Component({
  selector: 'lib-brand-card',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  standalone: true,
  templateUrl: './brand-card.html',
  styleUrl: './brand-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandCard {
  public readonly brand = input.required<Brand>();
}
