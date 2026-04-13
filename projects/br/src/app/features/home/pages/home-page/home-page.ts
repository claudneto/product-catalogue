import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleBar, Home } from 'shared';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  imports: [TitleBar, Home, MatButton, RouterLink],
  standalone: true,
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  public title: string = 'Catálogo de Produtos';
}
