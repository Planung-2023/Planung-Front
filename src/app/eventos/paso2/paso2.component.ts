import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso2Component {
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    horaInicio: new FormControl('', [Validators.required]),
    horaFin: new FormControl('', [Validators.required]),
    todoElDia: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
  });
  dataEvento={
    tipoEvento: 'Informal',
    tipoInvitacion: 'Directa',
  }

  actualizarTipoEvento(event: Event) {
    const target = event.target as HTMLInputElement;
    this.dataEvento.tipoEvento = target.value;
    console.log(this.dataEvento);
  }
  actualizarTipoInvitacion(event: Event){
    const target = event.target as HTMLInputElement;
    this.dataEvento.tipoInvitacion = target.value;
    console.log(this.dataEvento);
  }
  verificarFormularioCompleto(){

  }
  getDatosPaso2(){
    return this.dataEvento
  }
}
