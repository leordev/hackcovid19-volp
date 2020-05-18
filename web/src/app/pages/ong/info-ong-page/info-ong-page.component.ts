import { Component, OnInit } from '@angular/core';
import { User, AuthUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/global/services/auth.service';

@Component({
  selector: 'app-info-ong-page',
  templateUrl: './info-ong-page.component.html',
  styleUrls: ['./info-ong-page.component.scss'],
})
export class InfoOngPageComponent implements OnInit {
  user: User;
  userAuth:AuthUser;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userAuth = this.authService.getLocalUser();
    this.user = this.userAuth.user;
  }

  onEditEndereco() {
    console.log('editar endereço');
  }
}
