import { Component, HostListener, OnInit } from '@angular/core';
import { InvitacionControlService } from '../invitacion-control.service';

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.css']
})

export class InvitacionComponent {
  clipboardService: any;
  constructor(public invitacionControlService: InvitacionControlService) {}

  // Arreglar para que se pueda copiar al portapapeles el link de invitacion del evento
  /* 
  ngOnInit() {
    // Agregar un manejador de eventos al documento para cerrar el popup al hacer clic fuera de él
    document.addEventListener('click', this.onDocumentClick);
  }

  copyLinkToClipboard() {
    // Obtén el enlace del atributo data-link de la imagen
    const link = document.querySelector('.img-fluid').getAttribute('data-link');

    // Copia el enlace al portapapeles
    this.clipboardService.copy(link);

    // Aquí puedes mostrar un mensaje de confirmación, por ejemplo:
    alert('El enlace se ha copiado al portapapeles.');
  }
*/
/*
  @HostListener('click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Verificar si el evento de clic se originó dentro del popup o no
    const popupContainer = document.querySelector('.popup-invitacion-container');
    if (popupContainer && !popupContainer.contains(event.target as Node)) {
      // Si el clic se realizó fuera del popup, cierra el popup
      this.closePopup();
    }
  }
*/

  closePopup() {
    this.invitacionControlService.closePopup();
  }

}
