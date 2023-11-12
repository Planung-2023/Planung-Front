/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PerfilStorageService } from './perfil-storage.service';

describe('Service: PerfilStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerfilStorageService]
    });
  });

  it('should ...', inject([PerfilStorageService], (service: PerfilStorageService) => {
    expect(service).toBeTruthy();
  }));
});
