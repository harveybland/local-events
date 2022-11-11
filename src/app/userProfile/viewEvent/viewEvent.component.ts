import { MainService } from './../../main/main.service';
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
  event: any;

  constructor(private _activatedRoute: ActivatedRoute,
    private _mainService: MainService
  ) { }

  ngOnInit() {
    this._activatedRoute.params.pipe(
      map(params => {
        return params['id'] as string;
      }),
      switchMap(id => {
        this.eventId = id;
        return this._mainService.getEvent(id).pipe(tap(model => {
          this.event = model;
        }))
      })).subscribe();
  }


}
