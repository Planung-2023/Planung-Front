import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  notificaciones: Notificacion[] = []
  contadorNotificaciones: number = 0

  constructor (private router: Router) {}

  ngOnInit () {
    this.notificaciones = [
      {
        id: 1,
        mensaje:
          'Usted ha sido invitado a un evento! Toque aquí para ver mas detalles',
        fechaRecibida: new Date('2023-10-12 10:25')
      },
      {
        id: 2,
        mensaje: 'El evento formal "Entrega de diplomas" comenzará pronto',
        fechaRecibida: new Date('2023-12-14 15:32')
      },
      {
        id: 3,
        mensaje: 'Notificación 3',
        fechaRecibida: new Date('2023-12-30 21:19')
      },
      {
        id: 4,
        mensaje: 'Notificación 4',
        fechaRecibida: new Date('2023-12-31 08:44')
      },
      {
        id: 5,
        mensaje: 'Notificación 5',
        fechaRecibida: new Date('2023-12-31 08:44')
      },
      {
        id: 6,
        mensaje: 'Notificación 6',
        fechaRecibida: new Date('2023-12-31 08:44')
      },
      {
        id: 7,
        mensaje: 'Notificación 7',
        fechaRecibida: new Date('2023-12-31 08:44')
      },
      {
        id: 8,
        mensaje: 'Notificación 8',
        fechaRecibida: new Date('2023-12-31 08:44')
      }
    ]

    this.contadorNotificaciones = this.notificaciones.length
  }
}

interface Notificacion {
  id: number
  mensaje: string
  fechaRecibida: Date
}
