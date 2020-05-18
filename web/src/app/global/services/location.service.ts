import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { UserLocation } from 'src/app/interfaces/UserLocation.model';

export interface OSMJSON {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  userLocation?: UserLocation;

  constructor(private http: HttpClient) {
    const savedLocation = localStorage.getItem(
      environment.STORAGE_KEYS.locationStorageKey
    );
    if (!!savedLocation) {
      try {
        this.userLocation = JSON.parse(savedLocation);
      } catch (error) {} /// Ignore errors (keep undefined)
    }
  }

  getUserLocation(): Promise<UserLocation | undefined> {
    return new Promise((resolve, _) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.userLocation = {
            userShared: true,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          localStorage.setItem(
            environment.STORAGE_KEYS.locationStorageKey,
            JSON.stringify(this.userLocation)
          );

          resolve(this.userLocation);
        },
        (err) => {
          resolve();
        }
      );
    });
  }

  searchByAddress(address: string): Promise<OSMJSON[]> {
    return this.http
      .get(
        `https://nominatim.openstreetmap.org/search.php?q=${address}&format=json`
      )
      .toPromise() as Promise<OSMJSON[]>;
  }
}
