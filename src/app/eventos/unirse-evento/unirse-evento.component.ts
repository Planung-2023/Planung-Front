import { Component, OnInit } from '@angular/core';
import { ListaEventosService } from '../lista-eventos.service';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { Time } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Creador } from 'src/app/recursos/visualizar-recurso/eventoInterface';
import { PerfilService } from 'src/app/perfil/perfil.service';

@Component({
  selector: 'app-unirse-evento',
  templateUrl: './unirse-evento.component.html',
  styleUrls: ['./unirse-evento.component.css']
})
export class UnirseEventoComponent implements OnInit {
  evento$: Observable<Evento> = EMPTY;
  eventoNuevo: Evento | undefined;
  usuario: Usuario | undefined;
  accessToken: string | null = null;

  constructor(
    public auth0: AuthService,
    private listaEventoService: ListaEventosService,
    private route: ActivatedRoute,
    private router: Router,
    private perfilService: PerfilService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token');

    this.route.queryParams.subscribe(params => {
      const eventoIdRecibido = params['eventoId'];

      this.auth0.user$.subscribe((user) => {
        this.evento$ = this.listaEventoService.getEventoByID(eventoIdRecibido);
        this.evento$.subscribe((respuesta: any) => {
          if (respuesta && respuesta.evento2) {
            this.eventoNuevo = respuesta.evento2;
          }
        });
      });
    });
  }

  unirseEvento() {
    if (this.accessToken) {
      this.listaEventoService.unirseEvento(this.eventoNuevo!.id, this.accessToken).subscribe(
        (res: any) => {
          console.log(res);
          if (this.eventoNuevo?.tipoInvitacion === 'Por Aprobacion') {
            this.mostrarSnackbar('Te has unido al evento. Esperando aceptación.');
          } else if (this.eventoNuevo?.tipoInvitacion === 'Directa') {
            this.mostrarSnackbar('Te has unido al evento exitosamente.');
          } else {
            console.error('Respuesta del backend no reconocida:', res);
          }
        },
        (error: any) => {
          console.error('Error al unirse al evento:', error);
          this.mostrarSnackbar('Error al unirse al evento. Por favor, inténtalo nuevamente.');
        }
      );
    } else {
      console.error('No se encontró el token de acceso en el localStorage.');
    }
  }

  private mostrarSnackbar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}

export interface Evento {
  id: number;
  nombre: string;
  creador: Creador;
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
