import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso2Component {
  
  dataEvento = {
    esFormal: "Ninguno",
    esPorAprobacion: "Ninguno",
  }

  public datos() {
    return this.dataEvento;
  }
}