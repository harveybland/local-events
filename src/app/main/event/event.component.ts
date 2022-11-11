import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { UserProfileService } from './../../userProfile/userProfile.service';
import { MainService } from './../main.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {

  eventId: any;
  form: any;

  userDetails: any;
  userId: any;

  constructor(private _activatedRoute: ActivatedRoute,
    private _mainService: MainService,
    private _jwtService: JwtStorageService,
  ) { }

  ngOnInit() {
    let Id = this._jwtService.getUserId();
    this.userId = Id;

    this._activatedRoute.params.pipe(
      map(params => {
        return params['id'] as string;
      }),
      switchMap(id => {
        this.eventId = id;
        return this._mainService.getEvent(id).pipe(tap(model => {
          this.form = model;
          let updateViews = {
            viewed: this.form.viewed + 1
          }
          if (model.userId != this.userId) {
            this._mainService.updateViews(this.eventId, updateViews).subscribe();
          }
        }))
      })).subscribe();
  }

  ngOnDestroy(): void {
    this.userId = '';
  }

}
