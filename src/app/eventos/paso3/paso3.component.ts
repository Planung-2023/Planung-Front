/*import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso3Component implements OnInit{
  coordMedrano = {lat: -34.598613, lng: -58.4226825};
ngOnInit() {
  let marker;
  let map;
  const mapOptions: google.maps.MapOptions = 
  {
    center: this.coordMedrano,
    zoom: 15
  };

  // Crea el mapa en el elemento con ID "map" y aplica las opciones
  
  const mapHtml = document.getElementById('map');

  if (mapHtml) {
    // Crea el mapa en el elemento encontrado
    map = new google.maps.Map(mapHtml, mapOptions);

    // Llama a la función para agregar el marcador
    this.agregarMarcador();
  }
  function initMap(){
    map = new google.maps.Map(mapHtml, mapOptions);
    marker = new google.maps.Marker(this.coordMedrano, )
}
}
agregarMarcador() {
  // Crea un marcador con las coordenadas especificadas
  const marker = new google.maps.Marker({
    position: this.coordMedrano,
    map: this.map,
    title: 'Mi Marcador Didáctico' // Título del marcador
  });
}

  dataEvento = {
    latitud: '-34.604471',
    longitud: ' -58.564287'
  }

  getDatosPaso3(){
    return this.dataEvento
  }
}
*/
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso3Component {
  apiLoaded: boolean = true;
  display: any;
  position = {lat: -34.598613, lng: -58.415632}
  label = {
    color: "red",
    text: "marcador",
  }
  options: google.maps.MapOptions = {
    center: this.position,
    zoom: 15,
  };
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null){
      this.position = (event.latLng.toJSON()); //Obtenes las coordenadas donde ocurrió el evento del click
      const coordenadas = event.latLng.toJSON(); // Obtenes las coordenadas en formato JSON
      this.dataEvento.latitud = coordenadas.lat;
      this.dataEvento.longitud = coordenadas.lng;
    }
    console.log(this.dataEvento);
}
  

  dataEvento = {
    latitud: -34.598613,
    longitud: -58.415632,
  }
  
}