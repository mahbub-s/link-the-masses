import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {
  private dataSubject: BehaviorSubject<User[]> = new BehaviorSubject([]);
  data$: Observable<User[]> = this.dataSubject.asObservable();

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

  validate(username: string , password: string): Observable<any[]> {
    const params = new HttpParams().set('username', username).set('password', password);
    return this.http.get<any[]>('http://localhost:3000/api/users/validate', {params});
  }
}
