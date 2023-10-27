import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { ListaEventosService } from '../lista-eventos.service';
import { InvitacionControlService } from '../invitacion-control.service';
import { InvitadosControlService } from '../invitados-control.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {
  eventos: Evento[] = [];
  recursos: Recurso[] = [];
  mostrarPopupInvitados = false;

  constructor(
    private router: Router,
    private listaEventosService: ListaEventosService,
    private invitacionControlService: InvitacionControlService,
    private invitadosControlService: InvitadosControlService // Inyecta el servicio de invitados
  ) {}

  // Método para mostrar el popup
  showPopup() {
    this.invitacionControlService.showPopup();
  }

  showPopupInvitado() {
    this.invitadosControlService.showPopupInvitado();
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
  }

  private recuperarEventos() {
    this.listaEventosService.getEventos().subscribe(data => {
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
      { id: 1, nombre: 'Reunión Bayer', fechaHora: new Date(2023, 8, 18), hora: {hours: 10, minutes: 30}, ubicacion: ubicacion1, tipoEvento: 'Formal', creador: creador1, calle: 'Malvinas Argentinas', altura: 568 , recursos:[]},
      { id: 2, nombre: 'Charla Siemens', fechaHora: new Date(2023, 10, 4), hora: {hours: 15, minutes: 0}, ubicacion: ubicacion1, tipoEvento: 'Formal', creador: creador1, calle: 'Av. Rivadavia', altura: 656 , recursos:[] },
      { id: 3, nombre: 'Cumpleaños Lucas', fechaHora: new Date(2023, 6, 25), hora: {hours: 22, minutes: 0}, ubicacion: ubicacion1, tipoEvento: 'Informal', creador: creador1, calle: 'Av. Rivadavia', altura: 656 , recursos:[] }
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
}

//Agregado para pruebas
interface Evento {
  id: number;
  nombre: string;
  creador: Creador;
  fechaHora: Date;
  hora: Time;
  ubicacion: ubicacion;
  calle: string;
  altura: number;
  tipoEvento: string;
  recursos: Recurso[];
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
  "id": 2,
  "calle": "Av. Nazca",
  "altura": 2500,
  "localidad": "C.A.B.A.",
  "latitud": 30,
  "longitud": 30
}