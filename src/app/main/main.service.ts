import { ConfigService } from './../core/config/config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EventModal } from 'src/app/core/interface/user.model'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _event$ = new BehaviorSubject<EventModal[]>([]);
  event$ = this._event$.asObservable();

  private _latestEvent$ = new BehaviorSubject<EventModal[]>([]);
  latestEvent$ = this._latestEvent$.asObservable();

  constructor(private _configService: ConfigService,
    // private storageService: StorageService,
    private http: HttpClient) { }

  getEvents() {
    return this.http.get<EventModal[]>(this._configService.events()).pipe(map(resp => {
      this._event$.next(resp)
    }))
  }

  getLatestEvents() {
    return this.http.get<EventModal[]>(this._configService.events()).pipe(map(resp => {
      this._latestEvent$.next(resp.slice(0, 2))
    }))
  }

  getEvent(id: string) {
    return this.http.get<EventModal>(this._configService.event(id))
  }

}
