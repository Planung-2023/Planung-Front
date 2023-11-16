import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { register } from 'swiper/element/bundle';

import { ConfiguracionService } from './app/configuracion/configuracion.service';



register();


/*
const configService = ConfiguracionService;

configService.cambioDeTema.subscribe((temaClaro: boolean) => {
  var cuerpo = document.getElementById("cuerpo");
  if (temaClaro) {
    cuerpo?.setAttribute("data-bs-theme", "light");
  } 
  else {
    cuerpo?.setAttribute("data-bs-theme", "dark");
  }
});
*/
platformBrowserDynamic().bootstrapModule(AppModule)
  
.catch(err => console.error(err));

