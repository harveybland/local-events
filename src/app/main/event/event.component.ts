import { JwtStorageService } from './../../core/service/jwt-storage.service';
import { MainService } from './../main.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit, OnDestroy {
  userId: any;
  eventId: any;
  event: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _mainService: MainService,
    private _jwtService: JwtStorageService
  ) {}

  ngOnInit() {
    let Id = this._jwtService.getUserId();
    this.userId = Id;
    this._activatedRoute.params
      .pipe(
        map((params: any) => {
          return params['id'] as string;
        }),
        switchMap((id: any) => {
          this.eventId = id;
          return this._mainService.getEvent(id).pipe(
            tap((model: any) => {
              this.event = model;
              // let updateViews = {
              //   viewed: this.event.viewed + 1,
              // };
              // if (model.userId != this.userId) {
              //   this._mainService
              //     .updateViews(this.eventId, updateViews)
              //     .subscribe();
              // }
            })
          );
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.userId = '';
  }
}
