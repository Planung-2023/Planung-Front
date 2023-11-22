import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{
  authIdentifier:any;
  constructor(
    public auth0: AuthService,
  ) { 
    this.authIdentifier = auth0.user$.subscribe((user) => {
      this.authIdentifier = user?.sub,
      localStorage.setItem('evento_usuario_id', this.authIdentifier)
    }) 
  }
  

}
