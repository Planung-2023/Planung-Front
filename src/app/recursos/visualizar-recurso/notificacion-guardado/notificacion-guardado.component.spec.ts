import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionGuardadoComponent } from './notificacion-guardado.component';

describe('NotificacionGuardadoComponent', () => {
  let component: NotificacionGuardadoComponent;
  let fixture: ComponentFixture<NotificacionGuardadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificacionGuardadoComponent]
    });
    fixture = TestBed.createComponent(NotificacionGuardadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
