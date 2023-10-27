import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-paso1',
  templateUrl: './paso1.component.html',
  styleUrls: ['./paso1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class Paso1Component implements OnInit{
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


ngOnInit() {
  const horaInicio = document.getElementById("inputHoraInicio") as HTMLInputElement;
  const textoHoraIncicio = document.getElementById("horaInicio");

  const horaFin = document.getElementById("inputHoraFin") as HTMLInputElement;
  const textoHoraFin = document.getElementById("horaFin");

  const fecha = document.getElementById("inputFecha") as HTMLInputElement;
  const textoFecha = document.getElementById("fecha");

  horaInicio?.addEventListener(
    "input",
    () => {
      if (horaInicio && textoHoraIncicio) {
        textoHoraIncicio.innerText = horaInicio.value;
      }
    },
    false
  );

  horaFin?.addEventListener(
    "input",
    () => {
      if (horaFin && textoHoraFin) {
        textoHoraFin.innerText = horaFin.value;
      }
    },
    false
  );
  
  fecha?.addEventListener(
    "input",
    () => {
      if (fecha && textoFecha) {
        textoFecha.innerText = fecha.value;
      }
    },
    false
  );

}
getDatosPaso1(){
  if(this.dataEvento.todoElDia == true){
    this.dataEvento.horaInicio = '';
    this.dataEvento.horaFin = null!;
  }
  return this.dataEvento
}
}
