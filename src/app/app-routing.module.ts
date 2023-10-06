import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { CrearRecursoComponent } from './crear-recurso/crear-recurso.component';
import { VisualizarRecursoComponent } from './visualizar-recurso/visualizar-recurso.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  { path: '', redirectTo:'lista-eventos', pathMatch:'full'},
  { path: 'crear-evento', component: CrearEventoComponent, canActivate: [AuthGuard]},
  { path: 'lista-eventos', component: ListaEventosComponent, canActivate: [AuthGuard]},
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  { path: 'crear-recurso', component: CrearRecursoComponent, canActivate: [AuthGuard]},
  { path: 'visualizar-recurso', component: VisualizarRecursoComponent, canActivate: [AuthGuard]},
  { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]},
  { path: 'notificaciones', component: NotificacionesComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
