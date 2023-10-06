import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso3Component {
  dataEvento = {
    latitud: '-34.604471',
    longitud: ' -58.564287'
  }
}

