import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../models/user.model'
import { Credentials } from '../models/credentials.model'


@Injectable()
export class AuthenticationService {
  private static readonly key = 'portfolio-token';
  currentUser: User;

  constructor(private http: Http) {
    this.setCurrentUser(this.getCurrentUser);
  }

  private get getCurrentUser(): User {
    const token = this.token;
    const payload = this.getPayload(token);
    return payload && !this.isExpired(payload) ? {
      _id: payload._id,
      email: payload.email,
      name: payload.name
    } : null;
  }

  private isExpired(payload: any) {
    return payload.exp <= payload.iat;
  }

  private setToken(token: string) {
    localStorage[AuthenticationService.key] = token;
  }

  private getPayload(token: string): any {
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
  }

  private setCurrentUser(user: User) {
    this.currentUser = user;
  }

  private get token(): string {
    return localStorage[AuthenticationService.key];
  }

  get Headers(): Headers {
    return new Headers({ 'Authorization': `Bearer ${this.token}`});
  }

  login(credentials: Credentials): Observable<User> {
      return this.http.post('/api/login', credentials).map(
        res => {
          console.log(res);
          const data = res.json();
          this.setToken(data.token);
          this.setCurrentUser(this.getCurrentUser);
          return this.currentUser;
        }
      ).catch(err => {
        throw err.json();
      });
  }

  logout() {
    localStorage.removeItem(AuthenticationService.key);
    this.setCurrentUser(null);
  }
}
