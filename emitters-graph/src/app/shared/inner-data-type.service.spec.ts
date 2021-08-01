import { TestBed } from '@angular/core/testing';

import { InnerDataTypeService } from './inner-data-type.service';

describe('InnerDataTypeService', () => {
  let service: InnerDataTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnerDataTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
