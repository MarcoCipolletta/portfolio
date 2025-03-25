import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  get localStorage(): Storage | null {
    return this.isBrowser() ? window.localStorage : null;
  }

  get window(): Window | null {
    return this.isBrowser() ? window : null;
  }

  get document(): Document | null {
    return this.isBrowser() ? document : null;
  }
}
