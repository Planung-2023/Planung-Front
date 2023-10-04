import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso1Component {
  dataEvento = {
    nombre: '',
    fecha: null,
    todoElDia: false,
    descripcion: '',
  }


  public datos() {
    return this.dataEvento;
  }
}
