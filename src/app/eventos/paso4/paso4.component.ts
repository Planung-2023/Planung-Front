import { ChangeDetectionStrategy, EventEmitter, Component, ElementRef, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { RecursosService } from 'src/app/recursos/recursos.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Modal } from 'ng-bootstrap-modal';

@Component({
  selector: 'app-paso4',
  templateUrl: './paso4.component.html',
  styleUrls: ['./paso4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Paso4Component implements OnInit {
  @Output() eventoCerrar = new EventEmitter<void>();
  recursos: any = [];
  recursoAEditar: any|undefined = null;
  tiposDeRecursos: any = [];
  formulario = new FormGroup({
    recursos: new FormControl([]),
  });
  modoBorrado: boolean = false;
  constructor(
    private modal: NgbModal,
    private service: RecursosService
    ) {}
  
  ngOnInit() {
    this.service.tiposDeRecursos().subscribe({
      next: v => {
        this.tiposDeRecursos = v;
      },
      error: e => {
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

  mostrarCardAgregar(modal: any, recurso?: any) {
    const modalRef = this.modal.open(modal, { centered: true, size: 'sm'});
    const index = this.recursos.indexOf(recurso);
    if (recurso) {
      this.recursoAEditar = this.recursos[index]
      
    }
    modalRef.result.then(
      (result: any) => {
        if (recurso!=null) {
          // Si es una edición, reemplazar el recurso existente con los nuevos datos
          this.recursos[index] = result.obtenerDatos();
        } else {
          // Si es una adición normal, agregar el nuevo recurso
          this.recursos.push(result.obtenerDatos());
          this.recursoAEditar = null
        }
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
      return false;
    }
  }
  resetRecursoActual(){
    this.recursoAEditar = null
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
