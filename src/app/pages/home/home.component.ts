import { Component } from '@angular/core';
import { ToggleDarkService } from '../../services/toggle-dark.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private toggleDarkSvc: ToggleDarkService) {}

  toggleTheme() {
    this.toggleDarkSvc.toggleTheme();
  }
}
