import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class CodetableService {
  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  data$: Observable<any[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/codetable/');
  }
}