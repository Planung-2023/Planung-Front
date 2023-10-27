import { ChangeDetectionStrategy, ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecursosService } from 'src/app/recursos/recursos.service';

@Component({
  selector: 'app-paso4',
  templateUrl: './paso4.component.html',
  styleUrls: ['./paso4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/*
export class Paso4Component {
@ViewChild('containerToCopy') containerToCopy: ElementRef;
dataEvento={
  recursos :[] = [
    {id: 1, nombre: 'Coca Cola', color:'rosa', tipo:'bebida', descripcion: 'Esta es la coca para el fernet. No compren light ni cero.', cantidadNecesaria:6},
    {id: 2, nombre: 'Silla', color:'rosa', tipo:'mobiliario', descripcion: 'Silla o banqueta, informar elección.', cantidadNecesaria:8},
    {id: 3, nombre: 'Parlantes', color:'rosa', tipo:'tecnología', descripcion: 'Parlante grande para exterior, no traer portatil.', cantidadNecesaria:1},
  ]
}
containers: HTMLElement[] = [];*/
export class Paso4Component implements OnInit {
  recursos: any = [];
  tiposDeRecursos: any = [];

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

  getDatosPaso4(){
    return this.recursos;
    console.log(this.dataEvento);
  }
  
}
