import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtStorageService {

  constructor() { }

  // helpers
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // user ID
  setUserId(id: string) {
    localStorage.setItem('id', id);
  }

  getUserId() {
    return localStorage.getItem('id');
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  getUserPayload() {
    let token = this.getToken();
    if (token) {
      let userPayload = atob(token.split('.')[1])
      return JSON.parse(userPayload)
    }
    else
      return null
  }

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false
  }

}
