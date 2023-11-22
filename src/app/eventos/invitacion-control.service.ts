import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitacionControlService {
  private eventoIdSource = new BehaviorSubject<string>('');
  eventoId$ = this.eventoIdSource.asObservable();
  isVisible = false;
  evento: any;

  showPopup() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
  }
  constructor() { }

  setEventoId(eventoId: string) {
    this.eventoIdSource.next(eventoId);
  }
}
