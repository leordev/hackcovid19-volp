import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/global/core/core.module';
import { MaterialModule } from 'src/app/global/material/material.module';

import { OngsRoutingModule } from './ongs-routing.module';
import { OngsComponent } from './ongs.component';

@NgModule({
  declarations: [OngsComponent],
  imports: [CommonModule, OngsRoutingModule, CoreModule, MaterialModule],
})
export class OngsModule {}
