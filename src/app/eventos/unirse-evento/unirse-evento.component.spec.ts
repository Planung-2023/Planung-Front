import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnirseEventoComponent } from './unirse-evento.component';

describe('UnirseEventoComponent', () => {
  let component: UnirseEventoComponent;
  let fixture: ComponentFixture<UnirseEventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnirseEventoComponent]
    });
    fixture = TestBed.createComponent(UnirseEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
