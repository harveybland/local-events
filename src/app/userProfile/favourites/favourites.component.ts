import { combineLatest } from 'rxjs';
import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { UserProfileService } from './../userProfile.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favEvents$ = this._userProfileService.favEvents$;

  favourties$ = combineLatest([this.favEvents$, this.favEvents$]).pipe(
    map(([items1, items2]) => {
      return items2.map((item2) => {
        const savedItem = items1.find((item1) => item1._id === item2._id);
        return savedItem ? { ...item2, isSaved: true } : item2;
      });
    })
  );

  constructor(
    private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    let userId = this._jwtService.getUserId();
    // this._userProfileService.userEvents(userId).subscribe();
    this._userProfileService.getFavourites(userId).subscribe();
  }
}
