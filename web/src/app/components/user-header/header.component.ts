import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from 'src/app/global/services/auth.service';
import { AuthUser } from 'src/app/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userLogged: AuthUser | undefined;
  subscription: Subscription;

  constructor(private authService: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.userObservable.subscribe({
      next: (user) => {
        this.userLogged = user;
      },
      error: console.error,
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/profile']);
  }
}
