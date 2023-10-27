import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecursoColorPickerService {
  private selectedColorSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  setSelectedColor(color: string) {
    this.selectedColorSubject.next(color);
    console.log(`Color seleccionado: ${color}`);
  }

  getSelectedColor(): Observable<string | null> {
    return this.selectedColorSubject.asObservable();
  }
}