import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ConfiguracionService {
  constructor(private http: HttpClient) { }
  temaClaro: boolean = false //en false, el tema predeterminado es oscuro
  cambioDeTema = new EventEmitter<boolean>();
  getDatosUsuarioPorAuth(authIdentifier: string): Observable<any> {
    return this.http.get(`${environment.url}/usuarios/token/usuario`, {});
  }
  cambiarTema(tema: boolean): void {
    this.temaClaro = tema;
    this.cambioDeTema.emit(this.temaClaro); // Emitir el evento de cambio de tema
  }
  
}
