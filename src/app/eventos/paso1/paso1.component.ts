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
    formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl("", [Validators.required]),
    horaInicio: new FormControl('00:00', [Validators.required]),
    horaFin: new FormControl('23:00'),
    todoElDia: new FormControl(false, [Validators.required]),
    descripcion: new FormControl(""),
  });
  
  cambiarTodoElDia(event: MatSlideToggleChange) {
    this.formulario.get('todoElDia')?.setValue(event.checked);
    console.log(this.formulario.value);
  }
  public datos() {
    return this.formulario;
  }


getDatosPaso1(){
  if(this.formulario.get('todoElDia')?.value === true){
    this.formulario.get('horaInicio')?.setValue('00:00');
    this.formulario.get('horaFin')?.setValue(null);
  }
  return this.formulario.value
}

}
