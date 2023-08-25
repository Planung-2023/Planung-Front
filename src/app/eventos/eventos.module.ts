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


@NgModule({
  declarations: [
    CrearEventoComponent,
    Paso1Component,
    Paso2Component,
    Paso3Component,
    Paso4Component,
    Paso5Component
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    NzStepsModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class EventosModule { }
