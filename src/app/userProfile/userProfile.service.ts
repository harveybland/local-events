import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { profile, EventModal } from './../core/interface/user.model';
import { ConfigService } from './../core/config/config.service';
import { StorageService } from './../core/service/storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private _myEvents: EventModal[] = [];
  private _myEvents$ = new BehaviorSubject<EventModal[]>(this._myEvents);
  myEvents$ = this._myEvents$.asObservable();

  private _pastEvents: EventModal[] = [];
  private _pastEvents$ = new BehaviorSubject<EventModal[]>(this._pastEvents);
  pastEvents$ = this._pastEvents$.asObservable();

  constructor(private http: HttpClient,
    private storageService: StorageService,
    private _configService: ConfigService) { }

  userProfile() {
    return this.http.get<profile>(this._configService.userProfile())
  }

  userEvents(id: string) {
    return this.http.get<EventModal[]>(this._configService.userEvents(id)).pipe(map(resp => {
      this._myEvents$.next(resp.filter(f => f.isDeleted === false))
      this._pastEvents$.next(resp.filter(t => t.isDeleted === true))
    }))
  }

}
