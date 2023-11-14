import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
  @Input() editarRecurso: any;
  constructor(

  ) { }

  ngOnInit() {
    if (this.editarRecurso!=null) {
      this.llenarFormulario(this.editarRecurso);
    }
  }
  llenarFormulario(recurso: any) {
    console.log('Llenando formulario con:', recurso);
    this.formulario.patchValue({
      nombre: recurso.nombre,
      descripcion: recurso.descripcion,
      categoria: recurso.categoria,
      cantidad: recurso.cantidad,
    });
  }
  public obtenerDatos() {
    return this.formulario.value;
  }
  
}
