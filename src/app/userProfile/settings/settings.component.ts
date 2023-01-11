import { Router } from '@angular/router';
import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { UserProfileService } from './../userProfile.service';
import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  // @Output() selectTheme = new EventEmitter();

  checkbox = false;
  userId: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService,
    public _router: Router
  ) {}

  ngOnInit(): void {
    let Id = this._jwtService.getUserId();
    this.userId = Id;

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
      // this.selectTheme.emit(true);
    } else {
      let darkMode = false.toString();
      window.localStorage.setItem('darkMode', darkMode);
      this.document.body.classList.remove('dark-theme');
      // this.selectTheme.emit(false);
    }
  }

  delete() {
    this._userProfileService.deleteUser(this.userId).subscribe();
    this._jwtService.deleteToken();
    this._router.navigate(['/sign-in']);
  }
}
