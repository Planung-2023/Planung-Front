import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { register } from 'swiper/element/bundle';

import { ConfiguracionService } from './app/configuracion/configuracion.service';

register();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

var cuerpo = document.getElementById("cuerpo");
if (false) {
  cuerpo?.setAttribute("data-bs-theme", "light");
} else {
  cuerpo?.setAttribute("data-bs-theme", "dark");
}