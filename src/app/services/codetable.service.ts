import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class CodetableService {
  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/codetable/');
  }
}