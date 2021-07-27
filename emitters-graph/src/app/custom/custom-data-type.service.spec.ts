import { TestBed } from '@angular/core/testing';

import { CustomDataTypeService } from './custom-data-type.service';

describe('CustomDataTypeService', () => {
  let service: CustomDataTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomDataTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
