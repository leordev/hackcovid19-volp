import { Observer, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  tileLayer,
  latLng,
  Map,
  Layer,
  FitBoundsOptions,
  marker,
  icon,
  LatLngBounds,
  latLngBounds,
} from 'leaflet';

import {
  OSMJSON,
  LocationService,
} from 'src/app/global/services/location.service';
import { AuthService } from 'src/app/global/services/auth.service';
import { HelpService } from 'src/app/global/services/help.service';
import { UserLocation } from 'src/app/interfaces/UserLocation.model';
import { InstitutionService } from 'src/app/global/services/institution.service';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  map: Map;
  loading = false;
  loadingAddress = false;
  userLocation: UserLocation;

  search = '';
  searchObserver: Observer<string>;
  addressOptions: OSMJSON[] = [];

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Volp',
      }),
    ],
    zoom: 6,
    center: latLng(-20, -45),
  };

  markers: Layer[] = [];

  fitBounds: LatLngBounds = null;
  fitBoundsOptions: FitBoundsOptions = {
    padding: [24, 24],
  };

  /// For fitting bounds
  maxLat: number;
  minLat: number;
  maxLng: number;
  minLng: number;

  constructor(
    private authService: AuthService,
    private helpService: HelpService,
    private institutionService: InstitutionService,
    private locationService: LocationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    Observable.create((observer) => {
      this.searchObserver = observer;
    })
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((result) => {
        this.searchPlaces(result);
      });
  }

  ngOnDestroy() {}

  async onMapReady(map: Map) {
    this.map = map;
    this.userLocation = await this.locationService.getUserLocation();

    if (this.userLocation) {
      this.getCloserInstitutions(this.userLocation.lat, this.userLocation.lng);
    } else {
      this.snackBar.open(
        'Não foi possível ler sua localização, por favor escreva seu endereço abaixo',
        undefined,
        {
          duration: 4000,
        }
      );
    }
  }

  onSearch(address: string) {
    if (!!address && this.searchObserver) {
      this.searchObserver.next(address);
    }
  }

  async searchPlaces(address: string) {
    this.loadingAddress = true;
    try {
      this.addressOptions = await this.locationService.searchByAddress(address);
    } catch (error) {
      this.snackBar.open('Não foi possível buscar endereços', undefined, {
        duration: 4000,
      });
    }
    this.loadingAddress = false;
  }

  onPickAddress(selected: MatAutocompleteSelectedEvent) {
    const data = selected.option.value as OSMJSON;
    this.search = data.display_name;
    this.getCloserInstitutions(parseFloat(data.lat), parseFloat(data.lon));
  }

  async getCloserInstitutions(lat: number, lng: number) {
    this.markers = [];

    if (this.userLocation) {
      const latUser = this.userLocation.lat;
      const lngUser = this.userLocation.lng;
      this.checkLatLng(latUser, lngUser);

      this.markers.push(
        marker([latUser, lngUser], {
          icon: icon({
            iconUrl: 'assets/images/map/marker-user.png',
            shadowUrl: 'assets/images/map/marker-shadow.png',
          }),
        }).bindPopup(`Olá, voce esta aqui`)
      );
    }

    this.loading = true;

    let radius = 0.5;
    while (radius <= 3) {
      try {
        const institutions = await this.institutionService.getInstitutions(
          lat,
          lng,
          radius
        );

        if (!!institutions.length) {
          for (const institution of institutions) {
            const latInst = institution.latitude;
            const lngInst = institution.longitude;

            this.checkLatLng(latInst, lngInst);
            this.markers.push(
              marker([latInst, lngInst], {
                icon: icon({
                  iconUrl: 'assets/images/map/marker-icon.png',
                  shadowUrl: 'assets/images/map/marker-shadow.png',
                }),
              }).bindPopup(`
                <div>
                  <div class="d-flex align-items-center">
                    <div>
                      <img class="institution-img" src="${
                        !!institution.profile_picture
                          ? institution.profile_picture
                          : 'assets/images/charity.png'
                      }" />
                    </div>
                    <div class="ml-3">
                      <h3 class="m-0">${institution.name}</h3>
                      <p class="m-0">
                        ${institution.address1}${
                institution.address2 ? ` ${institution.address2}` : ''
              }
                      </p>
                    </div>
                  </div>
                  <hr />
                  <p class="m-0">${institution.description}</p>
                  <a href="/detail-ong/${institution.id}">Ver detalhes</a>
                </div>
              `)
            );
          }
        } else if (radius === 3) {
          this.snackBar.open('Não existem instituições próximas', undefined, {
            duration: 4000,
          });
        }
      } catch (error) {}

      radius += 0.5;
    }

    const localUser = this.authService.getLocalUser();
    if (localUser && localUser.user && localUser.user.is_helper) {
      radius = 0.5;
      while (radius <= 3) {
        try {
          const helps = await this.helpService.getCloseHelps(lat, lng, radius);

          if (!!helps.length) {
            for (const help of helps) {
              const latHelp = help.latitude;
              const lngHelp = help.longitude;

              this.checkLatLng(latHelp, lngHelp);
              this.markers.push(
                marker([latHelp, lngHelp], {
                  icon: icon({
                    iconUrl: 'assets/images/map/marker-help.png',
                    shadowUrl: 'assets/images/map/marker-shadow.png',
                  }),
                }).bindPopup(`
                <div>
                  <h3 class="m-0">R$ ${help.offered_amount}</h3>
                  <p class="m-0">
                    ${help.address1}${help.address2 ? ` ${help.address2}` : ''}
                  </p>
                  <hr />
                  <p class="m-0">${help.description}</p>
                  <a href="/help/${help.id}">Ver detalhes</a>
                </div>
              `)
              );
            }
          }
        } catch (error) {}

        radius += 0.5;
      }
    }

    this.loading = false;
    if (this.markers.length) {
      setTimeout(() => {
        this.fitBoundsMap();
      }, 300);
    }
  }

  private fitBoundsMap() {
    let minLat = this.minLat;
    let minLng = this.minLng;
    let maxLat = this.maxLat;
    let maxLng = this.maxLng;

    if (this.minLng === this.maxLng) {
      minLng = this.minLng - 0.1;
      maxLng = this.maxLng + 0.1;
    }

    if (this.minLat === this.maxLat) {
      minLat = this.minLat - 0.1;
      maxLat = this.maxLat + 0.1;
    }

    const southWest = latLng(this.minLat, this.minLng);
    const northEast = latLng(this.maxLat, this.maxLng);
    this.fitBounds = latLngBounds(southWest, northEast);
  }

  private checkLatLng(lat: number, lng: number) {
    if (!this.maxLat || lat > this.maxLat) {
      this.maxLat = lat;
    }

    if (!this.minLat || lat < this.minLat) {
      this.minLat = lat;
    }

    if (!this.maxLng || lng > this.maxLng) {
      this.maxLng = lng;
    }

    if (!this.minLng || lng < this.minLng) {
      this.minLng = lng;
    }
  }
}
