import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import * as BrV from 'br-validations';
import * as EmailValidator from 'email-validator';

import { AuthService } from 'src/app/global/services/auth.service';
import { NotificationService } from 'src/app/global/services/notification.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  maxDate = moment().toDate();

  loading = false;
  isSingUp = false;
  codeSent = false;

  /// After code sent
  phoneNumber = '';
  code = '';
  user = {
    name: '',
    birthdate: moment().subtract(18, 'years'),
    email: '',
    unique_document: '',
    is_helper: false,
    profile_picture: '',
  };

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.authService.isLogged) {
      this.router.navigate(['/profile']);
    }
  }

  async onSubmit(isSingUp: boolean) {
    if (this.loading || !this.phoneNumber || !this.isNumberValid()) {
      return;
    }

    this.loading = true;

    try {
      await this.authService.sendVerificationCode(this.phoneNumber);

      this.code = this.phoneNumber.substr(this.phoneNumber.length - 4);
      this.isSingUp = isSingUp;
      this.codeSent = true;
      this.snackBar.open('SMS Enviado, verifique seu telefone', undefined, {
        duration: 4000,
      });
    } catch (error) {
      this.snackBar.open(error.message, undefined, { duration: 4000 });
    }

    this.loading = false;
  }

  tryOtherNumber() {
    this.codeSent = false;
  }

  onPhoneChange(phone: string) {
    this.phoneNumber = phone.replace(/\D/g, '');
  }

  isNumberValid() {
    return this.phoneNumber.length === 11;
  }

  isEmailValid() {
    return EmailValidator.validate(this.user.email);
  }

  isCPFValid() {
    return BrV.cpf.validate(this.user.unique_document);
  }

  isInvalid() {
    if (this.isSingUp) {
      return (
        !this.code ||
        !this.user.name ||
        !this.user.birthdate.isValid() ||
        !this.user.email ||
        !this.isEmailValid() ||
        !this.user.unique_document ||
        !this.isCPFValid()
      );
    }
    return !this.code;
  }

  async finishAuth() {
    if (this.loading || this.isInvalid()) {
      return;
    }

    this.loading = true;

    try {
      const authUser = this.isSingUp
        ? await this.authService.signUp({
            phoneNumber: this.phoneNumber,
            smsVerificationCode: this.code,
            user: {
              ...this.user,
              birthdate: moment(this.user.birthdate).format('YYYY[-]MM[-]DD'),
            },
          })
        : await this.authService.login({
            phoneNumber: this.phoneNumber,
            code: this.code,
          });
      this.loading = false;

      this.snackBar.open(`Bem vindo ${authUser.user.name}`, undefined, {
        duration: 4000,
      });

      this.notificationService.getAndAskUserToken();
      this.router.navigate(['/']);
    } catch (error) {
      this.loading = false;
      this.snackBar.open(error.message, undefined, { duration: 4000 });
    }
  }
}
