import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  language: 'it' | 'en' = 'it';
  lang$ = new BehaviorSubject<'it' | 'en'>('it');

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject('APP_LANGUAGE') private serverLang?: 'it' | 'en'
  ) {
    let lang: 'it' | 'en' = 'it';

    // ✅ Se siamo su SSR, usa la lingua iniettata da Angular Universal
    if (isPlatformServer(this.platformId) && this.serverLang) {
      lang = this.serverLang;
    }

    // ✅ Se siamo nel browser, usa la lingua del browser
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = this.translate.getBrowserLang();
      lang = browserLang === 'it' ? 'it' : 'en';
    }

    this.language = lang;
    this.setLanguage(lang);
  }

  setLanguage(lang: 'it' | 'en') {
    this.translate.use(lang);
    this.lang$.next(lang);
  }

  toggleLanguage() {
    this.language = this.language === 'it' ? 'en' : 'it';
    this.setLanguage(this.language);
  }
}
