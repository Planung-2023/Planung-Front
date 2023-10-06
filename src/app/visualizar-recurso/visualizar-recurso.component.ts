import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizar-recurso',
  templateUrl: './visualizar-recurso.component.html',
  styleUrls: ['./visualizar-recurso.component.css']
})
export class VisualizarRecursoComponent implements OnInit {
  public selectedObjectType: string | null = null;
  public objectTypes: string[] = ['Bebida', 'Mobiliario', 'Comida', 'Juego', 'Tecnología', 'Otro'];
  recurso: Recurso | undefined;
  responsables: Responsable[] = [];
  isFlipped: boolean = false;
  descripcion: string = '';
  panelAbierto: string = 'todos';
  mostrarColorPicker: boolean = false;

  constructor(private router: Router) {
    this.recurso = this.router.getCurrentNavigation()?.extras.state?.['recurso'];
  }

  ngOnInit() {
    this.responsables = [
      { id: 1, nombre: 'Juan', cantidad: 2 },
      { id: 2, nombre: 'Bruno', cantidad: 1 },
      { id: 3, nombre: 'Pedro', cantidad: 1 },
      { id: 4, nombre: 'Daniel', cantidad: 2 }
    ];

    /*this.recurso = {
      id: 1,
      cantidadActual: this.responsables.reduce((total, responsable) => total + responsable.cantidad, 0),
      cantidadNecesaria: 6,
      descripcion: 'Esta es la coca para el fernet. No compren light ni cero.',
      nombre: 'Coca Cola'
    };*/
  }

  getCantidadTotal(): number {
    let cantidadTotal = 0;
    for (const responsable of this.responsables) {
      cantidadTotal += responsable.cantidad;
    }
    return cantidadTotal;
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

  selectObjectType(type: string) {
    this.selectedObjectType = type;
  }

  abrirPanel(panel: string) {
    this.panelAbierto = panel;
  }

  cerrarPanel(panel: string) {
    if (this.panelAbierto === panel) {
      this.panelAbierto = 'todos';
    }
  }

  mostrarComponenteColorPicker(){
    this.mostrarColorPicker = true;
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

