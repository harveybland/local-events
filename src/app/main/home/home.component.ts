import { UserProfileService } from './../../userProfile/userProfile.service';
import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { Router } from '@angular/router';
import { AnimationService } from './../../core/service/animation.service';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  event$ = this._mainService.event$;
  mostViewed$ = this._mainService.mostViewed$;
  userId: any;

  public lat: string;
  public lng: string;

  constructor(
    private _mainService: MainService,
    private _animation: AnimationService,
    private _jwtService: JwtStorageService,
    private _userProfileService: UserProfileService,
    private _router: Router
  ) {}

  ngOnInit() {
    let Id = this._jwtService.getUserId();
    this.userId = Id;
    this._mainService.getEvents().subscribe();
    this._animation.animation();
    // this.getLocation();
  }

  // getLocation(): void {
  //   window.scroll(0, 0);
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const longitude = position.coords.longitude;
  //       const latitude = position.coords.latitude;
  //       this.callApi(longitude, latitude);
  //     });
  //   } else {
  //     console.log('No support for geolocation');
  //   }
  // }

  // callApi(Longitude: number, Latitude: number) {
  //   const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`;
  // }

  favourite(eventId: any) {
    let userId = this._jwtService.getUserId();
    if (!userId) {
    this._router.navigateByUrl('/sign-in');
    } else {
      this._userProfileService.addFavourites(userId, eventId).subscribe();
    }
  }

}
