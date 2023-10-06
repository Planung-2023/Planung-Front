import { Component } from '@angular/core';

@Component({
  templateUrl: './crear-evento-b.component.html',
  styleUrls: ['./crear-evento-b.component.css']
})
export class CrearEventoBComponent {
//Formalidad
  public leftClickFormal() {
    var btnF = document.getElementById('barraFormal');
    var izquierdaF = document.getElementById('botonIzqFormal');
    var derechaF = document.getElementById('botonDerFormal');
    btnF!!.style.left = '10%';
    izquierdaF!!.style.color = '#fff';
    derechaF!!.style.color ='#000000';
  }


  public rightClickFormal() {
    var btnF = document.getElementById('barraFormal');
    var izquierdaF = document.getElementById('botonIzqFormal');
    var derechaF = document.getElementById('botonDerFormal');
    btnF!!.style.left = '62%';
    izquierdaF!!.style.color = '#000000';
    derechaF!!.style.color ='#fff';
  }


//Visibilidad
public leftClickVisib() {
  var btnV = document.getElementById('barraVisib');
  var izquierdaV = document.getElementById('botonIzqVisib');
  var derechaV = document.getElementById('botonDerVisib');
	btnV!!.style.left = '10%';
  izquierdaV!!.style.color = '#fff';
  derechaV!!.style.color ='#000000';
}

public rightClickVisib() {
  var btnV = document.getElementById('barraVisib');
  var izquierdaV = document.getElementById('botonIzqVisib');
  var derechaV = document.getElementById('botonDerVisib');
	btnV!!.style.left = '60%';
  izquierdaV!!.style.color = '#000000';
  derechaV!!.style.color ='#fff';
}

}
