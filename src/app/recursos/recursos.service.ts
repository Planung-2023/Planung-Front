import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {
  private mensajeGuardadoExitoso = new Subject<void>();
  constructor(
    private http: HttpClient
  ) { }

  public tiposDeRecursos() {
    return this.http.get(`${ environment.url }/recursos/categorias`);
  }
  obtenerMensajeGuardadoExitoso(): Observable<void> {
    return this.mensajeGuardadoExitoso.asObservable();
  }
  public crearEvento(datosOrdenados: any){
   return this.http.post(`${environment.url}/eventos`, datosOrdenados);
  
  }
}