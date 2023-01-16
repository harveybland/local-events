import { map } from 'rxjs/operators';
import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { UserProfileService } from './../userProfile.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-myEvents',
  templateUrl: './myEvents.component.html',
  styleUrls: ['./myEvents.component.scss'],
})
export class MyEventsComponent implements OnInit {
  myEvents$ = this._userProfileService.myEvents$;
  pastEvents$ = this._userProfileService.pastEvents$;
  favEvents$ = this._userProfileService.favEvents$;

  userId: any;

  events$ = combineLatest([this.favEvents$, this.myEvents$]).pipe(
    map(([items1, items2]) => {
      return items2.map((item2) => {
        const savedItem = items1.find((item1) => item1._id === item2._id);
        return savedItem ? { ...item2, isSaved: true } : item2;
      });
    })
  );

  oldEvents$ = combineLatest([this.favEvents$, this.pastEvents$]).pipe(
    map(([items1, items2]) => {
      return items2.map((item2) => {
        const savedItem = items1.find((item1) => item1._id === item2._id);
        return savedItem ? { ...item2, isSaved: true } : item2;
      });
    })
  );

  constructor(
    private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService,
    public _router: Router
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    let Id = this._jwtService.getUserId();
    this.userId = Id;
    this._userProfileService.userEvents(this.userId).subscribe();
    this._userProfileService.getFavourites(this.userId).subscribe();
  }
}
