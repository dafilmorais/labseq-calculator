import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LabSeqService {
  private baseUrl = 'http://localhost:8080/labseq';

  constructor(private http: HttpClient) {}

  getLabSeqValue(n: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/${n}`, { responseType: 'text' });
  }
}
