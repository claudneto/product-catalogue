import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ProductCard } from '@shared/components/product-card/product-card';
import { Product } from '@shared/models/product';

@Component({
  selector: 'lib-product-list',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  public readonly products = input.required<Product[]>();
}
