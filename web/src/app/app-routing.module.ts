import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './app.guard';
import { InfoOngPageComponent } from './pages/ong/info-ong-page/info-ong-page.component';

const routes: Routes = [
  {
    path: 'profile',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./pages/ong/info-ong-page/info-ong-page.module').then(
        (m) => m.InfoOngPageModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'register-ong',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./pages/auth/register-page/register-page.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'ongs',
    loadChildren: () =>
      import('./pages/ongs/ongs.module').then((m) => m.OngsModule),
  },
  {
    path: 'ask-help',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./pages/help/help.module').then((m) => m.HelpModule),
  },
  {
    path: 'detail-ong/:id',
    loadChildren: () =>
      import('./pages/detail-ong/detail-ong.module').then(
        (m) => m.DetailOngModule
      ),
  },
  {
    path: 'help/:id',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./pages/detail-help/detail-help.module').then(
        (m) => m.DetailHelpModule
      ),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
