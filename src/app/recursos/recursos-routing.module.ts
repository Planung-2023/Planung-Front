import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearRecursoComponent } from './crear-recurso/crear-recurso.component';
import { VisualizarRecursoComponent } from './visualizar-recurso/visualizar-recurso.component';

const routes: Routes = [
  { path: 'crear', component: CrearRecursoComponent },
  { path: ':id', component: VisualizarRecursoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosRoutingModule { }
