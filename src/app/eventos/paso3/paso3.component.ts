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
  options: google.maps.MapOptions = {
    center: {lat: -34.598613, lng: -58.4226825},
    zoom: 15
  };

  dataEvento = {
    latitud: '-34.604471',
    longitud: ' -58.564287'
  }
}

