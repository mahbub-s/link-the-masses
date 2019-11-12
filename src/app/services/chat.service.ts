import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Chat } from '../models/chat';

@Injectable()
export class ChatService {
  private dataSubject: BehaviorSubject<Chat[]> = new BehaviorSubject([]);
  data$: Observable<Chat[]> = this.dataSubject.asObservable();

  constructor(private http: HttpClient) { }

  create(data: Chat) {
    return this.http.post('http://localhost:3000/api/chat/', data, {observe: 'response'});
  }

  update(data: Chat, id: string) {
    return this.http.put('http://localhost:3000/api/chat/' + id, data, {observe: 'response'});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:3000/api/chat/' + id, {observe: 'response'});
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/chat/');
  }

  getFilteredData(age: number, sex: string): Observable<any[]> {
    return this.http.post<any[]>('http://localhost:3000/api/chat/filtered/', { age, sex });
  }
}
