import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Login, User, token, profile, Event, userEvent } from './../core/interface/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) }

  private _userEvent$ = new BehaviorSubject<userEvent[]>([]);
  userEvent$ = this._userEvent$.asObservable();

  constructor(private http: HttpClient) { }

  create(user: User) {
    return this.http.post<User>('http://localhost:3000/api/register', user, this.noAuthHeader)
  }

  login(login: Login) {
    return this.http.post<token>('http://localhost:3000/api/authenticate', login, this.noAuthHeader)
  }

  userProfile() {
    return this.http.get<profile>('http://localhost:3000/api/userprofile')
  }

  userEvents(id: string) {
    return this.http.get<userEvent>(`http://localhost:3000/api/userEvents/${id}`)
  }

  // helpers
  // setToken(token: string) {
  //   localStorage.setItem('token', token);
  // }

  // getToken() {
  //   return localStorage.getItem('token');
  // }

  // deleteToken() {
  //   localStorage.removeItem('token');
  // }

  // getUserPayload() {
  //   let token = this.getToken();
  //   if (token) {
  //     let userPayload = atob(token.split('.')[1])
  //     return JSON.parse(userPayload)
  //   }
  //   else
  //     return null
  // }

  // isLoggedIn() {
  //   let userPayload = this.getUserPayload();
  //   if (userPayload)
  //     return userPayload.exp > Date.now() / 1000;
  //   else
  //     return false
  // }

}
