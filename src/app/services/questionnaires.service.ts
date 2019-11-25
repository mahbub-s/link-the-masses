import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Questionnaire } from '../models/questionnaire';

@Injectable()
export class QuestionnaireService {
  constructor(private http: HttpClient) { }

  create(data: Questionnaire) {
    return this.http.post('http://localhost:3000/api/questionnaires/', data, {observe: 'response'});
  }

  update(data: Questionnaire, id: string) {
    return this.http.put('http://localhost:3000/api/questionnaires/' + id, data, {observe: 'response'});
  }

  delete(id: string) {
    return this.http.delete('http://localhost:3000/api/questionnaires/' + id, {observe: 'response'});
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/questionnaires/');
  }

  getFilteredData(age: number, sex: string, ids: any[]): Observable<any[]> {
    return this.http.post<any[]>('http://localhost:3000/api/questionnaires/filtered/', { age, sex, ids });
  }
}
