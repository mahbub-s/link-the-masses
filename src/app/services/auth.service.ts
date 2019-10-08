import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    private loggedIn = new BehaviorSubject<boolean>(false);
    loggedInStatus = this.loggedIn.asObservable();

    setLoggedInStatus(status: boolean) {
        this.loggedIn.next(status);
    }

    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:3000/api/users/login',
            {username, password}).pipe(map(data => {
                if (data.length !== 0) {
                    localStorage.setItem('loggedInUser', JSON.stringify(data[0]));
                    this.setLoggedInStatus(true);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem('loggedInUser');
        this.setLoggedInStatus(false);
    }
}
