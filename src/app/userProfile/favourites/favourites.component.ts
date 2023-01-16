import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { UserProfileService } from './../userProfile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  favEvents$ = this._userProfileService.favEvents$;

  constructor(
    private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    let userId = this._jwtService.getUserId();
    this._userProfileService.userEvents(userId).subscribe();
    this._userProfileService.getFavourites(userId).subscribe();
  }
}
