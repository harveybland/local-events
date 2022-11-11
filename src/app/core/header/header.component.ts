import { MainService } from './../../main/main.service';
import { JwtStorageService } from './../service/jwt-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  event$ = this._mainService.event$;

  loggedIn: boolean = false;

  constructor(private _jwtService: JwtStorageService,
    private _mainService: MainService) { }

  ngOnInit() {
    this._mainService.getEvents().subscribe();
    if (!this._jwtService.isLoggedIn()) {
      this.loggedIn = true;
    }
  }


}
