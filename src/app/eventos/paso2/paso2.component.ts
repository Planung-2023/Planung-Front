import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-paso2',
  templateUrl: './paso2.component.html',
  styleUrls: ['./paso2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paso2Component {
  dataEvento={

  }
  getDatosPaso2(){
    return this.dataEvento
  }
}
