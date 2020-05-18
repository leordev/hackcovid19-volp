import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './global/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(_: ActivatedRouteSnapshot, __: RouterStateSnapshot) {
    if (!this.authService.isLogged) {
      this.router.navigate(['/auth']);
    }

    return this.authService.isLogged;
  }
}
