import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-home',
  imports: [],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
