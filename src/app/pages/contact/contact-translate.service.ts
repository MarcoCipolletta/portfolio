import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactTranslateService {
  private langChangeSubscription: Subscription;

  constructor(private translate: TranslateService, private http: HttpClient) {
    // Sottoscrizione al cambio di lingua
    this.langChangeSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.loadTranslationsForLang(event.lang);
      }
    );
  }

  loadTranslations() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    this.loadTranslationsForLang(lang);
  }

  private loadTranslationsForLang(lang: string) {
    this.http
      .get(`./i18n/contact/${lang}.json`)
      .subscribe((translations: any) => {
        this.translate.setTranslation(lang, translations, true);
      });
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }
}
