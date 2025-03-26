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
}
