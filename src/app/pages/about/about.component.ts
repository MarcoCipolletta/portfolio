import { Component } from '@angular/core';
import { AboutTranslateService } from './about-translate.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  constructor(private aboutTranslateSvc: AboutTranslateService) {
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
        logo: 'javaScript.svg',
        name: 'JavaScript',
      },
      {
        logo: 'typeScript.svg',
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
    ],
  };
}
