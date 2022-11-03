import { UserProfileService } from './../userProfile.service';
import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails: any;

  constructor(private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService,
    public _router: Router) { }

  ngOnInit() {
    this._userProfileService.userProfile().subscribe(res => {
      this.userDetails = res['user']
    })
  }

  onLogout() {
    this._jwtService.deleteToken();
    this._router.navigate(['/sign-in']);
  }

}
