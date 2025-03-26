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
        logo: 'Html.svg',
        name: 'HTML5',
      },
      {
        logo: 'Css.svg',
        name: 'Css3',
      },
      {
        logo: 'Sass.svg',
        name: 'Sass/Scss',
      },
      {
        logo: 'JavaScript.svg',
        name: 'JavaScript',
      },
      {
        logo: 'TypeScript.svg',
        name: 'TypeScript',
      },
      {
        logo: 'Angular.svg',
        name: 'Angular',
      },
      {
        logo: 'Bootstrap.svg',
        name: 'Bootstrap',
      },
      {
        logo: 'Tailwind.svg',
        name: 'Tailwind',
      },
    ],
    back: [
      {
        logo: 'Java.svg',
        name: 'Java',
      },
      {
        logo: 'Spring.svg',
        name: 'Spring',
      },
      {
        logo: 'Postgresql.svg',
        name: 'PostgreSQL',
      },
    ],
    other: [
      {
        logo: 'Firebase.svg',
        name: 'Firebase',
      },
      {
        logo: 'Github.svg',
        name: 'Github',
      },
    ],
  };
}
