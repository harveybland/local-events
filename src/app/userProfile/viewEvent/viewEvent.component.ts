import { UserProfileService } from './../userProfile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewEvent',
  templateUrl: './viewEvent.component.html',
  styleUrls: ['./viewEvent.component.scss']
})
export class ViewEventComponent implements OnInit {

  eventId: any;

  constructor(private _activatedRoute: ActivatedRoute,
    private _userProfileService: UserProfileService) { }

  ngOnInit() {
    this._activatedRoute.params.pipe(
      map(params => {
        return params['id'] as number;
      }),
      switchMap(id => {
        this.eventId = id;
        return this._userProfileService.userEvent(id).pipe(tap(model => {
        }))
      })).subscribe();

  }

}
