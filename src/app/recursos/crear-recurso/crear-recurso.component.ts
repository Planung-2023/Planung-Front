import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.css']
})
export class CrearRecursoComponent {
  nombre = '';
  cantidadNecesaria = 0;
  descripcion = '';

  constructor() { }
}
