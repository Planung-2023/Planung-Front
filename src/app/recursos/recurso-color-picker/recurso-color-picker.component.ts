import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecursoColorPickerService } from './recurso-color-picker.service';
import { Recurso } from '../visualizar-recurso/visualizar-recurso.component';
import { Router } from '@angular/router'
import { RecursosService } from '../recursos.service';

@Component({
  selector: 'app-recurso-color-picker',
  templateUrl: './recurso-color-picker.component.html',
  styleUrls: ['./recurso-color-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursoColorPickerComponent {

  @Input() recurso: Recurso;

  constructor(private RecursoColorPickerService: RecursoColorPickerService, private Router: Router, private RecursoService: RecursosService) {
    this.recurso = this.Router.getCurrentNavigation()?.extras.state?.['recurso'];
  }
  
  
  selectedColor: string = '';

  seleccionarColor(color: string) {
    this.selectedColor = color;
    this.RecursoColorPickerService.setSelectedColor(color);
    this.recurso.colorTarjeta = color;
    this.RecursoService.actualizarRecurso(this.recurso).subscribe(
      (response) => {
        console.log('Recursos actualizados con éxito', response);
      },
      (error) => {
        console.error('Error al actualizar los recursos', error);
      }
    );
    }
  }
