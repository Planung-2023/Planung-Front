import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { RecursoColorPickerService } from '../recurso-color-picker/recurso-color-picker.service';
import { RecursosService } from '../recursos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionGuardadoComponent } from './notificacion-guardado/notificacion-guardado.component';
import { AuthService } from '@auth0/auth0-angular';


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
  usuario: Usuario | undefined;
  isFlipped: boolean = false;
  descripcion: string = '';
  panelAbierto: string = 'todos';
  mostrarColorPicker: boolean = false;
  selectedColor: string;
  selectedColorClass: string = '#ef7d16';
  categoria: Categoria;
  asignaciones: Asignaciones[] = [];
  asistente: Asistente|undefined;
  participante: Participante | undefined;
  rol: Rol |undefined;
  index: number = -1;

  constructor(
    private router: Router,
    private RecursoColorPickerService: RecursoColorPickerService,
    private RecursoService: RecursosService,
    private _snackBar: MatSnackBar, 
    public auth0: AuthService,
  ) {
    this.recurso = this.router.getCurrentNavigation()?.extras.state?.['recurso'];
    this.evento = this.router.getCurrentNavigation()?.extras.state?.['evento'];
    //this.evento = this.recurso.evento;
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
  
    this.auth0.user$.subscribe((user) => {
      const authIdentifier = user?.sub;
      this.RecursoService.getUsuarioId(authIdentifier).subscribe(({usuario}: any) => {
        this.usuario = usuario;
        this.RecursoService.getAsistentes(this.evento.id).subscribe(
      (data: Asistente[]) => {
        this.evento.asistentes = data;
        console.log('asistentes:',data);
        this.asistente = this.evento.asistentes.find(a => a.participante.usuario.id === this.usuario?.id);
        });
      })  
      
    });
    
    this.RecursoService.getAsignacionesByRecursoId(this.recurso.id).subscribe(
      (asignaciones: Asignaciones[]|any) => {
        this.asignaciones = asignaciones;
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
  
  actualizarAsignaciones(){
    this.index = this.asignaciones.findIndex(a => a.asistente?.participante.usuario.id === this.usuario?.id);
    if(this.index !== -1){
      this.RecursoService.actualizarAsignaciones(this.asignaciones[this.index]).subscribe()
    }
    else console.log('No hubo cambios')
  }

  agregarRecurso(){
    this.index = this.asignaciones.findIndex(a => a.asistente?.participante.usuario.id === this.usuario?.id);
    if(this.recurso.cantidadActual<this.recurso.cantidadNecesaria){
      if (this.index !== -1) {
          this.recurso.cantidadActual ++;
          this.asignaciones[this.index].cantidad ++;
        }
        
      if (this.index===-1){
          const nuevaAsignacion: Asignaciones = {
          id: 1,
          cantidad: 1,
          comentarios:'',
          asistente: this.asistente ,
          recurso: this.recurso,
          asistenteId: this.asistente?.id,
          recursoId: this.recurso.id
        };
        
        this.recurso.cantidadActual ++;
        console.log(nuevaAsignacion);
        this.RecursoService.postAsignaciones(nuevaAsignacion).subscribe();
        this.asignaciones.push(nuevaAsignacion);
        this.RecursoService.getAsignacionesByRecursoId(this.recurso.id).subscribe(
            (asignaciones: Asignaciones[]|any) => {
            this.asignaciones = asignaciones;
          }
        );
      }
    }
    
    this.index = this.asignaciones.findIndex(a => a.asistente?.participante.usuario.id === this.usuario?.id);;
  }
  agregarTodosLosRecursos(){
    if(this.recurso.cantidadActual<this.recurso.cantidadNecesaria){
      this.index = this.asignaciones.findIndex(a => a.asistente?.participante.usuario.id === this.usuario?.id);
      if(this.recurso.cantidadNecesaria-this.recurso.cantidadActual > this.recurso.cantidadNecesaria/4){
        this.asignaciones[this.index].cantidad += Math.ceil(this.recurso.cantidadNecesaria/4);
        this.recurso.cantidadActual += Math.ceil(this.recurso.cantidadNecesaria/4);
      }
      else {
        this.asignaciones[this.index].cantidad += (this.recurso.cantidadNecesaria-this.recurso.cantidadActual);
        this.recurso.cantidadActual += (this.recurso.cantidadNecesaria-this.recurso.cantidadActual);
      }
      
    }
  }
  quitarUnRecurso(){
    if(this.asignaciones[this.index].cantidad>1){
     this.index = this.asignaciones.findIndex(a => a.asistente?.participante.usuario.id === this.usuario?.id);
      this.recurso.cantidadActual --;
      this.asignaciones[this.index].cantidad --; 
    }
    else this.quitarRecurso();
  }
  

  quitarRecurso(){
    
    
    
    this.recurso.cantidadActual -= this.asignaciones[this.index].cantidad;
    this.asignaciones[this.index].id;
    console.log(this.asignaciones[this.index].id)
    this.asignaciones.splice(this.index);
    this.index = this.asignaciones.findIndex(a => a.asistente?.participante.usuario.id === this.usuario?.id);
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
  nombre: string;
  creador: Participante;
  fecha: Date;
  horaInicio: Date;
  horaFin: Date;
  calle: string;
  altura: number;
  tipoEvento: string;
  recursos: Recurso[];
  asistentes: Asistente[];
}

interface Categoria {
  id: number;
  nombre: string;
  icono: string;
}

interface Asignaciones {
  id: number;
  cantidad: number;
  comentarios: string;
  recurso: Recurso;
  asistente: Asistente|undefined;
  asistenteId: number|undefined;
  recursoId: number|undefined;
}

interface Asistente {
  id: number;
  activo: boolean;
  participante: Participante;
  rol: Rol;
  esAdministrador: boolean;
}

interface Participante {
  id: number;
  apellido: string;
  mail: string;
  nombre: string;
  usuario: any;
}

interface Rol{
  id: number;
  nombre: string;
}

interface Usuario {
  id: number;
  idAuth0: string;
  nombreUsuario: string;
  email: string;
  nombre: string;
  apellido: string;
  fotoPerfilId: any;
}
