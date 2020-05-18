import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from 'src/app/global/core/core.module';
import { MaterialModule } from 'src/app/global/material/material.module';

import { InfoOngPageComponent } from './info-ong-page.component';
import { InfoOngPageRoutingModule } from './info-ong-page-routing.module';
import { OngInfoComponent } from '../components/ong-info/ong-info.component';
import { OngEnderecoComponent } from '../components/ong-endereco/ong-endereco.component';
import { OngPerfilComponent } from '../components/ong-perfil/ong-perfil.component';

@NgModule({
  declarations: [
    InfoOngPageComponent,
    OngInfoComponent,
    OngEnderecoComponent,
    OngPerfilComponent,
  ],
  imports: [CommonModule, InfoOngPageRoutingModule, CoreModule, MaterialModule],
})
export class InfoOngPageModule {}
