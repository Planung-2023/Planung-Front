import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ListaEventosService {

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

