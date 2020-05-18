import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthUser } from 'src/app/interfaces/user';
import { FullInstitution } from 'src/app/interfaces/Institution.model';
import { InstitutionService } from 'src/app/global/services/institution.service';

@Component({
  selector: 'app-ong-info',
  templateUrl: './ong-info.component.html',
  styleUrls: ['./ong-info.component.scss'],
})
export class OngInfoComponent implements OnInit {
  @Input() authUser: AuthUser;
  institution: FullInstitution;

  constructor(
    private institutionService: InstitutionService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    if (!this.authUser.ownsInstitutionId) {
      return;
    }

    try {
      this.institution = await this.institutionService.getInstitutionsById(
        this.authUser.ownsInstitutionId
      );
    } catch (error) {
      this.snackBar.open(error.message, undefined, {
        duration: 4000,
      });
    }
  }
}
