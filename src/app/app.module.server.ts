import { NgModule, Optional, Inject } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: 'APP_LANGUAGE',
      useFactory: (req: Request | null) => {
        const lang = req?.headers['accept-language']?.split(',')[0] ?? 'it';
        return lang.startsWith('it') ? 'it' : 'en';
      },
      deps: [[new Optional(), new Inject(REQUEST)]],
    },
  ],
})
export class AppServerModule {}
