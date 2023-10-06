import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarRecursoComponent } from './visualizar-recurso.component';

describe('VisualizarRecursoComponent', () => {
  let component: VisualizarRecursoComponent;
  let fixture: ComponentFixture<VisualizarRecursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarRecursoComponent]
    });
    fixture = TestBed.createComponent(VisualizarRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
