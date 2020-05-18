import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoOngPageComponent } from './info-ong-page.component';


const routes: Routes = [{ path: '', component: InfoOngPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoOngPageRoutingModule { }
