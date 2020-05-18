import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Address } from 'src/app/interfaces/Address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  getMyAddresses(): Promise<Address[]> {
    const user = this.authService.getLocalUser();
    if (!user) {
      throw new Error('Você está deslogado');
    }

    return this.http
      .get(`${environment.apiURL}/user/addresses`, {
        headers: this.authService.getAuthHeaders(),
      })
      .toPromise() as Promise<Address[]>;
  }

  createAddress(newAddress: Address): Promise<Address> {
    return this.http
      .post(`${environment.apiURL}/address`, newAddress, {
        headers: this.authService.getAuthHeaders(),
      })
      .toPromise() as Promise<Address>;
  }
}
