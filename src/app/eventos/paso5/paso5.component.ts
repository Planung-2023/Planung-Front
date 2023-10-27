import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paso5',
  templateUrl: './paso5.component.html',
  styleUrls: ['./paso5.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso5Component {
  @Input() datos: any;
  @Output() aPaso1 = new EventEmitter<void>();
  @Output() aPaso2 = new EventEmitter<void>();
  @Output() aPaso3 = new EventEmitter<void>();
  @Output() aPaso4 = new EventEmitter<void>();
  @Output() crearEvento = new EventEmitter<void>();
  
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    horaInicio: new FormControl('', [Validators.required]),
    horaFin: new FormControl('', [Validators.required]),
    todoElDia: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
  });
  
  volverAPaso1() {
    this.aPaso1.emit();
  }

  volverAPaso2() {
    this.aPaso2.emit();
  }
  volverAPaso3() {
    this.aPaso3.emit();
  }
  volverAPaso4() {
    this.aPaso4.emit();
  }
  setDatos(datos: any) {
    this.datos = datos;
  }

  verificarFormularioCompleto(){
    
  }

  crearNuevoEvento(){
    this.crearEvento.emit();
  }
}
