import { StorageService } from './../core/service/storage.service';
// import { updateViewed } from './../core/interface/user.model';
import { ConfigService } from './../core/config/config.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take } from 'rxjs/operators';
import { EventModal } from 'src/app/core/interface/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private _event$ = new BehaviorSubject<EventModal[]>([]);
  event$ = this._event$.asObservable();

  private _mostViewed$ = new BehaviorSubject<EventModal[]>([]);
  mostViewed$ = this._mostViewed$.asObservable();

  constructor(
    private _configService: ConfigService,
    protected storageService: StorageService,
    private http: HttpClient
  ) {}

  getEvents() {
    return this.http.get<EventModal[]>(this._configService.events()).pipe(
      map((resp) => {
        this._event$.next(resp);
        // let res = resp.sort((a, b) => b.viewed - a.viewed);
        // this._mostViewed$.next(res)
      })
    );
  }

  getEvent(id: string) {
    return this.http.get<EventModal>(this._configService.event(id));
  }

  private _orderBy$: string = '';

  updateOrderBy(orderBy: string) {
    this._orderBy$ = orderBy;
  }

  reorderTalent(val: string) {
    const results$ = this._event$.pipe(
      take(1),
      tap((resp) => {
        this.reorderTalentChoice(val, resp);
        this._event$.next(resp);
      })
    );
    return results$;
  }

  reorderTalentChoice(option: any, resp: EventModal[]) {
    if (option === 'A - Z') {
      resp.sort((a, b) => (a.title < b.title ? -1 : 1));
    }
    if (option === 'Z - A') {
      resp.sort((a, b) => (a.title < b.title ? 1 : -1));
    }
  }

  // updateViews(id: string, model: updateViewed) {
  //   return this.http.put<EventModal[]>(
  //     this._configService.editViews(id),
  //     model
  //   );
  // }

  searchEvent(
    title?: string,
    category?: string,
    city?: string,
    startDate?: string
  ) {
    let params = new HttpParams();
    if (!!title) {
      params = params.append('title', title.toString());
    }
    if (!!category) {
      params = params.append('category', category.toString());
    }
    if (!!city) {
      params = params.append('city', city.toString());
    }
    if (!!startDate) {
      params = params.append('startDate', startDate.toString());
    }

    this.storageService.clearTimeoutStorage();
    return this.http
      .get<EventModal[]>(this._configService.searchEvent, { params: params })
      .pipe(
        map((resp) => {
          this._event$.next(resp);
        })
      );
  }
}
