import { Observable, Subscriber } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthUser } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

export interface LoginBody {
  phoneNumber: string;
  code: string;
}

export interface UserToSignUp {
  name: string;
  birthdate: string;
  email: string;
  unique_document: string;
  is_helper: boolean;
  profile_picture: string;
}

export interface SignUpBody {
  phoneNumber: string;
  smsVerificationCode: string;
  user: UserToSignUp;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged = false;
  observer: Subscriber<AuthUser | undefined>;
  userObservable: Observable<AuthUser | undefined>;

  constructor(private http: HttpClient) {
    if (this.observer) {
      this.observer.unsubscribe();
    }

    this.userObservable = new Observable((observer) => {
      this.observer = observer;
      const localUser = this.getLocalUser();
      if (localUser) {
        this.observer.next(localUser);
        this.isLogged = true;
      } else {
        this.observer.next(undefined);
        this.isLogged = false;
      }
    });

    this.userObservable.subscribe({
      next: console.log,
      error: console.error,
    });
  }

  nextUser(user?: AuthUser) {
    if (this.observer) {
      this.observer.next(user);
    } else {
      this.userObservable = new Observable((observer) => {
        this.observer = observer;
        this.observer.next(user);
      });
    }
  }

  async sendVerificationCode(phoneNumber: string) {
    try {
      const response: any = await this.http
        .post(`${environment.apiURL}/auth-verify-code`, { phoneNumber })
        .toPromise();

      if (!response.ok) {
        throw new Error();
      }
      return response.ok;
    } catch (err) {
      throw new Error('Telefone inválido');
    }
  }

  async signUp(body: SignUpBody) {
    try {
      const userAuth = (await this.http
        .post(`${environment.apiURL}/signup`, body)
        .toPromise()) as AuthUser;

      this.successfullLogin(userAuth);
      return userAuth;
    } catch (err) {
      if (err.error && err.error.message) {
        switch (err.error.message) {
          case 'Invalid CPF':
            throw new Error('CPF Inválido');
          case 'email is already being used':
            throw new Error('Email em uso');
          case 'phone is already being used':
            throw new Error('Telefone em uso');
          default:
            throw new Error('Código inválido');
        }
      }

      throw new Error('Código inválido');
    }
  }

  async putRegister(body: SignUpBody) {
    try {
      const userAuth = (await this.http
        .post(`${environment.apiURL}/signup`, body)
        .toPromise()) as AuthUser;

      this.successfullLogin(userAuth);
      return userAuth;
    } catch (err) {
      if (err.error && err.error.message) {
        switch (err.error.message) {
          case 'Invalid CPF':
            throw new Error('CPF Inválido');
          case 'email is already being used':
            throw new Error('Email em uso');
          case 'phone is already being used':
            throw new Error('Telefone em uso');
          default:
            throw new Error('Código inválido');
        }
      }

      throw new Error('Código inválido');
    }
  }

  async login(body: LoginBody) {
    try {
      const userAuth = (await this.http
        .post(`${environment.apiURL}/authenticate`, body)
        .toPromise()) as AuthUser;
      console.log(userAuth);
      this.successfullLogin(userAuth);
      return userAuth;
    } catch (err) {
      if (err.error && err.error.message) {
        switch (err.error.message) {
          case 'Invalid Auth user':
            throw new Error('Telefone não registrado');
          default:
            throw new Error('Código inválido');
        }
      }
      throw new Error('Código inválido');
    }
  }

  getLocalUser(): AuthUser | undefined {
    const ong = localStorage.getItem(environment.STORAGE_KEYS.local_ONGs);
    if (ong) {
      try {
        return JSON.parse(ong);
      } catch (error) {}
    }

    return undefined;
  }

  setLocalUser(obj?: AuthUser): void {
    if (obj === undefined) {
      this.isLogged = false;
      localStorage.removeItem(environment.STORAGE_KEYS.local_ONGs);
      this.observer.next(undefined);
    } else {
      this.isLogged = true;
      localStorage.setItem(
        environment.STORAGE_KEYS.local_ONGs,
        JSON.stringify(obj)
      );
      this.observer.next(obj);
    }
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getLocalUser().token}`,
    });
  }

  updateOngID(ongID: number) {
    const user = this.getLocalUser();
    user.ownsInstitutionId = ongID;
    this.setLocalUser(user);
  }

  successfullLogin(user: AuthUser) {
    this.setLocalUser(user);
  }

  logout() {
    this.setLocalUser();
  }

  async renewToken() {
    if (!this.isLogged) {
      return;
    }

    try {
      const response = (await this.http
        .get(`${environment.apiURL}/user/renew-token`, {
          headers: this.getAuthHeaders(),
        })
        .toPromise()) as AuthUser;

      this.setLocalUser(response);
    } catch (err) {
      this.logout();
    }
  }
}
