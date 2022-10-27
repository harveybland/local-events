import { ConfigService } from './../core/config/config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/core/interface/user.model'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _event$ = new BehaviorSubject<Event[]>([]);
  event$ = this._event$.asObservable();

  constructor(private _configService: ConfigService,
    // private storageService: StorageService,
    private http: HttpClient) { }

  getEvents() {
    return this.http.get<Event[]>(this._configService.events()).pipe(map(resp => {
      this._event$.next(resp)
    }))
  }

}
