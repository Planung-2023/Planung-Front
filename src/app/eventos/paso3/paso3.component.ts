import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    horaInicio: new FormControl('', [Validators.required]),
    horaFin: new FormControl('', [Validators.required]),
    todoElDia: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
  });

  dataEvento = {
    latitud: -34.598613,
    longitud: -58.415632,
  }

  verificarFormularioCompleto(){
    
  }

  getDatosPaso3(){
    return this.dataEvento
  }
}
