import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecursoService } from 'src/app/recursos/recurso.service';

@Component({
  selector: 'app-paso4',
  templateUrl: './paso4.component.html',
  styleUrls: ['./paso4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso4Component implements OnInit {
  recursos: any = [];
  tiposDeRecursos: any = [];

  constructor(
    private modal: NgbModal,
    private service: RecursoService
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
      { id: 2, nombre: 'Comida' },
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
  }
}
