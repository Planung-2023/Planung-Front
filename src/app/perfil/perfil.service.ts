import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http: HttpClient) { }

  getNombreDeUsuario(usuarioId: number): Observable<string> {
    return this.http.get<string>(`${environment.url}/usuarios/${usuarioId}`);
  }

  getDatosParticipante(participanteId:number): Observable<any> {
    return  this.http.get(`${ environment.url }/participantes/${participanteId}`, );
  }

  // Foto de perfil
  private fotoPerfil: string = 'assets/foto-perfil-3.png';

  getFotoPerfil(): string {
    return this.fotoPerfil;
  }

  setFotoPerfil(nuevaFoto: string): void {
    this.fotoPerfil = nuevaFoto;
  }

}
