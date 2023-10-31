import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-recurso',
  templateUrl: './crear-recurso.component.html',
  styleUrls: ['./crear-recurso.component.css']
})
export class CrearRecursoComponent implements OnInit {
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
    categoria: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required]),
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
