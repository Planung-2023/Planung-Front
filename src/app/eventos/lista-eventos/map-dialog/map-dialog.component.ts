import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}