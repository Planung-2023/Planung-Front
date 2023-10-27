import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { ListaEventosService } from '../lista-eventos.service';
import { InvitacionControlService } from '../invitacion-control.service';
import { InvitadosControlService } from '../invitados-control.service';
import {HttpClient} from '@angular/common/http';
import { Time } from '@angular/common';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {
  eventos: any[] = [];
  recursos: Recurso[] = [];
  mostrarPopupInvitados = false;

  constructor(
    private router: Router,
    private http: HttpClient,
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
    }, error => {
      this.mockearEventos();
    });
  }

  private mockearEventos() {
    this.eventos = [
      { id: 1, nombre: 'Reunión Bayer', fechaHora: new Date(2023, 8, 18), hora: {hours: 10, minutes: 30}, ubicacion: 'Malvinas Argentinas 568, Caballito', tipoEvento: 'Formal', creador: 'German Sánchez', calle: 'Malvinas Argentinas', altura: 568 },
      { id: 2, nombre: 'Charla Siemens', fechaHora: new Date(2023, 10, 4), hora: {hours: 15, minutes: 0}, ubicacion: 'Aviador Matienzo 2026, Ciudad jardin', tipoEvento: 'Formal', creador: 'Andrea Fernandez', calle: 'Av. Rivadavia', altura: 656 },
      { id: 3, nombre: 'Cumpleaños Lucas', fechaHora: new Date(2023, 6, 25), hora: {hours: 22, minutes: 0}, ubicacion: 'Padre Vanini 1490, El Palomar', tipoEvento: 'Informal', creador: 'Lucas Espinoza', calle: 'Av. Rivadavia', altura: 656 }
    ];

    this.recursos = [
      {id: 1, cantidadActual: 3, cantidadNecesaria:6, descripcion: 'Esta es la coca para el fernet. No compren light ni cero.', nombre: 'Coca Cola'},
      {id: 2, cantidadActual: 8, cantidadNecesaria:8, descripcion: 'Silla o banqueta, informar elección.', nombre: 'Silla'},
      {id: 3, cantidadActual: 0, cantidadNecesaria:1, descripcion: 'Parlante grande para exterior, no traer portatil.', nombre: 'Parlantes'},
    ];
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
  creador: string;
  fechaHora: Date;
  hora: Time;
  ubicacion: string;
  calle: string;
  altura: number;
  tipoEvento: string;
}

interface Recurso {
  id: number;
  cantidadActual: number;
  cantidadNecesaria: number;
  descripcion: string;
  nombre: string;
}


