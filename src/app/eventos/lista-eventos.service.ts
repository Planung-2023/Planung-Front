import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '@auth0/auth0-angular';


@Injectable({
  providedIn: 'root'
})
export class ListaEventosService {

  constructor(private http: HttpClient) { }
  mail: string='';
  getEventos(usuarioId:number|null = null): Observable<any> {
    const queryParams = usuarioId === null? undefined : { usuario_id: usuarioId };

    return  this.http.get(`${ environment.url }/eventos`,
    {
      params: queryParams,
    });
  }
  
  getRecursosByEventoId(idEvento: number): Observable<any> {
    return  this.http.get(`${ environment.url }/eventos/${idEvento}/recursos`)
  }

  getUsuarioId(auth: any){
    return this.http.get(`${ environment.url }/usuarios/token/usuario`)
  }

  getUsuarioMail(mail: string){
    return this.http.get(`${environment.url}/usuarios/${this.mail}`);
  }

  getAsistentes(idEvento:number): Observable<any> {
    return  this.http.get(`${ environment.url }/eventos/${idEvento}/asistentes`);
  }

  getEventoByID(idEvento:number): Observable<any>{
    return this.http.get(`${ environment.url }/eventos/${idEvento}`);
  }

  unirseEvento(idEvento: number) {
    const url = `${ environment.url }/eventos/${idEvento}/unirse`;
    const data = '';
    return this.http.post(url,data);
  }

  aceptarInvitado(evento: any, invitado: any, data: any){
    return this.http.put(`${ environment.url }/eventos/${evento.id}/asistentes/${invitado.id}`, data)
  }

  eliminarInvitado(evento: any, invitado: any){
    return this.http.delete(`${ environment.url }/eventos/${evento.id}/asistentes/${invitado.id}`)
  }
}

