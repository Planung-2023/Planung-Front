import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEventoComponent } from './eventos/crear-evento/crear-evento.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearRecursoComponent } from './crear-recurso/crear-recurso.component';
import { VisualizarRecursoComponent } from './visualizar-recurso/visualizar-recurso.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';

const routes: Routes = [
  { path: 'lista-eventos', component: ListaEventosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'crear-recurso', component: CrearRecursoComponent },
  { path: 'visualizar-recurso', component: VisualizarRecursoComponent},
  { path: 'configuracion', component: ConfiguracionComponent},
  { path: 'notificaciones', component: NotificacionesComponent},
  { path: 'eventos', loadChildren: () => import('./eventos/eventos.module').then(m => m.EventosModule)}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
