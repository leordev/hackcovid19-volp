import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/global/services/address.service';
import { Address, EntityType } from 'src/app/interfaces/Address.model';
import {
  NewHelpRequest,
  HelpRequest,
} from 'src/app/interfaces/HelpRequest.model';
import { HelpService } from 'src/app/global/services/help.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationService } from 'src/app/global/services/location.service';
import { AuthService } from 'src/app/global/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  newHelpRequest: Partial<NewHelpRequest> = {
    description: '',
    address_id: 0,
  };

  myAddresses: Address[] = [];
  newAddress: Address;

  constructor(
    private snackBar: MatSnackBar,
    private addressService: AddressService,
    private helpService: HelpService,
    private locationService: LocationService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const addresses = await this.addressService.getMyAddresses();
    this.myAddresses = addresses;
  }

  handleAddressSelection(event: any) {
    if (event === '-1') {
      this.newAddress = {} as Address;
      this.newAddress.entity_id = this.authService.getLocalUser().user.id;
      this.newAddress.type = EntityType.User;
    } else {
      this.newAddress = undefined;
    }
  }

  async submit() {
    if (this.newAddress) {
      if (
        !this.newAddress.address1 ||
        !this.newAddress.city ||
        !this.newAddress.state ||
        !this.newAddress.zip_code
      ) {
        return this.snackBar.open('Endereço Incompleto', undefined, {
          duration: 4000,
        });
      }

      const locations = await this.locationService.searchByAddress(
        `${this.newAddress.address1} - ${this.newAddress.city}`
      );
      if (!locations || locations.length < 1) {
        return this.snackBar.open('Endereço Não Encontrado', undefined, {
          duration: 4000,
        });
      }
      const location = locations[0];
      this.newAddress.latitude = parseFloat(location.lat);
      this.newAddress.longitude = parseFloat(location.lon);

      const createdAddress = await this.addressService.createAddress(
        this.newAddress
      );
      this.newAddress = undefined;
      this.myAddresses.push(createdAddress);
      this.newHelpRequest.address_id = createdAddress.id;
    }

    if (!this.newHelpRequest.address_id) {
      return this.snackBar.open('Endereço Inválido', undefined, {
        duration: 4000,
      });
    }

    if (!this.newHelpRequest.description) {
      return this.snackBar.open('Descrição Inválida', undefined, {
        duration: 4000,
      });
    }

    const newHelpRequest: NewHelpRequest = {
      address_id: this.newHelpRequest.address_id,
      description: this.newHelpRequest.description,
      offered_amount: this.newHelpRequest.offered_amount || 0,
    };

    const createdRequest = await this.helpService.createNewHelpRequest(
      newHelpRequest
    );
    this.snackBar.open(
      `Pedido de Ajuda ID ${createdRequest.id} foi criado com sucesso!`,
      undefined,
      {
        duration: 4000,
      }
    );

    this.router.navigate([`/help/${createdRequest.id}`]);
  }
}
