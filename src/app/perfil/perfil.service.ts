import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: "root",
})
export class PerfilService {
  constructor(private http: HttpClient) {}

  getDatosUsuarioPorAuth(authIdentifier: string): Observable<any> {
    return this.http.get(`${environment.url}/usuarios/token/usuario`, {
    });
  }

  updateFotoPerfilIdUsuario(usuarioId: number, nuevoIdFotoPerfil: number) {
    const url = `${environment.url}/usuarios/${usuarioId}`;
    const body = { fotoPerfil: nuevoIdFotoPerfil };
    console.log('anda')
    return this.http.put(url, body);
  }

  getDatosParticipante(participanteId: number): Observable<any> {
    return this.http.get(`${environment.url}/participantes/${participanteId}`);
  }

  actualizarUsuario(usuario: any, datos: any){
    return this.http.put(`${environment.url}/usuarios/${usuario.id}`, datos);
  }
}