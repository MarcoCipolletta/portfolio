import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleDarkService {
  constructor() {
    const themeSaved = localStorage.getItem('theme');

    if (
      (themeSaved && themeSaved === 'dark') ||
      (!themeSaved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.theme = 'dark';
      this.setTheme();
    } else {
      this.theme = 'light';
      this.setTheme();
    }
  }

  theme: string;
  setTheme() {
    if (this.theme === 'dark') {
      window.document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      window.document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleTheme() {
    if (this.theme === 'dark') {
      this.theme = 'light';
    } else {
      this.theme = 'dark';
    }
    this.setTheme();
  }
}
