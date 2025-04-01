import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '../../services/translate/language.service';
import { HttpClient } from '@angular/common/http';
import { ContactTranslateService } from './contact-translate.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactForm: FormGroup;
  lang: 'it' | 'en' = 'it';

  showToast = false;
  toastColor = 'success';
  toastMessage = '';

  constructor(
    private meta: Meta,
    private title: Title,
    private langSvc: LanguageService,
    private http: HttpClient,
    private contactTranslateSvc: ContactTranslateService,
    private fb: FormBuilder
  ) {
    this.meta.removeTag('name="robots"');
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://marco-cipolletta-portfolio.onrender.com/contact',
    });
    this.langSvc.lang$.subscribe((lang) => {
      this.lang = lang;
      this.title.setTitle(
        `Marco Cipolletta - ${lang === 'it' ? 'Contatti' : 'Contacts'}`
      );
    });
    this.contactTranslateSvc.loadTranslations();
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      // TODO: aggiungere lunghezza minima
    });
  }

  isInvalidTouched(fieldName: string) {
    return (
      this.contactForm.get(fieldName)?.invalid &&
      this.contactForm.get(fieldName)?.touched
    );
  }

  getError(fieldName: string) {
    const control = this.contactForm.get(fieldName);
    if (control?.errors!['required']) {
      return this.lang === 'it' ? 'Campo obbligatorio' : 'Required field';
    } else if (control?.errors!['email']) {
      return this.lang === 'it' ? 'Email non valida' : 'Invalid email';
    }

    return null;
  }

  invia() {
    if (this.contactForm.valid) {
      this.http
        .post('/api/' + this.lang + '/contact', this.contactForm.value)
        .subscribe({
          next: () => {
            this.toastColor = 'success';

            this.showMessageToast(
              this.lang === 'it'
                ? 'Messaggio inviato con successo'
                : 'Message sent successfully'
            );
            this.contactForm.reset();
          },
          error: () => {
            this.toastColor = 'error';
            this.showMessageToast(
              this.lang === 'it'
                ? 'Si è verificato un errore'
                : 'An error occurred'
            );
          },
        });
    } else {
      this.toastColor = 'error';
      this.showMessageToast(
        this.lang === 'it' ? 'Form non valido' : 'Invalid form'
      );
    }
  }

  showMessageToast(message: string, duration: number = 3000): void {
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, duration);
  }

  hideToast(): void {
    this.showToast = false;
  }
}
