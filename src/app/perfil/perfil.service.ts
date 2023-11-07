import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  getDatosUsuario(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${environment.url}/usuarios/${usuarioId}`);
  }
 
  updateFotoPerfilIdUsuario(usuarioId: number, nuevoIdFotoPerfil: number): Observable<any> {
    const url = `${environment.url}/usuarios/${usuarioId}`;
    const body = { foto_perfil_id: nuevoIdFotoPerfil };
    return this.http.put(url, body);
  }  

  getDatosParticipante(participanteId:number): Observable<any> {
    return  this.http.get(`${ environment.url }/participantes/${participanteId}`);
  }

}
