import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Diary } from '../models/diary';

@Injectable()
export class DiaryService {
  private dataSubject: BehaviorSubject<Diary[]> = new BehaviorSubject([]);
  data$: Observable<Diary[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) { }

  create(data: Diary) {
    return this.http.post('http://localhost:3000/api/diary/', data, {observe: 'response'});
  }

  update(data: Diary, id: string) {
    return this.http.put('http://localhost:3000/api/diary/' + id, data, {observe: 'response'});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:3000/api/diary/' + id, {observe: 'response'});
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/diary/');
  }
}
