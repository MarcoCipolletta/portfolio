import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToggleDarkService } from '../../services/toggle-dark.service';
import { LanguageService } from '../../services/translate/language.service';
import { BrowserService } from '../../services/borwser.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChild('navbarRef', { static: false }) navRef!: ElementRef;
  constructor(
    private toggleDarkSvc: ToggleDarkService,
    private languageSvc: LanguageService,
    private browser: BrowserService
  ) {
    this.languageSvc.lang$.subscribe((lang) => (this.lang = lang));
  }
  open: boolean = false;
  lang!: 'it' | 'en';

  ngAfterViewInit(): void {
    if (this.browser.isBrowser() && this.navRef) {
      const navbarHeight = this.navRef.nativeElement.offsetHeight;
      const documentRef = this.browser.document;

      if (documentRef) {
        documentRef.documentElement.style.setProperty(
          '--navbar-height',
          `calc( 100dvh - ${navbarHeight}px)`
        );
      }
    }
  }

  toggleSidebar() {
    this.open = !this.open;
  }

  closeSidebar() {
    this.open = false;
  }

  setLang(lang: 'it' | 'en') {
    this.languageSvc.setLanguage(lang);
    this.closeSidebar();
  }

  toggleTheme() {
    this.toggleDarkSvc.toggleTheme();
    this.closeSidebar();
  }
}
