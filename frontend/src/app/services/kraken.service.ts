import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kraken } from '../models/kraken.model';
import { environment } from '../../environments/environments';

const httpHeaders = {
  headers: {
    'Content-Type': 'application/json',
  },
};
@Injectable({
  providedIn: 'root',
})
export class KrakenService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadData(data: Kraken[]): Observable<any> {
    return this.http.post(this.apiUrl + '/kraken', data);
  }
}
