import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailOngComponent } from './detail-ong.component';

const routes: Routes = [{ path: '', component: DetailOngComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailOngRoutingModule { }
