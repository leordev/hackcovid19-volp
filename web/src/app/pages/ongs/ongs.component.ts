import { Observer, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import {
  OSMJSON,
  LocationService,
} from 'src/app/global/services/location.service';
import { InstitutionObj } from 'src/app/interfaces/Institution.model';
import { InstitutionService } from 'src/app/global/services/institution.service';

@Component({
  selector: 'app-ongs',
  templateUrl: './ongs.component.html',
  styleUrls: ['./ongs.component.scss'],
})
export class OngsComponent implements OnInit {
  loading = false;
  loadingAddress = false;
  data: InstitutionObj[] = [];

  search = '';
  searchObserver: Observer<string>;
  addressOptions: OSMJSON[] = [];

  constructor(
    private institutionService: InstitutionService,
    private locationService: LocationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    Observable.create((observer) => {
      this.searchObserver = observer;
    })
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((result) => {
        this.searchPlaces(result);
      });
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
    this.loading = true;

    let radius = 0.5;
    while (radius <= 10) {
      try {
        const data = await this.institutionService.getInstitutions(
          lat,
          lng,
          radius
        );

        if (!!data.length) {
          console.log(data);
          this.data = data;
          this.loading = false;
          return;
        }
      } catch (error) {}

      radius += 0.5;
    }

    this.snackBar.open('Não existem instituições próximas', undefined, {
      duration: 4000,
    });
    this.data = [];
    this.loading = false;
  }
}
