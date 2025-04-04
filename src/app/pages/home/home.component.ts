import { Component, OnInit } from '@angular/core';
import { ToggleDarkService } from '../../services/toggle-dark.service';
import { LanguageService } from '../../services/translate/language.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private toggleDarkSvc: ToggleDarkService,
    private langSvc: LanguageService,
    private meta: Meta,
    private title: Title
  ) {}
  ngOnInit(): void {
    this.langSvc.lang$.subscribe((lang) => {
      this.lang = lang;
      this.title.setTitle('Marco Cipolletta - Home');
      this.meta.removeTag('name="robots"');
      this.meta.updateTag({
        name: 'description',
        content:
          lang === 'it'
            ? 'Portfolio di Marco Cipolletta, sviluppatore full stack con focus su Angular e Java Spring. Scopri progetti moderni, performanti e responsive.'
            : 'Portfolio of Marco Cipolletta, full stack developer with focus on Angular and Java Spring. Discover modern, performant and responsive projects.',
      });
      this.meta.updateTag({
        name: 'keywords',
        content:
          'Marco Cipolletta, Full Stack Developer, Angular, Java Spring, Web Developer, Portfolio, Progetti Web, Frontend, Backend',
      });
      this.meta.updateTag({ name: 'author', content: 'Marco Cipolletta' });
      this.meta.updateTag({
        property: 'og:title',
        content: 'Marco Cipolletta',
      });
      this.meta.updateTag({
        property: 'og:description',
        content:
          lang === 'it'
            ? 'Portfolio di Marco Cipolletta, sviluppatore full stack con focus su Angular e Java Spring. Scopri progetti moderni, performanti e responsive.'
            : 'Portfolio of Marco Cipolletta, full stack developer with focus on Angular and Java Spring. Discover modern, performant and responsive projects.',
      });
      this.meta.updateTag({
        property: 'og:image',
        content: 'https://marco-cipolletta-portfolio.onrender.com/cipo.png',
      });
      this.meta.updateTag({
        property: 'og:url',
        content: 'https://marco-cipolletta-portfolio.onrender.com',
      });
    });
  }

  lang!: 'it' | 'en';
  toggleTheme() {
    this.toggleDarkSvc.toggleTheme();
  }
}
