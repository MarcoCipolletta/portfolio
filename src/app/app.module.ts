import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { NgIconsModule } from '@ng-icons/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './main-component/navbar/navbar.component';
import {
  iconoirMenu,
  iconoirSunLight,
  iconoirHalfMoon,
  iconoirDownload,
  iconoirXmark,
  iconoirLinkedin,
  iconoirGithub,
} from '@ng-icons/iconoir';
import { SidebarComponent } from './main-component/sidebar/sidebar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './services/translate/HttpLoaderFactory';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NavbarComponent, SidebarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgIconsModule.withIcons({
      iconoirMenu,
      iconoirSunLight,
      iconoirHalfMoon,
      iconoirDownload,
      iconoirXmark,
      iconoirLinkedin,
      iconoirGithub,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'it', // Imposta la lingua di default
    }),
  ],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
