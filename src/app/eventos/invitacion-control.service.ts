import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvitacionControlService {
  isVisible = false;

  showPopup() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
  }
  constructor() { }
}
