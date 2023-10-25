import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvitadosControlService {
  isVisible = false;

  showPopupInvitado() {
    this.isVisible = true;
  }

  closePopupInvitado() {
    this.isVisible = false;
  }

  constructor() { }
}
