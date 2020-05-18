import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { mergeMapTo } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireMessaging } from '@angular/fire/messaging';

import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/global/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private afMessaging: AngularFireMessaging,
    private http: HttpClient
  ) {
    this.afMessaging.messaging.subscribe((_messaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }

  getAndAskUserToken() {
    if (!this.authService.isLogged) {
      console.error('O usuário tem que estar logado para atualizar o Token');
      return;
    }

    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.sub = this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe((token) => {
        console.log('Novo token FCM', token);

        this.http
          .post(
            `${environment.apiURL}/user/update-token/fcm`,
            {
              token,
              source: 'WEB',
            },
            {
              headers: this.authService.getAuthHeaders(),
            }
          )
          .toPromise()
          .then((res) => console.log('Token atualizado', res))
          .catch(console.error);
      }, console.error);
  }
}
