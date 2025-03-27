import { Component } from '@angular/core';
import { ToggleDarkService } from '../../services/toggle-dark.service';
import { LanguageService } from '../../services/translate/language.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private toggleDarkSvc: ToggleDarkService,
    private langSvc: LanguageService,
    private meta: Meta,
    private title: Title
  ) {
    this.meta.removeTag('name="robots"');
    this.title.setTitle('Marco Cipolletta - Home');
    this.langSvc.lang$.subscribe((lang) => {
      this.lang = lang;
    });
  }

  lang!: 'it' | 'en';
  toggleTheme() {
    this.toggleDarkSvc.toggleTheme();
  }
}
