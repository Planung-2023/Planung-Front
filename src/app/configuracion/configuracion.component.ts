import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from './configuracion.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})

export class ConfiguracionComponent implements OnInit {
  lightMode: boolean = true;
  darkMode: boolean = false;
  usuario: any;
  participante: Participante = {
    id: 1,
    apellido: '',
    mail: '',
    nombre: ''
  };
  correoParticipante: string = '';
  nombreUsuario: string = ''; // Agrega esta propiedad

  constructor(private configuracionService: ConfiguracionService) {} // Inyecta el servicio

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
    const usuarioId = 5;
    const participanteId = usuarioId;

    // Utiliza el servicio de configuración para obtener el nombre del usuario
    this.configuracionService.getNombreDeUsuario(usuarioId).subscribe((usuario: any) => {
      this.nombreUsuario = usuario.nombreUsuario;
    });

    // Utiliza el servicio de perfil para obtener el nombre del usuario
    this.configuracionService.getDatosParticipante(participanteId).subscribe((participante: any) => {
      this.participante = participante;
      this.correoParticipante = this.participante.mail;
    });
  }
}

interface Participante {
  id: number;
  apellido: string;
  mail: string;
  nombre: string;
}