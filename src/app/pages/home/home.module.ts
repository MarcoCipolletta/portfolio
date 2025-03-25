import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ProfileImgComponent } from './profile-img/profile-img.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [HomeComponent, ProfileImgComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule.forChild(),
    NgIconsModule,
  ],
})
export class HomeModule {}
