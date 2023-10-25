import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from '../perfil/perfil/perfil.component';
import { VerPerfilComponent } from '../perfil/ver-perfil/ver-perfil.component';
import { CambiarImagenComponent } from '../perfil/cambiar-imagen/cambiar-imagen.component';


const routes: Routes = [
  { path: '', component: PerfilComponent },
  { path: 'ver-perfil', component: VerPerfilComponent },
  { path: 'cambiar-imagen', component: CambiarImagenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
