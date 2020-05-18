import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OngsComponent } from './ongs.component';

const routes: Routes = [{ path: '', component: OngsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OngsRoutingModule { }
