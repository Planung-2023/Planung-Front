import { Component, OnInit, OnDestroy } from '@angular/core';
import { InvitacionControlService } from '../invitacion-control.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invitacion',
  templateUrl: './invitacion.component.html',
  styleUrls: ['./invitacion.component.css']
})

export class InvitacionComponent implements OnInit, OnDestroy {
  eventoId = '';
  eventoIdSubscription!: Subscription;

  constructor(public invitacionControlService: InvitacionControlService) {}

  ngOnInit() {
    this.eventoIdSubscription = this.invitacionControlService.eventoId$.subscribe(
      (eventoId) => {
        this.eventoId = eventoId;
      }
    );
  }

  ngOnDestroy() {
    this.eventoIdSubscription.unsubscribe();
  }

  getLinkEvento(eventoId: string): string {
    return `http://localhost:4200/unirse-evento?eventoId=${encodeURIComponent(eventoId)}`;
  }
  closePopup() {
    this.invitacionControlService.closePopup();
  }

  copyToClipboard() {
    const link = this.getLinkEvento(this.eventoId);

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
