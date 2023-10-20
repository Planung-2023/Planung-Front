import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarImagenComponent } from './cambiar-imagen.component';

describe('CambiarImagenComponent', () => {
  let component: CambiarImagenComponent;
  let fixture: ComponentFixture<CambiarImagenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarImagenComponent]
    });
    fixture = TestBed.createComponent(CambiarImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
