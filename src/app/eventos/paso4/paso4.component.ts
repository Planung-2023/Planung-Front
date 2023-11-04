import { ChangeDetectionStrategy, EventEmitter, Component, ElementRef, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { RecursoService } from 'src/app/recursos/recurso.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-paso4',
  templateUrl: './paso4.component.html',
  styleUrls: ['./paso4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Paso4Component implements OnInit {
  @Output() eventoCerrar = new EventEmitter<void>();
  recursos: any = [];
  tiposDeRecursos: any = [];
  formulario = new FormGroup({
    recursos: new FormControl([]),
  });
  modoBorrado: boolean = false;
  constructor(
    private modal: NgbModal,
    private service: RecursoService
    ) {}
  
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

  validarYCerrarModal(componenteCrearRecurso: any) {
    if ( componenteCrearRecurso.formulario.valid) {
      return true;
    } else {
      //alert('Completar los Campos');
      this.activarError();
      console.log("ERROR");
      return false;
    }
  }

  activarError() {
    this.eventoCerrar.emit();
  }


  mostrarCardBorrar(borrarRecurso: any, recurso:any) {
    const index = this.recursos.indexOf(recurso);
    this.modal.open(borrarRecurso, { centered: true, size: 'sm' }).result.then(
      (result) => {
        this.recursos.splice(index, 1); // Elimina el recurso de la lista
        this.formulario.get('recursos')?.setValue(this.recursos); // Actualiza el valor del formulario
      },
      (reason) => {
      }
    )
  }
  getDatosPaso4(){
    return this.formulario.value;
  }
}
