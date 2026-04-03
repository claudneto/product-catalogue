import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
