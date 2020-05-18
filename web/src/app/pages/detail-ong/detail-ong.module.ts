import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/global/core/core.module';
import { MaterialModule } from 'src/app/global/material/material.module';

import { DetailOngRoutingModule } from './detail-ong-routing.module';
import { DetailOngComponent } from './detail-ong.component';

@NgModule({
  declarations: [DetailOngComponent],
  imports: [CommonModule, DetailOngRoutingModule, CoreModule, MaterialModule],
})
export class DetailOngModule {}
