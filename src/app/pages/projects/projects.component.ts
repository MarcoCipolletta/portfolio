import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '../../services/translate/language.service';
import { ProjectsTranslateService } from './projects-translate.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  constructor(
    private meta: Meta,
    private title: Title,
    private langSvc: LanguageService,
    private projectTranslateSvc: ProjectsTranslateService
  ) {
    this.meta.removeTag('name="robots"');
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://marco-cipolletta-portfolio.onrender.com/projects',
    });
    this.langSvc.lang$.subscribe((lang) => {
      this.title.setTitle(
        `Marco Cipolletta - ${lang === 'it' ? 'Progetti' : 'Projects'}`
      );
    });
    this.projectTranslateSvc.loadTranslations();
  }

  expandedStates: boolean[] = [];

  ngOnInit() {
    const projectList = this.projectTranslateSvc.instant();
    this.expandedStates = new Array(projectList.length).fill(false);
  }
}
