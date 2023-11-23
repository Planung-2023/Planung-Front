import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ConfiguracionService } from './configuracion/configuracion.service';
import { UsuarioService } from './usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eventos';
  constructor(public auth: AuthService, public configService: ConfiguracionService, public usuarioService: UsuarioService) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.auth.idTokenClaims$.subscribe((claims) => {
          const idToken = claims?.__raw;
          if (idToken) {
            localStorage.setItem('access_token', idToken);
          } else {
            console.error('No se pudo obtener el token de acceso.');
          }
        });
      } else {
        console.error('Usuario no autenticado.');
      }
    });
  }


  async iniciarSesion() {
    await this.auth.loginWithRedirect();
  }
}
