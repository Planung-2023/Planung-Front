import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RecursoColorPickerService } from './recurso-color-picker.service';

@Component({
  selector: 'app-recurso-color-picker',
  templateUrl: './recurso-color-picker.component.html',
  styleUrls: ['./recurso-color-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursoColorPickerComponent {

  constructor(private RecursoColorPickerService: RecursoColorPickerService) {}
  
  selectedColor: string = '';

  seleccionarColor(color: string) {
    this.RecursoColorPickerService.setSelectedColor(color);
  }
}
