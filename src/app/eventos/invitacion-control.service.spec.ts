import { TestBed } from '@angular/core/testing';

import { InvitacionControlService } from './invitacion-control.service';

describe('InvitacionControlService', () => {
  let service: InvitacionControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitacionControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
