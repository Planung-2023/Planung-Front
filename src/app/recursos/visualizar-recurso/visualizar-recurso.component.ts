import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecursoColorPickerService } from '../recurso-color-picker/recurso-color-picker.service';
import { RecursoService } from '../recurso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionGuardadoComponent } from './notificacion-guardado/notificacion-guardado.component';


@Component({
  selector: 'app-visualizar-recurso',
  templateUrl: './visualizar-recurso.component.html',
  styleUrls: ['./visualizar-recurso.component.css']
})
export class VisualizarRecursoComponent implements OnInit {
  public selectedObjectType: Categoria | undefined;
  public objectTypes: Categoria[] = [];
  recurso: Recurso;
  responsables: Responsable[] = [];
  isFlipped: boolean = false;
  descripcion: string = '';
  panelAbierto: string = 'todos';
  mostrarColorPicker: boolean = false;
  selectedColor: string | null = '#ef7d16';
  selectedColorClass: string = '#ef7d16';
  categoria: Categoria | undefined;

  constructor(
    private router: Router,
    private RecursoColorPickerService: RecursoColorPickerService,
    private RecursoService: RecursoService,
    private _snackBar: MatSnackBar, 
  ) {
    this.recurso = this.router.getCurrentNavigation()?.extras.state?.['recurso'];
    this.descripcion = this.recurso.descripcion;
    this.RecursoService
    .obtenerMensajeGuardadoExitoso()
    .subscribe(() => this.mostrarMensajeGuardadoExitoso());
  }

  ngOnInit() {
    this.RecursoService.tiposDeRecursos().subscribe({
      next: (v:Categoria[]|any) => {
        this.objectTypes = v;
      },
      error: e => {
        console.log(e);
       // this.mockearTiposDeRecursos();
      },
      complete: () => {},
    });


    this.RecursoColorPickerService.getSelectedColor().subscribe((color) => {
      this.selectedColor = color;
      this.selectedColorClass = this.getColorClass(color);
    });

    this.RecursoService.getCategoriaByRecurso(this.recurso.id).subscribe(
      (data: Categoria) => {
        this.categoria = data;
        this.selectObjectType(this.categoria);
        console.log(this.selectedObjectType);
        console.log(this.selectedColor);
      }
    );

    this.selectedColor = this.recurso.colorTarjeta;
    this.selectedColorClass = this.getColorClass(this.recurso.colorTarjeta);

    this.responsables = [
      { id: 1, nombre: 'Juan', cantidad: 2 },
      { id: 2, nombre: 'Bruno', cantidad: 1 },
      { id: 3, nombre: 'Pedro', cantidad: 1 },
      { id: 4, nombre: 'Daniel', cantidad: 2 }
    ];
  }

  getCantidadTotal(): number {
   /*  let cantidadTotal = 0;
    for (const responsable of this.responsables) {
      cantidadTotal += responsable.cantidad;
    }
    return cantidadTotal; */

    return this.recurso.cantidadActual;
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

  selectObjectType(type: Categoria) {
    this.selectedObjectType = type;
    //Agregar metodo put
    this.mostrarMensajeGuardadoExitoso();
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

  mostrarMensajeGuardadoExitoso()  {
    this._snackBar.openFromComponent(NotificacionGuardadoComponent, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}

interface Responsable {
  id: number;
  nombre: string;
  cantidad: number;
}

interface Recurso {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadActual: number;
  cantidadNecesaria: number;
  cantidad: number;
  proveedor: string;
  recursoCategoriaId: number;
  colorTarjeta: string;
  eventoId: number;
  categoria: Categoria;
}

interface Categoria {
  id: number;
  nombre: string;
  icono: string;
}
