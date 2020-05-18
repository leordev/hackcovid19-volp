import { Component, OnInit, Input } from '@angular/core';

import { Address } from 'src/app/interfaces/Address.model';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  @Input('address') newAddress: Address;

  constructor() {}

  ngOnInit(): void {}
}
