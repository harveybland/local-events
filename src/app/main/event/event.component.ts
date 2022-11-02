import { MainService } from './../main.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventId: any;

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
          console.log(model)
        }))
      })).subscribe();
  }

}
