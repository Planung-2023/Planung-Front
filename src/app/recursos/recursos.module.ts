import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecursosRoutingModule } from './recursos-routing.module';
import { VisualizarRecursoComponent } from './visualizar-recurso/visualizar-recurso.component';
import { CrearRecursoComponent } from './crear-recurso/crear-recurso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AlertModule } from '@coreui/angular';
import { CarouselModule } from '@coreui/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { RecursoColorPickerComponent } from './recurso-color-picker/recurso-color-picker.component';


@NgModule({
  declarations: [
    CrearRecursoComponent,
    RecursoColorPickerComponent,
    VisualizarRecursoComponent,
  ],
  imports: [
    CommonModule,
    RecursosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatExpansionModule,
    AlertModule,
    CarouselModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatFormFieldModule,
  ],
  exports: [
    VisualizarRecursoComponent,
    CrearRecursoComponent
  ],
})
export class RecursosModule { }
