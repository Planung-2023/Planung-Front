import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})

export class ConfiguracionComponent {
  constructor(@Inject(DOCUMENT) private doc: Document, public auth: AuthService) {}
  lightMode: boolean = true;
  darkMode: boolean = false;

  cambiarModoLight() {
    this.lightMode = true;
    this.darkMode = false;
  }

  logOut(){
    this.auth.logout({ 
      logoutParams: { 
        returnTo: this.doc.location.origin 
      }
    });
  }
}
