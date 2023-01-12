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

  userId: any;

  constructor(
    private _userProfileService: UserProfileService,
    private _jwtService: JwtStorageService,
    public _router: Router
  ) {}

  ngOnInit() {
    this.userId = this._jwtService.getUserId();
  }

  deleteEvent(model: EventModal) {
    model._id;
    this._userProfileService.deleteEvent(this.userId, model).subscribe();
  }

  favourite(eventId: any) {
    if (!this.userId) {
      this._router.navigateByUrl('/user/sign-in');
    } else {
      alert('Added to favourites');
      this._userProfileService.addFavourites(this.userId, eventId).subscribe();
    }
  }

  removeFavourite(eventId: any) {
    alert('Removed from favourites');
    this._userProfileService.removeFavourite(this.userId, eventId).subscribe();
  }
}
