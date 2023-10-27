import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.css']
})
export class CrearRecursoComponent implements OnInit {
  formulario = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    categoria: new FormControl(''),
    cantidad: new FormControl(''),
  });
  @Input() tiposDeRecursos: any = [];

  constructor(

  ) { }

  ngOnInit() {

  }

  public obtenerDatos() {
    return this.formulario.value;
  }
}
