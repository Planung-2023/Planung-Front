import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ConfiguracionService {
  constructor(private http: HttpClient) { }
  temaClaro: boolean = false //en false, el tema predeterminado es oscuro

  getDatosUsuarioPorAuth(authIdentifier: string): Observable<any> {
    return this.http.get(`${environment.url}/usuarios/token/usuario`, {});
  }
  
}
