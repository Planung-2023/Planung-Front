import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import {HttpClient} from '@angular/common/http'
import { ListaEventosService } from './lista-eventos.service';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {
  eventos: any[] = [];
  recursos: Recurso[] = [];
  constructor(private router: Router, private http: HttpClient, private listaEventosService: ListaEventosService) {

  }

  ngOnInit() {
    /*this.http.get('http://localhost:8000/eventos', {params: {usuario_id: 1}}).subscribe((eventos: any) => {
      console.log("eventos: ", eventos)
      this.eventos = eventos;
    });  */
    this.listaEventosService.getEventos().subscribe((eventos: any) => {
      console.log(eventos);
      this.eventos = eventos;
    });

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

  irAConfiguracion(): void {
    this.router.navigate(['/configuracion']);
  }

  irANotificaciones(): void {
    this.router.navigate(['/notificaciones']);
  }

  visualizarRecurso(recurso: Recurso): void {
    this.router.navigate(['/visualizar-recurso'], { state: { recurso: recurso } });
  }
}

interface Recurso {
  id: number;
  cantidadActual: number;
  cantidadNecesaria: number;
  descripcion: string;
  nombre: string;
}
