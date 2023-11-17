import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerComponent } from './loader/spinner/spinner.component';
import { LoadingInterceptor } from './loader/loading.interceptor';

const routes: Routes = [
  { path: '', redirectTo: 'eventos', pathMatch: 'full' },
  { path: 'configuracion', component: ConfiguracionComponent},
  { path: 'notificaciones', component: NotificacionesComponent},
  { path: 'eventos', loadChildren: () => import('./eventos/eventos.module').then(m => m.EventosModule), canActivate: [AuthGuard]},
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule), canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }
  ],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
