import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso2Component } from './paso2.component';

describe('Paso2Component', () => {
  let component: Paso2Component;
  let fixture: ComponentFixture<Paso2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Paso2Component]
    });
    fixture = TestBed.createComponent(Paso2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
