import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvitadosControlService {
  isVisible = false;
  soyAdmin: boolean | undefined = false;
  usuarioId: number |undefined = 0;
  invitadoNombre: string = '';
  invitadoApellido: string ='';

  showPopupInvitado() {
    this.isVisible = true;
  }

  closePopupInvitado() {
    this.isVisible = false;
  }

  constructor() { }
}
