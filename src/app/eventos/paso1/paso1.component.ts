import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';


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
    horaInicio:'',
    horaFin:'',
    todoElDia: false,
    descripcion: '',
  }
  cambiarTodoElDia(event: MatSlideToggleChange) {
    this.dataEvento.todoElDia = event.checked;
    console.log(this.dataEvento);
  }
  public datos() {
    return this.dataEvento;
  }
}
