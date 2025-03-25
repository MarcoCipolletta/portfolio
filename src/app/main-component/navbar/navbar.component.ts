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
  lang: string = '';

  ngAfterViewInit(): void {
    if (this.browser.isBrowser() && this.navRef) {
      let navbarHeight = this.navRef.nativeElement.offsetHeight;
      document.documentElement.style.setProperty(
        '--navbar-height',
        `calc( 100dvh - ${navbarHeight}px)`
      );
    }
  }

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
