import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from 'src/app/global/core/core.module';
import { MaterialModule } from 'src/app/global/material/material.module';

import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    CoreModule,
    MaterialModule,
    LeafletModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomePageModule {}
