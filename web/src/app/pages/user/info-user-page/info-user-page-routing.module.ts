import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoUserPageComponent } from './info-user-page.component';


const routes: Routes = [{ path: '', component: InfoUserPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoUserPageRoutingModule { }
