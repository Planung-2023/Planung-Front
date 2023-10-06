import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  constructor(public auth: AuthService) {}

  verToken(){
    this.auth.idTokenClaims$.subscribe((claims) => {
      console.log(claims);
    });
  }
}