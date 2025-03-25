import { Component } from '@angular/core';
import { ToggleDarkService } from '../../services/toggle-dark.service';
import { LanguageService } from '../../services/translate/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private toggleDarkSvc: ToggleDarkService,
    private langSvc: LanguageService
  ) {
    this.langSvc.lang$.subscribe((lang) => (this.lang = lang));
  }

  lang!: 'it' | 'en';
  toggleTheme() {
    this.toggleDarkSvc.toggleTheme();
  }
}
