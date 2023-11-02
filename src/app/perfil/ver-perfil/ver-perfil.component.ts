import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../perfil.service';

@Component({
  selector: 'app-ver-perfil',
  templateUrl: './ver-perfil.component.html',
  styleUrls: ['./ver-perfil.component.css']
})
export class VerPerfilComponent implements OnInit {
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
