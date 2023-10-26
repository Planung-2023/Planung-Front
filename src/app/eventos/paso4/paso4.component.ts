import { ChangeDetectionStrategy, ViewChild, Component, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-paso4',
  templateUrl: './paso4.component.html',
  styleUrls: ['./paso4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Paso4Component {
@ViewChild('containerToCopy') containerToCopy: ElementRef;
dataEvento={
  recursos :[] = [
    {id: 1, nombre: 'Coca Cola', color:'rosa', tipo:'bebida', descripcion: 'Esta es la coca para el fernet. No compren light ni cero.', cantidadNecesaria:6},
    {id: 2, nombre: 'Silla', color:'rosa', tipo:'mobiliario', descripcion: 'Silla o banqueta, informar elección.', cantidadNecesaria:8},
    {id: 3, nombre: 'Parlantes', color:'rosa', tipo:'tecnología', descripcion: 'Parlante grande para exterior, no traer portatil.', cantidadNecesaria:1},
  ]
}
containers: HTMLElement[] = [];

  
constructor(private modal: NgbModal) {
  this.containerToCopy = new ElementRef(null);
  interface Recurso {
    id: number;
    cantidadActual: number;
    cantidadNecesaria: number;
    descripcion: string;
    nombre: string;
  }
}

  mostrarCardAgregar(modal: any) {
  this.modal.open(modal, { centered: true }).result.then(
    (result: any) => {},
    (reason: any) => {}
  );
}

  createDiv(): void {
    const containerCopy = this.containerToCopy.nativeElement.cloneNode(true);
    this.containers.push(containerCopy);
  }

  getDatosPaso4(){
    return this.dataEvento
  }
  
}
