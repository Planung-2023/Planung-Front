import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paso5Component } from './paso5.component';

describe('Paso5Component', () => {
  let component: Paso5Component;
  let fixture: ComponentFixture<Paso5Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Paso5Component]
    });
    fixture = TestBed.createComponent(Paso5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
