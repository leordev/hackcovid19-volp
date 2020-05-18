import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ong-perfil',
  templateUrl: './ong-perfil.component.html',
  styleUrls: ['./ong-perfil.component.scss'],
})
export class OngPerfilComponent implements OnInit {
  @Input() institution;

  isEdit: boolean = true;

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

  ngOnInit(): void {}

  onEdit() {
    this.isEdit = !this.isEdit;
  }

  onSubmit() {
    console.log('envio');
  }
}
