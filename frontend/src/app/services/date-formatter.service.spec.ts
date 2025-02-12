import { TestBed } from '@angular/core/testing';

import { DateFormatterService } from './date-formatter.service';

describe('DateFormatterService', () => {
  let service: DateFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatDate()', () => {
    it('should correctly format Excel date to ISO date', () => {
      const excelDate = 44927;
      const expectedISODate = '2023-01-01';
      const actualISODate = DateFormatterService.formatDate(excelDate);
      expect(actualISODate).toBe(expectedISODate);
    });

    it('should handle edge cases', () => {
      const excelDate = 59;
      const expectedISODate = '1900-02-27';
      const actualISODate = DateFormatterService.formatDate(excelDate);
      expect(actualISODate).toBe(expectedISODate);
    });
  });
});
