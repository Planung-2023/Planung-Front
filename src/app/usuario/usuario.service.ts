import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{
  authIdentifier:string|undefined = '';
  constructor(
    public auth0: AuthService,
  ) { }
  
setUsuario(){
  this.auth0.user$.subscribe((user) => {
    this.authIdentifier = user?.sub,
    console.log(this.authIdentifier)
  })
}
}
