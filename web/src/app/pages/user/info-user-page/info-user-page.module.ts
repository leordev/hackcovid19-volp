import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { CoreModule } from 'src/app/global/core/core.module';
import { MaterialModule } from 'src/app/global/material/material.module';
import { InfoUserPageComponent } from './info-user-page.component';
import { InfoUserPageRoutingModule } from './info-user-page-routing.module';



@NgModule({
  declarations: [InfoUserPageComponent],
  imports: [
    CommonModule,
    InfoUserPageRoutingModule,
    CoreModule,
    MaterialModule,
    LeafletModule,
  ],
})
export class InfoUserPageModule {}
