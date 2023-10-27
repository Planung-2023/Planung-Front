/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecursosService } from './recursos.service';

describe('Service: Recursos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecursosService]
    });
  });

  it('should ...', inject([RecursosService], (service: RecursosService) => {
    expect(service).toBeTruthy();
  }));
});
