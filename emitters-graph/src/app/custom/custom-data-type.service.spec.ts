import { TestBed } from '@angular/core/testing';

import { MyBubbleChart } from './custom-data-type.service';

describe('CustomDataTypeService', () => {
  let service: MyBubbleChart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBubbleChart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
