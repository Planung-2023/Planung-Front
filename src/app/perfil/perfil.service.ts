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
    console.log('hola mundo');
    return this.http.get<string>(`${environment.url}/usuarios/${usuarioId}`);
  }

}
