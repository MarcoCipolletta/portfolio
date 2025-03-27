import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '../../services/translate/language.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor(
    private meta: Meta,
    private title: Title,
    private langSvc: LanguageService
  ) {
    this.meta.removeTag('name="robots"');
    this.langSvc.lang$.subscribe((lang) => {
      this.title.setTitle(
        `Marco Cipolletta - ${lang === 'it' ? 'Contatti' : 'Contacts'}`
      );
    });
  }
}
