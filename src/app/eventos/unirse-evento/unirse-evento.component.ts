import { Component, OnInit } from '@angular/core';
import { ListaEventosService } from '../lista-eventos.service';

@Component({
  selector: 'app-unirse-evento',
  templateUrl: './unirse-evento.component.html',
  styleUrls: ['./unirse-evento.component.css']
})
export class UnirseEventoComponent implements OnInit {
  evento: Evento ;

  constructor (private listaEventoService: ListaEventosService){
    this.evento = {
      id: 1,
      nombre: 'eventazo',
      creador: 'Juan',
      descripcion: 'Evento solo para Juan',
      tipoEvento: 'directa'
    }
  }
  
  ngOnInit(): void {
    
  }

  unirseEvento(id: number) {
    console.log(this.evento.id)
    this.listaEventoService.unirseEvento(this.evento.id);
  }
}

interface Evento{
  id: number,
  nombre:string,
  creador:string,
  descripcion:string,
  tipoEvento: string,
}