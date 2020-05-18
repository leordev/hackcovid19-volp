import { Injectable } from '@angular/core';
import {
  NewHelpRequest,
  HelpRequest,
  HelpList,
  FullHelpRequest,
  HelpStatusApi,
  HelpStatus,
  HelpRequestItem,
} from 'src/app/interfaces/HelpRequest.model';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HelpService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  createNewHelpRequest(request: NewHelpRequest) {
    return this.http
      .post(`${environment.apiURL}/help`, request, {
        headers: this.authService.getAuthHeaders(),
      })
      .toPromise() as Promise<HelpRequest>;
  }

  getMyHelps(): Promise<HelpList> {
    return this.http
      .get(`${environment.apiURL}/help`, {
        headers: this.authService.getAuthHeaders(),
      })
      .toPromise() as Promise<HelpList>;
  }

  getHelp(id: number): Promise<FullHelpRequest> {
    return this.http
      .get(`${environment.apiURL}/help/${id}`, {
        headers: this.authService.getAuthHeaders(),
      })
      .toPromise() as Promise<FullHelpRequest>;
  }

  updateHelpRequestStatus(requestId: number, statusUpdate: HelpStatusApi) {
    return this.http
      .put(`${environment.apiURL}/help/${requestId}/status`, statusUpdate, {
        headers: this.authService.getAuthHeaders(),
      })
      .toPromise();
  }

  getCloseHelps(
    lat: number,
    lng: number,
    radius: number
  ): Promise<HelpRequestItem[]> {
    return this.http
      .get(
        `${environment.apiURL}/help/location/${
          HelpStatus.Pending
        }?latitude=${lat.toFixed(5)}&longitude=${lng.toFixed(
          5
        )}&radius=${radius}`,
        {
          headers: this.authService.getAuthHeaders(),
        }
      )
      .toPromise() as Promise<HelpRequestItem[]>;
  }
}
