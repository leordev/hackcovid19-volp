import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  InstitutionObj,
  FullInstitution,
  NewInstitution,
} from 'src/app/interfaces/Institution.model';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  async getInstitutions(lat: number, lng: number, radius: number) {
    try {
      const response = (await this.http
        .get(
          `${environment.apiURL}/institution?latitude=${lat.toFixed(
            5
          )}&longitude=${lng.toFixed(5)}&radius=${radius}`
        )
        .toPromise()) as InstitutionObj[];

      return response || [];
    } catch (err) {
      throw new Error('Erro ao buscar organizações');
    }
  }

  async getInstitutionsById(id: number) {
    try {
      const response = (await this.http
        .get(`${environment.apiURL}/institution/${id}`)
        .toPromise()) as FullInstitution;

      return response;
    } catch (err) {
      throw new Error('ID Inválido');
    }
  }

  async createInstitution(newInstitution: NewInstitution) {
    try {
      const response = (await this.http
        .post(`${environment.apiURL}/new-institution`, newInstitution, {
          headers: this.authService.getAuthHeaders(),
        })
        .toPromise()) as any;

      this.authService.updateOngID(response.id);

      return;
    } catch (err) {
      throw new Error('Erro ao salvar instituição, tente novamente mais tarde');
    }
  }
}
