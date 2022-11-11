import { updateViewed } from './../core/interface/user.model';
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

  constructor(private _configService: ConfigService,
    // private storageService: StorageService,
    private http: HttpClient) { }

  getEvents() {
    return this.http.get<EventModal[]>(this._configService.events()).pipe(map(resp => {
      this._event$.next(resp)
    }))
  }

  getEvent(id: string) {
    return this.http.get<EventModal>(this._configService.event(id))
  }

  updateViews(id: string, model: updateViewed) {
    console.log(model)
    return this.http.put<EventModal[]>(this._configService.editEvent(id), model)
  }

}
