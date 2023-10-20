import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-prueba-mapa',
  templateUrl: './prueba-mapa.component.html',
  styleUrls: ['./prueba-mapa.component.css']
  
})
export class PruebaMapaComponent implements OnInit {
  @ViewChild('map',{static:true}) mapElement: any;
  map: google.maps.Map;
  
  
  constructor() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  }

  ngOnInit(): void {
    
  };
  
}

