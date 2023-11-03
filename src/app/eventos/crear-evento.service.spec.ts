/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrearEventoService } from './crear-evento.service';

describe('Service: CrearEvento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearEventoService]
    });
  });

  it('should ...', inject([CrearEventoService], (service: CrearEventoService) => {
    expect(service).toBeTruthy();
  }));
});
