import { UserProfileService } from './../../userProfile/userProfile.service';
import { JwtStorageService } from './../../core/service/jwt-storage.service';
import {
  debounceTime,
  switchMap,
  distinctUntilChanged,
  take,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-eventsList',
  templateUrl: './eventsList.component.html',
  styleUrls: ['./eventsList.component.scss'],
})
export class EventsListComponent implements OnInit {
  event$ = this._mainService.event$;
  favEvents$ = this._userProfileService.favEvents$;
  view = false;

  userId: any;

  sortControl = new FormControl('Sort');
  controlSubscription: Subscription;

  events$ = combineLatest([this.favEvents$, this.event$]).pipe(
    map(([items1, items2]) => {
      return items2.map((item2) => {
        const savedItem = items1.find((item1) => item1._id === item2._id);
        return savedItem ? { ...item2, isSaved: true } : item2;
      });
    })
  );

  constructor(
    private _mainService: MainService,
    private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    this._mainService.getEvents().subscribe();
    let Id = this._jwtService.getUserId();
    if (!!this.userId) {
      this.userId = Id;
      this._userProfileService.getFavourites(this.userId).subscribe();
    }

    this.controlSubscription = new Subscription();

    this.controlSubscription.add(
      this.sortControl.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((val) => {
            this._mainService.updateOrderBy(val);
            return this._mainService.reorderTalent(val).pipe(take(1));
          })
        )
        .subscribe()
    );
  }
}
