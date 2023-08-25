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
import { HttpClientModule} from '@angular/common/http'
import { ListaEventosService } from './lista-eventos/lista-eventos.service';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

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
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-jr3a6576vnf4x0e6.us.auth0.com',
      clientId: 'x2bhBlJfZpZTBRG3qqRL0F5XP8f2SZLW',
      authorizationParams: {
        redirect_uri: window.location.origin
      },
      useRefreshTokens: true,
      httpInterceptor: {
        allowedList: [
          {
            uri:environment.url
            +'/*',
            allowAnonymous: true,
          },
        ], 
      }
    }),
  ],
  providers: [
    ListaEventosService,
    { provide: HTTP_INTERCEPTORS,useClass: AuthHttpInterceptor,multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
