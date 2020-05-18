import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { formatDate } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user: User;
  helperDesc: string = 'Não posso ajudar';
  isEdit: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      unique_document: [, Validators.compose([Validators.required])],
      birthdate: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      is_helper: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    if (this.user.is_helper) {
      this.helperDesc = 'Ajudante';
    }
  }

  onEdit() {
    this.isEdit = !this.isEdit;
    this.form.get('name').setValue(this.user.name);
    this.form.get('email').setValue(this.user.email);
    this.form
      .get('birthdate')
      .setValue(
        formatDate(new Date(this.user.birthdate), 'dd/MM/yyyy', 'pt-BR')
      );
    this.form.get('is_helper').setValue(this.user.is_helper);
    this.form.get('unique_document').setValue(this.user.unique_document);
  }

  onSubmit() {
    let user: User = this.form.value;

    //serviço para put do user
  }
}
