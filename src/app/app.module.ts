import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AlertModule } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { CrearRecursoComponent } from './crear-recurso/crear-recurso.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VisualizarRecursoComponent } from './visualizar-recurso/visualizar-recurso.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@NgModule({
  declarations: [
    AppComponent,
    CrearEventoComponent,
    ListaEventosComponent,
    PerfilComponent,
    NavbarComponent,
    CrearRecursoComponent,
    VisualizarRecursoComponent,
    ConfiguracionComponent,
    NotificacionesComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatExpansionModule,
    AlertModule,
    CarouselModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
    NzStepsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
