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

  constructor(private _userProfileService: UserProfileService) {}

  ngOnInit() {}

  deleteEvent(model: EventModal) {
    model._id;
    this._userProfileService.deleteEvent(model).subscribe();
  }
}
