import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter } from '@angular/core';

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
  verDatos(){
    console.log(this.datos);
  }
}
