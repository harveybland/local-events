import { ConfigService } from './../core/config/config.service';
import { Login, token, SignUp, } from './../core/interface/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) }

  constructor(private http: HttpClient,
    private _configService: ConfigService) { }

  create(user: SignUp) {
    return this.http.post<SignUp>(this._configService.register(), user, this.noAuthHeader)
  }

  login(login: Login) {
    return this.http.post<token>(this._configService.login(), login, this.noAuthHeader)
  }
}
