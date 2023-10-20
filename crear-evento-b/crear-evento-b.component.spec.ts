import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEventoBComponent } from './crear-evento-b.component';

describe('CrearEventoBComponent', () => {
  let component: CrearEventoBComponent;
  let fixture: ComponentFixture<CrearEventoBComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEventoBComponent]
    });
    fixture = TestBed.createComponent(CrearEventoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
