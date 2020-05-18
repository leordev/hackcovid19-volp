import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PhonePipe } from 'src/app/global/pipes/phone.pipe';
import { MaterialModule } from 'src/app/global/material/material.module';
import { HeaderComponent } from 'src/app/components/user-header/header.component';
import { UserInfoComponent } from 'src/app/components/user-info/user-info.component';
import { AddressFormComponent } from 'src/app/components/address-form/address-form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    UserInfoComponent,
    AddressFormComponent,
    PhonePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    UserInfoComponent,
    AddressFormComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PhonePipe,
  ],
})
export class CoreModule {}
