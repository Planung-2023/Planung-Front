import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { ListaEventosService } from '../lista-eventos.service';
import { InvitacionControlService } from '../invitacion-control.service';
import { InvitadosControlService } from '../invitados-control.service';
import { Time } from '@angular/common';
import {} from 'googlemaps';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})

export class ListaEventosComponent implements OnInit {
  invitadoSeleccionado: string = '';
  usuario: Usuario|undefined;
  eventos: any[] = [];
  recursos: Recurso[] = [];
  asistentes: Asistente[] = [];
  mostrarMapa: boolean = false;
  mostrarPopupInvitados = false;
  panelAbierto: string = 'todos';
  apiLoaded: boolean = true;
  display: any;
  position = {lat: 34.598613, lng: 58.415632}
  label = {
    color: "red",
    text: "marcador",
  }
  options: google.maps.MapOptions = {
    center: this.position,
    zoom: 17,
  };
  invitadosComponent: any;
  participante: Participante|undefined;
  
  Rol: Rol|undefined;

  constructor(
    private router: Router,
    private listaEventosService: ListaEventosService,
    private invitacionControlService: InvitacionControlService,
    private invitadosControlService: InvitadosControlService,
    private dialog: MatDialog,
    public auth0: AuthService,
  ) {}
  
  ngOnInit() {
      this.auth0.user$.subscribe((user) => {
      const authIdentifier = user?.sub;
      this.listaEventosService.getUsuarioId(authIdentifier).subscribe(({usuario}: any) => {
        this.usuario = usuario;
  });
})
    this.recuperarEventos();
    console.log(this.recuperarEventos())
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  // Método para mostrar el popup
  showPopup() {
    this.invitacionControlService.showPopup();
  }

  showPopupInvitado(nombreInvitado: string, apellidoInvitado: string, evento: Evento) {
    this.invitadoSeleccionado = nombreInvitado;
    this.invitadosControlService.soyAdmin = this.esAdministrador(evento);
    this.invitadosControlService.usuarioId = this.usuario?.id;
    this.invitadosControlService.invitadoNombre = nombreInvitado;
    this.invitadosControlService.invitadoApellido = apellidoInvitado;
    this.invitadosControlService.showPopupInvitado();
  }

  mostrarInvitado(nombreInvitado: string) {
    this.invitadoSeleccionado = nombreInvitado;
  }

    //ejemplo
  private recuperarEventos() {
    this.listaEventosService.getEventos(this.usuario?.id).subscribe(data => {
      this.eventos = data;
      this.eventos.forEach(evento => this.listaEventosService.getRecursosByEventoId(evento.id).subscribe(
        (data: Recurso[]) => {
          evento.recursos = data;
        }
      ))
  
      this.eventos.forEach(evento => this.listaEventosService.getAsistentes(evento.id).subscribe(
        (data: Asistente[]) => {
          
          evento.asistentes = data;
      }))
    }
    );
  }

  formatearHora(hora: string): string {
    return hora.slice(0, 5);
  }

  esAdministrador(evento:Evento){
    return evento.asistentes?.find(a => a.participante.usuario.id === this.usuario?.id)?.esAdministrador; 
  }


  redireccionarCrearEvento(): void {
    this.router.navigate(['/eventos', 'crear']);
  }


  agregarRecurso(evento: any): void {
    this.router.navigate(['/eventos', evento.id, 'recursos', 'crear']);
  }

  irAConfiguracion(): void {
    this.router.navigate(['/configuracion']);
  }

  irANotificaciones(): void {
    this.router.navigate(['/notificaciones']);
  }

  visualizarRecurso(evento: any, recurso: Recurso): void {
    this.router.navigate(['/eventos', evento.id, 'recursos', recurso.id ], { state: { recurso: recurso } });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null){
      this.position = (event.latLng.toJSON());
      const coordenadas = event.latLng.toJSON();
    }
}

verMapa() {
  this.mostrarMapa = true;
}

volverAtras() {
  this.mostrarMapa = false;
}

openMapDialog(evento:Evento) {
  const dialogRef = this.dialog.open(MapDialogComponent, {
    width: '80%',
    height: '50%',
    data: {
      position: this.position,
      options: this.options,
    },
  });
  this.position.lat=evento.ubicacion.latitud;
  this.position.lng=evento.ubicacion.longitud;
}

abrirPanel(panel: string) {
  this.panelAbierto = panel;
}

cerrarPanel(panel: string) {
  if (this.panelAbierto === panel) {
    this.panelAbierto = 'todos';
  }
}
}

//Agregado para pruebas
interface Evento {
  id: number;
  nombre: string;
  creador: Participante;
  fecha: Date;
  horaInicio: Date;
  horaFin: Date;
  ubicacion: ubicacion;
  calle: string;
  altura: number;
  tipoEvento: string;
  recursos: Recurso[];
  asistentes: Asistente[];
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

interface Recurso {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadActual: number;
  cantidadNecesaria: number;
  proveedor: string;
  recursoCategoriaId: number;
  colorTarjeta: string;
  eventoId: number;
  categoria: Categoria;
}

interface Categoria {
  id: number;
  nombre: string;
  icono: string;
}

interface Creador{
  id: number;
  nombreUsuario: string;
}

interface ubicacion{
  id: number,
  calle: string,
  altura: number,
  localidad: string,
  latitud: number,
  longitud: number
}
interface Asistente {
  id: number;
  activo: boolean;
  participante: Participante;
  rol: Rol;
  esAdministrador: boolean;
}

interface Participante {
  id: number;
  apellido: string;
  mail: string;
  nombre: string;
  usuario: any;
}

interface Rol {
  id: number;
  nombre: string;
}