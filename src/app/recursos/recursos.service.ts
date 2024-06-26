import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';
import { Recurso } from './visualizar-recurso/visualizar-recurso.component';


@Injectable({
  providedIn: 'root'
})
export class RecursosService {
  private mensajeGuardadoExitoso = new Subject<void>();
  private colorSeleccionadoSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private colorSeleccionado$: Observable<string | null> = this.colorSeleccionadoSubject.asObservable();

  enviarMensajeGuardadoExitoso() {
    this.mensajeGuardadoExitoso.next();
  }

  obtenerMensajeGuardadoExitoso(): Observable<void> {
    return this.mensajeGuardadoExitoso.asObservable();
  }

  constructor(private http: HttpClient) { }

  getColorSeleccionado(): Observable<string | null> {
    return this.colorSeleccionado$;
  }

  enviarColorSeleccionado(color: string) {
    this.colorSeleccionadoSubject.next(color);
  }

  getCategoriaByRecurso(idRecurso: number): Observable<any> {
    return this.http.get(`${ environment.url }/recursos/${idRecurso}/categorias`);
  }

  public tiposDeRecursos() {
    return this.http.get(`${ environment.url }/recursos/categorias`);
  }

  public getAsignacionesByRecursoId(idRecurso: number) {
    return this.http.get(`${ environment.url }/recursos/${idRecurso}/asignaciones`);
  }
  getUsuarioId(auth: any){
    return this.http.get(`${ environment.url }/usuarios/token/usuario`)
  }
  getAsistentes(idEvento:number): Observable<any> {
    return  this.http.get(`${ environment.url }/eventos/${idEvento}/asistentes`);
  }
  actualizarRecurso(recurso: Recurso) {
    const url = `${environment.url}/recursos/${recurso.id}`;
    const data: RecursoApi = {
      recurso:{
        ...recurso,
        evento: recurso.evento.id,
      }
    };
    console.log(data);
    return this.http.put(url, data);
  }

  postRecurso(idEvento:any, recurso: any){
    return  this.http.post(`${ environment.url }/eventos/${idEvento}/recursos`, recurso);
  }

  postAsignaciones(asignacion:any){
    console.log('aaaaaaaaa');
    return  this.http.post(`${ environment.url }/asignacion-recurso`, asignacion);
  }

  actualizarAsignaciones(asignacion:any){
    return this.http.put(`${ environment.url }/asignacion-recurso/${asignacion.id}`, asignacion)
  }

  deleteAsignaciones(asignacion:any){
    return this.http.delete(`${ environment.url }/asignacion-recurso/${asignacion.id}`)
  }
}

interface RecursoApi {
  recurso: {
    id: number;
    nombre: string;
    descripcion: string;
    cantidadActual: number;
    cantidadNecesaria: number;
    proveedor: string;
    colorTarjeta: string;
    evento: number;
  }
}
