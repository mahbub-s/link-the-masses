import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Questionnaire } from '../models/questionnaire';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/questionnaires/'
@Injectable()
export class QuestionnaireService {
  constructor(private http: HttpClient) { }

  create(data: Questionnaire) {
    return this.http.post(BACKEND_URL, data, {observe: 'response'});
  }

  update(data: Questionnaire, id: string) {
    return this.http.put(BACKEND_URL + id, data, {observe: 'response'});
  }

  delete(id: string) {
    return this.http.delete(BACKEND_URL + id, {observe: 'response'});
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(BACKEND_URL);
  }

  getFilteredData(age: number, sex: string, ids: any[]): Observable<any[]> {
    return this.http.post<any[]>(BACKEND_URL + 'filtered', { age, sex, ids });
  }
}
