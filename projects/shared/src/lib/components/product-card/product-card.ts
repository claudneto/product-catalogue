import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '@shared/models/product';

@Component({
  selector: 'lib-product-card',
  imports: [MatCardModule],
  standalone: true,
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  public readonly product = input.required<Product>();
}
