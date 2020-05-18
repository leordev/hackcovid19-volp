import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailHelpComponent } from './detail-help.component';

const routes: Routes = [{ path: '', component: DetailHelpComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailHelpRoutingModule {}
