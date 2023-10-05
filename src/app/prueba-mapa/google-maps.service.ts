import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private mapa: any;

  constructor() {}

  initializeMap(element: HTMLElement, coordenadas: google.maps.LatLngLiteral): void {
    this.mapa = new google.maps.Map(element, {
      zoom: 15,
      center: coordenadas
    });

    const marcador = new google.maps.Marker({
      position: coordenadas,
      map: this.mapa,
      title: 'Ubicación del evento'
    });
  }
}
