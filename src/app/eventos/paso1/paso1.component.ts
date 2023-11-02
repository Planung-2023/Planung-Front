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
    fecha: new FormControl('', [Validators.required]),
    horaInicio: new FormControl('', [Validators.required]),
    horaFin: new FormControl('', [Validators.required]),
    todoElDia: new FormControl(false, [Validators.required]),
    descripcion: new FormControl(""),
  });
  
  cambiarTodoElDia(event: MatSlideToggleChange) {
    this.formulario.get('todoElDia')?.setValue(event.checked);
    console.log(this.formulario.value);
    if(event.checked){
      this.formulario.get('horaInicio')?.clearValidators();
      this.formulario.get('horaFin')?.clearValidators();
    }
    else {
      this.formulario.get('horaFin')?.setValidators([Validators.required]),
      this.formulario.get('horaFin')?.setValidators([Validators.required])
  };
  }
  public datos() {
    return this.formulario;
  }


getDatosPaso1(){
  if(this.formulario.get('todoElDia')?.value === true){
    this.formulario.get('horaInicio')?.setValue(null);
    this.formulario.get('horaFin')?.setValue(null);
  }
  return this.formulario.value
}

}
