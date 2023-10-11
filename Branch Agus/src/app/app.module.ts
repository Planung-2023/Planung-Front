import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfilComponent } from './perfil/perfil.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AlertModule } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { EventosModule } from './eventos/eventos.module';
import { PruebaMapaComponent } from './prueba-mapa/prueba-mapa.component';
import {} from 'googlemaps';
import { VerPerfilComponent } from './perfil/ver-perfil/ver-perfil.component';
import { CambiarImagenComponent } from './perfil/cambiar-imagen/cambiar-imagen.component';

@NgModule({
  declarations: [
    AppComponent,
    PerfilComponent,
    NavbarComponent,
    ConfiguracionComponent,
    NotificacionesComponent,
    PruebaMapaComponent,
    VerPerfilComponent,
    CambiarImagenComponent
   ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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
    EventosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
