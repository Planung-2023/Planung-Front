import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ConfiguracionService {
  @Output() traerTema = new EventEmitter<string>();
  tema: string //en false, el tema predeterminado es oscuro

  constructor(private http: HttpClient) {
    this.tema = localStorage.getItem('evento_tema') == null? 'dark': localStorage.getItem('evento_tema')!!;
    this.traerTema.emit(this.tema);
   }
  getDatosUsuarioPorAuth(authIdentifier: string): Observable<any> {
    return this.http.get(`${environment.url}/usuarios/token/usuario`);
  }
  pasarInfo(modo: string){
    this.tema= modo
    localStorage.setItem('evento_tema', modo);
    this.traerTema.emit(modo)
  }

}