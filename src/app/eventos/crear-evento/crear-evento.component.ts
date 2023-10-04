import { Paso5Component } from './../paso5/paso5.component';
import { Paso4Component } from './../paso4/paso4.component';
import { Paso3Component } from './../paso3/paso3.component';
import { Paso2Component } from './../paso2/paso2.component';
import { Component, ViewChild } from '@angular/core';
import { Paso1Component } from '../paso1/paso1.component';


@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent {
  @ViewChild('paso1', { read: Paso1Component }) paso1Component: Paso1Component | undefined;
  @ViewChild('paso2', { read: Paso2Component }) paso2Component: Paso2Component | undefined;
  @ViewChild('paso3', { read: Paso3Component }) paso3Component: Paso3Component | undefined;
  @ViewChild('paso4', { read: Paso4Component }) paso4Component: Paso4Component | undefined;
  @ViewChild('paso5', { read: Paso5Component }) paso5Component: Paso5Component | undefined;

  pasoActual: number = 0;
  ultimoPaso: number = 4;

  titulos: string[] = ["Nombre y Fecha","Formalidad y Privacidad","Lugar","Objetos","Confirmación"];
  pasos: any[] = [
    {
      numero: 0,
      titulo: this.titulos[this.pasoActual]
    },
    {
      numero: 1,
      titulo: ""
    },
    {
      numero: 2,
      titulo: ""
    },
    {
      numero: 3,
      titulo: ""
    },
    {
      numero: 4,
      titulo: ""
    }


  ];
  tituloPasoActual: string = this.titulos[this.pasoActual];

  constructor() {

  }


  proximoPaso(){
    this.pasos[this.pasoActual].titulo = "";

    if(this.pasoActual < this.ultimoPaso){
      this.pasoActual++;
    }
    this.pasos[this.pasoActual].titulo = this.titulos[this.pasoActual];
  }

  pasoAnterior(){
    this.pasos[this.pasoActual].titulo = "";
    if(this.pasoActual > 0){
      this.pasoActual--;
    }
    this.pasos[this.pasoActual].titulo = this.titulos[this.pasoActual];
  }


  crearEvento() {
    console.log(this.paso1Component?.datos());
  }
}
