import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { Router } from '@angular/router';
import { UserService } from './../../user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails: any;

  constructor(private _userService: UserService,
    private _jwtService: JwtStorageService,
    public _router: Router) { }

  ngOnInit() {
    this._userService.userProfile().subscribe(res => {
      console.log(res)
      this.userDetails = res['user']
    },
      err => {
        console.log(err)
      })
  }

  onLogout() {
    this._jwtService.deleteToken();
    this._router.navigate(['/sign-in']);
  }

}
