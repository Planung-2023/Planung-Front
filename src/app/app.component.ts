import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ConfiguracionService } from './configuracion/configuracion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eventos';
  constructor(public auth: AuthService, public configService: ConfiguracionService) {  }
  
  

  async iniciarSesion() {
    await this.auth.loginWithRedirect();
  }
  
}
