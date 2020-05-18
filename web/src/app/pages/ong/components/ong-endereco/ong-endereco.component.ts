import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ong-endereco',
  templateUrl: './ong-endereco.component.html',
  styleUrls: ['./ong-endereco.component.scss'],
})
export class OngEnderecoComponent implements OnInit {
  @Input() addresses: any;
  constructor() {}

  ngOnInit(): void {
    console.log(this.addresses);
  }
}
