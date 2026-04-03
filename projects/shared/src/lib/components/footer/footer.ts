import { ChangeDetectionStrategy, Component } from '@angular/core';

type FooterLink = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};

@Component({
  selector: 'shared-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly footerLinks: readonly FooterLink[] = [
    { id: 'privacy', label: 'Privacidade', href: '#' },
    { id: 'terms', label: 'Termos de uso', href: '#' },
    { id: 'contact', label: 'Fale conosco', href: '#' },
  ];
}
