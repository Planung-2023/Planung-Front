import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

constructor(private http: HttpClient) { }

  getNombreDeUsuario(usuarioId: number): Observable<string> {
    return this.http.get<string>(`${environment.url}/usuarios/${usuarioId}`);
  }

  getDatosParticipante(participanteId:number): Observable<any> {
    return  this.http.get(`${ environment.url }/participantes/${participanteId}`, );
  }

}
