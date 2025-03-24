import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleDarkService {
  private theme: 'light' | 'dark' = 'light';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      console.log(platformId);
      const storage = localStorage.getItem('theme');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.theme =
        storage === 'dark' || (!storage && prefersDark) ? 'dark' : 'light';
      this.applyTheme();
    }
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
  }

  private applyTheme() {
    if (!isPlatformBrowser(this.platformId)) return;

    const body = document.body;
    if (this.theme === 'dark') {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
