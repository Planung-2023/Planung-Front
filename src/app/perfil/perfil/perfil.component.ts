import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { PerfilService } from '../perfil.service';
import { ListaEventosService } from 'src/app/eventos/lista-eventos.service';
import { PerfilStorageService } from '../perfil-storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  nombreUsuario: string = '';
  usuario: any;
  nombreParticipante: string = '';
  apellidoParticipante: string = '';
  correoParticipante: string = '';
  fotoPerfilUsuario: string = '';
  nombrePersona: any;
  apellidoPersona: any;
  correoUsuario: any;

  constructor(private perfilService: PerfilService, private perfilStorageService: PerfilStorageService, public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((user) => {
        const authIdentifier = user?.sub;
        console.log(user?.sub);
        console.log(user);
        console.log(authIdentifier);
        this.getUsuarioPorAuthIdentifier(authIdentifier);
    });
  }

  getUsuarioPorAuthIdentifier(authIdentifier: any) {
    this.perfilService.getDatosUsuarioPorAuth(authIdentifier).subscribe(({usuario}: any) => {
      this.perfilStorageService.usuario = usuario;
      this.usuario = usuario;
      this.nombreUsuario = usuario.nombreUsuario;
      this.nombrePersona = usuario.nombre;
      this.apellidoPersona = usuario.apellido;
      this.correoUsuario = usuario.email;
      this.fotoPerfilUsuario = usuario.fotoPerfil.nombre;
    });
  }

}

//test
interface Participante {
  id: number;
  apellido: string;
  mail: string;
  nombre: string;
}


 /*
  constructor(public auth: AuthService) {}

  verToken(){
    this.auth.idTokenClaims$.subscribe((claims) => {
      console.log(claims);
    });
  }
  /*/

  /*
  // Utiliza el servicio de perfil para obtener el nombre del usuario
    this.perfilService.getDatosUsuario(usuarioId).subscribe((usuario: any) => {
      this.usuario = usuario;
      this.nombreUsuario = usuario.nombreUsuario;
      console.log(usuario.fotoPerfil.nombre);
      this.fotoPerfilUsuario = usuario.fotoPerfil.nombre;
    });
    
    // Utiliza el servicio de perfil para obtener el nombre del usuario
    this.perfilService.getDatosParticipante(participanteId).subscribe((res: any) => {
      this.participante = res.participante; 
      this.nombreParticipante = this.participante.nombre;
      this.apellidoParticipante = this.participante.apellido;
      this.correoParticipante = this.participante.mail;
    });
  */
