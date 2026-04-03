import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer, NavBar } from 'shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NavBar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Nestl\u00e9 Sa\u00fade');
}
