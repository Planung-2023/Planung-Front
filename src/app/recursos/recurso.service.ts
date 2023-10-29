import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { Recurso } from './visualizar-recurso/visualizar-recurso.component';

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

  actualizarRecurso(eventoId: number | undefined, recurso: Recurso) {
    const url = `${environment.url}/eventos/${eventoId}/recursos/${recurso.id}`;
    const data = {"recurso":
      {
        "nombre": recurso.nombre,
        "recurso_categoria_id": recurso.recursoCategoriaId,
        "descripcion": recurso.descripcion,
        "cantidad_actual": recurso.cantidadActual,
        "cantidad_necesaria": recurso.cantidadNecesaria,
        "proveedor": recurso.proveedor,
        "color_tarjeta": recurso.colorTarjeta,
      }
  }
    return this.http.put(url, data);
  }
}
