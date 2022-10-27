import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventsList',
  templateUrl: './eventsList.component.html',
  styleUrls: ['./eventsList.component.scss']
})
export class EventsListComponent implements OnInit {

  event$ = this._mainService.event$;

  constructor(private _mainService: MainService) { }

  ngOnInit() {
    this._mainService.getEvents().subscribe();
  }

}
