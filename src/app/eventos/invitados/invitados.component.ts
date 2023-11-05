import { Component, Input } from '@angular/core';
import { InvitadosControlService } from '../invitados-control.service';

@Component({
  selector: 'app-invitados',
  templateUrl: './invitados.component.html',
  styleUrls: ['./invitados.component.css']
})
export class InvitadosComponent {
  mostrarPopupInvitado = false;
  @Input() invitadoNombre: string = '';
  @Input() invitadoApellido: string = '';

  constructor(public invitadosControlService: InvitadosControlService) {}

  showPopupInvitado() {
    this.invitadosControlService.showPopupInvitado();
  }

  hidePopupInvitado() {
    this.invitadosControlService.closePopupInvitado();
  }

  getFotoPerfil(){
    return 'assets/foto-perfil-3.png';
  }
}
