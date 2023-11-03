import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { VerPerfilComponent } from './ver-perfil/ver-perfil.component';
import { CambiarImagenComponent } from './cambiar-imagen/cambiar-imagen.component';
import { MatIconModule } from '@angular/material/icon';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilService } from './perfil.service';


@NgModule({
  declarations: [
    PerfilComponent,
    VerPerfilComponent,
    CambiarImagenComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    MatIconModule,
  ],
  providers: [PerfilService]
})
export class PerfilModule { }
