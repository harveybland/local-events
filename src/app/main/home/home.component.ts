import { AnimationService } from './../../core/service/animation.service';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latestEvent$ = this._mainService.latestEvent$;
  event$ = this._mainService.event$;

  public lat: string;
  public lng: string;

  constructor(private _mainService: MainService,
    private _animation: AnimationService) { }

  ngOnInit() {
    this._mainService.getEvents().subscribe();
    this._mainService.getLatestEvents().subscribe();
    this.getLocation();
    this._animation.animation();
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.callApi(longitude, latitude);
      });
    } else {
      console.log("No support for geolocation")
    }
  }

  callApi(Longitude: number, Latitude: number) {
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
    //Call API
  }

}
