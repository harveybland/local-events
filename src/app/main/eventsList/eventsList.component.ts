import {
  debounceTime,
  switchMap,
  distinctUntilChanged,
  take,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-eventsList',
  templateUrl: './eventsList.component.html',
  styleUrls: ['./eventsList.component.scss'],
})
export class EventsListComponent implements OnInit {
  event$ = this._mainService.event$;
  view = false;

  sortControl = new FormControl('Sort');
  controlSubscription: Subscription;

  constructor(private _mainService: MainService) {}

  ngOnInit() {
    window.scroll(0, 0);
    this._mainService.getEvents().subscribe();

    this.controlSubscription = new Subscription();

    this.controlSubscription.add(
      this.sortControl.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          switchMap((val) => {
            this._mainService.updateOrderBy(val);
            return this._mainService.reorderTalent(val).pipe(take(1));
          })
        )
        .subscribe()
    );
  }
}
