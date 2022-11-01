import { Router } from '@angular/router';
import { UserService } from './../../user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myEvents',
  templateUrl: './myEvents.component.html',
  styleUrls: ['./myEvents.component.scss']
})
export class MyEventsComponent implements OnInit {

  userEvents: any;

  constructor(private _userService: UserService,
    public _router: Router) { }

  ngOnInit() {
    let id = '635bb9af9e504abe7a75a93e';
    // let id = '636146e1643433c7c02b1991';
    this._userService.userEvents(id).subscribe(res => {
      console.log(res)
      this.userEvents = res;
    });
  }

}
