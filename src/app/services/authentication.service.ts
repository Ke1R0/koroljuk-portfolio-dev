import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { User } from '../models/user.model'
import { Credentials } from '../models/credentials.model'
import 'rxjs/add/operator/toPromise';

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
    return payload ? {
      _id: payload._id,
      email: payload.email,
      name: payload.name
    } : null;
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

  get isLoggedIn(): boolean {
      const token = this.token;
      if (token) {
        const payload = this.getPayload(token);
        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
  }

  get Headers(): Headers {
    return new Headers({ 'Authorization': `Bearer ${this.token}`});
  }

  login(credentials: Credentials): Promise<User> {
      return this.http.post('/api/login', credentials).toPromise().then((res: any) => {
        const data = res.json();
        this.setToken(data.token);
        this.setCurrentUser(this.getCurrentUser);
        return this.currentUser;
      });
  }

  logout() {
    localStorage.removeItem(AuthenticationService.key);
    this.setCurrentUser(null);
  }
}
