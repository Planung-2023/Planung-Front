import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('descripcionTextarea') descripcionTextarea: ElementRef | undefined;
  public selectedObjectType: Categoria | undefined;
  public objectTypes: Categoria[] = [];
  recurso: Recurso;
  evento: Evento;
  isFlipped: boolean = false;
  descripcion: string = '';
  panelAbierto: string = 'todos';
  mostrarColorPicker: boolean = false;
  selectedColor: string;
  selectedColorClass: string = '#ef7d16';
  categoria: Categoria;
  asignaciones: Asignaciones[] = [];
  asistente: Asistente | undefined;
  participante: Participante | undefined;
  rol: Rol |undefined;

  constructor(
    private router: Router,
    private RecursoColorPickerService: RecursoColorPickerService,
    private RecursoService: RecursoService,
    private _snackBar: MatSnackBar, 
  ) {
    this.recurso = this.router.getCurrentNavigation()?.extras.state?.['recurso'];
    this.evento = this.recurso.evento;
    this.categoria = this.recurso.categoria;
    this.descripcion = this.recurso.descripcion;
    this.selectedColor = this.recurso.colorTarjeta;
    this.RecursoService
    .obtenerMensajeGuardadoExitoso()
    .subscribe(() => this.mostrarMensajeGuardadoExitoso());
    this.RecursoService.getColorSeleccionado().subscribe((color) => {
      if(color!=null)
      this.selectedColor = color;
      this.selectedColorClass = this.getColorClass(color);
    });
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

    this.RecursoService.getAsignacionesByRecursoId(this.recurso.id).subscribe(
      (info: Asignaciones[]|any) => {
        this.asignaciones = info;
      }
    );

    this.RecursoColorPickerService.getSelectedColor().subscribe((color) => {
      if(color!=null)
      this.selectedColor = color;
      this.selectedColorClass = this.getColorClass(color);
    });

    this.RecursoService.getCategoriaByRecurso(this.recurso.id).subscribe(
      (data: Categoria) => {
        this.categoria = data;
        this.selectedObjectType = this.categoria;
        this.recurso.recursoCategoriaId = this.categoria.id;
      }
    );

    this.selectedColor = this.recurso.colorTarjeta;
    this.selectedColorClass = this.getColorClass(this.recurso.colorTarjeta);

    this.descripcionTextarea?.nativeElement.addEventListener('blur', () => {
      this.guardarDescripcion();
    });
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
    this.recurso.recursoCategoriaId = type.id;
    this.selectedObjectType = type;
    this.recurso.categoria = type;
    this.guardarRecurso(this.recurso);
  }

  guardarRecurso(recurso: Recurso) {
    this.RecursoService.actualizarRecurso(recurso).subscribe(
      (response) => {
        console.log('Recursos actualizados con éxito', response);
      },
      (error) => {
        console.error('Error al actualizar los recursos', error);
      }
    );
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

  eliminarDescripcion() {
    this.descripcion = '';
    this.recurso.descripcion = this.descripcion;
    this.guardarRecurso(this.recurso);
  }

  editarDescripcion() {
    this.descripcionTextarea?.nativeElement.focus();
  }

  guardarDescripcion() {
    const nuevaDescripcion = this.descripcionTextarea?.nativeElement.value;
    this.descripcion = nuevaDescripcion;
    this.recurso.descripcion = nuevaDescripcion;
    this.guardarRecurso(this.recurso);
  }
}

 export interface Recurso {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadActual: number;
  cantidadNecesaria: number;
  proveedor: string;
  recursoCategoriaId: number;
  colorTarjeta: string;
  evento: Evento;
  categoria: Categoria;
}

interface Evento {
  id: number;
}

interface Categoria {
  id: number;
  nombre: string;
  icono: string;
}

interface Asignaciones {
  id: number;
  asistente: Asistente;
  cantidad: number;
  comentarios: string;
  fechaHora: Date;
}

interface Asistente {
  id: number;
  activo: boolean;
  participante: Participante;
  rol: Rol;
}

interface Participante{
  id: number;
  apellido: string
  mail: string;
  nombre:string;
}

interface Rol{
  id: number;
  nombre: string;
}