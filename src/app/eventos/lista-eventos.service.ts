import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '@auth0/auth0-angular';
import { Evento } from './unirse-evento/unirse-evento.component';


@Injectable({
  providedIn: 'root'
})
export class ListaEventosService {
  mail: string='';
  constructor(private http: HttpClient) { }
  
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

  getEventoByID(idEvento: number): Observable<Evento> {
    return this.http.get<Evento>(`${ environment.url }/eventos/${idEvento}`);
  }

  unirseEvento(idEvento: number) {
    const url = `${ environment.url }/eventos/${idEvento}/unirse`;
    const data = '';
    return this.http.post(url,data);
  }

  aceptarInvitado(invitado: any, data: any){
    console.log(data)
    return this.http.put(`${ environment.url }/asistentes/${invitado.id}/cambiar-aceptacion`, data)
  }

  eliminarInvitado(evento: any, invitado: any){
    
    return this.http.delete(`${ environment.url }/asistentes/${invitado.id}`)
  }
}

