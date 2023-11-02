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

  constructor(private perfilService: PerfilService) {}

  getFotoPerfil(): string {
    return this.perfilService.getFotoPerfil();
  }

  ngOnInit() {
    const usuarioId = 1;
    const participanteId = usuarioId;
    
    // Utiliza el servicio de perfil para obtener el nombre del usuario
    this.perfilService.getNombreDeUsuario(usuarioId).subscribe((usuario: any) => {
      this.nombreUsuario = usuario.nombreUsuario;
    });
    
  
    // Utiliza el servicio de perfil para obtener el nombre del usuario
    this.perfilService.getDatosParticipante(participanteId).subscribe((res: any) => {
      this.participante = res.participante; // Asigna los datos del participante

      // Asigna los valores del participante a las variables
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

