import { Router } from '@angular/router';
import { MainService } from './../../main/main.service';
import { JwtStorageService } from './../service/jwt-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  event$ = this._mainService.event$;
  loggedIn: boolean = false;

  profileComplete: boolean = false;
  createdEvent: boolean = false;
  pills: boolean = false;
  completeNum = 0;

  isMenuOpen = false;

  constructor(
    private _jwtService: JwtStorageService,
    private _mainService: MainService,
    private _router: Router
  ) {}

  ngOnInit() {
    let storageProfile = this._jwtService.getProfile();
    let event = this._jwtService.getEvent();
    this.createdEvent = Boolean(event);
    this.profileComplete = Boolean(storageProfile);

    console.log(this.pills);
    console.log(this.profileComplete);
    console.log(this.createdEvent);

    if (this.profileComplete && this.createdEvent) {
      this.pills = true;
    } else if (!this.profileComplete && this.createdEvent) {
      this.completeNum = 1;
    } else if (this.profileComplete && !this.createdEvent) {
      this.completeNum = 1;
    } else {
      this.completeNum = 0;
    }

    if (!this._jwtService.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  onLogout() {
    this._jwtService.deleteToken();
    this._router.navigate(['/sign-in']);
  }
}
