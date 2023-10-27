import { Component, Input  } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notificacion-guardado',
  templateUrl: './notificacion-guardado.component.html',
  styleUrls: ['./notificacion-guardado.component.css']
})
export class NotificacionGuardadoComponent {
  @Input() message: string = 'Guardado con éxito';
  showSnackbar: boolean = true;

  constructor() {}

  closeSnackbar() {
    this.showSnackbar = false;
  }
}