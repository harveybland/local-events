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

  isMenuOpen = false;

  constructor(
    private _jwtService: JwtStorageService,
    private _mainService: MainService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._mainService.getEvents().subscribe();
    if (!this._jwtService.isLoggedIn()) {
      this.loggedIn = true;
    }
  }

  onLogout() {
    this._jwtService.deleteToken();
    this._router.navigate(['/user/sign-in']);
  }
}
