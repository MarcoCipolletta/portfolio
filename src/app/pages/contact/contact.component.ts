import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '../../services/translate/language.service';
import { HttpClient } from '@angular/common/http';
import { ContactTranslateService } from './contact-translate.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor(
    private meta: Meta,
    private title: Title,
    private langSvc: LanguageService,
    private http: HttpClient,
    private contactTranslateSvc: ContactTranslateService
  ) {
    this.meta.removeTag('name="robots"');
    this.langSvc.lang$.subscribe((lang) => {
      this.title.setTitle(
        `Marco Cipolletta - ${lang === 'it' ? 'Contatti' : 'Contacts'}`
      );
    });
    this.contactTranslateSvc.loadTranslations();
  }

  provaIt() {
    this.http
      .post('/api/it/contact', {
        name: 'Marco it',
        email: 'marcocipolletta2@gmail.com',
        message: 'Prova in italianooooo',
      })
      .subscribe({
        next: () => alert('Messaggio inviato!'),
        error: () => alert('Errore durante l’invio. Riprova.'),
      });
  }
  provaEn() {
    this.http
      .post('/api/en/contact', {
        name: 'Marco en',
        email: 'marcocipolletta2@gmail.com',
        message: 'Prova in inglese',
      })
      .subscribe({
        next: () => alert('Messaggio inviato!'),
        error: () => alert('Errore durante l’invio. Riprova.'),
      });
  }
}
