import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VisualizarRecursoComponent } from '../visualizar-recurso/visualizar-recurso.component';
import { RecursoService } from '../recurso.service';

@Injectable({
  providedIn: 'root'
})
export class RecursoColorPickerService {

  constructor(private RecursoService: RecursoService) {}
  private selectedColorSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  setSelectedColor(color: string) {
    this.selectedColorSubject.next(color);
    console.log(`Color seleccionado: ${color}`);
    //Agregar metodo post
    this.RecursoService.enviarMensajeGuardadoExitoso();
  }

  getSelectedColor(): Observable<string | null> {
    return this.selectedColorSubject.asObservable();
  }

}