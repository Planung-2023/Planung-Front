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

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})

export class ListaEventosComponent implements OnInit {
  invitadoSeleccionado: string = '';
  eventos: any[] = [];
  recursos: Recurso[] = [];
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
    zoom: 15,
  };
  invitadosComponent: any;
  participante: Participante|undefined;
  asistente: Asistente[] = [];
  Rol: Rol|undefined;

  constructor(
    private router: Router,
    private listaEventosService: ListaEventosService,
    private invitacionControlService: InvitacionControlService,
    private invitadosControlService: InvitadosControlService,
    private dialog: MatDialog,
  ) {}

  // Método para mostrar el popup
  showPopup() {
    this.invitacionControlService.showPopup();
  }

  showPopupInvitado(nombreInvitado: string, apellidoInvitado: string) {
    this.invitadoSeleccionado = nombreInvitado;
    this.invitadosControlService.invitadoNombre = nombreInvitado;
    this.invitadosControlService.invitadoApellido = apellidoInvitado;
    this.invitadosControlService.showPopupInvitado();
  }

  mostrarInvitado(nombreInvitado: string) {
    this.invitadoSeleccionado = nombreInvitado;
  }

  ngOnInit() {
    this.recuperarEventos();
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    this.listaEventosService.getAsistentes(1).subscribe((data: any) => {
      this.asistente = data.asistentes; // Asigna los datos al arreglo "asistente".
    });
  }

  //ejemplo
  private recuperarEventos() {
    this.listaEventosService.getEventos(1).subscribe(data => {
      this.eventos = data;
      this.eventos.forEach(evento => this.listaEventosService.getRecursosByEventoId(evento.id).subscribe(
        (data: Recurso[]) => {
          evento.recursos = data;
        }
      ))
    }, error => {
      this.mockearEventos();
    });
  }

  private mockearEventos() {
    const creador1: Creador = {
      id: 1,
      nombreUsuario: 'Claudio Gomez'
    }

    const ubicacion1: ubicacion = {
      id: 2,
      calle: "Av. Nazca",
      altura: 2500,
      localidad: "C.A.B.A.",
      latitud: 30,
      longitud: 30
    }

    this.eventos = [
      { id: 1, nombre: 'Reunión Bayer', fechaHora: new Date(2023, 8, 18), hora: new Date(2023, 8, 18, 10, 22, 0), ubicacion: ubicacion1, tipoEvento: 'Formal', creador: 'German Sánchez', calle: 'Malvinas Argentinas', altura: 568, invitados: [{ nombre: 'Jorge López' }, { nombre: 'Juancho De Los Bosques' }, { nombre: 'Ramiro Causa' }, { nombre: 'Nelson Mandela' }, { nombre: 'Luciano De Los Pantanos' }, { nombre: 'Juanjo De Berazategui' }, { nombre: 'El_OppenJaime' } ] },
      { id: 2, nombre: 'Charla Siemens', fechaHora: new Date(2023, 10, 4), hora: new Date(2023, 8, 18, 10, 22, 0), ubicacion: ubicacion1, tipoEvento: 'Formal', creador: 'Andrea Fernandez', calle: 'Av. Rivadavia', altura: 656, invitados: [{ nombre: 'Jorge López' }, { nombre: 'Juancho De Los Bosques' }]},
      { id: 3, nombre: 'Cumpleaños Lucas', fechaHora: new Date(2023, 6, 25), hora: new Date(2023, 8, 18, 10, 22, 0), ubicacion: ubicacion1, tipoEvento: 'Informal', creador: 'Lucas Espinoza', calle: 'Av. Rivadavia', altura: 656, invitados: [{ nombre: 'Jorge López' }, { nombre: 'Juancho De Los Bosques' }] }
    ];

    /*this.recursos = [
      {id: 1, cantidadActual: 3, cantidadNecesaria:6, descripcion: 'Esta es la coca para el fernet. No compren light ni cero.', nombre: 'Coca Cola'},
      {id: 2, cantidadActual: 8, cantidadNecesaria:8, descripcion: 'Silla o banqueta, informar elección.', nombre: 'Silla'},
      {id: 3, cantidadActual: 0, cantidadNecesaria:1, descripcion: 'Parlante grande para exterior, no traer portatil.', nombre: 'Parlantes'},
    ];*/
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
      this.position = (event.latLng.toJSON()); //Obtenes las coordenadas donde ocurrió el evento del click
      const coordenadas = event.latLng.toJSON(); // Obtenes las coordenadas en formato JSON
      this.dataEvento.latitud = coordenadas.lat;
      this.dataEvento.longitud = coordenadas.lng;
    }
    console.log(this.dataEvento);
}

dataEvento = {
  latitud: -34.598613,
  longitud: -58.415632,
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
    height: '40%',
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
export interface Evento {
  id: number;
  nombre: string;
  creador: Creador;
  fecha: Date;
  horaInicio: Date;
  horaFin: Date;
  ubicacion: ubicacion;
  calle: string;
  altura: number;
  tipoEvento: string;
  recursos: Recurso[];
  invitados: { nombre: string }[];
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
}

interface Participante {
  id: number;
  apellido: string;
  mail: string;
  nombre: string;
}

interface Rol {
  id: number;
  nombre: string;
}
