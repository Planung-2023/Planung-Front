import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoColorPickerComponent } from './recurso-color-picker.component';

describe('RecursoColorPickerComponent', () => {
  let component: RecursoColorPickerComponent;
  let fixture: ComponentFixture<RecursoColorPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecursoColorPickerComponent]
    });
    fixture = TestBed.createComponent(RecursoColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
