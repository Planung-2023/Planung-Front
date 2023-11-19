import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InvitadosControlService {
  isVisible = false;
  evento: any;
  soyAdmin: boolean | undefined = false;
  invitado: any |undefined = 0;
  invitadoNombre: string = '';
  invitadoApellido: string ='';
  
  constructor(private http: HttpClient) { }

  showPopupInvitado() {
    this.isVisible = true;
  }

  closePopupInvitado() {
    this.isVisible = false;
  }
  
  actualizarInvitado(){
    return this.http.put(`${ environment.url }/eventos/${this.evento.id}/asistentes:${this.evento.id}`, this.invitado)
  }
  
  eliminarInvitado(invitado:any){

  }
}
