import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/global/core/core.module';
import { MaterialModule } from 'src/app/global/material/material.module';

import { RegisterPageComponent } from './register-page.component';
import { RegisterPageRoutingModule } from './register-page-routing.module';


@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    RegisterPageRoutingModule,
    CoreModule,
    MaterialModule,
  ]
})
export class RegisterPageModule { }
