import { MainService } from './../../main/main.service';
import { JwtStorageService } from './../service/jwt-storage.service';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { DOCUMENT } from '@angular/common';

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

  @Output() selectTheme = new EventEmitter();

  constructor(
    private _jwtService: JwtStorageService,
    private _mainService: MainService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    if (!this._jwtService.isLoggedIn()) {
      this.loggedIn = true;
    }

    let darkmode = window.localStorage.getItem('darkMode');
    if (darkmode == 'true') {
      this.checkbox = true;
      this.document.body.classList.add('dark-theme');
    } else {
      this.checkbox = false;
      this.document.body.classList.remove('dark-theme');
    }
  }

  darkMode(e: any) {
    if (e.currentTarget.checked == true) {
      let darkMode = true.toString();
      window.localStorage.setItem('darkMode', darkMode);
      this.document.body.classList.add('dark-theme');
      this.selectTheme.emit(true);
    } else {
      let darkMode = false.toString();
      window.localStorage.setItem('darkMode', darkMode);
      this.document.body.classList.remove('dark-theme');
      this.selectTheme.emit(false);
    }
  }
}
