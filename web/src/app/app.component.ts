import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from './global/services/auth.service';

interface AppNotification {
  from: string;
  notification: {
    body: string;
    title: string;
  };
  priority: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subMessages: Subscription;

  constructor(
    private authService: AuthService,
    private afMessaging: AngularFireMessaging,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.renewToken();

    this.subMessages = this.afMessaging.messages.subscribe(
      (message: AppNotification) => {
        this.toastr.info(message.notification.body, message.notification.title);
      }
    );
  }

  ngOnDestroy(): void {
    this.subMessages.unsubscribe();
  }
}
