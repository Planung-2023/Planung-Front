/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotificacionGuardadoComponent } from './notificacion-guardado.component';

describe('NotificacionGuardadoComponent', () => {
  let component: NotificacionGuardadoComponent;
  let fixture: ComponentFixture<NotificacionGuardadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionGuardadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionGuardadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
