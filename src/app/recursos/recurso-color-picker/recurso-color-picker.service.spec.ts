import { TestBed } from '@angular/core/testing';

import { RecursoColorPickerService } from './recurso-color-picker.service';

describe('RecursoColorPickerService', () => {
  let service: RecursoColorPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursoColorPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
