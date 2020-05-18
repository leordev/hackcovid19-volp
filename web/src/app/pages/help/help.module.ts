import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/global/core/core.module';
import { MaterialModule } from 'src/app/global/material/material.module';

import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';

@NgModule({
  declarations: [HelpComponent],
  imports: [CommonModule, HelpRoutingModule, CoreModule, MaterialModule],
})
export class HelpModule {}
