import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


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
  conseguirMailByToken(){
    return ''
  }
  getRecursosByEventoId(idEvento: number): Observable<any> {
    return  this.http.get(`${ environment.url }/eventos/${idEvento}/recursos`)
  }

  getUsuarioMail(mail: string){
    this.mail=this.conseguirMailByToken();
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
}

