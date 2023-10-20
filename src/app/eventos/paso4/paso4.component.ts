import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-paso4',
  templateUrl: './paso4.component.html',
  styleUrls: ['./paso4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso4Component {

dataEvento={
}
  constructor(private modal: NgbModal) {

  }

  mostrarCardAgregar(modal: any) {
  this.modal.open(modal, { centered: true }).result.then(
    (result: any) => {},
    (reason: any) => {}
  );
}
  getDatosPaso4(){
    return this.dataEvento
  }
}
