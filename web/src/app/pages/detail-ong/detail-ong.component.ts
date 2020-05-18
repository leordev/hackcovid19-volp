import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { FullInstitution } from 'src/app/interfaces/Institution.model';
import { InstitutionService } from 'src/app/global/services/institution.service';

@Component({
  selector: 'app-detail-ong',
  templateUrl: './detail-ong.component.html',
  styleUrls: ['./detail-ong.component.scss'],
})
export class DetailOngComponent implements OnInit, OnDestroy {
  institution: FullInstitution;

  sub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private institutionService: InstitutionService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.searchInstitution(params.id);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  async searchInstitution(id: string) {
    try {
      this.institution = await this.institutionService.getInstitutionsById(Number(id));
    } catch (error) {
      this.snackBar.open(error.message, undefined, {
        duration: 4000,
      });
      this.router.navigate(['/ongs']);
    }
  }
}
