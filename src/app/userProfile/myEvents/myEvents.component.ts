import { Router } from '@angular/router';
import { UserService } from './../../user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myEvents',
  templateUrl: './myEvents.component.html',
  styleUrls: ['./myEvents.component.scss']
})
export class MyEventsComponent implements OnInit {

  // userEvent$ = this._userService.userEvent$;
  userEvents: any;

  constructor(private _userService: UserService,
    public _router: Router) { }

  ngOnInit() {
    let id = '635a67c5a85c219264f0dbe6';
    this._userService.userEvents(id).subscribe(data => {
      this.userEvents = data;
    });
  }

}
