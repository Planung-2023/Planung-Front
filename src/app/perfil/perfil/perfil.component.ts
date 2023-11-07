import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { PerfilService } from '../perfil.service';
import { ListaEventosService } from 'src/app/eventos/lista-eventos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  nombreUsuario: string = '';
  usuario: any;
  participante: Participante = {
    id: 1,
    apellido: '',
    mail: '',
    nombre: ''
  };
  nombreParticipante: string = '';
  apellidoParticipante: string = '';
  correoParticipante: string = '';
  fotoPerfilUsuario: string = '';


  constructor(private perfilService: PerfilService) {}


  ngOnInit() {
    const usuarioId = 5;
    const participanteId = usuarioId;
    
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

