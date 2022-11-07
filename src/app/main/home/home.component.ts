import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latestEvent$ = this._mainService.latestEvent$;
  event$ = this._mainService.event$;

  constructor(private _mainService: MainService) { }

  ngOnInit() {
    this._mainService.getEvents().subscribe();
  }

}
