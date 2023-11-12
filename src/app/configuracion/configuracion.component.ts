import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';
import { AuthService } from '@auth0/auth0-angular';
import { PerfilService } from '../perfil/perfil.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})

export class ConfiguracionComponent implements OnInit {
  lightMode: boolean = true;
  darkMode: boolean = false;
  usuario: any;
  user: any;
  correoParticipante: string = '';
  nombreUsuario: string = ''; // Agrega esta propiedad
  correoUsuario: any;

  constructor(private configuracionService: ConfiguracionService, private perfilService: PerfilService, public auth: AuthService) {} // Inyecta el servicio

  cambiarModoLight() {
    this.lightMode = true;
    this.darkMode = false;
    this.verificarModos();
  }

  cambiarModoDark() {
    this.darkMode = true;
    this.lightMode = false;
    this.verificarModos();
  }

  verificarModos() {
    if (!this.lightMode && !this.darkMode) {
      this.lightMode = true;
    }
  }

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
        const authIdentifier = user?.sub;
        // NO SACAR (joda, anda)
        console.log(user?.sub);
        console.log(user);
        console.log(authIdentifier);
        //
        this.getDatosUsuarioPorAuth(authIdentifier);
    });

  }

 getDatosUsuarioPorAuth(authIdentifier: any) {
    this.perfilService.getDatosUsuarioPorAuth(authIdentifier).subscribe(({usuario}: any) => {
      this.usuario = usuario;
      this.nombreUsuario = usuario.nombreUsuario;
      this.correoUsuario = usuario.email;
      console.log('Detalles del usuario:', usuario);
    });
  }
  
}



interface Participante {
  id: number;
  apellido: string;
  mail: string;
  nombre: string;
}