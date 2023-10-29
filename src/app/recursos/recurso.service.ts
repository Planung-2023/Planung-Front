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
    return this.http.get(`${ environment.url }/recursos/${idRecurso}/categorias`);
  }

  public tiposDeRecursos() {
    return this.http.get(`${ environment.url }/recursos/categorias`);
  }

  public getAsignacionesByRecursoId(idRecurso: number) {
    return this.http.get(`${ environment.url }/recursos/${idRecurso}/asignaciones`);
  }

  actualizarRecurso(eventoId: number, data: any) {
    const url = `${environment.url}/eventos/${eventoId}/recursos`;
    return this.http.patch(url, data);
  }

  actualizarCategoriaRecurso(eventoId: number | undefined,idRecurso: number, categoria: number) { //cambia todos los recursos, se necesitaría que se cambie el recurso con la id dada
    const url = `${environment.url}/eventos/${eventoId}/recursos/${idRecurso}`;
    const data = {"recursos":[
      {
        "categoria": categoria,
      }
    ]
  }
    return this.http.put(url, data);
  }
}
