import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language = 'it';
  lang$ = new BehaviorSubject('it');

  constructor(private translate: TranslateService) {
    const browserLang = this.translate.getBrowserLang();
    this.language = browserLang === 'it' ? 'it' : 'en';
    this.setLanguage(this.language);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    this.lang$.next(lang);
  }

  toggleLanguage() {
    this.language = this.language === 'it' ? 'en' : 'it';
    this.setLanguage(this.language);
  }
}
