import { Router } from '@angular/router';
import { EventModal } from 'src/app/core/interface/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss'],
})
export class HomeListComponent implements OnInit {
  @Input() event: EventModal;

  constructor(private _router: Router) {}

  ngOnInit() {}

  favourite() {
    // let userId = this._jwtService.getUserId();
    // if (!userId) {
    this._router.navigateByUrl('/sign-in');
    // } else {
    //   this._userProfileService.addFavourites(userId, eventId).subscribe();
    // }
  }
}
