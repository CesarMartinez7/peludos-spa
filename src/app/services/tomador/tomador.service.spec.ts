import { TestBed } from '@angular/core/testing';

import { TomadorService } from './tomador.service';

describe('TomadorService', () => {
  let service: TomadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TomadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
