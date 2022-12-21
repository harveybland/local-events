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
  profile: boolean = false;

  checkbox = false;

  constructor(
    private _jwtService: JwtStorageService,
    private _mainService: MainService
  ) {}

  ngOnInit() {
    if (!this._jwtService.isLoggedIn()) {
      this.loggedIn = true;
    }

    let darkmode = window.localStorage.getItem('darkMode');
    if (darkmode == 'true') {
      this.checkbox = true;
    } else {
      this.checkbox = false;
    }
  }

  darkMode(e: any) {
    if (e.currentTarget.checked == true) {
      let darkMode = true.toString();
      window.localStorage.setItem('darkMode', darkMode);
    } else {
      let darkMode = false.toString();
      window.localStorage.setItem('darkMode', darkMode);
    }
  }
}
