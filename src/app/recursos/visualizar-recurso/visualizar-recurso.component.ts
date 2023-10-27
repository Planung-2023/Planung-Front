import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecursoColorPickerService } from '../recurso-color-picker/recurso-color-picker.service';


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
  selectedColor: string | null = '#ef7d16';
  selectedColorClass: string = '#ef7d16';

  constructor(
    private router: Router,
    private RecursoColorPickerService: RecursoColorPickerService
  ) {
    this.RecursoColorPickerService.getSelectedColor().subscribe((color) => {
      this.selectedColor = color;
      this.selectedColorClass = this.getColorClass(color);
    });
    this.recurso = this.router.getCurrentNavigation()?.extras.state?.['recurso'];
  }

  ngOnInit() {

    this.selectedObjectType = 'Bebida';
    console.log(this.selectedObjectType);
    this.RecursoColorPickerService.getSelectedColor().subscribe((color) => {
      this.selectedColor = color || '#ef7d16';
    });

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
    console.log(this.selectedObjectType);
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

  ocultarComponenteColorPicker(){
    this.mostrarColorPicker = false;
  }

  getColorClass(color: string | null): string {
    if (!color) {
      return 'color-naranja';
    }

    if (color === '#ef7d16') {
      return 'color-naranja';
    } else if (color === '#76b730') {
      return 'color-verde';
    } else if (color === '#4e5fa8') {
      return 'color-azul';
    } else if (color === '#df3c65') {
      return 'color-rosa';
    } else if (color === '#9f9f9e') {
      return 'color-gris';
    }

    return 'color-naranja';
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
