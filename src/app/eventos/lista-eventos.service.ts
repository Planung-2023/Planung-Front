import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ListaEventosService {

  constructor(private http: HttpClient) { }

  getEventos(usuarioId:number): Observable<any> {
    return  this.http.get(`${ environment.url }/eventos`, 
    {
      params: {usuario_id: usuarioId},
    });
  }

  getRecursosByEventoId(idEvento: number): Observable<any> {
    return  this.http.get(`${ environment.url }/eventos/${idEvento}/recursos`, )
  }

  getAsistentes(idEvento:number): Observable<any> {
    return  this.http.get(`${ environment.url }/eventos/${idEvento}/asistentes`, );
  }
  
}
