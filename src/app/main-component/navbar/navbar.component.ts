import { Component } from '@angular/core';
import { ToggleDarkService } from '../../services/toggle-dark.service';
import { LanguageService } from '../../services/translate/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private toggleDarkSvc: ToggleDarkService,
    private languageSvc: LanguageService
  ) {
    this.languageSvc.lang$.subscribe((lang) => (this.lang = lang));
  }
  open: boolean = false;
  lang: string = '';

  toggleSidebar() {
    this.open = !this.open;
  }

  setLang(lang: string) {
    this.languageSvc.setLanguage(lang);
  }

  toggleTheme() {
    this.toggleDarkSvc.toggleTheme();
  }
}
