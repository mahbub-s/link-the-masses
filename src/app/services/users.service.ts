import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  create(data: User) {
    return this.http.post('http://localhost:3000/api/users/', data, {observe: 'response'});
  }

  update(data: User, id: string) {
    return this.http.put('http://localhost:3000/api/users/' + id, data, {observe: 'response'});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:3000/api/users/' + id, {observe: 'response'});
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/users/');
  }

  getCompletedParticipantData(username): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/users/researcher/completed/' + username);
  }

  getParticipantData(id): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/users/' + id);
  }

  getParticipantChats(username: string): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/users/researcher/' + username);
  }

  updateParticipantStudy(study: any, participant: string) {
    return this.http.put('http://localhost:3000/api/users/study/' + participant, study, {observe: 'response'});
  }
}
