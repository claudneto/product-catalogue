import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'shared-title-bar',
  imports: [MatButtonModule, MatIconModule, MatToolbar],
  templateUrl: './title-bar.html',
  styleUrl: './title-bar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleBar {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly currentPath = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      startWith(null),
      map(() => this.getCurrentPath()),
    ),
    { initialValue: this.getCurrentPath() },
  );

  protected readonly showBackButton = computed(() => this.currentPath() !== '/');
  readonly title = input.required<string>();

  protected navigateBack(): void {
    this.location.back();
  }

  private getCurrentPath(): string {
    const [path] = this.router.url.split(/[?#]/, 1);
    return path || '/';
  }
}
