import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/global/core/core.module';
import { MaterialModule } from 'src/app/global/material/material.module';

import { DetailHelpRoutingModule } from './detail-help-routing.module';
import { DetailHelpComponent } from './detail-help.component';

@NgModule({
  declarations: [DetailHelpComponent],
  imports: [CommonModule, DetailHelpRoutingModule, CoreModule, MaterialModule],
})
export class DetailHelpModule {}
