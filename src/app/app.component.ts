import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ConfiguracionService } from './configuracion/configuracion.service';
import { UsuarioService } from './usuario/usuario.service';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { A2hsService } from 'src/a2hs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eventos';
  tema = this.configService.tema;
  constructor(public auth: AuthService, public configService: ConfiguracionService, public usuarioService: UsuarioService,public a2hs: A2hsService) {}

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

    this.configService.traerTema.subscribe((modo:string)=>{
      this.tema=modo
    })

    // A2HS - START
    this.a2hs.checkUserAgent();
    this.a2hs.trackStandalone();
    window.addEventListener('beforeinstallprompt', (e) => {

      // show the add button
      this.a2hs.promptIntercepted = true;
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      // no matter what, the snack-bar shows in 68 (06/16/2018 11:05 AM)
      e.preventDefault();
      // Stash the event so it can be displayed when the user wants.
      this.a2hs.deferredPrompt = e;
      this.a2hs.promptSaved = true;

    });
    window.addEventListener('appinstalled', (evt) => {
      this.a2hs.trackInstalled();
      // hide the add button
      // a2hs.promptIntercepted = false;
    });
    // A2HS - END
  }
  async iniciarSesion() {
    await this.auth.loginWithRedirect();
  }
}