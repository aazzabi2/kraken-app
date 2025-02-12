import { TestBed, inject } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { KrakenService } from './kraken.service';
import { Kraken } from '../models/kraken.model';
import { environment } from '../../environments/environments';
import { KrakenCategory } from '../enum/kraken-category.enum';

describe('KrakenService', () => {
  let service: KrakenService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KrakenService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(KrakenService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('uploadData()', () => {
    it('should upload data', () => {
      const mockData: Kraken[] = [
        {
          name: 'Test1',
          updated_at: '2024-01-01',
          prices: [1, 2, 3],
          rate: 10,
          category: KrakenCategory.PRODUCT,
        },
        {
          name: 'Test2',
          updated_at: '2024-01-02',
          prices: [4, 5, 6],
          rate: 20,
          category: KrakenCategory.PRODUCT,
        },
      ];

      service.uploadData(mockData).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/kraken`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockData);
      req.flush({});
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
