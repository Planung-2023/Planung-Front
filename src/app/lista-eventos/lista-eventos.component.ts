import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {
  eventos: Evento[] = [];
  recursos: Recurso[] = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.eventos = [
      { id: 1, titulo: 'Reunión Bayer', fecha: '18-09-2023', hora:'10:30 am', lugar: 'Malvinas Argentinas 568, Caballito', estilo: 'Formal', organizador: 'German Sánchez' },
      { id: 2, titulo: 'Charla Siemens', fecha: '04-11-2023', hora:' 15:00 pm', lugar: 'Aviador Matienzo 2026, Ciudad jardin', estilo: 'Formal', organizador: 'Andrea Fernandez' },
      { id: 3, titulo: 'Cumpleaños Lucas', fecha: '25-07-2023', hora:' 22:00 pm', lugar: 'Padre Vanini 1490, El Palomar', estilo: 'Informal', organizador: 'Lucas Espinoza' }
    ];

    this.recursos = [
      {id: 1, cantidadActual: 3, cantidadNecesaria:6, descripcion: 'Esta es la coca para el fernet. No compren light ni cero.', nombre: 'Coca Cola'},
      {id: 2, cantidadActual: 8, cantidadNecesaria:8, descripcion: 'Silla o banqueta, informar elección.', nombre: 'Silla'},
      {id: 3, cantidadActual: 0, cantidadNecesaria:1, descripcion: 'Parlante grande para exterior, no traer portatil.', nombre: 'Parlantes'},
    ];

    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  redireccionarCrearEvento(): void {
    this.router.navigate(['/crear-evento']);
  }

  agregarRecurso(): void {
    this.router.navigate(['/crear-recurso']);
  }

  visualizarRecurso(recurso: Recurso): void {
    this.router.navigate(['/visualizar-recurso'], { state: { recurso } });
  }
}

interface Evento {
  id: number;
  organizador: string;
  fecha: string;
  hora: string;
  lugar: string;
  estilo: string;
  titulo: string;
}

interface Recurso {
  id: number;
  cantidadActual: number;
  cantidadNecesaria: number;
  descripcion: string;
  nombre: string;
}