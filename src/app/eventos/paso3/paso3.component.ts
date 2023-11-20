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
  formulario = new FormGroup({
    latitud: new FormControl(-34.598613, [Validators.required]),
    longitud: new FormControl(-58.415632, [Validators.required]),
    ciudad: new FormControl(''),
    barrio: new FormControl(''),
    calle: new FormControl(''),
    numero: new FormControl(''),
  })
  apiLoaded: boolean = true;
  display: any;
  opcion: string = 'mapa';
  position = {lat: -34.598613, lng: -58.415632}
  posicionAnterior = {lat: -34.598613 , lng: -58.415632}
  options: google.maps.MapOptions = {
    center: this.position,
    zoom: 13,
  };
moveMap(event: google.maps.MapMouseEvent) {
  if (event.latLng != null){
    this.position = (event.latLng.toJSON()); //Obtenes las coordenadas donde ocurrió el evento del click
    const coordenadas = event.latLng.toJSON(); // Obtenes las coordenadas en formato JSON
    this.formulario.get('latitud')?.setValue(coordenadas.lat);
    this.formulario.get('longitud')?.setValue(coordenadas.lng);
  }
}

actualizarTipoBusqueda(event: Event){
  const target = event.target as HTMLInputElement;
  this.opcion = target.value;
  if(this.opcion==='mapa'){
    this.formulario.get('latitud')?.setValidators([Validators.required]);
    this.formulario.get('longitud')?.setValidators([Validators.required]);
    this.formulario.get('ciudad')?.clearValidators();
    this.formulario.get('barrio')?.clearValidators();
    this.formulario.get('calle')?.clearValidators();
    this.formulario.get('numero')?.clearValidators();
    
    this.formulario.get('latitud')?.setValue(this.position.lat);
    this.formulario.get('longitud')?.setValue(this.position.lng);
    this.formulario.get('ciudad')?.setValue('');
    this.formulario.get('barrio')?.setValue('');
    this.formulario.get('calle')?.setValue('');
    this.formulario.get('numero')?.setValue('');
  } 
  else if(this.opcion==='ubicacion'){
    this.formulario.get('ciudad')?.setValidators([Validators.required]);
    this.formulario.get('barrio')?.setValidators([Validators.required]);
    this.formulario.get('calle')?.setValidators([Validators.required]);
    this.formulario.get('numero')?.setValidators([Validators.required]);
    this.formulario.get('latitud')?.setValue(null);
    this.formulario.get('longitud')?.setValue(null);
    this.formulario.get('latitud')?.clearValidators();
    this.formulario.get('longitud')?.clearValidators();
    this.posicionAnterior = this.position;
  }
  this.formulario.get('latitud')?.updateValueAndValidity();
  this.formulario.get('longitud')?.updateValueAndValidity();
  this.formulario.get('ciudad')?.updateValueAndValidity();
  this.formulario.get('barrio')?.updateValueAndValidity();
  this.formulario.get('calle')?.updateValueAndValidity();
  this.formulario.get('numero')?.updateValueAndValidity();
}


  getDatosPaso3(){
    return this.formulario.value
  }
}
