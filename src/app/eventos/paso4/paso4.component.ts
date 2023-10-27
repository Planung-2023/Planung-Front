import { ChangeDetectionStrategy, ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecursosService } from 'src/app/recursos/recursos.service';

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
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    horaInicio: new FormControl('', [Validators.required]),
    horaFin: new FormControl('', [Validators.required]),
    todoElDia: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
  });
  dataEvento={
    recursos: this.recursos
  } 
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
      },
      (reason: any) => {}
    );
}

verificarFormularioCompleto(){
    
}

  getDatosPaso4(){
    return this.recursos;
    console.log(this.dataEvento);
  }
  
}
