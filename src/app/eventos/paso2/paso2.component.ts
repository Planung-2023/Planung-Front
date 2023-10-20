import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso2Component {
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
  getDatosPaso2(){
    return this.dataEvento
  }
}
