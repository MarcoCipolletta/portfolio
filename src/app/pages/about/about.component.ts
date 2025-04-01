import { Component } from '@angular/core';
import { AboutTranslateService } from './about-translate.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  constructor(
    private aboutTranslateSvc: AboutTranslateService,
    private meta: Meta
  ) {
    this.meta.removeTag('name="robots"');
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://marco-cipolletta-portfolio.onrender.com/about',
    });
    this.aboutTranslateSvc.loadTranslations();
  }

  select: 'front' | 'back' | 'other' = 'front';

  techs = {
    front: [
      {
        logo: 'html.svg',
        name: 'HTML5',
      },
      {
        logo: 'css.svg',
        name: 'Css3',
      },
      {
        logo: 'sass.svg',
        name: 'Sass/Scss',
      },
      {
        logo: 'javascript.svg',
        name: 'JavaScript',
      },
      {
        logo: 'typescript.svg',
        name: 'TypeScript',
      },
      {
        logo: 'angular.svg',
        name: 'Angular',
      },
      {
        logo: 'bootstrap.svg',
        name: 'Bootstrap',
      },
      {
        logo: 'tailwind.svg',
        name: 'Tailwind',
      },
    ],
    back: [
      {
        logo: 'java.svg',
        name: 'Java',
      },
      {
        logo: 'spring.svg',
        name: 'Spring',
      },
      {
        logo: 'postgresql.svg',
        name: 'PostgreSQL',
      },
    ],
    other: [
      {
        logo: 'firebase.svg',
        name: 'Firebase',
      },
      {
        logo: 'github.svg',
        name: 'Github',
      },
      {
        logo: 'emailjs.svg',
        name: 'Email.JS',
      },
    ],
  };
}
