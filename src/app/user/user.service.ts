import { ConfigService } from './../core/config/config.service';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Login, User, token, profile, userEvent, SignUp, EventModal } from './../core/interface/user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _myEvents: EventModal[] = [];
  private _myEvents$ = new BehaviorSubject<EventModal[]>(this._myEvents);
  myEvents$ = this._myEvents$.asObservable();

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
    return this.http.get<EventModal[]>(this._configService.userEvents(id)).pipe(map(resp => {
      console.log(resp)
      this._myEvents$.next(resp)
    }))
  }
}
