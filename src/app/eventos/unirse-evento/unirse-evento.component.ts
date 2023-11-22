import { Component, OnInit } from '@angular/core';
import { ListaEventosService } from '../lista-eventos.service';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { Time } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-unirse-evento',
  templateUrl: './unirse-evento.component.html',
  styleUrls: ['./unirse-evento.component.css']
})
export class UnirseEventoComponent implements OnInit {
  evento$: Observable<Evento> = EMPTY;
  eventoNuevo: Evento | undefined; // Cambiado a opcional
  usuario: Usuario | undefined;


  constructor(
    public auth0: AuthService,
    private listaEventoService: ListaEventosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const eventoIdRecibido = params['eventoId'];
      console.log('ID del evento recibido:', eventoIdRecibido);

      // Suscribirse al observable evento$ y asignar los datos al evento directo
      this.auth0.user$.subscribe((user) => {
        this.evento$ = this.listaEventoService.getEventoByID(eventoIdRecibido);
        this.evento$.subscribe((respuesta: any) => {
          console.log('Respuesta del servicio:', respuesta);
        
          if (respuesta && respuesta.evento) {
            this.eventoNuevo = respuesta.evento;
            console.log('Evento actual:', this.eventoNuevo);
          } else {
            console.error('La respuesta del servicio no contiene un evento válido.');
          }
        });
            
      });
      })
  }

  unirseEvento() {
    this.listaEventoService.unirseEvento(this.eventoNuevo!.id).subscribe(res => {console.log(res)});
  
  }
}

export interface Evento {
  id: number;
  nombre: string;
  creador: string;
  descripcion: string;
  tipoEvento: string;
  esVisible: boolean;
  fecha: Date;
  horafin: Time;
  horaInicio: Time;
  tipoInvitacion: string;
}


interface Usuario {
  id: number;
  idAuth0: string;
  nombreUsuario: string;
  email: string;
  nombre: string;
  apellido: string;
  fotoPerfilId: any;
}
