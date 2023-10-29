import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RecursosModule } from './../recursos/recursos.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { Paso1Component } from './paso1/paso1.component';
import { Paso2Component } from './paso2/paso2.component';
import { Paso3Component } from './paso3/paso3.component';
import { Paso4Component } from './paso4/paso4.component';
import { Paso5Component } from './paso5/paso5.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InvitacionComponent } from './invitacion/invitacion.component';
import { InvitadosComponent } from './invitados/invitados.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MapDialogComponent } from './lista-eventos/map-dialog/map-dialog.component';

@NgModule({
  declarations: [
    CrearEventoComponent,
    Paso1Component,
    Paso2Component,
    Paso3Component,
    Paso4Component,
    Paso5Component,
    ListaEventosComponent,
    InvitacionComponent,
    InvitadosComponent,
    MapDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EventosRoutingModule,
    NzStepsModule,
    MatDialogModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    RecursosModule,
    GoogleMapsModule,
    NgbModule,
  ]
})
export class EventosModule { }
