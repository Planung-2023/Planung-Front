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
    tipoEvento: new FormControl('', [Validators.required]),
    tipoInvitacion: new FormControl('', [Validators.required]),
  });
  

  actualizarTipoEvento(event: Event) {
    const target = event.target as HTMLInputElement;
    this.formulario.get('tipoEvento')?.setValue(target.value);
    console.log(this.formulario.value);
  }
  actualizarTipoInvitacion(event: Event){
    const target = event.target as HTMLInputElement;
    this.formulario.get('tipoInvitacion')?.setValue(target.value);
    console.log(this.formulario.value);
  }
  getDatosPaso2(){
    return this.formulario.value
  }
}
