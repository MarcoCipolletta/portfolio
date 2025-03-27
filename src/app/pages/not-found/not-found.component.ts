import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '../../services/translate/language.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(
    private meta: Meta,
    private title: Title,
    private langSvc: LanguageService
  ) {
    this.meta.removeTag('name="robots"');
    this.langSvc.lang$.subscribe((lang) => {
      this.title.setTitle(
        lang === 'it'
          ? 'Errore 404 - Pagina non trovata'
          : 'Error 404 - Page not found'
      );
    });
  }
}
