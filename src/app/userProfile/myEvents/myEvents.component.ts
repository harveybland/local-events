import { UserProfileService } from './../userProfile.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myEvents',
  templateUrl: './myEvents.component.html',
  styleUrls: ['./myEvents.component.scss']
})
export class MyEventsComponent implements OnInit {

  myEvents$ = this._userProfileService.myEvents$
  pastEvents$ = this._userProfileService.pastEvents$

  userDetails: any;
  id: any;

  constructor(private _userProfileService: UserProfileService,
    public _router: Router) { }

  ngOnInit() {
    this._userProfileService.userProfile().subscribe(res => {
      this.userDetails = res['user'];
      this.id = this.userDetails._id;
      this._userProfileService.userEvents(this.id).subscribe();
    })
  }

}
