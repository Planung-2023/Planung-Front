import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class Paso1Component{
  dataEvento = {
    nombre: '',
    fecha: null,
    horaInicio:'00:00',
    horaFin:'23:00',
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



getDatosPaso1(){
  if(this.dataEvento.todoElDia == true){
    this.dataEvento.horaInicio = '00:00';
    this.dataEvento.horaFin = null!;
  }
  return this.dataEvento
}
verificarFormularioCompleto(formulario: NgForm) {
  if (formulario.valid) {
    // El formulario está completamente lleno y válido.
    console.log('El formulario está completo y válido.');
  } else {
    // Algunos campos requeridos no están completos o son inválidos.
    console.log('El formulario no está completo.');
  }
}
}
