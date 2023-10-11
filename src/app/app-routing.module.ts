import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import {PruebaMapaComponent} from './prueba-mapa/prueba-mapa.component'; //esto es una prueba para el mapa (despues borrar)
import { VerPerfilComponent } from './perfil/ver-perfil/ver-perfil.component';
import { CambiarImagenComponent } from './perfil/cambiar-imagen/cambiar-imagen.component';




const routes: Routes = [
  { path: '', redirectTo: 'eventos', pathMatch: 'full' },
  { path: 'perfil', component: PerfilComponent },
  { path: 'configuracion', component: ConfiguracionComponent},
  { path: 'notificaciones', component: NotificacionesComponent},
  { path: 'eventos', loadChildren: () => import('./eventos/eventos.module').then(m => m.EventosModule)},
  { path: 'pruebaMapa', component: PruebaMapaComponent}, //esto es una prueba para el mapa (despues borrar)
  { path: 'perfil/ver-perfil', component: VerPerfilComponent },
  { path: 'perfil/cambiar-imagen', component: CambiarImagenComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
