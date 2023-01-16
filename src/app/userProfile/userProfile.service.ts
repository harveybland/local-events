import { map, take, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, forkJoin, merge, of } from 'rxjs';
import {
  profile,
  EventModal,
  newEvent,
  User,
  UpdateUser,
  updateEvent,
} from './../core/interface/user.model';
import { ConfigService } from './../core/config/config.service';
import { StorageService } from './../core/service/storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private _myEvents: EventModal[] = [];
  private _myEvents$ = new BehaviorSubject<EventModal[]>(this._myEvents);
  myEvents$ = this._myEvents$.asObservable();

  private _pastEvents: EventModal[] = [];
  private _pastEvents$ = new BehaviorSubject<EventModal[]>(this._pastEvents);
  pastEvents$ = this._pastEvents$.asObservable();

  private _favEvents: EventModal[] = [];
  private _favEvents$ = new BehaviorSubject<EventModal[]>(this._favEvents);
  favEvents$ = this._favEvents$.asObservable();

  category: string[];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private _configService: ConfigService
  ) {}

  // Profile
  userProfile() {
    return this.http.get<profile>(this._configService.userProfile());
  }

  editProfile(id: string, model: UpdateUser) {
    return this.http.put<UpdateUser>(
      this._configService.editProfile(id),
      model
    );
  }

  // User events
  userEvents(id: any) {
    return this.http.get<EventModal[]>(this._configService.userEvents(id)).pipe(
      map((resp) => {
        let now = new Date();
        this._myEvents$.next(
          resp.filter((item) => now < new Date(item.startDate as string))
        );
        this._pastEvents$.next(
          resp.filter((item) => now > new Date(item.startDate as string))
        );
      })
    );
  }

  deleteUser(id: any) {
    return this.http.delete<profile>(this._configService.deleteUser(id));
  }

  userEvent(id: any) {
    return this.http.get<EventModal>(this._configService.event(id));
  }

  eventTask(id: string, model: UpdateUser) {
    return this.http.put<User>(this._configService.eventTask(id), model);
  }

  createEvent(model: newEvent) {
    return this.http
      .post<EventModal[]>(this._configService.createEvents(), model)
      .pipe(
        map((resp) => {
          this._myEvents$.next(resp);
        })
      );
  }

  editEvent(id: any, model: updateEvent) {
    return this.http
      .put<EventModal[]>(this._configService.editEvent(id), model)
      .pipe(
        map((resp) => {
          this._myEvents$.next(resp);
        })
      );
  }

  deleteEvent(userId: any, model: EventModal) {
    return this.http
      .delete<EventModal[]>(this._configService.deleteEvent(userId, model._id))
      .pipe(
        map((resp) => {
          this.storageService.clearItemTimeoutStorage(
            this._configService.userEvents(model._id)
          );
          let now = new Date();
          this._myEvents$.next(
            resp.filter(
              (item) =>
                now < new Date(item.endDate as string) &&
                item.isDeleted === false
            )
          );
          this._pastEvents$.next(
            resp.filter(
              (item) =>
                now > new Date(item.endDate as string) ||
                item.isDeleted != false
            )
          );
        })
      );
  }

  addFavourites(userId: any, eventId: any) {
    return this.http
      .post<EventModal[]>(
        this._configService.addFavourites(userId, eventId),
        null
      )
      .pipe(
        map((resp) => {
          this._favEvents$.next(resp);
        })
      );
  }

  getFavourites(id: any) {
    return this.http.get<EventModal[]>(this._configService.favourites(id)).pipe(
      map((resp) => {
        console.log(resp);
        this._favEvents$.next(resp);
      })
    );
  }

  removeFavourite(userId: any, eventId: any) {
    return this.http
      .delete<EventModal[]>(
        this._configService.removeFavourite(userId, eventId)
      )
      .pipe(
        map((resp) => {
          console.log(resp);
          this._favEvents$.next(resp);
        })
      );
  }

  combine() {
    return combineLatest([this._myEvents$, this._favEvents$]);
  }

  getCategorys() {
    this.category = [
      'Conferences',
      'Concerts',
      'Community',
      'Festivals',
      'Performing Arts',
      'Sports',
      'Trade shows and expos',
      'Workshops',
      'VIP experiences',
      'Other',
    ];
    return of(this.category);
  }
}
