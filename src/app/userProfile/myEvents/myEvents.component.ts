import { Router } from '@angular/router';
import { UserService } from './../../user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myEvents',
  templateUrl: './myEvents.component.html',
  styleUrls: ['./myEvents.component.scss']
})
export class MyEventsComponent implements OnInit {

  myEvents$ = this._userService.myEvents$

  userEvents: any;
  pastEvents: any;
  userDetails: any;
  id: any;

  constructor(private _userService: UserService,
    public _router: Router) { }

  ngOnInit() {
    this._userService.userProfile().subscribe(res => {
      this.userDetails = res['user'];
      this.id = this.userDetails._id;
      this._userService.userEvents(this.id).subscribe();

      // res => {
      //   console.log(res)
      //   this.userEvents = res['events'].filter(t => t.isDeleted === false);
      //   this.pastEvents = res['events'].filter(t => t.isDeleted === true);
      // });

    })

  }

}
