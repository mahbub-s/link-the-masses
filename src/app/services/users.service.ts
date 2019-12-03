import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/users/'
@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  create(data: User) {
    return this.http.post(BACKEND_URL, data, {observe: 'response'});
  }

  update(data: User, id: string) {
    return this.http.put(BACKEND_URL + id, data, {observe: 'response'});
  }

  delete(id: string) {
    return this.http.delete(BACKEND_URL + id, {observe: 'response'});
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(BACKEND_URL);
  }

  getCompletedParticipantData(username): Observable<any[]> {
    return this.http.get<any[]>(BACKEND_URL  + 'researcher/completed' + username);
  }

  getParticipantData(id): Observable<any[]> {
    return this.http.get<any[]>(BACKEND_URL + id);
  }

  getParticipantChats(username: string): Observable<any[]> {
    return this.http.get<any[]>(BACKEND_URL + 'researcher' + username);
  }

  updateParticipantStudy(study: any, participant: string) {
    return this.http.put(BACKEND_URL + 'study' + participant, study, {observe: 'response'});
  }
}
