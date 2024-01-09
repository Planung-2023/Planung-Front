import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core'
import { CalendarView, CalendarEvent } from 'angular-calendar'
import { ListaEventosService } from '../eventos/lista-eventos.service'
import { AuthService } from '@auth0/auth0-angular'

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CalendarioComponent implements OnInit {
  view: CalendarView = CalendarView.Month
  viewDate: Date = new Date()
  eventos: CalendarEvent[] = []

  constructor (
    private listaEventosService: ListaEventosService,
    public auth0: AuthService
  ) {}

  ngOnInit() {
    this.auth0.user$.subscribe((user) => {
      const usuarioId = user?.['id']; // Ajusta esto según tu lógica de usuario
      if (usuarioId) {
        this.listaEventosService.getEventos(usuarioId).subscribe((data) => {
          console.log('Eventos obtenidos:', data);
          this.eventos = data;
        });
      }
    });
  }
  events: CalendarEvent[] = [
    {
      start: new Date('2024-01-31'),
      title: 'Evento 1'
    },
    {
      start: new Date('2024-01-05'),
      title: 'Evento 2'
    },
    {
      start: new Date('2024-01-05'),
      title: 'Evento 3'
    },
    {
      start: new Date('2024-01-08'),
      title: 'Evento 5'
    },
  ];
}
