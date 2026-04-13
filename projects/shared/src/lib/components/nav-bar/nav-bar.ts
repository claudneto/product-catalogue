import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

type NavBarMenuItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};

type NavBarSocialLink = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly path: string;
};

@Component({
  selector: 'shared-nav-bar',
  imports: [MatButtonModule, MatToolbarModule],
  standalone: true,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {
  protected readonly menuItems: readonly NavBarMenuItem[] = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'products', label: 'Produtos', href: '#' },
    { id: 'about', label: 'Sobre', href: '#' },
    { id: 'contact', label: 'Contato', href: '#' },
  ];

  protected readonly socialLinks: readonly NavBarSocialLink[] = [
    {
      id: 'instagram',
      label: 'Instagram',
      href: 'https://instagram.com',
      path: 'M7 2.5A4.5 4.5 0 0 0 2.5 7v10A4.5 4.5 0 0 0 7 21.5h10a4.5 4.5 0 0 0 4.5-4.5V7A4.5 4.5 0 0 0 17 2.5zm0 1.5h10A3 3 0 0 1 20 7v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3m11 1.25a1.25 1.25 0 1 0 0 2.5a1.25 1.25 0 0 0 0-2.5M12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 1.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      path: 'M5.75 8.25H2.5v11.25h3.25zm.25-3.5A1.88 1.88 0 1 0 2.25 4.75a1.88 1.88 0 0 0 3.75 0M21.5 13c0-3.36-1.8-4.93-4.2-4.93c-1.93 0-2.8 1.06-3.28 1.8V8.25h-3.25V19.5h3.25v-5.9c0-1.55.3-3.05 2.22-3.05c1.9 0 1.93 1.78 1.93 3.15v5.8h3.28z',
    },
    {
      id: 'youtube',
      label: 'YouTube',
      href: 'https://youtube.com',
      path: 'M21.8 8.2a3.64 3.64 0 0 0-2.56-2.57C16.98 5 12 5 12 5s-4.98 0-7.24.63A3.64 3.64 0 0 0 2.2 8.2A38.7 38.7 0 0 0 2 12a38.7 38.7 0 0 0 .2 3.8a3.64 3.64 0 0 0 2.56 2.57C7.02 19 12 19 12 19s4.98 0 7.24-.63a3.64 3.64 0 0 0 2.56-2.57c.14-1.25.2-2.52.2-3.8s-.06-2.55-.2-3.8M10 15.5v-7l6 3.5z',
    },
  ];
}
