import { ChangeDetectionStrategy} from '@angular/core';
import { Component, AfterViewInit, ElementRef, NgZone, OnInit } from '@angular/core';
import { GoogleMapsService } from 'src/app/prueba-mapa/google-maps.service';

@Component({
  selector: 'app-paso3',
  templateUrl: './paso3.component.html',
  styleUrls: ['./paso3.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso3Component implements AfterViewInit, OnInit {
  constructor(
    private googleMapsService: GoogleMapsService,
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {} 

  ngOnInit(): void {
    // Llama a la función initMap después de que se haya cargado la API de Google Maps
    this.ngZone.runOutsideAngular(() => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBvpyvaW8UylnXWof2sdHjfObxsbNuBZIE&libraries=places&callback=initMap`;
      document.body.appendChild(script);
      script.onload = () => {
        this.ngZone.run(() => this.initMap());
      };
    });
  }

  ngAfterViewInit(): void {}

  ngZoneCallback() {
    this.ngZone.run(() => this.initMap());
  }


  public initMap(): void {
    const coordenadas = { lat: -34.611771, lng: -58.417309 };
    const mapElement = this.elementRef.nativeElement.querySelector('#mapa');
    this.googleMapsService.initializeMap(mapElement, coordenadas);
  }

}

