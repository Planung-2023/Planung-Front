import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-paso5',
  templateUrl: './paso5.component.html',
  styleUrls: ['./paso5.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso5Component {
  @Input() datos: any;

  setDatos(datos: any) {
    this.datos = datos;
  }
}
