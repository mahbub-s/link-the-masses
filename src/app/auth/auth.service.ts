import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  updateToken(id: string) {
    this.http
      .get('http://localhost:3000/api/users/updateToken/' + id)
      .subscribe(
        res => {
          const token = JSON.stringify(res);
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.saveAuthData(token);
          }
        },
        error => {
          this.authStatusListener.next(false);
        }
      );
  }

  login(username: string, password: string) {
    this.http
      .post('http://localhost:3000/api/users/login', {username, password})
      .subscribe(
        res => {
         // const token = JSON.stringify(res['token']) 
          const token = JSON.stringify(res);
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.saveAuthData(token);
            console.log(this.getAuthData());
            this.router.navigate(['/profile']);
          }
        },
        error => {
          console.log('no token found xxxxxxxxx');
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.loggedInUser;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string) {
    localStorage.setItem('loggedInUser', token);
  }

  private clearAuthData() {
    localStorage.removeItem('loggedInUser');
  }

  private getAuthData() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      return;
    }
    return {
      loggedInUser
    };
  }
}
