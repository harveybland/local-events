import { ConfigService } from './../core/config/config.service';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Login, User, token, profile, userEvent, SignUp } from './../core/interface/user.model';
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

  userProfile() {
    return this.http.get<profile>(this._configService.userProfile())
  }

  userEvents(id: string) {
    return this.http.get<userEvent>(this._configService.userEvents(id))
  }
}
