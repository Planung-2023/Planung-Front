import { TestBed } from '@angular/core/testing';

import { InvitadosControlService } from './invitados-control.service';

describe('InvitadosControlService', () => {
  let service: InvitadosControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitadosControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
