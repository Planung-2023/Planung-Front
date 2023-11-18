
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule} from '@angular/common/http'
import { ListaEventosService } from './eventos/lista-eventos.service';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {} from 'googlemaps';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SpinnerComponent } from './loader/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfiguracionComponent,
    NotificacionesComponent,
    SpinnerComponent,
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
    MatButtonToggleModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    EventosModule,
    MatFormFieldModule,
    GoogleMapsModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    ListaEventosService,
    { provide: HTTP_INTERCEPTORS,useClass: AuthHttpInterceptor,multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
