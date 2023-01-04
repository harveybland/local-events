import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { EventModal } from './../../core/interface/user.model';
import { UserProfileService } from './../userProfile.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myEvents',
  templateUrl: './myEvents.component.html',
  styleUrls: ['./myEvents.component.scss'],
})
export class MyEventsComponent implements OnInit {
  myEvents$ = this._userProfileService.myEvents$;
  pastEvents$ = this._userProfileService.pastEvents$;

  userId: any;

  constructor(
    private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService,
    public _router: Router
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    let Id = this._jwtService.getUserId();
    this.userId = Id;
    this._userProfileService.userEvents(this.userId).subscribe();
  }
}
