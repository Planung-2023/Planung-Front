import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  notificaciones: Notificacion[] = [];
  constructor(private router: Router) {}

  ngOnInit(){
    this.notificaciones = [

    ]
  }
}

interface Notificacion {
  id: number;
  mensaje: string;
  fechaRecibida: string;
}
