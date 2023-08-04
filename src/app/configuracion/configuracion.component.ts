import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})

export class ConfiguracionComponent {
  lightMode: boolean = true;
  darkMode: boolean = false;

  cambiarModoLight() {
    this.lightMode = true;
    this.darkMode = false;
  }
}
