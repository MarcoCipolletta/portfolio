import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '../../services/translate/language.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  constructor(
    private meta: Meta,
    private title: Title,
    private langSvc: LanguageService
  ) {
    this.meta.removeTag('name="robots"');
    this.langSvc.lang$.subscribe((lang) => {
      this.title.setTitle(
        `Marco Cipolletta - ${lang === 'it' ? 'Progetti' : 'Projects'}`
      );
    });
  }
}
