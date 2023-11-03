import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { InvitacionControlService } from '../invitacion-control.service';

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.css']
})

export class InvitacionComponent {
  constructor(public invitacionControlService: InvitacionControlService) {}

  getLinkEvento(): string {
    return 'https://boulderbugle.com/linkdeejemplo-kqlwf7fb';
  }

  closePopup() {
    this.invitacionControlService.closePopup();
  }

  copyToClipboard() {
    const link = this.getLinkEvento();

    // Crear un elemento de texto temporal y copiar el enlace
    const textArea = document.createElement('textarea');
    textArea.value = link;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    alert('Enlace copiado al portapapeles');
  }
}
