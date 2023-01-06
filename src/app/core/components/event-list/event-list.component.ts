import { Router } from '@angular/router';
import { JwtStorageService } from './../../service/jwt-storage.service';
import { UserProfileService } from './../../../userProfile/userProfile.service';
import { EventModal } from './../../interface/user.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  @Input() events: EventModal;
  @Input() eventType: number;
  @Input() favouritedata: any;

  constructor(
    private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService,
    public _router: Router
  ) {}

  ngOnInit() {}

  deleteEvent(model: EventModal) {
    let userId = this._jwtService.getUserId();
    model._id;
    this._userProfileService.deleteEvent(userId, model).subscribe();
  }

  favourite(eventId: any) {
    let userId = this._jwtService.getUserId();
    if (!userId) {
      this._router.navigateByUrl('/sign-in');
    } else {
      this._userProfileService.addFavourites(userId, eventId).subscribe();
    }
  }

  removeFavourite(favouriteId: any) {
    this._userProfileService.removeFavourite(favouriteId).subscribe();
  }
}
