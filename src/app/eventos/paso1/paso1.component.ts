import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  formulario = new FormGroup({
    nombre: new FormControl(this.dataEvento.nombre, [Validators.required]),
    fecha: new FormControl(this.dataEvento.fecha, [Validators.required]),
    horaInicio: new FormControl(this.dataEvento.horaInicio, [Validators.required]),
    horaFin: new FormControl(this.dataEvento.horaFin, [Validators.required]),
    todoElDia: new FormControl(this.dataEvento.todoElDia, [Validators.required]),
    descripcion: new FormControl(this.dataEvento.descripcion),
  });
  
  cambiarTodoElDia(event: MatSlideToggleChange) {
    this.dataEvento.todoElDia = event.checked;
    console.log(this.formulario);
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

}
