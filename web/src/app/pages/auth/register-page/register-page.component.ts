import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { InstitutionService } from 'src/app/global/services/institution.service';
import { AuthService } from 'src/app/global/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private institutionService: InstitutionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      unique_document: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      bank_info: '',
      profile_picture: '',
      website_url: '',
    });
  }

  ngOnInit(): void {
    const user = this.authService.getLocalUser();
    if (!!user.ownsInstitutionId) {
      this.snackBar.open('Voce já tem uma ONG', undefined, {
        duration: 4000,
      });
      this.router.navigate(['/profile']);
    }
  }

  async onSubmit() {
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;

    try {
      await this.institutionService.createInstitution(this.form.value);

      this.loading = false;
      this.snackBar.open('ONG cadastrada com sucesso', undefined, {
        duration: 4000,
      });
      this.router.navigate(['/profile']);
    } catch (error) {
      this.snackBar.open(error.message, undefined, {
        duration: 4000,
      });
      this.loading = false;
    }
  }
}
