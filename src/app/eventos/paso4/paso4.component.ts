import { ChangeDetectionStrategy, ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { RecursosService } from 'src/app/recursos/recursos.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-paso4',
  templateUrl: './paso4.component.html',
  styleUrls: ['./paso4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Paso4Component implements OnInit {
  recursos: any = [];
  tiposDeRecursos: any = [];
  formulario = new FormGroup({
    recursos: new FormControl([]),
  });
  modoBorrado: boolean = false;
  constructor(
    private modal: NgbModal,
    private service: RecursosService
    ) {
    }
  

  ngOnInit() {
    this.service.tiposDeRecursos().subscribe({
      next: v => {
        this.tiposDeRecursos = v;
      },
      error: e => {
        console.log(e);
        this.mockearTiposDeRecursos();
      },
      complete: () => {},
    });
  }

  private mockearTiposDeRecursos() {
    this.tiposDeRecursos = [
      { id: 1, nombre: 'Bebida' },
      { id: 2, nombre: 'Mobiliario' },
      { id: 3, nombre: 'Comida' },
      { id: 4, nombre: 'Juego' },
      { id: 5, nombre: 'Tecnología' },
      { id: 6, nombre: 'Otro' },
    ];
  }

  nombreTipoRecursoSegunId(id: string|number) {
    return this.tiposDeRecursos.find((t: any ) => t.id == id)?.nombre;
  }

  mostrarCardAgregar(modal: any) {
    this.modal.open(modal, { centered: true, size: 'sm'}).result.then(
      (result: any) => {
        this.recursos.push(result.obtenerDatos());
        this.formulario.get('recursos')?.setValue(this.recursos);
       
      },
      (reason: any) => {}
    );
}
/*validarYCerrarModal(componenteCrearRecurso: any) {
  if ( componenteCrearRecurso.obtenerDatos().valid) {
    
    return true;
  } else {
    console.log('El formulario del recurso no está completo o es inválido');
    return false;
    
  }
}*/
cambiarAModoBorrado(event:MatSlideToggleChange){
  this.modoBorrado=event.checked;
}
eliminarRecurso(recurso: any) {
  const index = this.recursos.indexOf(recurso);
  if (index !== -1) {
    this.recursos.splice(index, 1); // Elimina el recurso de la lista
    this.formulario.get('recursos')?.setValue(this.recursos); // Actualiza el valor del formulario
  }
}

  getDatosPaso4(){
    return this.formulario.value;
  }
}
