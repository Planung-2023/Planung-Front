import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ConfiguracionService } from './configuracion/configuracion.service';
import { UsuarioService } from './usuario/usuario.service';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'eventos';
  tema = this.configService.tema;
  constructor(public auth: AuthService, public configService: ConfiguracionService, public usuarioService: UsuarioService) {  }

  ngOnInit(): void {
    this.configService.traerTema.subscribe((modo:string)=>{
      this.tema=modo
    })
  }

  
  async iniciarSesion() {
    await this.auth.loginWithRedirect();
  }
}