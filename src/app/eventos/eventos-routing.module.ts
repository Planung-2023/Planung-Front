import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';


const routes: Routes = [
  { path: '', component: ListaEventosComponent },
  { path: 'crear', component: CrearEventoComponent },
  { path: ':id/recursos', loadChildren: () => import('../recursos/recursos.module').then(m => m.RecursosModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }