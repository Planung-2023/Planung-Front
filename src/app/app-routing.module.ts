import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEventoComponent } from './eventos/crear-evento/crear-evento.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearRecursoComponent } from './crear-recurso/crear-recurso.component';
import { VisualizarRecursoComponent } from './visualizar-recurso/visualizar-recurso.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import {PruebaMapaComponent} from './prueba-mapa/prueba-mapa.component'; //esto es una prueba para el mapa (despues borrar)




const routes: Routes = [
  { path: 'lista-eventos', component: ListaEventosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'crear-recurso', component: CrearRecursoComponent },
  { path: 'visualizar-recurso', component: VisualizarRecursoComponent},
  { path: 'configuracion', component: ConfiguracionComponent},
  { path: 'notificaciones', component: NotificacionesComponent},
  { path: 'eventos', loadChildren: () => import('./eventos/eventos.module').then(m => m.EventosModule)},
  { path: 'pruebaMapa', component: PruebaMapaComponent} //esto es una prueba para el mapa (despues borrar)
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
