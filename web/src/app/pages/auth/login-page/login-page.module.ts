import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/global/core/core.module';
import { MaterialModule } from 'src/app/global/material/material.module';

import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, CoreModule, MaterialModule, LoginPageRoutingModule],
})
export class LoginPageModule {}
