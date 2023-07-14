import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizar-recurso',
  templateUrl: './visualizar-recurso.component.html',
  styleUrls: ['./visualizar-recurso.component.css']
})
export class VisualizarRecursoComponent implements OnInit {
  recurso: Recurso | undefined;
  responsables: Responsable[] = [];
  isFlipped: boolean = false;

  ngOnInit() {
    this.responsables = [
      { id: 1, nombre: 'Juan', cantidad: 2 },
      { id: 2, nombre: 'Bruno', cantidad: 1 },
      { id: 3, nombre: 'Pedro', cantidad: 1 },
      { id: 4, nombre: 'Daniel', cantidad: 2 }
    ];

    this.recurso = {
      id: 1,
      cantidadActual: this.responsables.reduce((total, responsable) => total + responsable.cantidad, 0),
      cantidadNecesaria: 6,
      descripcion: 'Esta es la coca para el fernet. No compren light ni cero.',
      nombre: 'Coca Cola'
    };
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  getTextoCantidad(): string {
    if (this.recurso) {
      if (this.recurso.cantidadActual < this.recurso.cantidadNecesaria) {
        return `Aún falta ${this.recurso.cantidadActual}/${this.recurso.cantidadNecesaria}`;
      } else {
        return `Se tiene la necesaria`;
      }
    }
    return '';
  }
}

interface Responsable {
  id: number;
  nombre: string;
  cantidad: number;
}

interface Recurso {
  id: number;
  cantidadActual: number;
  cantidadNecesaria: number;
  descripcion: string;
  nombre: string;
}
