import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import {HttpClient} from '@angular/common/http';
import { ListaEventosService } from '../lista-eventos.service';

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
      this.listaEventosService.getRecursosByEventoId(this.eventos[0].id).subscribe(
        (data: Recurso[]) => {
          this.recursos = data;
        }
      );
    });

  /*  this.recursos = [
      {id: 1, cantidadActual: 3, cantidadNecesaria:6, descripcion: 'Esta es la coca para el fernet. No compren light ni cero.', nombre: 'Coca Cola'},
      {id: 2, cantidadActual: 8, cantidadNecesaria:8, descripcion: 'Silla o banqueta, informar elección.', nombre: 'Silla'},
      {id: 3, cantidadActual: 0, cantidadNecesaria:1, descripcion: 'Parlante grande para exterior, no traer portatil.', nombre: 'Parlantes'},
    ];*/

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