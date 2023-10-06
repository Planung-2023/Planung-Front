import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-paso4',
  templateUrl: './paso4.component.html',
  styleUrls: ['./paso4.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso4Component {
dataEvento={

}
getDatosPaso4(){
  return this.dataEvento
}
}
