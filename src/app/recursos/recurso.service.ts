import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private mensajeGuardadoExitoso = new Subject<void>();

  enviarMensajeGuardadoExitoso() {
    this.mensajeGuardadoExitoso.next();
  }

  obtenerMensajeGuardadoExitoso(): Observable<void> {
    return this.mensajeGuardadoExitoso.asObservable();
  }

  constructor(private http: HttpClient) { }

  getCategoriaByRecurso(idRecurso: number): Observable<any> {
    return  this.http.get(`${ environment.url }/recursos/${idRecurso}/categorias`);
  }

  public tiposDeRecursos() {
    return this.http.get(`${ environment.url }/recursos/categorias`);
  }
}
