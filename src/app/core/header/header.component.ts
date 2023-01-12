import { UserProfileService } from './../../userProfile/userProfile.service';
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
  pills: boolean = true;
  completeNum = 0;

  isMenuOpen = false;

  userDetails: any;

  constructor(
    private _jwtService: JwtStorageService,
    private _mainService: MainService,
    private _userProfileService: UserProfileService,
    private _router: Router
  ) {}

  ngOnInit() {
    let token = this._jwtService.getToken();
    if (!!token) {
      this._userProfileService.userProfile().subscribe((res) => {
        this.userDetails = res['user'];
        this.profileComplete = this.userDetails.profileComplete;
        this.createdEvent = this.userDetails.createdEvent;
        if (this.profileComplete == false && this.createdEvent == false) {
          this.completeNum = 0;
          this.pills = true;
        } else if (this.profileComplete == true && this.createdEvent == true) {
          this.pills = false;
        } else if (this.profileComplete == false && this.createdEvent == true) {
          this.completeNum = 1;
          this.pills = true;
        } else if (this.profileComplete == true && this.createdEvent == false) {
          this.completeNum = 1;
          this.pills = true;
        }
      });
    }

    if (!this._jwtService.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  onLogout() {
    this._jwtService.deleteToken();
    this._router.navigate(['/user/sign-in']);
  }
}
