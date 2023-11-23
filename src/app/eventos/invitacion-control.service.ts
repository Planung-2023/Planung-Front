import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InvitacionControlService {
  private eventoIdSource = new BehaviorSubject<string>('');
  eventoId$ = this.eventoIdSource.asObservable();
  isVisible = false;
  evento: any;

  constructor(private http: HttpClient){}

  getUsuarioId(auth: any){
    return this.http.get(`${ environment.url }/usuarios/token/usuario`)
  }

  showPopup() {
    this.isVisible = true;
  }

  closePopup() {
    this.isVisible = false;
  }

  setEventoId(eventoId: string) {
    this.eventoIdSource.next(eventoId);
  }
}
